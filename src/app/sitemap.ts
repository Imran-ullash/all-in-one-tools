import { MetadataRoute } from 'next';
import { CATEGORIES, TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/tools/`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/guides/`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/about/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/privacy/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/terms/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/disclaimer/`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 }
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${siteUrl}${c.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${siteUrl}/${t.categorySlug}/${t.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${siteUrl}/guides/${g.slug}/`,
    lastModified: new Date(g.updatedDate),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...guideRoutes];
}
