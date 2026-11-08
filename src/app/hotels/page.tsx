import type { Metadata } from 'next';
import Link from 'next/link';
import { getReviewedCities } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Hotel Reviews by City — Real Stays, Ranked | Valoré',
  description:
    'Browse hotels reviewed and ranked by real travelers on Valoré. Every rating comes from someone who actually stayed — no ads, no sponsored placements.',
  alternates: { canonical: 'https://stayvalore.com/hotels' },
};

export default async function HotelsIndexPage() {
  const cities = await getReviewedCities();
  const totalReviews = cities.reduce((s, c) => s + c.reviewCount, 0);
  const totalHotels = cities.reduce((s, c) => s + c.hotelCount, 0);

  return (
    <div className="seo-page">
      <h1 className="seo-h1">Hotels reviewed by real travelers</h1>
      <p className="seo-lede">
        {totalReviews} honest reviews of {totalHotels} hotels across {cities.length} cities —
        written by Valoré members after actual stays. No sponsored placements, ever.
      </p>

      <ul className="seo-city-grid">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link href={`/hotels/${c.slug}`} className="seo-city-card">
              <span className="seo-city-name">{c.city}</span>
              {c.country && <span className="seo-city-country">{c.country}</span>}
              <span className="seo-city-count">
                {c.hotelCount} {c.hotelCount === 1 ? 'hotel' : 'hotels'} · {c.reviewCount}{' '}
                {c.reviewCount === 1 ? 'review' : 'reviews'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
