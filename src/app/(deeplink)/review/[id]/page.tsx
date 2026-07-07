import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const APP_STORE_URL = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';
const DEFAULT_OG = 'https://stayvalore.com/logo.png';

interface Props { params: Promise<{ id: string }> }

function starsFor(rating: number | null): string {
  if (!rating) return '';
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(Math.max(0, 5 - rounded));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data: review } = await supabase
    .from('reviews')
    .select(`
      notes, rating_overall, created_at, user_id, is_public,
      hotel:hotels(name, city, country, cover_image_url),
      photos:review_photos(url)
    `)
    .eq('id', id)
    .single();

  if (!review || review.is_public === false) return { title: 'Valoré' };

  const hotel = review.hotel as any;
  const photos = review.photos as any[];
  const coverPhoto = photos?.[0]?.url || hotel?.cover_image_url || DEFAULT_OG;
  const location = hotel ? [hotel.city, hotel.country].filter(Boolean).join(', ') : '';
  const stars = starsFor(review.rating_overall);
  const title = `${stars} ${hotel?.name || 'Hotel Review'} — Valoré`;
  const excerpt = review.notes
    ? review.notes.slice(0, 150) + (review.notes.length > 150 ? '…' : '')
    : `A review on Valoré${location ? ` from ${location}` : ''}`;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `https://stayvalore.com/review/${id}`,
      type: 'article',
      images: [{ url: coverPhoto, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: excerpt },
    other: { 'apple-itunes-app': `app-id=6760678152, app-argument=valore://review/${id}` },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;

  const { data: reviewRow } = await supabase
    .from('reviews')
    .select(`
      notes, rating_overall, created_at, user_id, is_public,
      hotel:hotels(id, name, city, country, cover_image_url),
      photos:review_photos(url)
    `)
    .eq('id', id)
    .single();

  // Service-role key bypasses RLS — never render a non-public review's content.
  const review = reviewRow?.is_public === false ? null : reviewRow;

  const hotel = review?.hotel as any;
  const photos = (review?.photos as any[]) || [];
  const heroPhoto = photos[0]?.url || hotel?.cover_image_url || null;
  const location = hotel ? [hotel.city, hotel.country].filter(Boolean).join(', ') : null;
  const stars = starsFor(review?.rating_overall ?? null);
  const deepLink = `valore://review/${id}`;

  // Fetch reviewer profile separately (FK workaround)
  let reviewer: any = null;
  if (review?.user_id) {
    const { data } = await supabase
      .from('profiles')
      .select('username, full_name, avatar_url')
      .eq('id', review.user_id)
      .single();
    reviewer = data;
  }

  const reviewerName = reviewer?.full_name || reviewer?.username || null;
  const initials = reviewerName ? reviewerName.charAt(0).toUpperCase() : 'V';
  const excerpt = review?.notes
    ? `"${review.notes.slice(0, 200)}${review.notes.length > 200 ? '…' : ''}"`
    : null;

  return (
    <div className="dl-page">
      <div className="dl-hero">
        {heroPhoto ? (
          <Image src={heroPhoto} alt={hotel?.name || 'Review photo'} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div className="dl-hero-placeholder">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
          </div>
        )}
        <div className="dl-hero-fade" />
      </div>

      <div className="dl-card">
        <a href="/" className="dl-brand">
          <img src="/icon.png" alt="Valoré" />
          <span className="dl-brand-name">Valoré</span>
        </a>

        <p className="dl-eyebrow">Review</p>
        <h1 className="dl-title">{hotel?.name || 'Hotel Review'}</h1>
        {location && <p className="dl-subtitle">📍 {location}</p>}
        {stars && <p className="dl-stars">{stars}</p>}
        {excerpt && <p className="dl-excerpt">{excerpt}</p>}

        {reviewerName && (
          <div className="dl-meta-row">
            {reviewer?.avatar_url ? (
              <Image src={reviewer.avatar_url} alt={reviewerName} width={36} height={36} className="dl-avatar" style={{ borderRadius: '50%' }} />
            ) : (
              <div className="dl-avatar-placeholder">{initials}</div>
            )}
            <div>
              <p className="dl-meta-name">{reviewerName}</p>
              {reviewer?.username && <p className="dl-meta-handle">@{reviewer.username}</p>}
            </div>
          </div>
        )}

        <div className="dl-divider" />

        <a href={deepLink} className="dl-btn-primary">Open in Valoré</a>
        <a href={APP_STORE_URL} className="dl-btn-secondary">Download Valoré — Free on iOS</a>
        <p className="dl-not-installed">Don't have the app? Download it free on the App Store.</p>
      </div>
    </div>
  );
}
