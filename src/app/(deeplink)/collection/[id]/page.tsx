import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const APP_STORE_URL = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';
const DEFAULT_OG = 'https://stayvalore.com/logo.png';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: list } = await supabase
    .from('lists')
    .select('name, description, user_id')
    .eq('id', id)
    .single();

  if (!list) return { title: 'Valoré' };

  const title = `${list.name} — Valoré Collection`;
  const description = list.description || `A curated hotel collection on Valoré.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stayvalore.com/collection/${id}`,
      type: 'website',
      images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
    other: { 'apple-itunes-app': `app-id=6760678152, app-argument=valore://collection/${id}` },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { id } = await params;

  const { data: list } = await supabase
    .from('lists')
    .select('name, description, user_id')
    .eq('id', id)
    .single();

  // Fetch hotels in this list with covers
  const { data: items } = await supabase
    .from('list_items')
    .select('hotel:hotels(id, name, city, country, cover_image_url)')
    .eq('list_id', id)
    .limit(4);

  const hotels = (items || []).map((i: any) => i.hotel).filter(Boolean);
  const coverPhotos = hotels.map((h: any) => h.cover_image_url).filter(Boolean).slice(0, 4);

  // Fetch creator profile
  let creator: any = null;
  if (list?.user_id) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, username, avatar_url')
      .eq('id', list.user_id)
      .single();
    creator = data;
  }

  const creatorName = creator?.full_name || creator?.username || null;
  const deepLink = `valore://collection/${id}`;

  return (
    <div className="dl-page">
      {coverPhotos.length > 0 ? (
        <div className="dl-hero">
          <Image src={coverPhotos[0]} alt={list?.name || 'Collection'} fill style={{ objectFit: 'cover' }} />
          <div className="dl-hero-fade" />
        </div>
      ) : (
        <div className="dl-hero">
          <div className="dl-hero-placeholder" />
          <div className="dl-hero-fade" />
        </div>
      )}

      <div className="dl-card">
        <a href="/" className="dl-brand">
          <img src="/icon.png" alt="Valoré" />
          <span className="dl-brand-name">Valoré</span>
        </a>

        <p className="dl-eyebrow">Collection</p>
        <h1 className="dl-title">{list?.name || 'Hotel Collection'}</h1>
        {list?.description && <p className="dl-excerpt">"{list.description}"</p>}

        {hotels.length > 0 && (
          <p className="dl-hotel-count">{hotels.length} hotel{hotels.length !== 1 ? 's' : ''}</p>
        )}

        {coverPhotos.length > 1 && (
          <div className="dl-hotel-grid">
            {coverPhotos.slice(0, 4).map((url: string, i: number) => (
              <img key={i} src={url} alt="" className="dl-hotel-thumb" />
            ))}
          </div>
        )}

        {creatorName && (
          <div className="dl-meta-row">
            {creator?.avatar_url ? (
              <Image src={creator.avatar_url} alt={creatorName} width={36} height={36} className="dl-avatar" style={{ borderRadius: '50%' }} />
            ) : (
              <div className="dl-avatar-placeholder">{creatorName.charAt(0).toUpperCase()}</div>
            )}
            <div>
              <p className="dl-meta-name">by {creatorName}</p>
              {creator?.username && <p className="dl-meta-handle">@{creator.username}</p>}
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
