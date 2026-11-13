import { NextRequest, NextResponse } from 'next/server';
import { appStoreUrl, type AppStoreCampaign } from '@/lib/appStoreLink';

// stayvalore.com/download → App Store, campaign-tagged for ASC analytics.
// Default campaign is the Instagram bio (its main user). Other placements can
// pass ?c=<campaign>, e.g. /download?c=invite — unknown values fall back to
// social_bio so a typo can never break the redirect.
const VALID: AppStoreCampaign[] = [
  'web_home',
  'share_review',
  'share_hotel',
  'share_profile',
  'share_collection',
  'invite',
  'app_prompt',
  'bio_instagram',
];

export function GET(req: NextRequest) {
  const c = req.nextUrl.searchParams.get('c') as AppStoreCampaign | null;
  const campaign: AppStoreCampaign = c && VALID.includes(c) ? c : 'bio_instagram';
  return NextResponse.redirect(appStoreUrl(campaign), 307);
}
