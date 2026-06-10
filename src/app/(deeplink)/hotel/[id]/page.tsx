import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const APP_STORE_URL = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';
const DEFAULT_OG = 'https://stayvalore.com/logo.png';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: hotel } = await supabase
    .from('hotels')
    .select('name, city, country, cover_image_url, description')
    .eq('id', id)
    .single();

  if (!hotel) return { title: 'Valoré' };

  const location = [hotel.city, hotel.country].filter(Boolean).join(', ');
  const title = `${hotel.name} — Valoré`;
  const description = hotel.description
    || `Discover ${hotel.name}${location ? ` in ${location}` : ''} on Valoré.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stayvalore.com/hotel/${id}`,
      type: 'website',
      images: [{ url: hotel.cover_image_url || DEFAULT_OG, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
    other: { 'apple-itunes-app': `app-id=6760678152, app-argument=valore://hotel/${id}` },
  };
}

export default async function HotelPage({ params }: Props) {
  const { id } = await params;
  const { data: hotel } = await supabase
    .from('hotels')
    .select('name, city, country, cover_image_url, description, price_tier, google_places_rating')
    .eq('id', id)
    .single();

  const location = hotel ? [hotel.city, hotel.country].filter(Boolean).join(', ') : null;
  const deepLink = `valore://hotel/${id}`;

  return (
    <div className="dl-page">
      <div className="dl-hero">
        {hotel?.cover_image_url ? (
          <Image src={hotel.cover_image_url} alt={hotel.name || 'Hotel'} fill style={{ objectFit: 'cover' }} />
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
        <div className="dl-brand">
          <img src="/icon.png" alt="Valoré" />
          <span className="dl-brand-name">Valoré</span>
        </div>

        <p className="dl-eyebrow">Hotel</p>
        <h1 className="dl-title">{hotel?.name || 'Hotel'}</h1>
        {location && <p className="dl-subtitle">📍 {location}</p>}
        {hotel?.price_tier && <p className="dl-subtitle">{hotel.price_tier}</p>}
        {hotel?.description && <p className="dl-excerpt">"{hotel.description}"</p>}

        <div className="dl-divider" />

        <a href={deepLink} className="dl-btn-primary">Open in Valoré</a>
        <a href={APP_STORE_URL} className="dl-btn-secondary">Download Valoré — Free on iOS</a>
        <p className="dl-not-installed">Don't have the app? Download it free on the App Store.</p>
      </div>
    </div>
  );
}
