import { supabase } from '@/lib/supabase';
import { citySlug, getReviewedCities } from '@/lib/seo';

export interface HeroHotel {
  id: string;
  name: string;
  city: string | null;
  cover_image_url: string;
  avgRating: number;
}

export interface HomeReview {
  hotelId: string;
  hotelName: string;
  city: string | null;
  imageUrl: string | null;
  rating: number;
  excerpt: string;
  authorName: string | null;
}

export interface HomeData {
  reviewCount: number;
  hotelCount: number;
  cityCount: number;
  heroHotels: HeroHotel[];
  recentReviews: HomeReview[];
  topCities: { city: string; slug: string; reviewCount: number }[];
}

/** Everything the editorial homepage renders, from live data (ISR hourly). */
export async function getHomeData(): Promise<HomeData> {
  const cities = await getReviewedCities();
  const reviewCount = cities.reduce((s, c) => s + c.reviewCount, 0);
  const hotelCount = cities.reduce((s, c) => s + c.hotelCount, 0);

  const { data: reviews } = await supabase
    .from('reviews')
    .select('id, hotel_id, user_id, rating_overall, notes, body, created_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(200);
  const all = reviews ?? [];

  // Per-hotel aggregates for the hero mosaic
  const agg = new Map<string, { sum: number; n: number }>();
  for (const r of all) {
    const a = agg.get(r.hotel_id) ?? { sum: 0, n: 0 };
    a.sum += r.rating_overall; a.n += 1;
    agg.set(r.hotel_id, a);
  }

  const hotelIds = [...agg.keys()];
  const { data: hotels } = await supabase
    .from('hotels')
    .select('id, name, city, cover_image_url')
    .in('id', hotelIds.slice(0, 400));
  const hotelById = new Map((hotels ?? []).map((h) => [h.id, h]));

  // Hero: highest-rated hotels that have cover photos, 2+ reviews preferred
  const heroHotels: HeroHotel[] = hotelIds
    .map((id) => {
      const h = hotelById.get(id);
      const a = agg.get(id)!;
      if (!h?.cover_image_url) return null;
      return {
        id: h.id,
        name: h.name,
        city: h.city,
        cover_image_url: h.cover_image_url,
        avgRating: Math.round((a.sum / a.n) * 10) / 10,
        n: a.n,
      };
    })
    .filter((h): h is HeroHotel & { n: number } => h !== null)
    .sort((a, b) => b.n - a.n || b.avgRating - a.avgRating)
    .slice(0, 12)
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 3)
    .map(({ n: _n, ...h }) => h);

  // Recent reviews with substantial text, for the "Recently on Valoré" cards
  const candidates = all
    .map((r) => ({ ...r, text: (r.notes || r.body || '').trim() }))
    .filter((r) => r.text.length >= 60 && hotelById.get(r.hotel_id));
  const seenHotels = new Set<string>();
  const picked: typeof candidates = [];
  for (const r of candidates) {
    if (seenHotels.has(r.hotel_id)) continue;
    seenHotels.add(r.hotel_id);
    picked.push(r);
    if (picked.length === 3) break;
  }

  const userIds = [...new Set(picked.map((r) => r.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase.from('profiles').select('id, full_name, username').in('id', userIds)
    : { data: [] };
  const names = new Map((profiles ?? []).map((p) => [
    p.id,
    (p.full_name || p.username || '').split(' ')[0] || null,
  ]));

  const { data: photos } = picked.length
    ? await supabase.from('review_photos').select('review_id, url').in('review_id', picked.map((r) => r.id))
    : { data: [] };
  const photoByReview = new Map<string, string>();
  for (const p of photos ?? []) {
    if (!photoByReview.has(p.review_id)) photoByReview.set(p.review_id, p.url);
  }

  const recentReviews: HomeReview[] = picked.map((r) => {
    const h = hotelById.get(r.hotel_id)!;
    return {
      hotelId: r.hotel_id,
      hotelName: h.name,
      city: h.city,
      imageUrl: photoByReview.get(r.id) ?? h.cover_image_url ?? null,
      rating: r.rating_overall,
      excerpt: r.text.length > 170 ? `${r.text.slice(0, 167).trimEnd()}…` : r.text,
      authorName: names.get(r.user_id) ?? null,
    };
  });

  return {
    reviewCount,
    hotelCount,
    cityCount: cities.length,
    heroHotels,
    recentReviews,
    topCities: cities.slice(0, 8).map((c) => ({
      city: c.city,
      slug: citySlug(c.city),
      reviewCount: c.reviewCount,
    })),
  };
}
