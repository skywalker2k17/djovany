import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const handleProxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function proxy(request: Parameters<typeof handleProxy>[0]) {
  return handleProxy(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
