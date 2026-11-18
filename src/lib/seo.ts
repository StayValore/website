import { cache } from 'react';
import { unstable_cache } from 'next/cache';
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

// PostgREST caps ANY single response at 1,000 rows (even with no .limit()),
// and a .in() with hundreds of ids blows past URL limits — the same bug class
// that silently hid new hotels from the app map (B86). Page and chunk instead.
export async function fetchAllRows<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>
): Promise<T[]> {
  const PAGE = 1000;
  const all: T[] = [];
  for (let from = 0; from < PAGE * 20; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw error;
    all.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return all;
}

export async function chunkedIn<T>(
  ids: string[],
  run: (chunk: string[]) => PromiseLike<{ data: T[] | null; error: unknown }>,
  chunkSize = 150
): Promise<T[]> {
  const all: T[] = [];
  for (let i = 0; i < ids.length; i += chunkSize) {
    const { data, error } = await run(ids.slice(i, i + chunkSize));
    if (error) throw error;
    all.push(...(data ?? []));
  }
  return all;
}

/** Unique hotel_id of every public review — the sitemap/static-params source. */
export async function publicReviewHotelIds(): Promise<string[]> {
  const rows = await fetchAllRows<{ hotel_id: string }>((from, to) =>
    supabase.from('reviews').select('hotel_id').eq('is_public', true).order('id').range(from, to)
  );
  return [...new Set(rows.map((r) => r.hotel_id))];
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
export const getReviewedCities = unstable_cache(
  _getReviewedCities,
  ['reviewed-cities'],
  { revalidate: 3600 }
);

async function _getReviewedCities(): Promise<CityEntry[]> {
  const reviews = await fetchAllRows<{ hotel_id: string }>((from, to) =>
    supabase.from('reviews').select('hotel_id').eq('is_public', true).order('id').range(from, to)
  );
  const reviewedIds = [...new Set(reviews.map((r) => r.hotel_id))];
  if (reviewedIds.length === 0) return [];

  const reviewCountByHotel = new Map<string, number>();
  for (const r of reviews) {
    reviewCountByHotel.set(r.hotel_id, (reviewCountByHotel.get(r.hotel_id) ?? 0) + 1);
  }

  const hotels = await chunkedIn<{ id: string; city: string | null; country: string | null }>(
    reviewedIds,
    (chunk) => supabase.from('hotels').select('id, city, country').in('id', chunk)
  );

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
  /** Excerpts from the hotel's best public reviews (B79-filtered), best first. */
  quotes?: string[];
}

/** Trim review text to a quotable excerpt, cutting at a word boundary. */
export function excerpt(text: string, max = 280): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), Math.floor(max / 2)))}…`;
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
export const getCityHotels = unstable_cache(
  _getCityHotels,
  ['city-hotels'],
  { revalidate: 3600 }
);

async function _getCityHotels(slug: string): Promise<{ city: CityEntry; hotels: RankedHotel[] } | null> {
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
  const quotesByHotel = new Map<string, string[]>();
  for (const r of quoteRows ?? []) {
    if (privateAuthors.has(r.user_id)) continue;
    const text = (r.body || r.notes || '').trim();
    if (text.length < 20) continue;
    const list = quotesByHotel.get(r.hotel_id) ?? [];
    if (list.length >= 2) continue;
    list.push(excerpt(text));
    quotesByHotel.set(r.hotel_id, list);
  }
  for (const h of ranked) h.quotes = quotesByHotel.get(h.id);

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

/** Guest-photo teaser data for a hotel: up to `limit` photo ids + the total
 *  count, from public, non-hidden reviews by non-private authors (B79). */
export async function getHotelTeaserPhotos(
  hotelId: string,
  limit = 4
): Promise<{ ids: string[]; total: number }> {
  const { data: rows } = await supabase
    .from('review_photos')
    .select('id, reviews!inner(hotel_id, user_id, is_public, is_hidden)')
    .eq('reviews.hotel_id', hotelId)
    .eq('reviews.is_public', true)
    .eq('reviews.is_hidden', false)
    .order('created_at', { ascending: false })
    .limit(40);
  const all = (rows ?? []) as unknown as Array<{ id: string; reviews: { user_id: string } }>;
  if (all.length === 0) return { ids: [], total: 0 };
  const privateAuthors = await getPrivateUserIds([...new Set(all.map((r) => r.reviews.user_id))]);
  const visible = all.filter((r) => !privateAuthors.has(r.reviews.user_id));
  return { ids: visible.slice(0, limit).map((r) => r.id), total: visible.length };
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
export const getHotelReviews = cache(_getHotelReviews);

async function _getHotelReviews(hotelId: string): Promise<PublicReview[]> {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('user_id, rating_overall, title, notes, body, trip_type, stay_date, created_at')
    .eq('hotel_id', hotelId)
    .eq('is_public', true)
    .eq('is_hidden', false) // moderated reviews must leave the web too, not just the app
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
