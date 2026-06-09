'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { projects, type Category } from '@/lib/data';
import { useParams } from 'next/navigation';

const categoryColors: Record<string, string> = {
  saas: '#00D4FF',
  healthcare: '#4ADE80',
  beauty: '#F472B6',
  education: '#A78BFA',
  music: '#FB923C',
  business: '#94A3B8',
  mobile: '#38BDF8',
  photography: '#FBBF24',
  security: '#F87171',
  ecommerce: '#34D399',
};

const allCategories: Category[] = [
  'all', 'saas', 'healthcare', 'mobile', 'beauty', 'business',
  'music', 'education', 'photography', 'security', 'ecommerce',
];

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const params = useParams();
  const locale = params.locale as string;
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

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
            margin: '0 0 48px',
          }}
        >
          {t('title')}
        </h1>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '48px',
          }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                background: active === cat ? 'var(--accent)' : 'var(--bg-2)',
                color: active === cat ? 'var(--bg)' : 'var(--text-muted)',
                border: `1px solid ${active === cat ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '6px',
                padding: '6px 16px',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {cat === 'all' ? t('filter_all') : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
          className="all-projects-grid"
        >
          {filtered.map((project) => {
            const desc = locale === 'fr' ? project.description.fr : project.description.en;
            const color = categoryColors[project.category] || 'var(--accent)';

            return (
              <div
                key={project.slug}
                className="card-border"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '10px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color,
                      background: `${color}14`,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {project.category}
                  </span>
                  {project.status === 'development' && (
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      In dev
                    </span>
                  )}
                  {project.status === 'unavailable' && (
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Unavailable
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      margin: '0 0 6px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.82rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        background: 'var(--bg-3)',
                        padding: '2px 7px',
                        borderRadius: '3px',
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
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
        @media (max-width: 1024px) {
          .all-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .all-projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
