import type { Metadata } from 'next';
import { AppPrompt } from '@/components/app-prompt';
import './deeplink.css';

export const metadata: Metadata = {
  title: 'Valoré',
  description: 'Discover and share trusted hotel reviews with people whose taste you trust.',
};

// Route groups nest inside the root layout, so this must NOT render its own
// <html>/<body> — doing so breaks hydration and kills the header links.
export default function DeepLinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* React hoists precedence-tagged stylesheets into <head> */}
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      />
      {children}
      <AppPrompt />
    </>
  );
}
