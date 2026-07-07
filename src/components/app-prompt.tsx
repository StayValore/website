'use client';

import { useEffect, useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';
const DEEP_LINK_SECTIONS = ['hotel', 'review', 'user', 'collection'];

function getDeepLink(pathname: string): string | null {
  const [, section, id] = pathname.split('/');
  if (section && id && DEEP_LINK_SECTIONS.includes(section)) {
    return `valore://${section}/${id}`;
  }
  return null;
}

// In-app browsers (Instagram, Facebook, etc.) never trigger Universal Links
// or the Smart App Banner, so this component is the conversion path for them:
// auto-attempt the valore:// open, and if the page is still visible a moment
// later, slide up an explicit prompt sheet.
export function AppPrompt() {
  const [deepLink, setDeepLink] = useState<string | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  useEffect(() => {
    const link = getDeepLink(window.location.pathname);
    if (!link) return;
    setDeepLink(link);

    const inAppBrowser = /Instagram|FBAN|FBAV|FB_IAB|Snapchat|TikTok|Line\//i.test(
      navigator.userAgent
    );
    if (!inAppBrowser) return; // Safari gets the Smart App Banner instead

    // Installed app → iOS shows "Open in Valoré?"; no app → silently ignored.
    const attempt = setTimeout(() => {
      window.location.href = link;
    }, 150);
    // Still visible = the attempt didn't take them away; offer the manual path.
    const sheet = setTimeout(() => {
      if (!document.hidden) setSheetVisible(true);
    }, 1200);
    return () => {
      clearTimeout(attempt);
      clearTimeout(sheet);
    };
  }, []);

  if (!sheetVisible || !deepLink) return null;

  return (
    <div className="dl-sheet-backdrop" onClick={() => setSheetVisible(false)}>
      <div className="dl-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="dl-sheet-handle" />
        <img src="/icon.png" alt="Valoré" className="dl-sheet-icon" />
        <p className="dl-sheet-title">Valoré is better in the app</p>
        <p className="dl-sheet-subtitle">
          See the full review, photos, and trusted recommendations.
        </p>
        <a href={deepLink} className="dl-btn-primary">Open in Valoré</a>
        <a href={APP_STORE_URL} className="dl-btn-secondary">Get the app — free</a>
        <button className="dl-sheet-dismiss" onClick={() => setSheetVisible(false)}>
          Not now
        </button>
      </div>
    </div>
  );
}
