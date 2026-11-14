import Image from 'next/image';
import Link from 'next/link';
import { appStoreUrl } from '@/lib/appStoreLink';
import { getHomeData } from '@/lib/home';

// The homepage is built from live Valoré data — real hotels, real reviews,
// real cities — and refreshes hourly. The site *is* the product.
export const revalidate = 3600;

// How-it-works cards: the three steps each pair with one of the current
// App Store posters; the last two posters ride along captioned.
const HOW_CARDS = [
  {
    src: '/app-shots/review.jpg',
    alt: 'Rating a stay in Valoré — room, service, aesthetic',
    n: 1,
    title: 'Log your stays',
    body: 'Rate the room, the service, the aesthetic — the things a single OTA score flattens. Add photos and your honest take.',
  },
  {
    src: '/app-shots/feed.jpg',
    alt: 'A feed of stays from people you follow',
    n: 2,
    title: 'Follow people whose taste you trust',
    body: 'Your feed is stays from friends and travelers you choose, not ads or sponsored placements.',
  },
  {
    src: '/app-shots/map.jpg',
    alt: 'A map where every pin is a trusted stay',
    n: 3,
    title: 'Never book blind again',
    body: 'Next trip, open the map: every pin is a hotel someone you trust has actually slept in.',
  },
  {
    src: '/app-shots/discover.jpg',
    alt: 'Community hotel rankings in the Valoré app',
    title: 'Browse the rankings',
    body: 'Community Top 10s for every city members have rated — the taste, aggregated.',
  },
  {
    src: '/app-shots/passport.jpg',
    alt: 'A Valoré travel passport profile',
    title: 'Build your passport',
    body: 'Every stay you’ve logged, ranked and kept — your travel history in one place.',
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
        <h2 className="ed-section-title">How it works</h2>
        <div className="ed-how-strip" role="list">
          {HOW_CARDS.map((c) => (
            <figure key={c.src} className="ed-how-card" role="listitem">
              <Image
                src={c.src}
                alt={c.alt}
                width={640}
                height={1388}
                sizes="(max-width: 760px) 72vw, 300px"
                className="ed-how-img"
              />
              <figcaption className="ed-how-caption">
                <span className="ed-step-n">{'n' in c ? c.n : '+'}</span>
                <span>
                  <h3 className="ed-step-title">{c.title}</h3>
                  <p className="ed-step-body">{c.body}</p>
                </span>
              </figcaption>
            </figure>
          ))}
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
