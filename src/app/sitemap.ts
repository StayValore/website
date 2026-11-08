import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SITE, getReviewedCities } from '@/lib/seo';

// Regenerate at most hourly — the sitemap grows with every public review.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/hotels`, changeFrequency: 'daily', priority: 0.9 },
  ];

  const cities = await getReviewedCities();
  for (const c of cities) {
    entries.push({
      url: `${SITE}/hotels/${c.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Every hotel with at least one public review
  const { data: reviews } = await supabase
    .from('reviews')
    .select('hotel_id')
    .eq('is_public', true);
  const hotelIds = [...new Set((reviews ?? []).map((r) => r.hotel_id))];
  for (const id of hotelIds) {
    entries.push({
      url: `${SITE}/hotel/${id}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // Public user collections (F75). The visibility column ships in a separate
  // migration — if it isn't there yet, skip collections rather than fail.
  const { data: lists, error: listsError } = await supabase
    .from('lists')
    .select('id')
    .eq('visibility', 'public')
    .eq('is_default', false);
  if (!listsError) {
    for (const l of lists ?? []) {
      entries.push({
        url: `${SITE}/collection/${l.id}`,
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
