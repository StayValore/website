import { FeatureIcon } from '@/components/feature-icon';
import { ScreenshotShowcase } from '@/components/screenshot-showcase';
import { InstagramFeed } from '@/components/instagram-feed';
import { Waitlist } from '@/components/waitlist';

const FEATURES = [
  {
    icon: 'star' as const,
    title: 'Detailed Reviews',
    description:
      'Rate hotels on location, amenities, aesthetic, and service as a single number does not always give all the detail. Add photos, extra details, and your honest take.',
  },
  {
    icon: 'users' as const,
    title: 'Social Discovery',
    description:
      'Follow friends and fellow travelers to see where your network is staying. Experience a curated feed of authentic and personalized recommendations.',
  },
  {
    icon: 'map' as const,
    title: 'Explore the Map',
    description:
      'Browse reviewed hotels on an interactive map. Sort by city, price, hotel brand, and booking platform to meet your needs.',
  },
  {
    icon: 'bookmark' as const,
    title: 'Dream Stays',
    description:
      'Save hotels to custom collections for your next trip. Build your travel wish list, organized your way.',
  },
] as const;


export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="hero-badge">Now Available on iOS</span>
          <h1>
            Where <span>Taste</span>
            <br />
            Meets Trust.
          </h1>
          <p className="hero-subtitle">
            No more doom-scrolling to plan travel. Discover, review, and rank
            hotels through recommendations from people you actually trust.
          </p>
          <div className="hero-cta-group">
            <a className="btn-primary" href="https://apps.apple.com/app/valore" target="_blank" rel="noopener noreferrer">
              Download on iOS
            </a>
            <a className="btn-secondary" href="#features">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="app-showcase">
        <div className="container">
          <ScreenshotShowcase />
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="features-header">
            <p className="section-label">Features</p>
            <h2 className="section-title">Everything You Need to Travel Better</h2>
            <p className="section-subtitle">
              Valoré combines hotel reviews, social discovery, and personal organization into one beautifully simple app.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map(feature => (
              <div key={feature.title} className="feature-card">
                <FeatureIcon variant={feature.icon} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Waitlist />

      <InstagramFeed />

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Travel Smarter?</h2>
            <p>
              Join a community of travelers who share honest hotel reviews and
              discover incredible stays together.
            </p>
            <a className="btn-white" href="https://apps.apple.com/app/valore" target="_blank" rel="noopener noreferrer">
              Download on iOS
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

