'use client';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': { 'feed-id': string };
    }
  }
}

import { useEffect } from 'react';

export function InstagramFeed() {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(s);
  }, []);

  return (
    <section className="instagram-section">
      <div className="container">
        <div className="instagram-header">
          <p className="section-label">Instagram</p>
          <h2 className="section-title">Follow Along</h2>
          <a
            href="https://instagram.com/stayvalore"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-handle"
          >
            @stayvalore
          </a>
        </div>
        <behold-widget feed-id="ZPi4sjyKNWrqr7nvtKrd" />
      </div>
    </section>
  );
}
