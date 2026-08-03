import type { Metadata } from 'next';
import StartClient from './StartClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Démarrer un projet — Djovany Levasseur',
    description:
      'Décrivez votre projet en quelques minutes. Site web, application mobile, boutique en ligne ou plateforme sur mesure. Réponse sous 24h.',
  },
  en: {
    title: 'Start a project — Djovany Levasseur',
    description:
      'Describe your project in a few minutes. Website, mobile app, online store or custom platform. Reply within 24h.',
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
      canonical: `${BASE_URL}/${locale}/start`,
      languages: {
        fr: `${BASE_URL}/fr/start`,
        en: `${BASE_URL}/en/start`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}/start`,
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default function StartPage() {
  return <StartClient />;
}
