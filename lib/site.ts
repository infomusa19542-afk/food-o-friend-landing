/**
 * Canonical site origin used for metadata, sitemap and structured data.
 * Server-only values: set NEXT_PUBLIC_SITE_URL for production. On Vercel the project's
 * production domain is used as a fallback; locally it falls back to localhost.
 */
const resolveSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
};

export const siteUrl = new URL(resolveSiteUrl());

export const absoluteUrl = (path: string): string => new URL(path, siteUrl).toString();
