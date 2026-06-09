import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SkillsPreview from '@/components/sections/SkillsPreview';
import FeaturedProjects from '@/components/sections/FeaturedProjects';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <About />
      <SkillsPreview locale={locale} />
      <FeaturedProjects locale={locale} />
    </>
  );
}
