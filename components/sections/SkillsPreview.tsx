'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { skills } from '@/lib/data';

// Simple SVG skill icons as inline components
const SkillIcon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = {
    nextjs: 'N',
    react: 'R',
    typescript: 'TS',
    tailwind: 'TW',
    supabase: 'SB',
    nodejs: 'NJ',
    postgresql: 'PG',
    turborepo: 'TB',
    vercel: 'VC',
    git: 'GH',
    expo: 'EX',
  };
  return (
    <span
      style={{
        fontFamily: 'Inter, monospace',
        fontWeight: 700,
        fontSize: '0.65rem',
        letterSpacing: '0.02em',
      }}
    >
      {icons[name] || name.slice(0, 2).toUpperCase()}
    </span>
  );
};

export default function SkillsPreview({ locale }: { locale: string }) {
  const t = useTranslations('skills');

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>
              {t('label')}
            </p>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              {t('title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/skills`}
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {t('cta')} →
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="card-border"
              style={{
                background: 'var(--bg-2)',
                borderRadius: '8px',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'var(--accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                <SkillIcon name={skill.icon} />
              </div>
              <span
                style={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
