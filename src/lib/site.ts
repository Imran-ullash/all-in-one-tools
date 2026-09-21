/**
 * Returns the dynamic base site URL based on environment configuration.
 * - Respects NEXT_PUBLIC_SITE_URL if configured (production domain).
 * - Falls back to VERCEL_URL on preview/production deployments on Vercel.
 * - Defaults to http://localhost:3000 for local development.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== '') {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/+$/, '');
  }

  if (process.env.VERCEL_URL && process.env.VERCEL_URL.trim() !== '') {
    return `https://${process.env.VERCEL_URL.trim()}`.replace(/\/+$/, '');
  }

  return 'http://localhost:3000';
}

export const SITE_URL = getSiteUrl();
