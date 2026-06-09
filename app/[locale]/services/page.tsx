'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type FilterCat = 'all' | 'web' | 'marketing' | 'support';

const FILTERS: { id: FilterCat; fr: string; en: string }[] = [
  { id: 'all', fr: 'Tout voir', en: 'All Services' },
  { id: 'web', fr: 'Web & Dev', en: 'Web & Dev' },
  { id: 'marketing', fr: 'Marketing', en: 'Marketing' },
  { id: 'support', fr: 'Support Tech', en: 'Tech Support' },
];

const TYPING_PHRASES: Record<'fr' | 'en', string[]> = {
  fr: ['votre croissance digitale.', 'votre vision créative.', 'vos besoins techniques.', 'votre transformation numérique.'],
  en: ['your digital growth.', 'your creative vision.', 'your technical needs.', 'your digital transformation.'],
};

interface Service {
  icon: string;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  tags: string[];
  category: Exclude<FilterCat, 'all'>;
  popular?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: '⬡',
    title: { fr: 'Développement SaaS', en: 'SaaS Development' },
    desc: {
      fr: 'Plateformes SaaS complètes — architecture Turborepo, auth Supabase, paiements MonCash / Stripe, dashboard admin.',
      en: 'Complete SaaS platforms — Turborepo architecture, Supabase auth, MonCash / Stripe payments, admin dashboard.',
    },
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Turborepo'],
    category: 'web',
    popular: true,
  },
  {
    icon: '◈',
    title: { fr: 'Site Web & Landing Page', en: 'Website & Landing Page' },
    desc: {
      fr: 'Sites rapides, SEO-optimisés, mobile-first. De la landing page au site multi-pages avec CMS intégré.',
      en: 'Fast, SEO-optimized, mobile-first sites. From landing pages to multi-page sites with integrated CMS.',
    },
    tags: ['Next.js', 'WordPress', 'Tailwind CSS', 'SEO'],
    category: 'web',
  },
  {
    icon: '◉',
    title: { fr: 'Application Mobile', en: 'Mobile App' },
    desc: {
      fr: 'Apps React Native / Expo pour iOS et Android. AdMob, push notifications, publication App Store & Play Store.',
      en: 'React Native / Expo apps for iOS and Android. AdMob, push notifications, App Store & Play Store publishing.',
    },
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
    category: 'web',
  },
  {
    icon: '⬟',
    title: { fr: 'Intégration Paiements', en: 'Payment Integration' },
    desc: {
      fr: 'Intégration MonCash, Stripe ou autre gateway. Gestion des webhooks, confirmations et reçus automatiques.',
      en: 'MonCash, Stripe or other gateway integration. Webhooks, confirmations and automatic receipts.',
    },
    tags: ['MonCash', 'Stripe', 'Webhooks', 'API'],
    category: 'web',
  },
  {
    icon: '📈',
    title: { fr: 'SEO & Marketing Digital', en: 'SEO & Digital Marketing' },
    desc: {
      fr: 'Référencement naturel, Google Ads, Facebook Ads et gestion des réseaux sociaux. Stratégie complète pour votre croissance.',
      en: 'SEO, Google Ads, Facebook Ads and social media management. Complete strategy for your growth.',
    },
    tags: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics'],
    category: 'marketing',
  },
  {
    icon: '🎵',
    title: { fr: 'Technologie Musicale & Droits', en: 'Music Tech & Rights' },
    desc: {
      fr: 'Distribution numérique, protection des droits d\'auteur, collecte de royalties et stratégie de promotion artistique.',
      en: 'Digital distribution, copyright protection, royalty collection and artistic promotion strategy.',
    },
    tags: ['Distribution', 'Copyright', 'Royalties', 'Promotion'],
    category: 'marketing',
  },
  {
    icon: '🖥️',
    title: { fr: 'Maintenance & Support', en: 'Maintenance & Support' },
    desc: {
      fr: 'Optimisation PC, suppression de virus, mises à jour logicielles et monitoring mensuel de vos projets web.',
      en: 'PC optimization, virus removal, software updates and monthly monitoring of your web projects.',
    },
    tags: ['Monitoring', 'Optimization', 'Updates', 'Performance'],
    category: 'support',
  },
  {
    icon: '🔒',
    title: { fr: 'Cybersécurité', en: 'Cybersecurity' },
    desc: {
      fr: 'Audits de sécurité, suppression de malware, tests de pénétration et formation à la sécurité informatique.',
      en: 'Security audits, malware removal, penetration testing and cybersecurity training.',
    },
    tags: ['Pentesting', 'Audit', 'Malware', 'Training'],
    category: 'support',
  },
  {
    icon: '🔑',
    title: { fr: 'Récupération de Compte', en: 'Account Recovery' },
    desc: {
      fr: 'Récupération de comptes email, réseaux sociaux et plateformes piratés ou verrouillés. Mise en place d\'une sécurité renforcée.',
      en: 'Recovery of hacked or locked email, social media and platform accounts. Enhanced security setup.',
    },
    tags: ['Email', 'Social Media', '2FA', 'Security'],
    category: 'support',
  },
  {
    icon: '📲',
    title: { fr: 'Réparation Téléphone', en: 'Phone Repair' },
    desc: {
      fr: 'Diagnostic logiciel et hardware, récupération de données, mise à jour firmware et optimisation des performances.',
      en: 'Software and hardware diagnostics, data recovery, firmware updates and performance optimization.',
    },
    tags: ['Diagnostic', 'Data Recovery', 'Firmware', 'Performance'],
    category: 'support',
  },
];

export default function ServicesPage() {
  const t = useTranslations('services');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'fr';
  const isFr = locale === 'fr';

  const [filter, setFilter] = useState<FilterCat>('all');
  const [typingIdx, setTypingIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const lang = isFr ? 'fr' : 'en';
    const fullText = TYPING_PHRASES[lang][typingIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIdx <= fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 75);
    } else if (!isDeleting && charIdx > fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 38);
    } else {
      setIsDeleting(false);
      setTypingIdx((i) => (i + 1) % TYPING_PHRASES[lang].length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, typingIdx, isFr]);

  const filtered = filter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <section style={{ padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('label')}</p>
        <h1
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            letterSpacing: '-0.03em',
            margin: '0 0 4px',
            lineHeight: 1.15,
          }}
        >
          {isFr ? 'Des solutions taillées pour' : 'Tailored solutions for'}
        </h1>
        <h1
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
            color: 'var(--accent)',
            lineHeight: 1.15,
            minHeight: '1.4em',
          }}
        >
          {displayText}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '0.85em',
              background: 'var(--accent)',
              verticalAlign: 'middle',
              marginLeft: '3px',
              animation: 'cursor-blink 1s step-end infinite',
            }}
          />
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '52px',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}
        >
          {isFr
            ? 'Chaque projet est unique. Ces offres sont des points de départ — je m\'adapte à vos besoins.'
            : 'Every project is unique. These are starting points — I adapt to your needs.'}
        </p>

        {/* ── Filter Buttons ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: `1px solid ${filter === f.id ? 'var(--accent)' : 'var(--border)'}`,
                background: filter === f.id ? 'rgba(0, 212, 255, 0.1)' : 'var(--bg-2)',
                color: filter === f.id ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {isFr ? f.fr : f.en}
            </button>
          ))}
        </div>

        {/* ── Service Cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          className="services-grid"
        >
          {filtered.map((service) => {
            const title = service.title[isFr ? 'fr' : 'en'];
            const desc = service.desc[isFr ? 'fr' : 'en'];

            return (
              <div
                key={service.title.en}
                className="card-border"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderColor: service.popular ? 'rgba(0, 212, 255, 0.4)' : undefined,
                }}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(0, 212, 255, 0.12)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(0, 212, 255, 0.35)',
                      borderRadius: '100px',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      fontFamily: 'Inter, monospace',
                    }}
                  >
                    {isFr ? 'Populaire' : 'Popular'}
                  </div>
                )}

                {/* Category badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{service.icon}</span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      fontFamily: 'Inter, monospace',
                    }}
                  >
                    {service.category === 'web' ? 'Web & Dev'
                      : service.category === 'marketing' ? 'Marketing'
                      : 'Support Tech'}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      margin: '0 0 10px',
                      letterSpacing: '-0.01em',
                      paddingRight: service.popular ? '70px' : '0',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.83rem',
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
                        background: 'rgba(255,255,255,0.05)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontFamily: 'Inter, monospace',
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

        {/* ── Custom / Tailored CTA ── */}
        <div
          className="card-border"
          style={{
            marginTop: '32px',
            padding: '32px',
            background: 'var(--bg-2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            borderColor: 'rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>✦</span>
            <div>
              <h3
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  margin: '0 0 4px',
                  letterSpacing: '-0.01em',
                }}
              >
                {isFr ? 'Solution Sur Mesure' : 'Tailored Solution'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                {isFr
                  ? 'Combinez les services — délais flexibles, support dédié, maintenance continue.'
                  : 'Mix & match services — flexible timeline, dedicated support, ongoing maintenance.'}
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/contact`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '10px 24px',
              borderRadius: '100px',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {isFr ? 'Me contacter' : 'Contact me'} →
          </Link>
        </div>

        {/* ── Main CTA ── */}
        <div
          className="card-border"
          style={{
            marginTop: '64px',
            padding: 'clamp(40px, 5vw, 60px)',
            background: 'var(--bg-2)',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}
          >
            {isFr ? 'Un projet en tête ?' : 'Got a project in mind?'}
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              marginBottom: '32px',
              fontSize: '1rem',
              lineHeight: 1.75,
              maxWidth: '440px',
              margin: '0 auto 32px',
            }}
          >
            {isFr
              ? 'Discutons-en. Réponse garantie sous 24h.'
              : "Let's talk about it. Guaranteed reply within 24h."}
          </p>
          <Link
            href={`/${locale}/contact`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent)',
              color: '#000',
              padding: '14px 36px',
              borderRadius: '100px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              letterSpacing: '-0.01em',
            }}
          >
            {isFr ? 'Me contacter' : 'Get in touch'} →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
