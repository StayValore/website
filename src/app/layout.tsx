import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Valore - Hotel Reviews From People You Trust',
  description:
    'Discover and review hotels through authentic recommendations from your network. Rate, rank, and save your favorite stays.',
  keywords: ['hotel reviews', 'travel', 'hotel recommendations', 'social travel'],
  openGraph: {
    title: 'Valore - Hotel Reviews From People You Trust',
    description:
      'Discover and review hotels through authentic recommendations from your network.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
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
