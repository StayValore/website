'use client';

const APP_STORE_URL = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';

/**
 * Copies this invite link before heading to the App Store. The App Store
 * can't pass anything to a fresh install, so the app's signup offers to use
 * the copied link — that's how the friend who invited them gets credit.
 */
export default function GetAppButton({ inviteUrl }: { inviteUrl: string }) {
  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(inviteUrl);
    } catch {
      // Clipboard blocked (some in-app browsers) — they can still type the username.
    }
    window.location.href = APP_STORE_URL;
  };

  return (
    <a href={APP_STORE_URL} onClick={handleClick} className="dl-btn-primary">
      Get Valoré — Free on iOS
    </a>
  );
}
