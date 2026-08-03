import type { Metadata } from 'next';
import SkillsClient from './SkillsClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Compétences',
    description:
      'Les compétences techniques de Djovany Levasseur : développement web, marketing, mobile et sécurité.',
  },
  en: {
    title: 'Skills',
    description:
      "Djovany Levasseur's technical skills: web development, marketing, mobile and security.",
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
      canonical: `${BASE_URL}/${locale}/skills`,
      languages: {
        fr: `${BASE_URL}/fr/skills`,
        en: `${BASE_URL}/en/skills`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}/skills`,
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default function SkillsPage() {
  return <SkillsClient />;
}
