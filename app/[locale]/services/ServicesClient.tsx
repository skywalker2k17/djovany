'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { smartMatch } from '@/lib/searchMatch';
import { SERVICES, FILTERS, type Service, type FilterCat } from '@/lib/services';

const TYPING_PHRASES: Record<'fr' | 'en', string[]> = {
  fr: ['votre croissance digitale.', 'votre vision créative.', 'vos besoins techniques.', 'votre transformation numérique.'],
  en: ['your digital growth.', 'your creative vision.', 'your technical needs.', 'your digital transformation.'],
};

export default function ServicesClient() {
  const t = useTranslations('services');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'fr';
  const isFr = locale === 'fr';

  const [filter, setFilter] = useState<FilterCat>('all');
  const [typingIdx, setTypingIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const byCategory = filter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === filter);
  const query = search.trim();
  const serviceHaystack = (s: Service) =>
    [s.title.fr, s.title.en, s.desc.fr, s.desc.en, s.plain?.fr ?? '', s.plain?.en ?? '', ...s.tags, s.category].join(' ');
  const filtered = query ? byCategory.filter((s) => smartMatch(query, serviceHaystack(s))) : byCategory;

  const suggestions = query
    ? SERVICES.filter((s) => smartMatch(query, serviceHaystack(s))).slice(0, 6)
    : [];

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
          {isFr ? 'Des solutions taillées pour' : 'Tailored solutions for'}
        </h1>
        <h1
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
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
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            marginBottom: '52px',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}
        >
          {isFr
            ? 'Chaque projet est unique. Ces offres sont des points de départ — je m\'adapte à vos besoins.'
            : 'Every project is unique. These are starting points — I adapt to your needs.'}
        </p>

        {/* ── Search ── */}
        <div style={{ position: 'relative', maxWidth: '480px', marginBottom: '24px' }}>
          <span
            style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={isFr ? 'Rechercher un service...' : 'Search a service...'}
            style={{
              width: '100%',
              padding: '13px 18px 13px 44px',
              borderRadius: '100px',
              border: '1px solid var(--border)',
              background: 'var(--bg-2)',
              color: 'var(--text)',
              fontSize: '0.88rem',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label={isFr ? 'Effacer' : 'Clear'}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              ✕
            </button>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                zIndex: 20,
                boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
              }}
            >
              {suggestions.map((s) => (
                <button
                  key={s.title.en}
                  onMouseDown={() => { setSearch(s.title[isFr ? 'fr' : 'en']); setShowSuggestions(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '0.82rem',
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{s.icon}</span>
                  <span style={{ flex: 1 }}>{s.title[isFr ? 'fr' : 'en']}</span>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {s.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

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

        {/* ── Service Cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          className="services-grid"
        >
          {filtered.map((service) => {
            const title = service.title[isFr ? 'fr' : 'en'];
            const desc = service.desc[isFr ? 'fr' : 'en'];
            const plain = service.plain?.[isFr ? 'fr' : 'en'];

            return (
              <div
                key={service.title.en}
                className="card-border"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderColor: service.popular ? 'rgba(0, 212, 255, 0.4)' : undefined,
                }}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(0, 212, 255, 0.12)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(0, 212, 255, 0.35)',
                      borderRadius: '100px',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      fontFamily: 'Inter, monospace',
                    }}
                  >
                    {isFr ? 'Populaire' : 'Popular'}
                  </div>
                )}

                {/* Category badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{service.icon}</span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      fontFamily: 'Inter, monospace',
                    }}
                  >
                    {service.category === 'web' ? 'Web & Dev'
                      : service.category === 'marketing' ? 'Marketing'
                      : 'Support Tech'}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      margin: '0 0 10px',
                      letterSpacing: '-0.01em',
                      paddingRight: service.popular ? '70px' : '0',
                    }}
                  >
                    {title}
                  </h3>
                  {plain && (
                    <p
                      style={{
                        color: 'var(--text)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        margin: '0 0 6px',
                        fontWeight: 500,
                      }}
                    >
                      {plain}
                    </p>
                  )}
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.83rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontFamily: 'Inter, monospace',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Custom / Tailored CTA ── */}
        <div
          className="card-border"
          style={{
            marginTop: '32px',
            padding: '32px',
            background: 'var(--bg-2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            borderColor: 'rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>✦</span>
            <div>
              <h3
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  margin: '0 0 4px',
                  letterSpacing: '-0.01em',
                }}
              >
                {isFr ? 'Solution Sur Mesure' : 'Tailored Solution'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                {isFr
                  ? 'Combinez les services — délais flexibles, support dédié, maintenance continue.'
                  : 'Mix & match services — flexible timeline, dedicated support, ongoing maintenance.'}
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/start`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '10px 24px',
              borderRadius: '100px',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {isFr ? 'Démarrer' : 'Get started'} →
          </Link>
        </div>

        {/* ── Main CTA ── */}
        <div
          className="card-border"
          style={{
            marginTop: '64px',
            padding: 'clamp(40px, 5vw, 60px)',
            background: 'var(--bg-2)',
            borderRadius: '16px',
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
            {isFr ? 'Un projet en tête ?' : 'Got a project in mind?'}
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              marginBottom: '32px',
              fontSize: '1rem',
              lineHeight: 1.75,
              maxWidth: '440px',
              margin: '0 auto 32px',
            }}
          >
            {isFr
              ? 'Discutons-en. Réponse garantie sous 24h.'
              : "Let's talk about it. Guaranteed reply within 24h."}
          </p>
          <Link
            href={`/${locale}/start`}
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
            {isFr ? 'Démarrer mon projet' : 'Start my project'} →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
