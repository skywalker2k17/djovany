import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Projets',
    description:
      'Découvrez les projets web, SaaS et apps mobiles réalisés par Djovany Levasseur : Next.js, TypeScript, Supabase, React Native.',
  },
  en: {
    title: 'Projects',
    description:
      'Explore the web, SaaS and mobile app projects built by Djovany Levasseur: Next.js, TypeScript, Supabase, React Native.',
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
      canonical: `${BASE_URL}/${locale}/projects`,
      languages: {
        fr: `${BASE_URL}/fr/projects`,
        en: `${BASE_URL}/en/projects`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}/projects`,
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default function ProjectsPage() {
  return <ProjectsClient />;
}
