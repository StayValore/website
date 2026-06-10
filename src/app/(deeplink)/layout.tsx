import type { Metadata } from 'next';
import './deeplink.css';

export const metadata: Metadata = {
  title: 'Valoré',
  description: 'Discover and share trusted hotel reviews with people whose taste you trust.',
};

export default function DeepLinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
