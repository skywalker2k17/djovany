import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import './globals.css';

const BASE_URL = 'https://djovanylevasseur.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Djovany Levasseur — Full-Stack Developer',
    template: '%s | Djovany Levasseur',
  },
  description: 'Full-Stack Developer & Designer. Next.js, TypeScript, Supabase, React Native.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    siteName: 'Djovany Levasseur',
    type: 'website',
    images: [{ url: '/djovany.png', width: 800, height: 800, alt: 'Djovany Levasseur' }],
  },
  twitter: {
    card: 'summary',
    images: ['/djovany.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
