'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  TRACKS,
  CONTACT_FIELDS,
  sectionsFor,
  type Field,
  type TrackId,
  type L,
} from '@/lib/brief';

const WHATSAPP = '50948449536';
const EMAIL = 'djovanylevasseur93@gmail.com';

type Answers = Record<string, string | string[]>;

export default function StartClient() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'fr';
  const isFr = locale === 'fr';
  const say = (l: L) => (isFr ? l.fr : l.en);

  const [tracks, setTracks] = useState<TrackId[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const sections = useMemo(() => sectionsFor(tracks), [tracks]);
  const totalSteps = sections.length + 2;
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const toggleTrack = (id: TrackId) =>
    setTracks((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const setAnswer = (id: string, value: string | string[]) =>
    setAnswers((a) => ({ ...a, [id]: value }));

  const toggleMulti = (id: string, value: string) =>
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      return { ...a, [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  const summary = useMemo(() => {
    const lines: string[] = [];
    lines.push(isFr ? 'DEMANDE DE PROJET' : 'PROJECT REQUEST');
    lines.push('');

    const picked = TRACKS.filter((t) => tracks.includes(t.id)).map((t) => (isFr ? t.label.fr : t.label.en));
    if (picked.length) {
      lines.push(isFr ? 'Ce que je veux :' : 'What I want:');
      picked.forEach((p) => lines.push('- ' + p));
      lines.push('');
    }

    const blocks: { title: L; fields: Field[] }[] = [
      ...sections.map((s) => ({ title: s.title, fields: s.fields })),
      { title: { fr: 'Mes coordonnées', en: 'My details' }, fields: CONTACT_FIELDS },
    ];

    blocks.forEach((sec) => {
      const rows = sec.fields
        .map((f) => {
          const v = answers[f.id];
          const text = Array.isArray(v) ? v.join(', ') : (v ?? '').toString().trim();
          return text ? `- ${isFr ? f.label.fr : f.label.en} : ${text}` : null;
        })
        .filter((x): x is string => x !== null);

      if (rows.length) {
        lines.push((isFr ? sec.title.fr : sec.title.en).toUpperCase());
        lines.push(...rows);
        lines.push('');
      }
    });

    return lines.join('\n').trim();
  }, [tracks, answers, sections, isFr]);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    isFr ? 'Demande de projet' : 'Project request'
  )}&body=${encodeURIComponent(summary)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 500,
    marginBottom: '8px',
    color: 'var(--text)',
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    background: 'var(--bg-2)',
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
  };
  const pill = (on: boolean): React.CSSProperties => ({
    padding: '10px 18px',
    borderRadius: '100px',
    border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
    background: on ? 'rgba(0, 212, 255, 0.1)' : 'var(--bg-2)',
    color: on ? 'var(--accent)' : 'var(--text-muted)',
    fontSize: '0.85rem',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  });
  const btn = (primary: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 30px',
    borderRadius: '100px',
    border: primary ? 'none' : '1px solid var(--border)',
    background: primary ? 'var(--accent)' : 'transparent',
    color: primary ? '#000' : 'var(--text-muted)',
    fontWeight: primary ? 700 : 500,
    fontSize: '0.9rem',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    cursor: 'pointer',
    textDecoration: 'none',
  });

  const renderField = (f: Field) => {
    if (f.kind === 'note') {
      return (
        <p key={f.id} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {say(f.label)}
        </p>
      );
    }

    const ph = 'placeholder' in f && f.placeholder ? say(f.placeholder) : '';

    return (
      <div key={f.id} style={{ marginBottom: '26px' }}>
        <label style={labelStyle}>{say(f.label)}</label>

        {f.kind === 'text' && (
          <input
            type="text"
            style={inputStyle}
            placeholder={ph}
            value={(answers[f.id] as string) ?? ''}
            onChange={(e) => setAnswer(f.id, e.target.value)}
          />
        )}

        {f.kind === 'area' && (
          <textarea
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            placeholder={ph}
            value={(answers[f.id] as string) ?? ''}
            onChange={(e) => setAnswer(f.id, e.target.value)}
          />
        )}

        {(f.kind === 'choice' || f.kind === 'multi') && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {f.options.map((o) => {
              const val = say(o);
              const on =
                f.kind === 'multi'
                  ? Array.isArray(answers[f.id]) && (answers[f.id] as string[]).includes(val)
                  : answers[f.id] === val;
              return (
                <button
                  key={val}
                  type="button"
                  style={pill(on)}
                  onClick={() => (f.kind === 'multi' ? toggleMulti(f.id, val) : setAnswer(f.id, val))}
                >
                  {val}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  if (done) {
    return (
      <section style={{ padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>
            {isFr ? 'Dernière étape' : 'Last step'}
          </p>
          <h1
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}
          >
            {isFr ? 'Votre brief est prêt.' : 'Your brief is ready.'}
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
            {isFr
              ? 'Envoyez-le par WhatsApp ou par email. Réponse sous 24h.'
              : 'Send it by WhatsApp or email. Reply within 24h.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={btn(true)}>
              {isFr ? 'Envoyer par WhatsApp' : 'Send on WhatsApp'} →
            </a>
            <a href={mailHref} style={btn(false)}>
              {isFr ? 'Envoyer par email' : 'Send by email'}
            </a>
            <button type="button" onClick={copy} style={btn(false)}>
              {copied ? (isFr ? 'Copié' : 'Copied') : isFr ? 'Copier le texte' : 'Copy the text'}
            </button>
          </div>

          <pre
            className="card-border"
            style={{
              background: 'var(--bg-2)',
              borderRadius: '12px',
              padding: '24px',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'Inter, monospace',
              margin: 0,
            }}
          >
            {summary}
          </pre>

          <button type="button" onClick={() => setDone(false)} style={{ ...btn(false), marginTop: '24px' }}>
            ← {isFr ? 'Modifier mes réponses' : 'Edit my answers'}
          </button>
        </div>
      </section>
    );
  }

  const isFirst = step === 0;
  const isContact = step === sections.length + 1;
  const current = !isFirst && !isContact ? sections[step - 1] : null;
  const canGoNext = isFirst ? tracks.length > 0 : true;

  return (
    <section style={{ padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div
          style={{
            height: '3px',
            background: 'var(--border)',
            borderRadius: '3px',
            marginBottom: '40px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent)',
              borderRadius: '3px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <p className="eyebrow" style={{ marginBottom: '16px' }}>
          {isFr ? `Étape ${step + 1} sur ${totalSteps}` : `Step ${step + 1} of ${totalSteps}`}
        </p>

        {isFirst && (
          <>
            <h1
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                letterSpacing: '-0.03em',
                margin: '0 0 16px',
                lineHeight: 1.15,
              }}
            >
              {isFr ? 'Que voulez-vous construire ?' : 'What do you want to build?'}
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '36px' }}>
              {isFr
                ? 'Cochez ce qui vous concerne. Vous ne verrez que les questions utiles — et aucune n\u2019est obligatoire.'
                : 'Tick what applies. You will only see the questions that matter — and none are required.'}
            </p>

            <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
              {TRACKS.map((t) => {
                const on = tracks.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTrack(t.id)}
                    className="card-border"
                    style={{
                      background: on ? 'rgba(0, 212, 255, 0.07)' : 'var(--bg-2)',
                      borderColor: on ? 'var(--accent)' : undefined,
                      borderRadius: '12px',
                      padding: '18px 22px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        flexShrink: 0,
                        borderRadius: '5px',
                        border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                        background: on ? 'var(--accent)' : 'transparent',
                        color: '#000',
                        fontSize: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {on ? '✓' : ''}
                    </span>
                    <span>
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: 'var(--text)',
                          marginBottom: '3px',
                        }}
                      >
                        {say(t.label)}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {say(t.hint)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {current && (
          <>
            <h1
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                letterSpacing: '-0.03em',
                margin: '0 0 16px',
                lineHeight: 1.15,
              }}
            >
              {say(current.title)}
            </h1>
            {current.intro && (
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                {say(current.intro)}
              </p>
            )}
            <div style={{ marginTop: '32px' }}>{current.fields.map(renderField)}</div>
          </>
        )}

        {isContact && (
          <>
            <h1
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                letterSpacing: '-0.03em',
                margin: '0 0 16px',
                lineHeight: 1.15,
              }}
            >
              {isFr ? 'Comment vous joindre' : 'How to reach you'}
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
              {isFr
                ? 'Rien n\u2019est envoyé automatiquement. Vous verrez votre brief à l\u2019écran avant de l\u2019envoyer.'
                : 'Nothing is sent automatically. You will see your brief on screen before sending it.'}
            </p>
            <div style={{ marginTop: '32px' }}>{CONTACT_FIELDS.map(renderField)}</div>
          </>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} style={btn(false)}>
              ← {isFr ? 'Retour' : 'Back'}
            </button>
          ) : (
            <Link href={`/${locale}/services`} style={btn(false)}>
              ← {isFr ? 'Voir les services' : 'See the services'}
            </Link>
          )}

          {isContact ? (
            <button type="button" onClick={() => setDone(true)} style={btn(true)}>
              {isFr ? 'Voir mon brief' : 'See my brief'} →
            </button>
          ) : (
            <button
              type="button"
              disabled={!canGoNext}
              onClick={() => setStep((s) => s + 1)}
              style={{
                ...btn(true),
                opacity: canGoNext ? 1 : 0.35,
                cursor: canGoNext ? 'pointer' : 'not-allowed',
              }}
            >
              {isFr ? 'Continuer' : 'Continue'} →
            </button>
          )}
        </div>

        {isFirst && tracks.length === 0 && (
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: '0.8rem',
              marginTop: '16px',
              textAlign: 'right',
            }}
          >
            {isFr ? 'Choisissez au moins une option' : 'Pick at least one option'}
          </p>
        )}
      </div>
    </section>
  );
}
