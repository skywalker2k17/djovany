'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { featuredProjects } from '@/lib/data';

const categoryColors: Record<string, string> = {
  saas: '#00D4FF',
  healthcare: '#4ADE80',
  beauty: '#F472B6',
  education: '#A78BFA',
  music: '#FB923C',
  business: '#94A3B8',
  mobile: '#38BDF8',
};

export default function FeaturedProjects({ locale }: { locale: string }) {
  const t = useTranslations('projects');

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
                fontFamily: 'Plus Jakarta Sans, sans-serif',
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
            href={`/${locale}/projects`}
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {t('cta')} →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
          className="projects-grid"
        >
          {featuredProjects.map((project) => {
            const desc = locale === 'fr' ? project.description.fr : project.description.en;
            const color = categoryColors[project.category] || 'var(--accent)';

            return (
              <div
                key={project.slug}
                className="card-border"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '10px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Category tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color,
                      background: `${color}14`,
                      padding: '3px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    {project.category}
                  </span>
                  {project.status === 'development' && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      In dev
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      margin: '0 0 8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        background: 'var(--bg-3)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontFamily: 'Inter, monospace',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Visit link */}
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: 'auto',
                    }}
                  >
                    {t('visit')} ↗
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
