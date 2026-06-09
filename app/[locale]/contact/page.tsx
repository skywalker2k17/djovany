'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ContactPage() {
  const t = useTranslations('contact');
  const params = useParams();
  const locale = params.locale as string;

  const links = [
    {
      label: t('email'),
      value: 'djovanylevasseur93@gmail.com',
      href: 'mailto:djovanylevasseur93@gmail.com',
      icon: '✉',
    },
    {
      label: t('whatsapp'),
      value: '+509 48 44 9536',
      href: 'https://wa.me/50948449536',
      icon: '◈',
    },
    {
      label: t('linkedin'),
      value: 'linkedin.com/in/djovany-levasseur',
      href: 'https://www.linkedin.com/in/djovany-levasseur/',
      icon: '◉',
    },
    {
      label: 'GitHub',
      value: 'github.com/skywalker2k17',
      href: 'https://github.com/skywalker2k17',
      icon: '⬡',
    },
    {
      label: 'Instagram',
      value: '@djovany_levasseur',
      href: 'https://www.instagram.com/djovany_levasseur/',
      icon: '◐',
    },
  ];

  return (
    <section style={{ padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            marginBottom: '56px',
            lineHeight: 1.7,
          }}
        >
          {t('sub')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="card-border"
              style={{
                background: 'var(--bg-2)',
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'var(--accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '3px',
                  }}
                >
                  {link.label}
                </div>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                  }}
                >
                  {link.value}
                </div>
              </div>
              <span
                style={{
                  marginLeft: 'auto',
                  color: 'var(--accent)',
                  fontSize: '1.2rem',
                }}
              >
                ↗
              </span>
            </Link>
          ))}
        </div>

        <p
          style={{
            marginTop: '48px',
            color: 'var(--text-dim)',
            fontSize: '0.8rem',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          {locale === 'fr' ? '⚡ Réponse garantie sous 24h' : '⚡ Guaranteed reply within 24h'}
        </p>
      </div>
    </section>
  );
}
