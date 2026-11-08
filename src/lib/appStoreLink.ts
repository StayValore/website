// Campaign-tagged App Store links, so App Store Connect → Analytics → Sources
// can split installs by which page sent them (share pages vs homepage vs
// invites) instead of lumping everything into "web referrer".
//
// `pt` is Apple's provider token. Get it once from App Store Connect →
// App Analytics → any app → Acquisition → Campaigns → "Generate Campaign Link"
// (the pt= value is the same for every link). Until it's filled in, links fall
// back to the bare store URL — nothing breaks.
const APP_STORE_BASE = 'https://apps.apple.com/us/app/valor%C3%A9/id6760678152';
const PROVIDER_TOKEN = ''; // TODO(ebby): paste the pt= value from App Store Connect

export type AppStoreCampaign =
  | 'web_home'
  | 'share_review'
  | 'share_hotel'
  | 'share_profile'
  | 'share_collection'
  | 'invite'
  | 'app_prompt';

export function appStoreUrl(campaign: AppStoreCampaign): string {
  if (!PROVIDER_TOKEN) return APP_STORE_BASE;
  return `${APP_STORE_BASE}?pt=${PROVIDER_TOKEN}&ct=${encodeURIComponent(campaign)}&mt=8`;
}
