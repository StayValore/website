import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const APP_STORE_URL = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';
const DEFAULT_OG = 'https://stayvalore.com/logo.png';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, username, bio, avatar_url, is_private')
    .eq('id', id)
    .single();

  if (!profile || profile.is_private) return { title: 'Valoré' };

  const name = profile.full_name || profile.username || 'Valoré User';
  const title = `${name} on Valoré`;
  const description = profile.bio || `See ${name}'s hotel reviews and collections on Valoré.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stayvalore.com/user/${id}`,
      type: 'profile',
      images: [{ url: profile.avatar_url || DEFAULT_OG, width: 400, height: 400 }],
    },
    twitter: { card: 'summary', title, description },
    other: { 'apple-itunes-app': `app-id=6760678152, app-argument=valore://user/${id}` },
  };
}

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, username, bio, avatar_url, is_private')
    .eq('id', id)
    .single();

  // Count their public reviews
  const { count: reviewCount } = await supabase
    .from('reviews')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', id)
    .eq('is_public', true);

  const name = profile?.full_name || profile?.username || 'Valoré User';
  const initials = name.charAt(0).toUpperCase();
  const deepLink = `valore://user/${id}`;

  return (
    <div className="dl-page">
      <div className="dl-hero" style={{ height: '220px', minHeight: '220px' }}>
        <div className="dl-hero-placeholder" />
        <div className="dl-hero-fade" />
      </div>

      <div className="dl-card" style={{ marginTop: '-60px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', marginBottom: '16px' }}>
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={name}
              width={72}
              height={72}
              style={{ borderRadius: '50%', border: '3px solid #0f0f14', flexShrink: 0 }}
            />
          ) : (
            <div className="dl-avatar-placeholder" style={{ width: 72, height: 72, fontSize: 28 }}>
              {initials}
            </div>
          )}
          <div style={{ paddingBottom: '4px' }}>
            <h1 className="dl-title" style={{ fontSize: '20px', marginBottom: '2px' }}>{name}</h1>
            {profile?.username && <p className="dl-subtitle">@{profile.username}</p>}
          </div>
        </div>

        {profile?.bio && <p className="dl-excerpt" style={{ fontStyle: 'normal', marginBottom: '16px' }}>{profile.bio}</p>}

        {(reviewCount ?? 0) > 0 && (
          <div className="dl-stat-row" style={{ marginBottom: '20px' }}>
            <div className="dl-stat">
              <span className="dl-stat-value">{reviewCount}</span>
              <span className="dl-stat-label">Reviews</span>
            </div>
          </div>
        )}

        <div className="dl-divider" />

        <a href="/" className="dl-brand" style={{ marginBottom: '20px' }}>
          <img src="/icon.png" alt="Valoré" />
          <span className="dl-brand-name">View on Valoré</span>
        </a>

        <a href={deepLink} className="dl-btn-primary">Open in Valoré</a>
        <a href={APP_STORE_URL} className="dl-btn-secondary">Download Valoré — Free on iOS</a>
        <p className="dl-not-installed">Don't have the app? Download it free on the App Store.</p>
      </div>
    </div>
  );
}
