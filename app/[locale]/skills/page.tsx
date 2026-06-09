'use client';

import { useTranslations } from 'next-intl';

const skillGroups = [
  {
    label: 'Frontend',
    eyebrow: '>_ frontend',
    skills: [
      { name: 'Next.js 14', detail: 'App Router, SSR, ISR, API Routes' },
      { name: 'React', detail: 'Hooks, Context, Server Components' },
      { name: 'TypeScript', detail: 'Strict mode, generics, utility types' },
      { name: 'Tailwind CSS', detail: 'v3 & v4, design systems' },
    ],
  },
  {
    label: 'Backend & DB',
    eyebrow: '>_ backend',
    skills: [
      { name: 'Supabase', detail: 'Auth, Realtime, RLS, Storage' },
      { name: 'PostgreSQL', detail: 'Queries, RLS policies, triggers' },
      { name: 'Node.js', detail: 'APIs, Nodemailer, serverless' },
      { name: 'REST APIs', detail: 'Design, integration, cheerio scraping' },
    ],
  },
  {
    label: 'Mobile',
    eyebrow: '>_ mobile',
    skills: [
      { name: 'React Native', detail: 'Expo SDK 52, iOS & Android' },
      { name: 'Expo', detail: 'EAS Build, OTA updates, AdMob' },
      { name: 'Expo Router', detail: 'File-based navigation' },
    ],
  },
  {
    label: 'Architecture & DevOps',
    eyebrow: '>_ devops',
    skills: [
      { name: 'Turborepo', detail: 'Monorepos, shared packages, pipelines' },
      { name: 'Vercel', detail: 'Deploy, Edge Functions, Cron Jobs' },
      { name: 'Git & GitHub', detail: 'CI workflows, branching strategy' },
      { name: 'next-intl', detail: 'i18n, FR/EN/HT, locale routing' },
    ],
  },
  {
    label: 'Payments & Integrations',
    eyebrow: '>_ integrations',
    skills: [
      { name: 'MonCash', detail: 'API Haiti mobile payment' },
      { name: 'Sogebank', detail: 'Card payment integration' },
      { name: 'Nodemailer', detail: 'Gmail SMTP, email automation' },
      { name: 'AdMob', detail: 'Banner, interstitial, ATT consent' },
    ],
  },
  {
    label: 'Design & Other',
    eyebrow: '>_ design',
    skills: [
      { name: 'UI/UX Design', detail: 'Figma, design systems, responsive' },
      { name: 'SEO', detail: 'Meta, structured data, performance' },
      { name: 'WordPress', detail: 'Custom themes, WooCommerce, ACF' },
      { name: 'Cybersecurity', detail: 'Pentesting basics, security audits' },
    ],
  },
];

export default function SkillsPage() {
  const t = useTranslations('skills');

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
            margin: '0 0 64px',
          }}
        >
          {t('title')}
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}
          className="skills-groups-grid"
        >
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="card-border"
              style={{
                background: 'var(--bg-2)',
                borderRadius: '12px',
                padding: '28px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, monospace',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  marginTop: 0,
                }}
              >
                {group.eyebrow}
              </p>
              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  margin: '0 0 20px',
                  color: 'var(--text)',
                }}
              >
                {group.label}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        flexShrink: 0,
                        marginTop: '7px',
                      }}
                    />
                    <div>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'var(--text)',
                          display: 'block',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                        }}
                      >
                        {skill.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-groups-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
