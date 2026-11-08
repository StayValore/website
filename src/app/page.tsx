import Image from 'next/image';
import Link from 'next/link';
import { appStoreUrl } from '@/lib/appStoreLink';
import { getHomeData } from '@/lib/home';

// The homepage is built from live Valoré data — real hotels, real reviews,
// real cities — and refreshes hourly. The site *is* the product.
export const revalidate = 3600;

const STEPS = [
  {
    title: 'Log your stays',
    body: 'Rate the room, the service, the aesthetic — the things a single OTA score flattens. Add photos and your honest take.',
  },
  {
    title: 'Follow people whose taste you trust',
    body: 'Your feed is stays from friends and travelers you choose, not ads or sponsored placements.',
  },
  {
    title: 'Never book blind again',
    body: 'Next trip, open the map: every pin is a hotel someone you trust has actually slept in.',
  },
] as const;

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <>
      <section className="ed-hero">
        <div className="ed-hero-inner">
          <div className="ed-hero-copy">
            <h1 className="ed-display">
              Where taste
              <br />
              meets trust.
            </h1>
            <p className="ed-hero-sub">
              Valoré is a members&rsquo; log of hotel stays — reviewed, ranked, and shared by
              people whose taste you actually trust. No ads. No sponsored five stars.
            </p>
            <div className="ed-hero-actions">
              <a className="ed-btn" href={appStoreUrl('web_home')} target="_blank" rel="noopener noreferrer">
                Get Valoré — free on iOS
              </a>
              <Link className="ed-link" href="/hotels">
                Browse the reviews
              </Link>
            </div>
            <p className="ed-live-line">
              {data.reviewCount} honest reviews of {data.hotelCount} hotels in{' '}
              {data.cityCount} cities, written after real stays.
            </p>
          </div>

          <div className="ed-mosaic" aria-label="Recently rated hotels on Valoré">
            {data.heroHotels.map((h, i) => (
              <Link key={h.id} href={`/hotel/${h.id}`} className={`ed-mosaic-item ed-mosaic-${i}`}>
                <Image
                  src={h.cover_image_url}
                  alt={h.name}
                  fill
                  sizes="(max-width: 760px) 50vw, 30vw"
                  style={{ objectFit: 'cover' }}
                  priority={i === 0}
                />
                <span className="ed-mosaic-chip">
                  <span className="ed-star">★ {h.avgRating.toFixed(1)}</span>
                  <span className="ed-mosaic-name">{h.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {data.recentReviews.length > 0 && (
        <section className="ed-section">
          <h2 className="ed-section-title">Recently on Valoré</h2>
          <div className="ed-review-row">
            {data.recentReviews.map((r) => (
              <Link key={r.hotelId} href={`/hotel/${r.hotelId}`} className="ed-review-card">
                {r.imageUrl && (
                  <span className="ed-review-photo">
                    <Image
                      src={r.imageUrl}
                      alt={r.hotelName}
                      fill
                      sizes="(max-width: 760px) 90vw, 30vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                )}
                <span className="ed-review-body">
                  <span className="ed-review-hotel">
                    {r.hotelName}
                    {r.city ? <span className="ed-review-city">{r.city}</span> : null}
                  </span>
                  <span className="ed-star">★ {r.rating.toFixed(1)}</span>
                  <span className="ed-review-excerpt">&ldquo;{r.excerpt}&rdquo;</span>
                  {r.authorName && <span className="ed-review-author">— {r.authorName}, Valoré member</span>}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="ed-section ed-how">
        <div className="ed-how-copy">
          <h2 className="ed-section-title">How it works</h2>
          <ol className="ed-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="ed-step">
                <span className="ed-step-n">{i + 1}</span>
                <span>
                  <h3 className="ed-step-title">{s.title}</h3>
                  <p className="ed-step-body">{s.body}</p>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="ed-how-shot">
          <Image
            src="/screenshots/01_Home_Feed.PNG"
            alt="The Valoré home feed: stays from people you follow"
            width={280}
            height={606}
            className="ed-shot-img"
          />
        </div>
      </section>

      <section className="ed-section">
        <h2 className="ed-section-title">The atlas so far</h2>
        <p className="ed-atlas-sub">
          Every city below has hotels ranked by members who stayed in them.
        </p>
        <div className="ed-city-links">
          {data.topCities.map((c) => (
            <Link key={c.slug} href={`/hotels/${c.slug}`} className="ed-city-link">
              {c.city}
              <span className="ed-city-n">{c.reviewCount}</span>
            </Link>
          ))}
          <Link href="/hotels" className="ed-city-link ed-city-link-all">
            All {data.cityCount} cities
          </Link>
        </div>
      </section>

      <section className="ed-close">
        <div className="ed-close-inner">
          <p className="ed-close-line">Your next great stay is already in someone&rsquo;s log.</p>
          <a className="ed-btn ed-btn-light" href={appStoreUrl('web_home')} target="_blank" rel="noopener noreferrer">
            Get Valoré — free on iOS
          </a>
        </div>
      </section>
    </>
  );
}
