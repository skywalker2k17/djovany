import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SkillsPreview from '@/components/sections/SkillsPreview';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import FAQ from '@/components/sections/FAQ';

const BASE_URL = 'https://djovanylevasseur.com';

const META = {
  fr: {
    title: 'Djovany Levasseur — Développeur Full-Stack | Haïti, USA & International',
    description:
      'Développeur Full-Stack freelance pour la diaspora haïtienne et les entreprises en Floride/USA. Sites web, SaaS et applications mobiles avec Next.js, TypeScript, Supabase et React Native.',
  },
  en: {
    title: 'Djovany Levasseur — Full-Stack Developer | Haiti, USA & Worldwide',
    description:
      'Freelance Full-Stack Developer for the Haitian diaspora and businesses across Florida/USA. Websites, SaaS platforms and mobile apps built with Next.js, TypeScript, Supabase and React Native.',
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
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}/${locale}`,
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    twitter: {
      title: m.title,
      description: m.description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Djovany Levasseur',
    url: BASE_URL,
    image: `${BASE_URL}/djovany.png`,
    jobTitle: 'Full-Stack Developer',
    description:
      'Freelance Full-Stack Developer building websites, SaaS platforms and mobile apps for the Haitian diaspora and businesses across Florida, the USA and worldwide.',
    knowsAbout: [
      'Next.js', 'TypeScript', 'Supabase', 'React Native',
      'Web Development', 'SaaS Development', 'Mobile App Development',
    ],
    knowsLanguage: ['fr', 'en', 'ht'],
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Haiti' },
      { '@type': 'State', name: 'Florida' },
      { '@type': 'Place', name: 'Worldwide (remote)' },
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Djovany Levasseur — Freelance Development',
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero locale={locale} />
      <About />
      <SkillsPreview locale={locale} />
      <FeaturedProjects locale={locale} />
      <FAQ locale={locale} />
    </>
  );
}
