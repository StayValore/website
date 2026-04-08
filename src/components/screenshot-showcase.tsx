'use client';

import { useState } from 'react';

const SCREENSHOTS = [
  { src: '/screenshots/IMG_6509.PNG', label: 'Social Feed', alt: 'Valoré home feed showing hotel reviews from friends' },
  { src: '/screenshots/IMG_6505.PNG', label: 'Explore Map', alt: 'Valoré map view showing hotels in New York' },
  { src: '/screenshots/IMG_6508.PNG', label: 'Detailed Reviews', alt: 'Valoré detailed hotel review with ratings' },
  { src: '/screenshots/IMG_6506.PNG', label: 'Your Passport', alt: 'Valoré passport profile with hotel rankings' },
  { src: '/screenshots/IMG_6507.PNG', label: 'Dream Stays', alt: 'Valoré bucket list with dream hotel stays' },
];

export function ScreenshotShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const goNext = () => setActiveIndex(i => i !== null ? (i + 1) % SCREENSHOTS.length : 0);
  const goPrev = () => setActiveIndex(i => i !== null ? (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length : 0);

  return (
    <>
      <div className="showcase-grid">
        {SCREENSHOTS.map((shot, index) => (
          <button
            key={shot.src}
            className="showcase-phone"
            onClick={() => openLightbox(index)}
            aria-label={`View ${shot.label} screenshot`}
          >
            <div className="showcase-img-wrap">
              <img src={shot.src} alt={shot.alt} />
              <div className="showcase-overlay">
                <span>View</span>
              </div>
            </div>
            <p className="showcase-label">{shot.label}</p>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button
            className="lightbox-arrow lightbox-prev"
            onClick={e => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous"
          >‹</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img
              src={SCREENSHOTS[activeIndex].src}
              alt={SCREENSHOTS[activeIndex].alt}
            />
            <p className="lightbox-label">{SCREENSHOTS[activeIndex].label}</p>
          </div>
          <button
            className="lightbox-arrow lightbox-next"
            onClick={e => { e.stopPropagation(); goNext(); }}
            aria-label="Next"
          >›</button>
        </div>
      )}
    </>
  );
}
