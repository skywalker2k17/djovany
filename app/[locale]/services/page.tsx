import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Services',
    description:
      'Développement web, SaaS, marketing digital et support technique par Djovany Levasseur.',
  },
  en: {
    title: 'Services',
    description:
      'Web development, SaaS, digital marketing and tech support by Djovany Levasseur.',
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
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        fr: `${BASE_URL}/fr/services`,
        en: `${BASE_URL}/en/services`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}/services`,
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default function ServicesPage() {
  return <ServicesClient />;
}
