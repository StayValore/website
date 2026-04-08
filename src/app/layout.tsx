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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
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
