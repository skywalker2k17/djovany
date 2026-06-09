'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 24px',
        marginTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: 'var(--text)',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>{'>'}</span>
          <span style={{ color: 'var(--text-muted)' }}>_</span> DJ
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
          © {year} Djovany Levasseur — {t('rights')}
        </p>

        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/skywalker2k17' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/djovany-levasseur/' },
            { label: 'WhatsApp', href: 'https://wa.me/50948449536' },
          ].map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
