'use client';

import Link from 'next/link';
import { useActionState, useMemo, useState, startTransition } from 'react';
import { useParams } from 'next/navigation';
import {
  TRACKS,
  CONTACT_FIELDS,
  sectionsFor,
  fieldError,
  type Field,
  type TrackId,
  type L,
} from '@/lib/brief';
import { sendBrief, type BriefPayload, type SendResult } from '@/app/actions/sendBrief';

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
  const [showErrors, setShowErrors] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [sendState, submitBrief, sendPending] = useActionState<SendResult | null, BriefPayload>(
    async (_prev, payload) => sendBrief(payload),
    null
  );

  const errorFor = (f: Field) => fieldError(f, answers[f.id]);
  const missing = CONTACT_FIELDS.filter((f) => errorFor(f) !== null);

  const errorText = (key: 'required' | 'email' | 'phone') => {
    if (key === 'email') {
      return isFr
        ? 'Entrez une adresse email valide, par exemple nom@entreprise.com'
        : 'Enter a valid email address, for example name@company.com';
    }
    if (key === 'phone') {
      return isFr
        ? 'Entrez un numéro valide, entre 7 et 15 chiffres'
        : 'Enter a valid number, between 7 and 15 digits';
    }
    return isFr ? 'Ce champ est obligatoire' : 'This field is required';
  };

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

  const briefBlocks = useMemo(() => {
    const blocks: { title: string; rows: { q: string; a: string }[] }[] = [];

    const picked = TRACKS.filter((t) => tracks.includes(t.id)).map((t) =>
      isFr ? t.label.fr : t.label.en
    );
    if (picked.length) {
      blocks.push({
        title: isFr ? 'Ce que je veux' : 'What I want',
        rows: picked.map((p) => ({ q: '', a: p })),
      });
    }

    const secs: { title: L; fields: Field[] }[] = [
      ...sections.map((s) => ({ title: s.title, fields: s.fields })),
      { title: { fr: 'Mes coordonnées', en: 'My details' }, fields: CONTACT_FIELDS },
    ];

    secs.forEach((sec) => {
      const rows = sec.fields
        .map((f) => {
          const v = answers[f.id];
          const text = Array.isArray(v) ? v.join(', ') : (v ?? '').toString().trim();
          return text ? { q: isFr ? f.label.fr : f.label.en, a: text } : null;
        })
        .filter((x): x is { q: string; a: string } => x !== null);

      if (rows.length) {
        blocks.push({ title: isFr ? sec.title.fr : sec.title.en, rows });
      }
    });

    return blocks;
  }, [tracks, answers, sections, isFr]);

  const summary = useMemo(() => {
    const lines: string[] = [isFr ? 'DEMANDE DE PROJET' : 'PROJECT REQUEST', ''];
    briefBlocks.forEach((b) => {
      lines.push(b.title.toUpperCase());
      b.rows.forEach((r) => lines.push(r.q ? `- ${r.q} : ${r.a}` : `- ${r.a}`));
      lines.push('');
    });
    return lines.join('\n').trim();
  }, [briefBlocks, isFr]);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summary)}`;

  const submit = () => {
    const payload: BriefPayload = { locale, tracks, answers, confirm_ref: honeypot };
    startTransition(() => submitBrief(payload));
  };

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
    const isRequired = 'required' in f && f.required === true;
    const err = errorFor(f);
    const isMissing = showErrors && err !== null;
    const inputType =
      'validate' in f && f.validate === 'email'
        ? 'email'
        : 'validate' in f && f.validate === 'phone'
          ? 'tel'
          : 'text';

    return (
      <div key={f.id} style={{ marginBottom: '26px' }}>
        <label style={labelStyle}>
          {say(f.label)}
          {isRequired && (
            <span style={{ color: 'var(--accent)', marginLeft: '4px' }} aria-hidden="true">
              *
            </span>
          )}
        </label>

        {f.kind === 'text' && (
          <input
            type={inputType}
            inputMode={inputType === 'tel' ? 'tel' : undefined}
            autoComplete={
              f.id === 'email' ? 'email' : f.id === 'phone' ? 'tel' : f.id === 'name' ? 'name' : undefined
            }
            required={isRequired}
            aria-required={isRequired}
            aria-invalid={isMissing}
            style={{
              ...inputStyle,
              borderColor: isMissing ? '#ef4444' : 'var(--border)',
            }}
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

        {isMissing && err && (
          <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '7px' }}>
            {errorText(err)}
          </p>
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
              ? 'Envoyez-le directement, ou par WhatsApp. Réponse sous 24h.'
              : 'Send it directly, or over WhatsApp. Reply within 24h.'}
          </p>

          {/* honeypot — hidden from sighted and screen-reader users, bots fill it */}
          <input
            type="text"
            name="confirm_ref"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              whiteSpace: 'nowrap',
              left: '-9999px',
            }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={submit}
              disabled={sendPending || sendState?.ok === true}
              style={{
                ...btn(true),
                opacity: sendPending || sendState?.ok === true ? 0.6 : 1,
                cursor: sendPending || sendState?.ok === true ? 'not-allowed' : 'pointer',
              }}
            >
              {sendPending
                ? isFr
                  ? 'Envoi...'
                  : 'Sending...'
                : sendState?.ok === true
                  ? isFr
                    ? 'Envoyé ✓'
                    : 'Sent ✓'
                  : isFr
                    ? 'Envoyer ma demande'
                    : 'Send my request'}
            </button>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={btn(false)}>
              {isFr ? 'Envoyer par WhatsApp' : 'Send on WhatsApp'} →
            </a>
            <button type="button" onClick={() => window.print()} style={btn(false)}>
              {isFr ? 'Télécharger en PDF' : 'Download as PDF'}
            </button>
            <button type="button" onClick={copy} style={btn(false)}>
              {copied ? (isFr ? 'Copié' : 'Copied') : isFr ? 'Copier le texte' : 'Copy the text'}
            </button>
          </div>

          {sendState?.ok === true && (
            <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '20px' }}>
              {isFr
                ? 'Votre demande est bien partie. Réponse sous 24h.'
                : 'Your request is on its way. Reply within 24h.'}
            </p>
          )}

          {sendState?.ok === false &&
            (sendState.error === 'not_configured' || sendState.error === 'send_failed') && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '20px' }}>
                {isFr
                  ? 'Désolé, l’envoi direct a échoué pour l’instant. Utilisez WhatsApp ou copiez le texte ci-dessous, merci de votre patience.'
                  : 'Sorry, the direct send failed for now. Please use WhatsApp or copy the text below, thanks for your patience.'}
              </p>
            )}

          {sendState?.ok === false &&
            (sendState.error === 'validation' || sendState.error === 'rejected') && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '20px' }}>
                {isFr
                  ? 'Quelque chose a bloqué l’envoi. Vérifiez vos réponses ou utilisez WhatsApp.'
                  : 'Something blocked the send. Please check your answers or use WhatsApp.'}
              </p>
            )}

          <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginBottom: '28px' }}>
            {isFr
              ? 'Le bouton PDF ouvre la fenêtre d’impression : choisissez « Enregistrer au format PDF » comme destination.'
              : 'The PDF button opens the print dialog: choose “Save as PDF” as the destination.'}
          </p>

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

          {/* ── print-only version ── */}
          <div id="brief-print" aria-hidden="true">
            <h1 className="bp-title">
              {isFr ? 'Demande de projet' : 'Project request'}
            </h1>
            <p className="bp-meta">
              {(answers.company as string) || (answers.name as string) || ''}
              {((answers.company as string) || (answers.name as string)) ? ' · ' : ''}
              {new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            {briefBlocks.map((b) => (
              <div className="bp-block" key={b.title}>
                <h2 className="bp-h2">{b.title}</h2>
                {b.rows.map((r, i) => (
                  <div className="bp-row" key={`${b.title}-${i}`}>
                    {r.q ? <span className="bp-q">{r.q}</span> : null}
                    <span className="bp-a">{r.a}</span>
                  </div>
                ))}
              </div>
            ))}

            <p className="bp-foot">
              Djovany Levasseur · djovanylevasseur.com · {EMAIL} · +509 4844 9536
            </p>
          </div>
        </div>

        <style>{`
          #brief-print { display: none; }

          @media print {
            body * { visibility: hidden; }
            #brief-print, #brief-print * { visibility: visible; }
            #brief-print {
              display: block;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0 8mm;
              color: #111;
              background: #fff;
              font-family: Inter, system-ui, sans-serif;
              font-size: 10.5pt;
              line-height: 1.5;
            }
            .bp-title {
              font-size: 20pt;
              font-weight: 800;
              letter-spacing: -0.02em;
              margin: 0 0 4pt;
              color: #111;
            }
            .bp-meta {
              font-size: 9pt;
              color: #666;
              margin: 0 0 16pt;
              padding-bottom: 10pt;
              border-bottom: 1.5pt solid #111;
            }
            .bp-block { margin-bottom: 16pt; page-break-inside: avoid; }
            .bp-h2 {
              font-size: 8.5pt;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #555;
              margin: 0 0 7pt;
              padding-bottom: 4pt;
              border-bottom: 0.5pt solid #ccc;
            }
            .bp-row {
              margin-bottom: 7pt;
              page-break-inside: avoid;
            }
            .bp-q {
              display: block;
              font-size: 8.5pt;
              color: #777;
              margin-bottom: 1pt;
            }
            .bp-a {
              display: block;
              font-size: 10.5pt;
              color: #111;
            }
            .bp-foot {
              margin-top: 20pt;
              padding-top: 8pt;
              border-top: 0.5pt solid #ccc;
              font-size: 8pt;
              color: #777;
            }
            @page { margin: 16mm 12mm; }
          }
        `}</style>
      </section>
    );
  }

  const isFirst = step === 0;
  const isContact = step === sections.length + 1;
  const current = !isFirst && !isContact ? sections[step - 1] : null;
  const canGoNext = isFirst ? tracks.length > 0 : true;

  // Table of contents — one entry per step, clickable once tracks are picked
  const toc: { i: number; title: string }[] = [
    { i: 0, title: isFr ? 'Votre projet' : 'Your project' },
    ...sections.map((s, idx) => ({ i: idx + 1, title: say(s.title) })),
    { i: sections.length + 1, title: isFr ? 'Comment vous joindre' : 'How to reach you' },
  ];

  return (
    <section style={{ padding: '120px 24px 80px' }}>
      <div
        className="start-layout"
        style={{
          maxWidth: '1060px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >

        {/* ── table of contents ── */}
        <nav
          className="start-toc"
          style={{ position: 'sticky', top: '110px' }}
          aria-label={isFr ? 'Sommaire' : 'Contents'}
        >
          <p
            className="eyebrow"
            style={{ marginBottom: '18px', fontSize: '0.65rem' }}
          >
            {isFr ? 'Sommaire' : 'Contents'}
          </p>

          <div className="start-toc-scroll">
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '2px' }}>
            {toc.map((item) => {
              const active = item.i === step;
              const locked = item.i > 0 && tracks.length === 0;
              return (
                <li key={item.i}>
                  <button
                    type="button"
                    disabled={locked}
                    onClick={() => !locked && setStep(item.i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: active ? 'rgba(0, 212, 255, 0.08)' : 'transparent',
                      border: 'none',
                      borderLeft: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      padding: '9px 14px',
                      color: active ? 'var(--accent)' : locked ? 'var(--text-dim)' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: active ? 600 : 400,
                      fontFamily: 'Inter, sans-serif',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.45 : 1,
                      transition: 'all 0.2s',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ol>
          </div>

          {tracks.length === 0 && (
            <p
              style={{
                color: 'var(--text-dim)',
                fontSize: '0.72rem',
                marginTop: '16px',
                paddingLeft: '14px',
                lineHeight: 1.5,
              }}
            >
              {isFr
                ? 'Choisissez ce que vous voulez construire pour débloquer les sections.'
                : 'Pick what you want to build to unlock the sections.'}
            </p>
          )}
        </nav>

        {/* ── form column ── */}
        <div style={{ minWidth: 0 }}>

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
                ? 'Cochez ce qui vous concerne. Vous ne verrez que les questions utiles — et seules vos coordonnées sont obligatoires.'
                : 'Tick what applies. You will only see the questions that matter — and only your contact details are required.'}
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

            {showErrors && missing.length > 0 && (
              <p
                style={{
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  marginTop: '-6px',
                  marginBottom: '8px',
                }}
              >
                {isFr
                  ? 'Vérifiez votre nom, votre email et votre téléphone pour que je puisse vous répondre.'
                  : 'Please check your name, email and phone so I can get back to you.'}
              </p>
            )}
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
            <button
              type="button"
              onClick={() => {
                if (missing.length > 0) {
                  setShowErrors(true);
                  return;
                }
                setShowErrors(false);
                setDone(true);
              }}
              style={{ ...btn(true), opacity: missing.length > 0 ? 0.45 : 1 }}
            >
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
      </div>

      <style>{`
        .start-layout,
        .start-toc,
        .start-toc-scroll,
        .start-toc ol {
          min-width: 0;
        }

        @media (max-width: 900px) {
          .start-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .start-toc {
            position: static !important;
            width: 100%;
            border-bottom: 1px solid var(--border);
            padding-bottom: 20px;
          }
          .start-toc-scroll {
            position: relative;
          }
          .start-toc-scroll::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 6px;
            width: 36px;
            pointer-events: none;
            background: linear-gradient(to right, transparent, var(--bg) 85%);
          }
          .start-toc ol {
            display: flex !important;
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            gap: 6px !important;
            padding-bottom: 6px !important;
            padding-right: 28px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .start-toc ol::-webkit-scrollbar { display: none; }
          .start-toc li { flex: 0 0 auto; }
          .start-toc button {
            white-space: nowrap;
            border-left: none !important;
            border-bottom: 2px solid var(--border);
            border-radius: 0;
          }
        }
      `}</style>
    </section>
  );
}
