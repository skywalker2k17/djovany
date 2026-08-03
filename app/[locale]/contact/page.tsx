import type { Metadata } from 'next';
import ContactClient from './ContactClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Contact',
    description:
      'Contactez Djovany Levasseur pour discuter de votre projet web, SaaS ou application mobile.',
  },
  en: {
    title: 'Contact',
    description:
      "Get in touch with Djovany Levasseur to discuss your web, SaaS or mobile app project.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const m = isFr ? META.fr : META.en;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        fr: `${BASE_URL}/fr/contact`,
        en: `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}/contact`,
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
