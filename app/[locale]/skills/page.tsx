'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type FilterCat = 'all' | 'web' | 'marketing' | 'tech' | 'security';

const FILTERS: { id: FilterCat; fr: string; en: string }[] = [
  { id: 'all', fr: 'Tout voir', en: 'All Skills' },
  { id: 'web', fr: 'Web & Design', en: 'Web & Design' },
  { id: 'marketing', fr: 'Marketing', en: 'Marketing' },
  { id: 'tech', fr: 'Tech & Mobile', en: 'Tech & Mobile' },
  { id: 'security', fr: 'Sécurité', en: 'Security' },
];

const TYPING_PHRASES: Record<'fr' | 'en', string[]> = {
  fr: ['solutions numériques.', 'visions créatives.', 'projets qui scalent.', 'apps mobiles.'],
  en: ['digital solutions.', 'creative visions.', 'scalable projects.', 'mobile apps.'],
};

interface Skill {
  icon: string;
  title: { fr: string; en: string };
  tags: string;
  desc: { fr: string; en: string };
  level: number;
  category: Exclude<FilterCat, 'all'>;
}

const SKILLS: Skill[] = [
  {
    icon: '💻',
    title: { fr: 'Développement Web', en: 'Web Development' },
    tags: 'Next.js · TypeScript · WordPress',
    desc: {
      fr: 'Sites et applications web rapides, responsifs et modernes avec les dernières technologies.',
      en: 'Fast, responsive and modern websites built with cutting-edge technologies.',
    },
    level: 95,
    category: 'web',
  },
  {
    icon: '🎨',
    title: { fr: 'UI/UX Design', en: 'UI/UX Design' },
    tags: 'Figma · Design Systems · Responsive',
    desc: {
      fr: 'Interfaces intuitives et esthétiques qui améliorent l\'expérience utilisateur.',
      en: 'Intuitive and aesthetic interfaces that enhance the user experience.',
    },
    level: 88,
    category: 'web',
  },
  {
    icon: '📈',
    title: { fr: 'SEO & Analytics', en: 'SEO & Analytics' },
    tags: 'Google Analytics · Search Console',
    desc: {
      fr: 'Visibilité améliorée en ligne et suivi précis des performances.',
      en: 'Improved online visibility and precise performance tracking.',
    },
    level: 85,
    category: 'web',
  },
  {
    icon: '📱',
    title: { fr: 'Réseaux Sociaux', en: 'Social Media' },
    tags: 'Contenu · Stratégie · Croissance',
    desc: {
      fr: 'Marques développées avec du contenu créatif et des stratégies d\'engagement efficaces.',
      en: 'Brands grown through creative content and effective engagement strategies.',
    },
    level: 80,
    category: 'marketing',
  },
  {
    icon: '📣',
    title: { fr: 'Marketing Digital', en: 'Digital Marketing' },
    tags: 'Facebook Ads · Google Ads',
    desc: {
      fr: 'Campagnes publicitaires ciblées qui génèrent des ventes et des conversions.',
      en: 'Targeted ad campaigns that drive sales and conversions.',
    },
    level: 78,
    category: 'marketing',
  },
  {
    icon: '🎵',
    title: { fr: 'Technologie Musicale', en: 'Music Tech' },
    tags: 'Distribution · Droits · Monétisation',
    desc: {
      fr: 'Gestion des droits musicaux et monétisation des œuvres artistiques.',
      en: 'Music rights management and monetization of artistic works.',
    },
    level: 72,
    category: 'marketing',
  },
  {
    icon: '⚛️',
    title: { fr: 'React Native', en: 'React Native Dev' },
    tags: 'Expo · iOS · Android',
    desc: {
      fr: 'Applications mobiles performantes et multi-plateformes avec Expo SDK.',
      en: 'High-performance cross-platform mobile apps with Expo SDK.',
    },
    level: 92,
    category: 'tech',
  },
  {
    icon: '🗄️',
    title: { fr: 'Backend & Base de données', en: 'Backend & Database' },
    tags: 'Supabase · PostgreSQL · Node.js',
    desc: {
      fr: 'APIs robustes et bases de données sécurisées pour des applications scalables.',
      en: 'Robust APIs and secure databases for scalable applications.',
    },
    level: 90,
    category: 'tech',
  },
  {
    icon: '📲',
    title: { fr: 'Réparation Téléphone', en: 'Phone Repair' },
    tags: 'Hardware · Software · Diagnostic',
    desc: {
      fr: 'Diagnostic et réparation de smartphones toutes marques, software et hardware.',
      en: 'Diagnosing and repairing all smartphone brands, hardware and software.',
    },
    level: 95,
    category: 'tech',
  },
  {
    icon: '🖥️',
    title: { fr: 'Réparation PC', en: 'PC Repair' },
    tags: 'Dépannage · Optimisation · Installation',
    desc: {
      fr: 'Réparation et optimisation d\'ordinateurs Windows et macOS.',
      en: 'Repairing and optimizing Windows and macOS computers.',
    },
    level: 90,
    category: 'tech',
  },
  {
    icon: '🔒',
    title: { fr: 'Cybersécurité', en: 'Cybersecurity' },
    tags: 'Pentesting · Audits · OSINT',
    desc: {
      fr: 'Audits de sécurité et protection des systèmes contre les menaces numériques.',
      en: 'Security audits and system protection against digital threats.',
    },
    level: 85,
    category: 'security',
  },
  {
    icon: '🔑',
    title: { fr: 'Récupération de Compte', en: 'Account Recovery' },
    tags: 'Comptes piratés · 2FA · Réseaux sociaux',
    desc: {
      fr: 'Récupération d\'accès aux comptes bloqués ou compromis sur toutes plateformes.',
      en: 'Recovering access to locked or compromised accounts on all platforms.',
    },
    level: 82,
    category: 'security',
  },
];

const TECH_GROUPS = [
  { eyebrow: '>_ frontend', label: 'Frontend', techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { eyebrow: '>_ backend', label: 'Backend & DB', techs: ['Supabase', 'PostgreSQL', 'Node.js', 'REST APIs'] },
  { eyebrow: '>_ mobile', label: 'Mobile', techs: ['React Native', 'Expo', 'Expo Router', 'EAS Build'] },
  { eyebrow: '>_ devops', label: 'DevOps', techs: ['Turborepo', 'Vercel', 'Git & GitHub', 'next-intl'] },
  { eyebrow: '>_ payments', label: 'Paiements', techs: ['MonCash', 'Stripe', 'Nodemailer', 'AdMob'] },
  { eyebrow: '>_ design', label: 'Design & Outils', techs: ['Figma', 'WordPress', 'WooCommerce', 'SEO'] },
];

export default function SkillsPage() {
  const t = useTranslations('skills');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'fr';
  const isFr = locale === 'fr';

  const [filter, setFilter] = useState<FilterCat>('all');
  const [hovered, setHovered] = useState<number | null>(null);
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

  const filtered = filter === 'all' ? SKILLS : SKILLS.filter((s) => s.category === filter);

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
          {isFr ? 'Je transforme vos idées en' : 'Transforming your ideas into'}
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

        {/* ── Skill Cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
          className="skills-cards-grid"
        >
          {filtered.map((skill, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={skill.title.en}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="card-border skill-card"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '12px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'transform 0.25s, border-color 0.25s',
                  transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                  borderColor: isHov ? 'rgba(0, 212, 255, 0.45)' : undefined,
                  minHeight: '160px',
                }}
              >
                {/* Default face */}
                <div style={{ opacity: isHov ? 0 : 1, transition: 'opacity 0.2s' }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: '16px', lineHeight: 1 }}>
                    {skill.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      margin: '0 0 10px',
                      color: 'var(--text)',
                    }}
                  >
                    {skill.title[isFr ? 'fr' : 'en']}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--accent)',
                      fontFamily: 'Inter, monospace',
                      margin: 0,
                      opacity: 0.8,
                    }}
                  >
                    {skill.tags}
                  </p>
                </div>

                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '24px',
                    background: 'rgba(10, 10, 15, 0.97)',
                    opacity: isHov ? 1 : 0,
                    transition: 'opacity 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '18px',
                    pointerEvents: isHov ? 'auto' : 'none',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {skill.desc[isFr ? 'fr' : 'en']}
                  </p>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                          fontFamily: 'Inter, monospace',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isFr ? 'Niveau' : 'Level'}
                      </span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--accent)',
                          fontFamily: 'Inter, monospace',
                          fontWeight: 700,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: '4px',
                        background: 'rgba(255,255,255,0.07)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: isHov ? `${skill.level}%` : '0%',
                          background: 'linear-gradient(90deg, var(--accent), rgba(0,212,255,0.6))',
                          borderRadius: '2px',
                          transition: 'width 0.65s cubic-bezier(0.4, 0, 0.2, 1) 0.05s',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Tech Stack ── */}
        <div
          style={{
            marginTop: '96px',
            paddingTop: '72px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>
            {'>_ Technologies'}
          </p>
          <h2
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              letterSpacing: '-0.025em',
              margin: '0 0 48px',
            }}
          >
            {t('title')}
          </h2>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
            className="tech-stack-grid"
          >
            {TECH_GROUPS.map((g) => (
              <div
                key={g.label}
                className="card-border"
                style={{ background: 'var(--bg-2)', borderRadius: '10px', padding: '24px' }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, monospace',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    margin: '0 0 6px',
                  }}
                >
                  {g.eyebrow}
                </p>
                <h4
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    margin: '0 0 16px',
                    color: 'var(--text)',
                  }}
                >
                  {g.label}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {g.techs.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontFamily: 'Inter, monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="card-border"
          style={{
            marginTop: '80px',
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
            {isFr ? 'Prêt à élever votre projet ?' : 'Ready to Elevate Your Project?'}
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
              ? 'Parlons de vos besoins et construisons quelque chose d\'exceptionnel ensemble.'
              : "Let's discuss your needs and build something exceptional together."}
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
        @media (max-width: 900px) {
          .skills-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tech-stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .skills-cards-grid { grid-template-columns: 1fr !important; }
          .tech-stack-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
