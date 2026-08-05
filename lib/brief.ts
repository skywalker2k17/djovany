export type Lang = 'fr' | 'en';
export type L = { fr: string; en: string };

/** What the visitor wants to build. Drives which sections are shown. */
export type TrackId = 'website' | 'app' | 'seo' | 'shop' | 'ads' | 'custom' | 'unsure';

export const TRACKS: { id: TrackId; label: L; hint: L }[] = [
  {
    id: 'website',
    label: { fr: 'Un site web', en: 'A website' },
    hint: { fr: 'Vitrine, landing page, multi-pages', en: 'Landing page or multi-page site' },
  },
  {
    id: 'app',
    label: { fr: 'Une application mobile', en: 'A mobile app' },
    hint: { fr: 'iPhone, Android, ou les deux', en: 'iPhone, Android, or both' },
  },
  {
    id: 'shop',
    label: { fr: 'Vendre en ligne', en: 'Sell online' },
    hint: { fr: 'Boutique, panier, paiements', en: 'Store, cart, payments' },
  },
  {
    id: 'seo',
    label: { fr: 'Être trouvé sur Google', en: 'Get found on Google' },
    hint: { fr: 'Référencement local et marketing', en: 'Local search and marketing' },
  },
  {
    id: 'ads',
    label: { fr: 'Gagner de l\u2019argent avec la publicité', en: 'Earn from ads' },
    hint: { fr: 'AdSense, AdMob', en: 'AdSense, AdMob' },
  },
  {
    id: 'custom',
    label: { fr: 'Une plateforme sur mesure', en: 'A custom platform' },
    hint: { fr: 'Espace client, tableau de bord, gestion', en: 'Client portal, dashboard, internal tools' },
  },
  {
    id: 'unsure',
    label: { fr: 'Je ne sais pas encore', en: 'Not sure yet' },
    hint: { fr: 'On en discute ensemble', en: 'Let\u2019s talk it through' },
  },
];

export type Field =
  | {
      kind: 'text';
      id: string;
      label: L;
      placeholder?: L;
      required?: boolean;
      validate?: 'email' | 'phone';
    }
  | { kind: 'area'; id: string; label: L; placeholder?: L; required?: boolean }
  | { kind: 'choice'; id: string; label: L; options: L[]; required?: boolean }
  | { kind: 'multi'; id: string; label: L; options: L[]; required?: boolean }
  | { kind: 'note'; id: string; label: L };

export interface Section {
  id: string;
  title: L;
  intro?: L;
  /** Shown only if one of these tracks is selected. Empty = always shown. */
  requires: TrackId[];
  fields: Field[];
}

export const SECTIONS: Section[] = [
  /* ── always ── */
  {
    id: 'business',
    title: { fr: 'Votre activité', en: 'Your business' },
    requires: [],
    fields: [
      {
        kind: 'text',
        id: 'company',
        label: { fr: 'Nom de l\u2019entreprise', en: 'Business name' },
      },
      {
        kind: 'area',
        id: 'what',
        label: {
          fr: 'Que faites-vous exactement ?',
          en: 'What do you do, exactly?',
        },
        placeholder: {
          fr: '2 ou 3 phrases simples suffisent',
          en: 'Two or three plain sentences is enough',
        },
      },
      {
        kind: 'text',
        id: 'since',
        label: { fr: 'Depuis combien de temps ?', en: 'How long have you been running?' },
      },
      {
        kind: 'text',
        id: 'existing',
        label: {
          fr: 'Avez-vous déjà un site ou une application ? Le lien',
          en: 'Do you already have a site or app? The link',
        },
      },
    ],
  },
  {
    id: 'clients',
    title: { fr: 'Vos clients', en: 'Your customers' },
    requires: [],
    fields: [
      {
        kind: 'area',
        id: 'who',
        label: { fr: 'Qui sont vos clients types ?', en: 'Who are your typical customers?' },
      },
      {
        kind: 'text',
        id: 'where',
        label: { fr: 'Où habitent-ils ?', en: 'Where are they based?' },
      },
      {
        kind: 'multi',
        id: 'langs',
        label: { fr: 'Dans quelle langue leur parlez-vous ?', en: 'What language do you speak to them in?' },
        options: [
          { fr: 'Français', en: 'French' },
          { fr: 'Anglais', en: 'English' },
          { fr: 'Créole', en: 'Creole' },
          { fr: 'Espagnol', en: 'Spanish' },
        ],
      },
      {
        kind: 'area',
        id: 'why',
        label: {
          fr: 'Pourquoi vous choisissent-ils plutôt qu\u2019un concurrent ?',
          en: 'Why do they choose you over a competitor?',
        },
      },
    ],
  },

  /* ── website ── */
  {
    id: 'site',
    title: { fr: 'Votre site', en: 'Your website' },
    requires: ['website', 'shop', 'seo'],
    fields: [
      {
        kind: 'multi',
        id: 'pages',
        label: { fr: 'Quelles pages voulez-vous ?', en: 'Which pages do you want?' },
        options: [
          { fr: 'Accueil', en: 'Home' },
          { fr: 'À propos', en: 'About' },
          { fr: 'Services', en: 'Services' },
          { fr: 'Réalisations', en: 'Portfolio' },
          { fr: 'Témoignages', en: 'Testimonials' },
          { fr: 'Blog', en: 'Blog' },
          { fr: 'Contact', en: 'Contact' },
          { fr: 'Autre', en: 'Other' },
        ],
      },
      {
        kind: 'text',
        id: 'pagesOther',
        label: {
          fr: 'Si autre, quelles pages ?',
          en: 'If other, which pages?',
        },
        placeholder: {
          fr: 'Tarifs, FAQ, Recrutement, Zone desservie…',
          en: 'Pricing, FAQ, Careers, Service area…',
        },
      },
      {
        kind: 'multi',
        id: 'features',
        label: { fr: 'Quelles fonctions ?', en: 'Which features?' },
        options: [
          { fr: 'Formulaire de contact', en: 'Contact form' },
          { fr: 'Demande de devis', en: 'Quote request' },
          { fr: 'Bouton d\u2019appel direct', en: 'Tap to call' },
          { fr: 'Prise de rendez-vous', en: 'Online booking' },
          { fr: 'Paiement en ligne', en: 'Online payments' },
          { fr: 'Galerie avant / après', en: 'Before / after gallery' },
          { fr: 'Site bilingue', en: 'Bilingual site' },
          { fr: 'Autre', en: 'Other' },
        ],
      },
      {
        kind: 'text',
        id: 'featuresOther',
        label: {
          fr: 'Si autre, quelles fonctions ?',
          en: 'If other, which features?',
        },
        placeholder: {
          fr: 'Espace client, chat, newsletter, carte…',
          en: 'Client portal, chat, newsletter, map…',
        },
      },
      {
        kind: 'choice',
        id: 'selfedit',
        label: {
          fr: 'Voulez-vous modifier vos textes vous-même après la livraison ?',
          en: 'Do you want to edit your own text after delivery?',
        },
        options: [
          { fr: 'Oui', en: 'Yes' },
          { fr: 'Non', en: 'No' },
          { fr: 'Je ne sais pas', en: 'Not sure' },
        ],
      },
      {
        kind: 'choice',
        id: 'content',
        label: {
          fr: 'Avez-vous les textes et les photos ?',
          en: 'Do you have the text and photos ready?',
        },
        options: [
          { fr: 'Oui, tout est prêt', en: 'Yes, everything is ready' },
          { fr: 'Une partie seulement', en: 'Some of it' },
          { fr: 'Non, j\u2019aurais besoin d\u2019aide', en: 'No, I would need help' },
        ],
      },
    ],
  },

  /* ── mobile app ── */
  {
    id: 'app',
    title: { fr: 'Votre application', en: 'Your app' },
    intro: {
      fr: 'Une application a du sens si vos clients reviennent souvent, ou si vos équipes en ont besoin sur le terrain.',
      en: 'An app makes sense when customers come back regularly, or when your crew needs a tool in the field.',
    },
    requires: ['app'],
    fields: [
      {
        kind: 'multi',
        id: 'platforms',
        label: { fr: 'Sur quelles plateformes ?', en: 'Which platforms?' },
        options: [
          { fr: 'iPhone seulement', en: 'iPhone only' },
          { fr: 'Android seulement', en: 'Android only' },
          { fr: 'Les deux', en: 'Both' },
          { fr: 'Je ne sais pas encore', en: 'Not sure yet' },
        ],
      },
      {
        kind: 'choice',
        id: 'appfor',
        label: { fr: 'À qui sert l\u2019application ?', en: 'Who is the app for?' },
        options: [
          { fr: 'À mes clients', en: 'My customers' },
          { fr: 'À mes équipes', en: 'My team' },
          { fr: 'Aux deux', en: 'Both' },
        ],
      },
      {
        kind: 'multi',
        id: 'appfeatures',
        label: { fr: 'Quelles fonctions ?', en: 'Which features?' },
        options: [
          { fr: 'Comptes et connexion', en: 'Accounts and login' },
          { fr: 'Réservation ou commande', en: 'Booking or ordering' },
          { fr: 'Paiement dans l\u2019app', en: 'In-app payments' },
          { fr: 'Notifications push', en: 'Push notifications' },
          { fr: 'Fonctionne hors connexion', en: 'Works offline' },
          { fr: 'Plannings et check-lists', en: 'Schedules and checklists' },
        ],
      },
    ],
  },

  /* ── shop ── */
  {
    id: 'shop',
    title: { fr: 'Votre boutique', en: 'Your store' },
    requires: ['shop'],
    fields: [
      {
        kind: 'text',
        id: 'products',
        label: { fr: 'Combien de produits environ ?', en: 'Roughly how many products?' },
      },
      {
        kind: 'choice',
        id: 'variants',
        label: {
          fr: 'Vos produits ont-ils des variantes ? (tailles, couleurs)',
          en: 'Do products have variants? (sizes, colours)',
        },
        options: [
          { fr: 'Oui', en: 'Yes' },
          { fr: 'Non', en: 'No' },
        ],
      },
      {
        kind: 'text',
        id: 'shipping',
        label: { fr: 'Livrez-vous ? Dans quelle zone', en: 'Do you deliver? Where to' },
      },
      {
        kind: 'text',
        id: 'sellingnow',
        label: {
          fr: 'Vendez-vous déjà en ligne quelque part ?',
          en: 'Do you already sell online anywhere?',
        },
      },
    ],
  },

  /* ── seo ── */
  {
    id: 'found',
    title: { fr: 'Être trouvé sur Google', en: 'Getting found on Google' },
    intro: {
      fr: 'Un site que personne ne trouve reste une brochure. Cette section sert à faire en sorte que les gens tombent sur vous au moment où ils cherchent ce que vous faites — sans payer de publicité.\n\nConcrètement : quand quelqu’un tape « nettoyage bureau Tampa », Google affiche d’abord une carte avec trois entreprises locales. Y figurer dépend surtout de votre fiche Google Business, pas de votre site. C’est gratuit, et c’est souvent ce qui génère le plus d’appels.\n\nVos réponses ci-dessous me disent quels mots utiliser dans vos textes, quelles villes viser, et ce qu’il reste à créer. Si vous ne savez pas quoi répondre, laissez vide — on en parlera.',
      en: 'A site nobody finds is just a brochure. This section is about making sure people land on you at the moment they are searching for what you do — without paying for ads.\n\nIn practice: when someone types “office cleaning Tampa”, Google shows a map with three local businesses first. Appearing there depends mostly on your Google Business Profile, not on your website. It is free, and it is often what brings in the most calls.\n\nYour answers below tell me which words to use in your copy, which cities to target, and what is still missing. If you are not sure what to put, leave it blank — we will talk it through.',
    },
    requires: ['seo', 'website', 'shop'],
    fields: [
      {
        kind: 'area',
        id: 'keywords',
        label: {
          fr: 'Quels mots un client taperait-il pour vous trouver ?',
          en: 'What would a customer type to find you?',
        },
        placeholder: {
          fr: 'Écrivez comme parlent vos clients, pas comme parle votre métier',
          en: 'Write it the way your customers speak, not the way your trade speaks',
        },
      },
      {
        kind: 'text',
        id: 'area',
        label: {
          fr: 'Dans quelles villes voulez-vous apparaître ?',
          en: 'Which cities do you want to show up in?',
        },
      },
      {
        kind: 'multi',
        id: 'listings',
        label: { fr: 'Qu\u2019avez-vous déjà ?', en: 'What do you already have?' },
        options: [
          { fr: 'Fiche Google vérifiée', en: 'Verified Google profile' },
          { fr: 'Page Facebook', en: 'Facebook page' },
          { fr: 'Instagram', en: 'Instagram' },
          { fr: 'Avis clients en ligne', en: 'Online reviews' },
          { fr: 'Rien pour l\u2019instant', en: 'Nothing yet' },
        ],
      },
    ],
  },

  /* ── ads ── */
  {
    id: 'ads',
    title: { fr: 'Publicité et revenus', en: 'Ads and revenue' },
    intro: {
      fr: 'AdSense et AdMob ne fonctionnent pas dans tous les pays, et les moyens de paiement varient. Je vérifie ce qui est possible chez vous avant qu\u2019on prévoie quoi que ce soit.',
      en: 'AdSense and AdMob are not available everywhere, and payout methods vary by country. I check what is possible for yours before we plan anything.',
    },
    requires: ['ads'],
    fields: [
      {
        kind: 'multi',
        id: 'adwhere',
        label: { fr: 'Où voulez-vous des publicités ?', en: 'Where do you want ads?' },
        options: [
          { fr: 'Sur mon site (AdSense)', en: 'On my website (AdSense)' },
          { fr: 'Dans mon application (AdMob)', en: 'In my app (AdMob)' },
          { fr: 'Je veux surtout comprendre si ça vaut le coup', en: 'I mainly want to know if it is worth it' },
        ],
      },
      {
        kind: 'text',
        id: 'adcountry',
        label: {
          fr: 'Dans quel pays l\u2019entreprise est-elle enregistrée ?',
          en: 'Which country is the business registered in?',
        },
      },
      {
        kind: 'text',
        id: 'otherrevenue',
        label: {
          fr: 'Autres revenus prévus ? (abonnement, achat intégré)',
          en: 'Other revenue planned? (subscription, in-app purchase)',
        },
      },
    ],
  },

  /* ── custom ── */
  {
    id: 'custom',
    title: { fr: 'Votre plateforme', en: 'Your platform' },
    requires: ['custom'],
    fields: [
      {
        kind: 'area',
        id: 'problem',
        label: {
          fr: 'Quel problème la plateforme doit-elle résoudre ?',
          en: 'What problem should the platform solve?',
        },
      },
      {
        kind: 'text',
        id: 'users',
        label: {
          fr: 'Qui va l\u2019utiliser, et combien de personnes ?',
          en: 'Who will use it, and how many people?',
        },
      },
      {
        kind: 'text',
        id: 'tools',
        label: {
          fr: 'Quels outils utilisez-vous aujourd\u2019hui pour ça ?',
          en: 'What do you use for this today?',
        },
      },
    ],
  },

  /* ── always, last ── */
  {
    id: 'timing',
    title: { fr: 'Délais et inspirations', en: 'Timing and inspiration' },
    requires: [],
    fields: [
      {
        kind: 'choice',
        id: 'when',
        label: { fr: 'Quand aimeriez-vous démarrer ?', en: 'When would you like to start?' },
        options: [
          { fr: 'Dès que possible', en: 'As soon as possible' },
          { fr: 'Dans le mois', en: 'Within a month' },
          { fr: 'Dans les trois mois', en: 'Within three months' },
          { fr: 'Pas de date, je me renseigne', en: 'No date, just exploring' },
        ],
      },
      {
        kind: 'text',
        id: 'deadline',
        label: {
          fr: 'Une date limite ? Un événement lié au lancement ?',
          en: 'A deadline? An event tied to the launch?',
        },
      },
      {
        kind: 'area',
        id: 'inspiration',
        label: {
          fr: 'Des sites que vous aimez, et ce qui vous plaît dedans',
          en: 'Sites you like, and what you like about them',
        },
        placeholder: {
          fr: '« J\u2019aime leur menu et leurs grandes marges » aide plus que « j\u2019aime tout »',
          en: '"I like their menu and the white space" helps more than "I like everything"',
        },
      },
      {
        kind: 'area',
        id: 'anything',
        label: {
          fr: 'Autre chose que je devrais savoir ?',
          en: 'Anything else I should know?',
        },
      },
    ],
  },
];

export const CONTACT_FIELDS: Field[] = [
  { kind: 'text', id: 'name', label: { fr: 'Votre nom', en: 'Your name' }, required: true },
  {
    kind: 'text',
    id: 'email',
    label: { fr: 'Email', en: 'Email' },
    placeholder: { fr: 'nom@entreprise.com', en: 'name@company.com' },
    required: true,
    validate: 'email',
  },
  {
    kind: 'text',
    id: 'phone',
    label: { fr: 'Téléphone ou WhatsApp', en: 'Phone or WhatsApp' },
    placeholder: { fr: '+1 813 360 1760', en: '+1 813 360 1760' },
    required: true,
    validate: 'phone',
  },
  {
    kind: 'choice',
    id: 'prefer',
    label: { fr: 'Comment préférez-vous être contacté ?', en: 'How would you rather be contacted?' },
    options: [
      { fr: 'Email', en: 'Email' },
      { fr: 'WhatsApp', en: 'WhatsApp' },
      { fr: 'Appel', en: 'Phone call' },
    ],
  },
  {
    kind: 'choice',
    id: 'heard',
    label: {
      fr: 'Comment avez-vous entendu parler de moi ?',
      en: 'How did you hear about me?',
    },
    options: [
      { fr: 'Recommandation', en: 'A recommendation' },
      { fr: 'Recherche Google', en: 'Google search' },
      { fr: 'Facebook', en: 'Facebook' },
      { fr: 'Instagram', en: 'Instagram' },
      { fr: 'LinkedIn', en: 'LinkedIn' },
      { fr: 'TikTok', en: 'TikTok' },
      { fr: 'Un projet que vous avez réalisé', en: 'A project you built' },
      { fr: 'Autre', en: 'Other' },
    ],
  },
];

/** Sections shown for the chosen tracks, in order. */
export function sectionsFor(tracks: TrackId[]): Section[] {
  return SECTIONS.filter(
    (s) => s.requires.length === 0 || s.requires.some((r) => tracks.includes(r))
  );
}

/** Ids of the contact fields that must be filled before submitting. */
export const REQUIRED_CONTACT_IDS = CONTACT_FIELDS.filter(
  (f) => 'required' in f && f.required
).map((f) => f.id);

/* ------------------------------------------------------------------ */
/* Validation — shared by the client form and the server action.       */
/* Keep both sides using these, never trust the browser alone.         */
/* ------------------------------------------------------------------ */

/**
 * Deliberately strict. Rejects "123", "abcdef", "a@b", trailing dots,
 * consecutive dots, and anything without a real TLD.
 */
const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

export function isValidEmail(raw: string): boolean {
  const v = raw.trim();
  if (v.length < 6 || v.length > 254) return false;
  if (v.includes('..')) return false;
  const [local, domain] = v.split('@');
  if (!local || !domain) return false;
  if (local.length > 64) return false;
  if (domain.startsWith('-') || domain.endsWith('-')) return false;
  return EMAIL_RE.test(v);
}

/** Accepts +, digits, spaces, dots, dashes, parentheses. Needs 7 to 15 digits. */
export function isValidPhone(raw: string): boolean {
  const v = raw.trim();
  if (!/^[+()\-.\s\d]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** Returns an error key, or null when the value passes. */
export function fieldError(f: Field, raw: unknown): 'required' | 'email' | 'phone' | null {
  const value = Array.isArray(raw) ? raw.join(',') : (raw ?? '').toString().trim();
  const required = 'required' in f && f.required === true;

  if (!value) return required ? 'required' : null;
  if (!('validate' in f) || !f.validate) return null;
  if (f.validate === 'email') return isValidEmail(value) ? null : 'email';
  if (f.validate === 'phone') return isValidPhone(value) ? null : 'phone';
  return null;
}
