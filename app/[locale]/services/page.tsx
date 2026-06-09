'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const services = [
  {
    icon: '⬡',
    title: { fr: 'SaaS Development', en: 'SaaS Development' },
    description: {
      fr: 'Conception et développement de plateformes SaaS complètes. Architecture Turborepo, auth Supabase, paiements intégrés, dashboard admin.',
      en: 'Design and development of complete SaaS platforms. Turborepo architecture, Supabase auth, integrated payments, admin dashboard.',
    },
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Turborepo'],
  },
  {
    icon: '◈',
    title: { fr: 'Site Vitrine & Landing Page', en: 'Landing Pages & Websites' },
    description: {
      fr: 'Sites rapides, optimisés SEO, mobile-first. De la simple landing page au site multi-pages avec CMS.',
      en: 'Fast, SEO-optimized, mobile-first sites. From simple landing pages to multi-page sites with CMS.',
    },
    tags: ['Next.js', 'WordPress', 'Tailwind CSS', 'SEO'],
  },
  {
    icon: '◉',
    title: { fr: 'Application Mobile', en: 'Mobile App' },
    description: {
      fr: 'Apps React Native/Expo pour iOS et Android. Intégration AdMob, push notifications, publication sur les stores.',
      en: 'React Native/Expo apps for iOS and Android. AdMob integration, push notifications, store publishing.',
    },
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    icon: '◐',
    title: { fr: 'Design UI/UX', en: 'UI/UX Design' },
    description: {
      fr: 'Design systems, maquettes Figma, refonte d\'interface. Identité visuelle cohérente et expérience utilisateur optimisée.',
      en: 'Design systems, Figma mockups, interface redesign. Consistent visual identity and optimized user experience.',
    },
    tags: ['Figma', 'Design System', 'Responsive', 'Branding'],
  },
  {
    icon: '⬟',
    title: { fr: 'Intégration Paiements', en: 'Payment Integration' },
    description: {
      fr: 'Intégration MonCash, Sogebank, Stripe ou autre gateway. Gestion des webhooks, confirmations, reçus automatiques.',
      en: 'MonCash, Sogebank, Stripe or other gateway integration. Webhooks, confirmations, automatic receipts.',
    },
    tags: ['MonCash', 'Sogebank', 'Stripe', 'Webhooks'],
  },
  {
    icon: '◎',
    title: { fr: 'Maintenance & Support', en: 'Maintenance & Support' },
    description: {
      fr: 'Suivi mensuel, mises à jour, monitoring performances, corrections de bugs. Votre projet tourne sans interruptions.',
      en: 'Monthly monitoring, updates, performance checks, bug fixes. Your project runs without interruptions.',
    },
    tags: ['Monitoring', 'Updates', 'Performance', 'Security'],
  },
];

export default function ServicesPage() {
  const t = useTranslations('services');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section style={{ padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>
          {t('label')}
        </p>
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
          }}
        >
          {t('title')}
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '64px',
            maxWidth: '500px',
          }}
        >
          {locale === 'fr'
            ? 'Chaque projet est unique. Ces offres sont des points de départ — je m\'adapte à vos besoins.'
            : 'Every project is unique. These are starting points — I adapt to your needs.'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
          className="services-grid"
        >
          {services.map((service) => {
            const title = locale === 'fr' ? service.title.fr : service.title.en;
            const desc = locale === 'fr' ? service.description.fr : service.description.en;

            return (
              <div
                key={title}
                className="card-border"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      margin: '0 0 10px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        background: 'var(--bg-3)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '64px',
            padding: '48px',
            background: 'var(--bg-2)',
            borderRadius: '12px',
            border: '1px solid rgba(0,212,255,0.15)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
            }}
          >
            {locale === 'fr' ? 'Un projet en tête ?' : 'Got a project in mind?'}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontSize: '0.95rem' }}>
            {locale === 'fr'
              ? 'Discutons-en. Réponse garantie sous 24h.'
              : 'Let\'s talk about it. Guaranteed reply within 24h.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent)',
              color: 'var(--bg)',
              padding: '12px 32px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {locale === 'fr' ? 'Me contacter →' : 'Get in touch →'}
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
