import type { Metadata } from 'next';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import GetAppButton from './GetAppButton';

const DEFAULT_OG = 'https://stayvalore.com/logo.png';

interface Props { params: Promise<{ username: string }> }

// Personal invite link (stayvalore.com/invite/<username>) shared from the app's
// Friends tab. Opening it in the app (Universal Link) or using the copied link
// at signup credits the inviter automatically — see the app's lib/inviteLinks.

async function getInviter(username: string) {
  const clean = decodeURIComponent(username).toLowerCase();
  if (!/^[a-z0-9_]{1,30}$/.test(clean)) return { username: clean, profile: null };
  const { data } = await supabase
    .from('profiles')
    .select('full_name, username, avatar_url, is_private')
    .eq('username', clean)
    .maybeSingle();
  return { username: clean, profile: data };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const { profile } = await getInviter(username);
  // Name only — even private accounts chose to send this invite.
  const name = profile?.full_name || (profile ? `@${profile.username}` : 'A friend');
  const title = `${name} invited you to Valoré`;
  const description = 'Rate the hotels you stay at and see where your friends love to stay.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://stayvalore.com/invite/${username}`,
      images: [{ url: (!profile?.is_private && profile?.avatar_url) || DEFAULT_OG, width: 400, height: 400 }],
    },
    twitter: { card: 'summary', title, description },
    other: { 'apple-itunes-app': `app-id=6760678152, app-argument=valore://invite/${username}` },
  };
}

export default async function InvitePage({ params }: Props) {
  const { username } = await params;
  const { username: clean, profile } = await getInviter(username);
  const name = profile?.full_name || (profile ? `@${profile.username}` : 'A friend');
  const avatar = !profile?.is_private ? profile?.avatar_url : null;
  const inviteUrl = `https://stayvalore.com/invite/${clean}`;

  return (
    <div className="dl-page">
      <div className="dl-card" style={{ paddingTop: '48px', textAlign: 'center' }}>
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={80}
            height={80}
            style={{ borderRadius: '50%', border: '3px solid #0f0f14', margin: '0 auto 16px' }}
          />
        ) : (
          <div className="dl-avatar-placeholder" style={{ width: 80, height: 80, fontSize: 30, margin: '0 auto 16px' }}>
            {name.replace('@', '').charAt(0).toUpperCase()}
          </div>
        )}

        <h1 className="dl-title" style={{ fontSize: '22px', marginBottom: '6px' }}>
          {name} invited you to Valoré
        </h1>
        <p className="dl-subtitle" style={{ marginBottom: '20px' }}>
          Rate the hotels you stay at and see where your friends love to stay.
        </p>

        <div className="dl-divider" />

        <GetAppButton inviteUrl={inviteUrl} />
        <a href={`valore://invite/${clean}`} className="dl-btn-secondary">I already have Valoré</a>
        {profile && (
          <p className="dl-not-installed">
            When you sign up, tap &ldquo;Got an invite link?&rdquo; so @{profile.username} gets the credit.
          </p>
        )}
      </div>
    </div>
  );
}
