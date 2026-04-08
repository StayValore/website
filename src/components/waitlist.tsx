'use client';

import { useState } from 'react';

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/mzdkqpyo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="waitlist-section">
      <div className="container">
        <div className="waitlist-card">
          <p className="section-label">Early Access</p>
          <h2 className="waitlist-title">Be the first to know.</h2>
          <p className="waitlist-subtitle">
            Drop your email and we'll reach out when Valoré is ready for you.
          </p>
          {status === 'success' ? (
            <div className="waitlist-success">
              You're on the list. See you soon.
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="waitlist-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-primary waitlist-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="waitlist-error">Something went wrong. Try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}
