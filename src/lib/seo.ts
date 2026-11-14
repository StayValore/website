import { supabase } from '@/lib/supabase';

export const SITE = 'https://stayvalore.com';

/** URL-safe slug for a city name ("New York" → "new-york", "São Paulo" → "sao-paulo"). */
export function citySlug(city: string): string {
  return city
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface CityEntry {
  city: string;
  country: string | null;
  slug: string;
  hotelCount: number;
  reviewCount: number;
}

/**
 * Cities that have at least one publicly reviewed hotel, with counts.
 * This drives the /hotels index, the city pages, and the sitemap.
 */
export async function getReviewedCities(): Promise<CityEntry[]> {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('hotel_id')
    .eq('is_public', true);
  const reviewedIds = [...new Set((reviews ?? []).map((r) => r.hotel_id))];
  if (reviewedIds.length === 0) return [];

  const reviewCountByHotel = new Map<string, number>();
  for (const r of reviews ?? []) {
    reviewCountByHotel.set(r.hotel_id, (reviewCountByHotel.get(r.hotel_id) ?? 0) + 1);
  }

  const { data: hotels } = await supabase
    .from('hotels')
    .select('id, city, country')
    .in('id', reviewedIds);

  const byCity = new Map<string, CityEntry>();
  for (const h of hotels ?? []) {
    if (!h.city) continue;
    const slug = citySlug(h.city);
    if (!slug) continue;
    const entry = byCity.get(slug) ?? {
      city: h.city, country: h.country, slug, hotelCount: 0, reviewCount: 0,
    };
    entry.hotelCount += 1;
    entry.reviewCount += reviewCountByHotel.get(h.id) ?? 0;
    byCity.set(slug, entry);
  }
  return [...byCity.values()].sort((a, b) => b.reviewCount - a.reviewCount);
}

export interface RankedHotel {
  id: string;
  name: string;
  city: string | null;
  country: string | null;
  cover_image_url: string | null;
  avgRating: number; // 1 decimal
  reviewCount: number;
  /** Short excerpt from the hotel's best public review (B79-filtered). */
  quote?: string;
}

/** Trim review text to a quotable excerpt, cutting at a word boundary. */
function excerpt(text: string, max = 150): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 100))}…`;
}

/**
 * Ranking score that doesn't let one 5.0 review outrank 4.7-across-three:
 * each hotel's average is pulled toward a 4.2 prior until it has ~3 reviews
 * (standard Bayesian smoothing). Display still shows the true average.
 */
function bayes(h: { avgRating: number; reviewCount: number }): number {
  const m = 3;
  const prior = 4.2;
  return (h.avgRating * h.reviewCount + prior * m) / (h.reviewCount + m);
}

/** Publicly reviewed hotels in a city (by slug), ranked by Valoré rating. */
export async function getCityHotels(slug: string): Promise<{ city: CityEntry; hotels: RankedHotel[] } | null> {
  const cities = await getReviewedCities();
  const city = cities.find((c) => c.slug === slug);
  if (!city) return null;

  const { data: hotels } = await supabase
    .from('hotels')
    .select('id, name, city, country, cover_image_url')
    .eq('city', city.city);
  if (!hotels?.length) return null;

  const { data: reviews } = await supabase
    .from('reviews')
    .select('hotel_id, rating_overall')
    .eq('is_public', true)
    .in('hotel_id', hotels.map((h) => h.id));

  const agg = new Map<string, { sum: number; n: number }>();
  for (const r of reviews ?? []) {
    const a = agg.get(r.hotel_id) ?? { sum: 0, n: 0 };
    a.sum += r.rating_overall; a.n += 1;
    agg.set(r.hotel_id, a);
  }

  const ranked: RankedHotel[] = hotels
    .filter((h) => agg.has(h.id))
    .map((h) => {
      const a = agg.get(h.id)!;
      return {
        ...h,
        avgRating: Math.round((a.sum / a.n) * 10) / 10,
        reviewCount: a.n,
      };
    })
    .sort((a, b) => bayes(b) - bayes(a) || b.reviewCount - a.reviewCount);

  // One quotable excerpt per hotel, from its highest-rated public review.
  // The service-role key bypasses RLS, so private authors are excluded
  // explicitly (B79) and hidden reviews are skipped.
  const { data: quoteRows } = await supabase
    .from('reviews')
    .select('hotel_id, user_id, rating_overall, body, notes')
    .eq('is_public', true)
    .eq('is_hidden', false)
    .in('hotel_id', ranked.map((h) => h.id))
    .order('rating_overall', { ascending: false });
  const privateAuthors = await getPrivateUserIds(
    [...new Set((quoteRows ?? []).map((r) => r.user_id))],
  );
  const quoteByHotel = new Map<string, string>();
  for (const r of quoteRows ?? []) {
    if (quoteByHotel.has(r.hotel_id) || privateAuthors.has(r.user_id)) continue;
    const text = (r.body || r.notes || '').trim();
    if (text.length >= 20) quoteByHotel.set(r.hotel_id, excerpt(text));
  }
  for (const h of ranked) h.quote = quoteByHotel.get(h.id);

  return { city, hotels: ranked };
}

/**
 * Ids of private accounts among userIds (B79). The website queries with the
 * service-role key, which bypasses RLS — so every surface that renders review
 * content or author names must exclude private accounts explicitly.
 */
export async function getPrivateUserIds(userIds: string[]): Promise<Set<string>> {
  if (userIds.length === 0) return new Set();
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .in('id', userIds)
    .eq('is_private', true);
  return new Set((data ?? []).map((p) => p.id));
}

export interface PublicReview {
  rating_overall: number;
  title: string | null;
  text: string | null;
  trip_type: string | null;
  stay_date: string | null;
  created_at: string;
  authorName: string | null;
}

/** Public reviews for one hotel, newest first, with author display names. */
export async function getHotelReviews(hotelId: string): Promise<PublicReview[]> {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('user_id, rating_overall, title, notes, body, trip_type, stay_date, created_at')
    .eq('hotel_id', hotelId)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(25);
  if (!reviews?.length) return [];

  // FK-join workaround (schema cache): fetch profiles separately, join in code
  const userIds = [...new Set(reviews.map((r) => r.user_id))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, username, is_private')
    .in('id', userIds);
  // Service-role key bypasses RLS — private accounts never render on the web (B79)
  const privateIds = new Set((profiles ?? []).filter((p) => p.is_private).map((p) => p.id));
  const names = new Map((profiles ?? []).map((p) => [
    p.id,
    (p.full_name || p.username || '').split(' ')[0] || null, // first name only on the public web
  ]));

  return reviews.filter((r) => !privateIds.has(r.user_id)).map((r) => ({
    rating_overall: r.rating_overall,
    title: r.title,
    text: r.notes || r.body || null,
    trip_type: r.trip_type,
    stay_date: r.stay_date,
    created_at: r.created_at,
    authorName: names.get(r.user_id) ?? null,
  }));
}
