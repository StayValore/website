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
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="seo-cta">
        <p>Every rating on Valoré comes from a traveler who actually stayed.</p>
        <a href={appStoreUrl('web_home')} className="btn-primary">Get Valoré — Free on iOS</a>
      </div>
    </div>
  );
}
