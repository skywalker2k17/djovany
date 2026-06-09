'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/skills`, label: t('skills') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>{'>'}</span>
          <span style={{ color: 'var(--text-muted)', marginRight: '2px' }}>_</span>
          {' '}DJ
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Lang switcher */}
          <Link
            href={switchPath}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '4px 10px',
              letterSpacing: '0.08em',
              transition: 'all 0.2s',
            }}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text)',
            padding: '8px',
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="mobile-menu"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: pathname === link.href ? 'var(--accent)' : 'var(--text)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchPath}
            onClick={() => setOpen(false)}
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            → {otherLocale.toUpperCase()}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
