import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Keeps your admin portal private from Google
    },
    sitemap: 'https://topbcpartners.com/sitemap.xml',
  };
}