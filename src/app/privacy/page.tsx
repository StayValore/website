import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Valore',
  description: 'Valore privacy policy.',
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: April 17, 2026</p>
        <div className="legal-content">
          <p>Valore LLC collects and uses your data as described below.</p>
          <h2>1. Contact</h2>
          <p>
            <a href="mailto:madison@stayvalore.com">madison@stayvalore.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
