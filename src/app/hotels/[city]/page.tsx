import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SITE, getCityHotels, getReviewedCities } from '@/lib/seo';
import { appStoreUrl } from '@/lib/appStoreLink';

export const revalidate = 3600;

interface Props { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  const cities = await getReviewedCities();
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const data = await getCityHotels(slug);
  if (!data) return { title: 'Valoré' };
  const { city, hotels } = data;
  const title = `Best Hotels in ${city.city} — Ranked by Real Travelers | Valoré`;
  const description = `${hotels.length} hotels in ${city.city}${city.country ? `, ${city.country}` : ''} rated by Valoré members who actually stayed. Honest reviews, no sponsored rankings.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE}/hotels/${slug}` },
    openGraph: { title, description, url: `${SITE}/hotels/${slug}`, type: 'website' },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const data = await getCityHotels(slug);
  if (!data) notFound();
  const { city, hotels } = data;
  const otherCities = (await getReviewedCities())
    .filter((c) => c.slug !== slug)
    .slice(0, 12);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best hotels in ${city.city}, ranked by Valoré travelers`,
    numberOfItems: hotels.length,
    itemListElement: hotels.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/hotel/${h.id}`,
      name: h.name,
    })),
  };

  return (
    <div className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="seo-breadcrumb">
        <Link href="/hotels">Hotels</Link> <span>/</span> <span>{city.city}</span>
      </nav>
      <h1 className="seo-h1">Best hotels in {city.city}</h1>
      <p className="seo-lede">
        Ranked by {city.reviewCount} {city.reviewCount === 1 ? 'review' : 'reviews'} from Valoré
        members who actually stayed{city.country ? ` in ${city.city}, ${city.country}` : ''}.
        Community-rated — never sponsored.
      </p>
      {hotels.length > 0 && (
        <p className="seo-city-intro">
          {hotels.length === 1 ? (
            <>
              So far, one {city.city} stay has made it into members&rsquo; logs:{' '}
              <strong>{hotels[0].name}</strong>, rated ★{hotels[0].avgRating.toFixed(1)} after a
              real night there. As more members pass through {city.city}, this ranking fills in —
              every addition written by a guest, never a brand.
            </>
          ) : (
            <>
              Members have logged {city.reviewCount} {city.reviewCount === 1 ? 'stay' : 'stays'}{' '}
              across {hotels.length} hotels in {city.city}.{' '}
              <strong>{hotels[0].name}</strong> currently tops the ranking at ★
              {hotels[0].avgRating.toFixed(1)}
              {hotels.filter((h) => h.avgRating >= 4.5).length > 1
                ? `, one of ${hotels.filter((h) => h.avgRating >= 4.5).length} hotels here rated 4.5 or higher`
                : ''}
              . The order below is pure guest math — ratings from people who slept there, weighted
              so a single perfect score doesn&rsquo;t outrank a hotel proven across many stays.
            </>
          )}
        </p>
      )}

      <ol className="seo-hotel-list">
        {hotels.map((h, i) => (
          <li key={h.id}>
            <Link href={`/hotel/${h.id}`} className="seo-hotel-row">
              <span className="seo-hotel-rank">{i + 1}</span>
              {h.cover_image_url ? (
                <Image
                  src={h.cover_image_url}
                  alt={h.name}
                  width={96}
                  height={96}
                  className="seo-hotel-thumb"
                />
              ) : (
                <span className="seo-hotel-thumb seo-hotel-thumb-empty" aria-hidden />
              )}
              <span className="seo-hotel-info">
                <span className="seo-hotel-name">{h.name}</span>
                <span className="seo-hotel-meta">
                  ★ {h.avgRating.toFixed(1)} · {h.reviewCount}{' '}
                  {h.reviewCount === 1 ? 'review' : 'reviews'}
                </span>
                {h.quotes?.map((q) => (
                  <span key={q.slice(0, 40)} className="seo-hotel-quote">&ldquo;{q}&rdquo;</span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {otherCities.length > 0 && (
        <nav className="seo-more-cities" aria-label="More cities">
          <h2>More cities on Valoré</h2>
          <ul>
            {otherCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/hotels/${c.slug}`}>Best hotels in {c.city}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="seo-cta">
        <p>Every rating on Valoré comes from a traveler who actually stayed.</p>
        <a href={appStoreUrl('web_home')} className="btn-primary">Get Valoré — Free on iOS</a>
      </div>
    </div>
  );
}
