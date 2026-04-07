import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Valoré - Where Taste Meets Trust',
  description:
    'Discover, review, and rank hotels through authentic recommendations from friends and travelers you trust. Your next great stay starts here.',
  keywords: ['hotel reviews', 'travel', 'hotel recommendations', 'social travel', 'hotel discovery'],
  openGraph: {
    title: 'Valoré - Where Taste Meets Trust',
    description:
      'Discover, review, and rank hotels through authentic recommendations from friends and travelers you trust.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
