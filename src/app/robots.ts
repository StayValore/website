import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Profile pages exist for share links, not search; keep people out of Google.
        disallow: ['/user/', '/invite/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
