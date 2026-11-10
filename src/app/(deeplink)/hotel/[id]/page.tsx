import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { SITE, citySlug, getHotelReviews } from '@/lib/seo';
import { appStoreUrl } from '@/lib/appStoreLink';

const APP_STORE_URL = appStoreUrl('share_hotel');
const DEFAULT_OG = 'https://stayvalore.com/logo.png';

// Serves both jobs: the share-link landing page (app CTA) and the indexable
// "[hotel] reviews" page (real review content + structured data).
export const revalidate = 3600;

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: hotel } = await supabase
    .from('hotels')
    .select('name, city, country, cover_image_url, description')
    .eq('id', id)
    .single();

  if (!hotel) return { title: 'Valoré' };

  const reviews = await getHotelReviews(id);
  const location = [hotel.city, hotel.country].filter(Boolean).join(', ');
  const title = reviews.length > 0
    ? `${hotel.name} Reviews — Rated by Real Guests | Valoré`
    : `${hotel.name} — Valoré`;
  const description = reviews.length > 0
    ? `${reviews.length} honest ${reviews.length === 1 ? 'review' : 'reviews'} of ${hotel.name}${location ? ` in ${location}` : ''} from Valoré members who stayed. Community-rated, never sponsored.`
    : hotel.description || `Discover ${hotel.name}${location ? ` in ${location}` : ''} on Valoré.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/hotel/${id}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/hotel/${id}`,
      type: 'website',
      images: [{ url: hotel.cover_image_url || DEFAULT_OG, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
    other: { 'apple-itunes-app': `app-id=6760678152, app-argument=valore://hotel/${id}` },
  };
}

const TRIP_LABELS: Record<string, string> = {
  work: 'Business trip', solo: 'Solo trip', couples: 'Couples trip',
  family: 'Family trip', friends: 'Trip with friends', honeymoon: 'Honeymoon',
  girls_trip: 'Group trip',
};

export default async function HotelPage({ params }: Props) {
  const { id } = await params;
  const { data: hotel } = await supabase
    .from('hotels')
    .select('name, city, country, cover_image_url, description, price_tier, google_places_rating')
    .eq('id', id)
    .single();

  const reviews = hotel ? await getHotelReviews(id) : [];
  const avg = reviews.length > 0
    ? Math.round((reviews.reduce((s, r) => s + r.rating_overall, 0) / reviews.length) * 10) / 10
    : null;

  const location = hotel ? [hotel.city, hotel.country].filter(Boolean).join(', ') : null;
  const deepLink = `valore://hotel/${id}`;

  const jsonLd = hotel && avg !== null ? {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    ...(hotel.cover_image_url ? { image: hotel.cover_image_url } : {}),
    ...(hotel.city ? {
      address: { '@type': 'PostalAddress', addressLocality: hotel.city, ...(hotel.country ? { addressCountry: hotel.country } : {}) },
    } : {}),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg,
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.filter((r) => r.text).slice(0, 5).map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.rating_overall, bestRating: 5 },
      ...(r.authorName ? { author: { '@type': 'Person', name: r.authorName } } : {}),
      reviewBody: r.text,
      datePublished: r.created_at?.slice(0, 10),
    })),
  } : null;

  return (
    <div className="dl-page">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <div className="dl-hero">
        {hotel?.cover_image_url ? (
          <Image src={hotel.cover_image_url} alt={hotel.name || 'Hotel'} fill sizes="(min-width: 768px) 760px, 100vw" style={{ objectFit: 'cover' }} />
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

        <p className="dl-eyebrow">Hotel</p>
        <h1 className="dl-title">{hotel?.name || 'Hotel'}</h1>
        {location && <p className="dl-subtitle">📍 {location}</p>}
        {avg !== null && (
          <p className="dl-subtitle seo-avg-rating">
            ★ {avg.toFixed(1)} · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} on Valoré
          </p>
        )}
        {hotel?.price_tier && <p className="dl-subtitle">{hotel.price_tier}</p>}
        {hotel?.description && <p className="dl-excerpt">"{hotel.description}"</p>}

        <div className="dl-divider" />

        <a href={deepLink} className="dl-btn-primary">Open in Valoré</a>
        <a href={APP_STORE_URL} className="dl-btn-secondary">Download Valoré — Free on iOS</a>
        <p className="dl-not-installed">Don't have the app? Download it free on the App Store.</p>

        {reviews.length > 0 && (
          <section className="seo-reviews">
            <h2 className="seo-reviews-title">What guests said</h2>
            {reviews.filter((r) => r.text || r.title).slice(0, 10).map((r, i) => (
              <article key={i} className="seo-review">
                <p className="seo-review-head">
                  <span className="seo-review-rating">★ {r.rating_overall.toFixed(1)}</span>
                  {r.authorName && <span className="seo-review-author">{r.authorName}</span>}
                  {r.trip_type && TRIP_LABELS[r.trip_type] && (
                    <span className="seo-review-trip">{TRIP_LABELS[r.trip_type]}</span>
                  )}
                </p>
                {r.title && <p className="seo-review-titleline">{r.title}</p>}
                {r.text && <p className="seo-review-text">{r.text}</p>}
              </article>
            ))}
          </section>
        )}

        {hotel?.city && (
          <p className="seo-backlink">
            <Link href={`/hotels/${citySlug(hotel.city)}`}>
              See all ranked hotels in {hotel.city} →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
