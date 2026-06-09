'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { value: t('stat1_value'), label: t('stat1_label') },
    { value: t('stat2_value'), label: t('stat2_label') },
    { value: t('stat3_value'), label: t('stat3_label') },
  ];

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>
              {t('label')}
            </p>
            <h2
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                margin: '0 0 24px',
                whiteSpace: 'pre-line',
              }}
            >
              {t('title')}
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1rem',
                lineHeight: 1.8,
                maxWidth: '460px',
              }}
            >
              {t('body')}
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              alignSelf: 'center',
            }}
            className="stats-grid"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--bg-2)',
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    color: 'var(--accent)',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .stats-grid > div { padding: 20px 12px !important; }
          .stats-grid .stat-value { font-size: 1.8rem !important; }
        }
      `}</style>
    </section>
  );
}
