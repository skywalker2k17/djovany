import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Services — Développement Web & SaaS pour Haïti, la Floride et les USA',
    description:
      'Développement web, SaaS, marketing digital et support technique freelance, à distance pour la diaspora haïtienne et les entreprises en Floride/USA.',
  },
  en: {
    title: 'Services — Web & SaaS Development for Haiti, Florida & the USA',
    description:
      'Freelance web development, SaaS, digital marketing and tech support, remote-friendly for the Haitian diaspora and businesses across Florida/USA.',
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
