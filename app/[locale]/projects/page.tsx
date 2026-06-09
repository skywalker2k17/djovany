'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type FilterCat =
  | 'all' | 'saas' | 'healthcare' | 'security' | 'ecommerce'
  | 'beauty' | 'photography' | 'music' | 'business' | 'education' | 'mobile';

const FILTERS: { id: FilterCat; fr: string; en: string }[] = [
  { id: 'all',         fr: 'Tout voir',    en: 'All' },
  { id: 'saas',        fr: 'SaaS',         en: 'SaaS' },
  { id: 'healthcare',  fr: 'Santé',        en: 'Healthcare' },
  { id: 'security',    fr: 'Sécurité',     en: 'Security' },
  { id: 'ecommerce',   fr: 'E-commerce',   en: 'E-commerce' },
  { id: 'beauty',      fr: 'Beauté',       en: 'Beauty' },
  { id: 'photography', fr: 'Photo',        en: 'Photography' },
  { id: 'music',       fr: 'Musique',      en: 'Music' },
  { id: 'business',    fr: 'Business',     en: 'Business' },
  { id: 'education',   fr: 'Éducation',    en: 'Education' },
  { id: 'mobile',      fr: 'Mobile',       en: 'Mobile' },
];

const CAT_COLORS: Record<string, string> = {
  saas: '#00D4FF', healthcare: '#4ADE80', beauty: '#F472B6',
  education: '#A78BFA', music: '#FB923C', business: '#94A3B8',
  photography: '#FBBF24', security: '#F87171', ecommerce: '#34D399',
  mobile: '#38BDF8',
};

const CAT_ICONS: Record<string, string> = {
  saas: '⚡', healthcare: '🏥', beauty: '💄', education: '🎓',
  music: '🎵', business: '💼', photography: '📷', security: '🔒',
  ecommerce: '🛒', mobile: '📱',
};

const TYPING_PHRASES: Record<'fr' | 'en', string[]> = {
  fr: ['donnent des résultats.', 'racontent une histoire.', 'impressionnent.', 'scalent.'],
  en: ['drive results.', 'tell a story.', 'impress.', 'scale.'],
};

interface Project {
  slug: string;
  title: string;
  desc: { fr: string; en: string };
  category: FilterCat;
  tags: string[];
  url?: string;
  status?: 'live' | 'development' | 'unavailable';
  badge?: { fr: string; en: string; color: string };
}

const PROJECTS: Project[] = [
  // ── SaaS ──
  {
    slug: 'wellpax',
    title: 'WellPax',
    desc: {
      fr: 'SaaS de suivi de colis Haïti–USA. Dashboard client, calculateur de fret, tracking en temps réel.',
      en: 'Haiti–USA package tracking SaaS. Client dashboard, freight calculator, real-time tracking.',
    },
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Turborepo'],
    url: 'https://web-two-weld-75.vercel.app',
    status: 'live',
  },
  {
    slug: 'jjs-imex',
    title: 'JJS IMEX',
    desc: {
      fr: 'SaaS de shipping USA/Haïti/RD. God Mode Arsenal, audit logs, product scraper intégré.',
      en: 'USA/Haiti/DR shipping SaaS. God Mode Arsenal, audit logs, integrated product scraper.',
    },
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    url: 'https://jjsimex.com',
    status: 'unavailable',
  },
  {
    slug: 'jdp-rentacar',
    title: 'JDP Rentacar',
    desc: {
      fr: 'SaaS de location de voitures. Gestion de flotte, réservations, mode démo localStorage.',
      en: 'Car rental SaaS. Fleet management, bookings, localStorage demo mode.',
    },
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    status: 'development',
  },
  // ── Healthcare ──
  {
    slug: 'care-restore',
    title: 'Care & Restore',
    desc: {
      fr: 'SaaS de soins à domicile. Gestion patients, soignants, facturation et KPIs.',
      en: 'Homecare SaaS. Patient management, caregivers, billing and KPIs.',
    },
    category: 'healthcare',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    status: 'development',
  },
  {
    slug: 'prime-home-care',
    title: 'Prime Home Care',
    desc: {
      fr: 'Plateforme de services de santé à domicile premium en Floride.',
      en: 'Premium home healthcare services platform in Florida.',
    },
    category: 'healthcare',
    tags: ['WordPress'],
    url: 'https://primehome.care',
    status: 'live',
  },
  // ── Education ──
  {
    slug: 'mci',
    title: 'Matching Caregivers Institute',
    desc: {
      fr: 'Site éducatif pour institut de formation de soignants en Floride. HHA, CNA, CPR.',
      en: 'Educational site for Florida caregiver training institute. HHA, CNA, CPR.',
    },
    category: 'education',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'http://matchingcaregivers.institute',
    status: 'development',
  },
  // ── Security ──
  {
    slug: 'fingerprint',
    title: 'Fingerprint Services of South Florida',
    desc: {
      fr: 'Services d\'empreintes digitales et conformité sécuritaire en Floride du Sud.',
      en: 'Fingerprint services and security compliance in South Florida.',
    },
    category: 'security',
    tags: ['WordPress'],
    url: 'https://fingerprintservicesofsouthflorida.com',
    status: 'live',
  },
  // ── Business ──
  {
    slug: 'jeanty-detailing',
    title: 'Black Ice Mobile Detailing',
    desc: {
      fr: 'Service de detailing automobile mobile. Réservation Calendly, paiements Square, carte des services.',
      en: 'Mobile car detailing service. Calendly booking, Square payments, service map.',
    },
    category: 'business',
    tags: ['Next.js', 'TypeScript', 'Square'],
    url: 'https://blackicemobile.net',
    status: 'live',
  },
  {
    slug: 'synergy',
    title: 'Synergy Real-Tech',
    desc: {
      fr: 'Solutions et services technologiques.',
      en: 'Technology solutions and services.',
    },
    category: 'business',
    tags: ['WordPress'],
    url: 'https://synergyreal-tech.net',
    status: 'live',
  },
  {
    slug: 'mb-tax',
    title: 'MB Tax Plus',
    desc: {
      fr: 'Impôts, DNA Testing, Drug Testing et services administratifs en Floride.',
      en: 'Tax, DNA Testing, Drug Testing and admin services in Florida.',
    },
    category: 'business',
    tags: ['Next.js', 'TypeScript'],
    status: 'development',
  },
  // ── E-commerce ──
  {
    slug: 'shassy',
    title: 'ShassyStore',
    desc: {
      fr: 'Plateforme e-commerce de mode.',
      en: 'Fashion e-commerce platform.',
    },
    category: 'ecommerce',
    tags: ['WordPress', 'WooCommerce'],
    url: 'https://shassystore.com',
    status: 'live',
    badge: { fr: 'Restauré après piratage', en: 'Restored After Hack', color: '#10b981' },
  },
  // ── Beauty ──
  {
    slug: 'magnificence',
    title: 'Magnificence',
    desc: {
      fr: 'Boutique beauté en ligne. Collections cheveux, extensions, réservation, bien-être et mode.',
      en: 'Online beauty boutique. Hair collections, extensions, booking, wellness and fashion.',
    },
    category: 'beauty',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    status: 'development',
  },
  {
    slug: 'chiccils',
    title: 'Chiccils',
    desc: {
      fr: 'SaaS de réservation pour salon de beauté. Booking en ligne, gestion des slots.',
      en: 'Beauty salon booking SaaS. Online booking, slot management.',
    },
    category: 'beauty',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    url: 'https://chiccils.com',
    status: 'live',
  },
  // ── Photography ──
  {
    slug: 'castdesign',
    title: 'CastDesign Studio',
    desc: {
      fr: 'Portfolio de photographie professionnelle. Design vibrant et moderne.',
      en: 'Professional photography portfolio. Vibrant and modern design.',
    },
    category: 'photography',
    tags: ['Next.js', 'Tailwind CSS'],
    url: 'https://castdesignstudio.com',
    status: 'unavailable',
  },
  // ── Mobile ──
  {
    slug: 'expitracker',
    title: 'ExpiTracker',
    desc: {
      fr: 'App mobile de suivi de dates d\'expiration. Alertes intelligentes, scan et gestion de produits.',
      en: 'Mobile app for tracking expiration dates. Smart alerts, scan and product management.',
    },
    category: 'mobile',
    tags: ['React Native', 'Expo', 'TypeScript'],
    status: 'development',
  },
  {
    slug: 'jeanty-mobile',
    title: 'Black Ice Mobile App',
    desc: {
      fr: 'App mobile companion pour Black Ice Mobile Detailing. Réservations, suivi et notifications.',
      en: 'Companion app for Black Ice Mobile Detailing. Bookings, tracking and notifications.',
    },
    category: 'mobile',
    tags: ['React Native', 'TypeScript', 'Supabase'],
    status: 'development',
  },
  {
    slug: 'moneytrack',
    title: 'MoneyTrack',
    desc: {
      fr: 'App mobile de gestion de dépenses et suivi financier personnel. Catégories, budgets et rapports.',
      en: 'Mobile expense tracking and personal finance app. Categories, budgets and reports.',
    },
    category: 'mobile',
    tags: ['React Native', 'Expo', 'TypeScript'],
    status: 'development',
  },
  // ── Music ──
  {
    slug: 'rtm',
    title: 'Radio Télé Tout Moun',
    desc: {
      fr: 'Radio/TV en ligne. Lecteur Zenoradio live, YouTube player, gestion publicités.',
      en: 'Online radio/TV. Live Zenoradio player, YouTube player, ad management.',
    },
    category: 'music',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://radiotoutmoun.com',
    status: 'live',
  },
  {
    slug: 'panoutchic',
    title: 'PanoutchicPanou',
    desc: {
      fr: 'Portfolio artiste et vitrine musicale.',
      en: 'Artist portfolio and music showcase.',
    },
    category: 'music',
    tags: ['WordPress'],
    url: 'https://panoutchicpanou.com',
    status: 'live',
  },
  {
    slug: 'us-prodz',
    title: 'US Prodz · Da Label',
    desc: {
      fr: 'Label musical et plateforme de production. Artistes, salle de spectacle Scofield, booking et production.',
      en: 'Music label and production platform. Artists, Scofield Playhouse venue, booking and production.',
    },
    category: 'music',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'development',
  },
];

export default function ProjectsPage() {
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

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section style={{ padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <p className="eyebrow" style={{ marginBottom: '16px' }}>{'>_ Projets'}</p>
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
          {isFr ? 'Des projets qui' : 'Projects that'}
        </h1>
        <h1
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            letterSpacing: '-0.03em',
            margin: '0 0 56px',
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

        {/* ── Filters ── */}
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

        {/* ── Project Cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '96px' }}
          className="projects-page-grid"
        >
          {filtered.map((project) => {
            const color = CAT_COLORS[project.category] || 'var(--accent)';
            const hasPreview = !!project.url && project.status === 'live';

            return (
              <div
                key={project.slug}
                className="card-border project-page-card"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s, border-color 0.25s',
                }}
              >
                {/* ── Preview area ── */}
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  {hasPreview ? (
                    <>
                      <iframe
                        src={project.url}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '70px',
                          background: 'linear-gradient(to top, var(--bg-2), transparent)',
                          pointerEvents: 'none',
                        }}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${color}16, ${color}06)`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{ fontSize: '2.8rem' }}>{CAT_ICONS[project.category] || '🌐'}</span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color,
                          fontFamily: 'Inter, monospace',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          opacity: 0.7,
                        }}
                      >
                        {project.status === 'development'
                          ? (isFr ? 'En développement' : 'In development')
                          : (isFr ? 'Aperçu indisponible' : 'Preview unavailable')}
                      </span>
                    </div>
                  )}

                  {/* Category badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: `${color}22`,
                      color,
                      border: `1px solid ${color}44`,
                      borderRadius: '100px',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                    }}
                  >
                    {project.category}
                  </div>

                  {/* Special badge */}
                  {project.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: `${project.badge.color}20`,
                        color: project.badge.color,
                        border: `1px solid ${project.badge.color}44`,
                        borderRadius: '100px',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                      }}
                    >
                      {isFr ? project.badge.fr : project.badge.en}
                    </div>
                  )}
                </div>

                {/* ── Card info ── */}
                <div
                  style={{
                    padding: '20px 24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.82rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {isFr ? project.desc.fr : project.desc.en}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {project.tags.slice(0, 3).map((tag) => (
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
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        marginTop: 'auto',
                        paddingTop: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {isFr ? 'Voir le site' : 'Visit site'} ↗
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Apps divider ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span
            style={{
              fontFamily: 'Inter, monospace',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              whiteSpace: 'nowrap',
            }}
          >
            {isFr ? '>_ Apps & Logiciels' : '>_ Apps & Software'}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* ── Apps Grid ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '80px' }}
          className="apps-2col-grid"
        >
          {/* StockEasy */}
          <div
            className="card-border"
            style={{
              background: 'var(--bg-2)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '18px',
                background: 'rgba(0, 212, 255, 0.08)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                flexShrink: 0,
              }}
            >
              📦
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '5px',
                }}
              >
                {isFr ? 'Productivité · Disponible' : 'Productivity · Available'}
              </div>
              <h3
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  margin: '0 0 6px',
                }}
              >
                StockEasy
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 18px', lineHeight: 1.55 }}>
                {isFr
                  ? 'Solution de gestion d\'inventaire pour petites entreprises. iOS & Android.'
                  : 'The ultimate inventory management solution for small businesses. iOS & Android.'}
              </p>
            </div>
          </div>

          {/* Coming soon */}
          <div
            className="card-border"
            style={{
              background: 'var(--bg-2)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              opacity: 0.45,
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0,
              }}
            >
              🔮
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '5px',
                }}
              >
                {isFr ? 'Projet futur' : 'Future project'}
              </div>
              <h3
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  margin: '0 0 6px',
                }}
              >
                {isFr ? 'Prochain projet' : 'Next Big Thing'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                {isFr ? 'Restez à l\'écoute pour la prochaine solution.' : 'Stay tuned for the next innovative solution.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="card-border"
          style={{
            background: 'var(--bg-2)',
            borderRadius: '16px',
            padding: 'clamp(40px, 5vw, 64px)',
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
            {isFr ? 'Vous avez un projet en tête ?' : 'Have a project in mind?'}
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              margin: '0 0 36px',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {isFr
              ? 'Parlons de vos besoins et donnons vie à vos idées.'
              : "Let's discuss your needs and bring your ideas to life."}
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
            {isFr ? 'Contactez-moi' : 'Get in touch'} →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .project-page-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 212, 255, 0.35) !important;
        }
        @media (max-width: 900px) {
          .projects-page-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .apps-2col-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .projects-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
