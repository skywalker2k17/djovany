'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const rotating: string[] = t.raw('headline_rotating') as string[];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % rotating.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotating.length]);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '64px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Text */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '24px' }}>
              {t('eyebrow')}
            </p>

            <h1
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: '0 0 8px',
                color: 'var(--text)',
              }}
            >
              {t('headline')}
            </h1>

            <h1
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: '0 0 32px',
                color: 'var(--accent)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {rotating[index]}
            </h1>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '40px',
                fontWeight: 400,
              }}
            >
              {t('sub')}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href={`/${locale}/projects`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  fontFamily: 'Space Grotesk, sans-serif',
                  transition: 'opacity 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                {t('cta_projects')} →
              </Link>

              <Link
                href={`/${locale}/contact`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  fontFamily: 'Space Grotesk, sans-serif',
                  transition: 'border-color 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                {t('cta_contact')}
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div
            className="hero-photo"
            style={{
              width: '300px',
              height: '380px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Placeholder — remplace par <Image> avec ta vraie photo */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(160deg, var(--bg-3) 0%, var(--bg-2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-dim)',
                fontSize: '0.8rem',
                fontFamily: 'Space Grotesk, sans-serif',
                textAlign: 'center',
              }}
            >
              {/* Replace with:
              <Image
                src="/djovany.png"
                alt="Djovany Levasseur"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              /> */}
              <span>
                Photo<br />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>/public/djovany.png</span>
              </span>
            </div>

            {/* Accent line */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--accent), transparent)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-photo {
            width: 200px !important;
            height: 250px !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
