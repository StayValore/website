import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { supabase } from '@/lib/supabase';
import { getPrivateUserIds } from '@/lib/seo';

// Blurred guest-photo teaser (gated-content pattern: "see them in the app").
// The blur happens HERE, server-side, and the original Cloudflare URL never
// appears in any page markup — there is nothing to un-blur client-side.
// Blurred to unidentifiability (silhouettes at most), so photos with people
// are safe to tease; the likeness concern applies to recognizable people.

export const revalidate = 86400;

interface Props { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return new NextResponse(null, { status: 400 });

  // The photo must belong to a public, non-hidden review by a non-private
  // author (B79 — service role bypasses RLS, so enforce it explicitly).
  const { data: photo } = await supabase
    .from('review_photos')
    .select('url, review_id, reviews!inner(user_id, is_public, is_hidden)')
    .eq('id', id)
    .maybeSingle();
  const review = (photo as any)?.reviews;
  if (!photo?.url || !review?.is_public || review.is_hidden) {
    return new NextResponse(null, { status: 404 });
  }
  const privateAuthors = await getPrivateUserIds([review.user_id]);
  if (privateAuthors.has(review.user_id)) return new NextResponse(null, { status: 404 });

  const upstream = await fetch(photo.url);
  if (!upstream.ok) return new NextResponse(null, { status: 502 });
  const input = Buffer.from(await upstream.arrayBuffer());

  const out = await sharp(input)
    .rotate() // respect EXIF orientation before stripping metadata
    .resize(360, 360, { fit: 'inside' })
    .blur(12)
    .jpeg({ quality: 78 })
    .toBuffer();

  return new NextResponse(new Uint8Array(out), {
    headers: {
      'Content-Type': 'image/jpeg',
      // Immutable at the CDN for a year; the underlying photo never changes.
      'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
    },
  });
}
