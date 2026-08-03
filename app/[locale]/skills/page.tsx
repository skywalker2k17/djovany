import type { Metadata } from 'next';
import SkillsClient from './SkillsClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Compétences — Développeur Full-Stack Next.js, TypeScript & React Native',
    description:
      'Compétences techniques de Djovany Levasseur : développement web, SaaS, marketing digital, mobile et sécurité. Next.js, TypeScript, Supabase, React Native.',
  },
  en: {
    title: 'Skills — Full-Stack Developer, Next.js, TypeScript & React Native',
    description:
      "Djovany Levasseur's technical skills: web development, SaaS, digital marketing, mobile and security. Next.js, TypeScript, Supabase, React Native.",
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
