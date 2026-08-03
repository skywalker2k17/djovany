import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Projets — SaaS, E-commerce & Apps pour la diaspora haïtienne et les USA',
    description:
      'Portfolio de projets web, SaaS et apps mobiles : tracking de colis Haïti-USA, santé à domicile, e-commerce, sécurité et plus. Next.js, TypeScript, Supabase, React Native.',
  },
  en: {
    title: 'Projects — SaaS, E-commerce & Apps for the Haitian Diaspora and USA',
    description:
      'Portfolio of web, SaaS and mobile app projects: Haiti-USA package tracking, home healthcare, e-commerce, security and more. Built with Next.js, TypeScript, Supabase, React Native.',
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
