import { MetadataRoute } from 'next';
import { CATEGORIES, TOOLS, SITE_URL } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/tools/`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/terms/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 }
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}${c.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${SITE_URL}/${t.categorySlug}/${t.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}
