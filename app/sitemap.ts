import { MetadataRoute } from 'next';
import { supabase } from './utils/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://topbcpartners.com';

  // Fetch slugs from your database
  const { data: partners } = await supabase
    .from('listings')
    .select('slug, updated_at');

  // Convert database rows into URL objects
  const partnerUrls = (partners || []).map((partner) => ({
    url: `${baseUrl}/partner/${partner.slug}`,
    lastModified: partner.updated_at || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...partnerUrls,
  ];
}   