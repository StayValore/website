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
    .sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount);

  return { city, hotels: ranked };
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
    .select('id, full_name, username')
    .in('id', userIds);
  const names = new Map((profiles ?? []).map((p) => [
    p.id,
    (p.full_name || p.username || '').split(' ')[0] || null, // first name only on the public web
  ]));

  return reviews.map((r) => ({
    rating_overall: r.rating_overall,
    title: r.title,
    text: r.notes || r.body || null,
    trip_type: r.trip_type,
    stay_date: r.stay_date,
    created_at: r.created_at,
    authorName: names.get(r.user_id) ?? null,
  }));
}
