'use server';

import nodemailer from 'nodemailer';
import {
  TRACKS,
  SECTIONS,
  CONTACT_FIELDS,
  sectionsFor,
  fieldError,
  isValidEmail,
  type TrackId,
} from '@/lib/brief';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

/** Where briefs land. Override with MAIL_TO in the environment. */
const OWNER_EMAIL = process.env.MAIL_TO ?? 'djovanylevasseur93@gmail.com';

/**
 * Gmail needs an App Password, not the account password.
 * Enable 2-step verification, then create one under
 * Google Account > Security > App passwords.
 *
 * .env.local
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=465
 *   SMTP_USER=djovanylevasseur93@gmail.com
 *   SMTP_PASS=xxxxxxxxxxxxxxxx
 *   MAIL_TO=djovanylevasseur93@gmail.com
 */
function transporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type BriefPayload = {
  locale: string;
  tracks: TrackId[];
  answers: Record<string, string | string[]>;
  /** Hidden field. Real people leave it empty; bots fill it. */
  website?: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'not_configured' | 'send_failed' | 'rejected' };

/* ------------------------------------------------------------------ */
/* Basic in-memory throttle. Resets on cold start, which is fine —      */
/* it is a speed bump, not a security control.                         */
/* ------------------------------------------------------------------ */

const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function throttled(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  recent.set(key, hits);
  return false;
}

/* ------------------------------------------------------------------ */
/* Brief building — rebuilt server side, never trusted from the client */
/* ------------------------------------------------------------------ */

type Block = { title: string; rows: { q: string; a: string }[] };

function buildBlocks(payload: BriefPayload): Block[] {
  const isFr = payload.locale === 'fr';
  const pick = (l: { fr: string; en: string }) => (isFr ? l.fr : l.en);
  const blocks: Block[] = [];

  const picked = TRACKS.filter((t) => payload.tracks.includes(t.id)).map((t) => pick(t.label));
  if (picked.length) {
    blocks.push({
      title: isFr ? 'Ce que je veux' : 'What I want',
      rows: picked.map((p) => ({ q: '', a: p })),
    });
  }

  const secs = [
    ...sectionsFor(payload.tracks).map((s) => ({ title: pick(s.title), fields: s.fields })),
    { title: isFr ? 'Coordonnées' : 'Contact details', fields: CONTACT_FIELDS },
  ];

  secs.forEach((sec) => {
    const rows = sec.fields
      .map((f) => {
        const v = payload.answers[f.id];
        const text = Array.isArray(v) ? v.join(', ') : (v ?? '').toString().trim();
        return text ? { q: pick(f.label), a: text } : null;
      })
      .filter((x): x is { q: string; a: string } => x !== null);

    if (rows.length) blocks.push({ title: sec.title, rows });
  });

  return blocks;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function toText(blocks: Block[]): string {
  return blocks
    .map((b) => [b.title.toUpperCase(), ...b.rows.map((r) => (r.q ? `- ${r.q} : ${r.a}` : `- ${r.a}`))].join('\n'))
    .join('\n\n');
}

function toHtml(blocks: Block[], isFr: boolean): string {
  const body = blocks
    .map(
      (b) => `
      <div style="margin-bottom:22px">
        <div style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                    color:#667;border-bottom:1px solid #dde;padding-bottom:5px;margin-bottom:9px">
          ${escapeHtml(b.title)}
        </div>
        ${b.rows
          .map(
            (r) => `
          <div style="margin-bottom:9px">
            ${r.q ? `<div style="font-size:12px;color:#889">${escapeHtml(r.q)}</div>` : ''}
            <div style="font-size:14px;color:#111">${escapeHtml(r.a).replace(/\n/g, '<br>')}</div>
          </div>`
          )
          .join('')}
      </div>`
    )
    .join('');

  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f6f8fa;
    font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:10px;padding:28px">
      <h1 style="font-size:20px;margin:0 0 4px;color:#0a0a0f">
        ${isFr ? 'Nouvelle demande de projet' : 'New project request'}
      </h1>
      <p style="font-size:12px;color:#889;margin:0 0 20px;padding-bottom:14px;border-bottom:2px solid #0a0a0f">
        djovanylevasseur.com/${isFr ? 'fr' : 'en'}/start
      </p>
      ${body}
    </div></body></html>`;
}

/* ------------------------------------------------------------------ */
/* The action                                                          */
/* ------------------------------------------------------------------ */

export async function sendBrief(payload: BriefPayload): Promise<SendResult> {
  // 1. Honeypot — bots fill hidden fields
  if (payload.website && payload.website.trim() !== '') {
    return { ok: false, error: 'rejected' };
  }

  // 2. Re-validate everything. The browser is not trusted.
  const invalid = CONTACT_FIELDS.some((f) => fieldError(f, payload.answers[f.id]) !== null);
  if (invalid) return { ok: false, error: 'validation' };

  const visitorEmail = (payload.answers.email ?? '').toString().trim();
  if (!isValidEmail(visitorEmail)) return { ok: false, error: 'validation' };

  if (!Array.isArray(payload.tracks) || payload.tracks.length === 0) {
    return { ok: false, error: 'validation' };
  }

  // Ignore any answer id that isn't part of the schema
  const knownIds = new Set([
    ...SECTIONS.flatMap((s) => s.fields.map((f) => f.id)),
    ...CONTACT_FIELDS.map((f) => f.id),
  ]);
  Object.keys(payload.answers).forEach((k) => {
    if (!knownIds.has(k)) delete payload.answers[k];
  });

  // 3. Throttle
  if (throttled(visitorEmail.toLowerCase())) {
    return { ok: false, error: 'rejected' };
  }

  // 4. Send
  const tx = transporter();
  if (!tx) return { ok: false, error: 'not_configured' };

  const isFr = payload.locale === 'fr';
  const blocks = buildBlocks(payload);
  const who = (payload.answers.company ?? payload.answers.name ?? visitorEmail).toString().trim();

  try {
    await tx.sendMail({
      // Must be your own address. Sending "from" the visitor fails SPF/DKIM.
      from: `"djovanylevasseur.com" <${process.env.SMTP_USER ?? OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: visitorEmail,
      subject: `${isFr ? 'Demande de projet' : 'Project request'} — ${who}`,
      text: toText(blocks),
      html: toHtml(blocks, isFr),
    });
    return { ok: true };
  } catch (err) {
    console.error('sendBrief failed:', err);
    // Never leak SMTP errors to the client
    return { ok: false, error: 'send_failed' };
  }
}
