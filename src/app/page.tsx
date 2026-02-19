import { FeatureIcon } from '@/components/feature-icon';

const FEATURES = [
  {
    icon: 'star' as const,
    title: 'Detailed Reviews',
    description:
      'Rate hotels on location, service, rooms, dining, amenities, and value. Add photos, tags, and your personal take.',
  },
  {
    icon: 'feed' as const,
    title: 'Personalized Feed',
    description:
      'See what your friends are staying at. A curated feed of reviews from travelers you follow and trust.',
  },
  {
    icon: 'map' as const,
    title: 'Explore the Map',
    description:
      'Browse reviewed hotels on an interactive map. Search by city and discover where your network has stayed.',
  },
  {
    icon: 'bookmark' as const,
    title: 'Dream Stays',
    description:
      'Save hotels to custom collections for your next trip. Build your travel wish list, organized your way.',
  },
  {
    icon: 'users' as const,
    title: 'Social Discovery',
    description:
      'Follow friends and fellow travelers. Discover hotels through authentic recommendations, not ads.',
  },
  {
    icon: 'ranking' as const,
    title: 'Personal Rankings',
    description:
      'Rank hotels you\'ve visited with head-to-head comparisons. Build your definitive list of the best stays.',
  },
] as const;

const STEPS = [
  {
    number: 1,
    title: 'Create Your Passport',
    description:
      'Sign up and set your travel style. Tell us whether you\'re a luxury traveler, business road warrior, or adventure seeker.',
  },
  {
    number: 2,
    title: 'Review Your Stays',
    description:
      'Rate and review hotels you\'ve stayed at. Add photos, share what you loved, and help others make better choices.',
  },
  {
    number: 3,
    title: 'Discover Together',
    description:
      'Follow friends, explore their reviews, and save dream hotels for your next trip. Travel better, together.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="hero-badge">Now Available on iOS</span>
          <h1>
            Hotel Reviews From
            <br />
            People You <span>Trust</span>
          </h1>
          <p className="hero-subtitle">
            Discover, review, and rank hotels through authentic recommendations
            from friends and fellow travelers. Your next great stay starts here.
          </p>
          <div className="hero-cta-group">
            <a className="btn-primary" href="#features">
              Learn More
            </a>
            <a className="btn-secondary" href="/support">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="features-header">
            <p className="section-label">Features</p>
            <h2 className="section-title">Everything You Need to Travel Better</h2>
            <p className="section-subtitle">
              Valore combines hotel reviews, social discovery, and personal
              organization into one beautifully simple app.
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

      <section className="how-it-works">
        <div className="container">
          <div className="how-it-works-header">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Get Started in Minutes</h2>
            <p className="section-subtitle">
              Three simple steps to better hotel discovery.
            </p>
          </div>
          <div className="steps-grid">
            {STEPS.map(step => (
              <div key={step.number} className="step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Travel Smarter?</h2>
            <p>
              Join a community of travelers who share honest hotel reviews and
              discover incredible stays together.
            </p>
            <a className="btn-white" href="/support">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

