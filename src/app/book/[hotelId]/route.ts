import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// valore.com/book/{hotelId}?u={userId}&s={surface}&l={listId}
//
// Rail-agnostic booking redirect (creator-economy rung 1, spec F87).
// Logs a first-party click, then 307s to the current supplier. Today that's
// an untagged Expedia search deep link; when the affiliate account is
// approved, only buildSupplierUrl changes — every link in the wild upgrades
// in place. Logging must NEVER block or break the redirect.

const SURFACES = new Set(['review', 'list', 'share', 'hotel_page', 'guide']);
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function buildSupplierUrl(hotelName: string, city: string | null): string {
  const destination = city ? `${hotelName}, ${city}` : hotelName;
  const params = new URLSearchParams({ destination });
  // TODO(F87): append affiliate tracking (camref/subid) once the Expedia
  // Group Affiliate / Travelpayouts account is approved.
  return `https://www.expedia.com/Hotel-Search?${params.toString()}`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) {
  const { hotelId } = await params;
  const q = req.nextUrl.searchParams;

  const userId = UUID_RE.test(q.get('u') ?? '') ? q.get('u') : null;
  const listId = UUID_RE.test(q.get('l') ?? '') ? q.get('l') : null;
  const surface = SURFACES.has(q.get('s') ?? '') ? q.get('s')! : 'unknown';

  const { data: hotel } = await supabase
    .from('hotels')
    .select('id, name, city')
    .eq('id', hotelId)
    .maybeSingle();

  // Unknown hotel: send them somewhere alive, never a 404.
  const target = hotel
    ? buildSupplierUrl(hotel.name, hotel.city)
    : 'https://www.stayvalore.com';

  const subid = `${userId ?? 'anon'}.${surface}.${listId ?? '-'}`;

  try {
    await supabase.from('booking_clicks').insert({
      user_id: userId,
      hotel_id: hotel?.id ?? null,
      surface,
      list_id: listId,
      subid,
      redirect_target: target,
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
    });
  } catch {
    // Click logging is best-effort; the redirect always wins.
  }

  return NextResponse.redirect(target, 307);
}
