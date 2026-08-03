import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const BASE_URL = 'https://djovanylevasseur.com';
const ROUTES = ['', '/projects', '/services', '/skills', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map((route) => ({
    url: `${BASE_URL}/${locales[0]}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${route}`])),
    },
  })) as MetadataRoute.Sitemap;
}
