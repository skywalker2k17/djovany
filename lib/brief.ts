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
    hint: { fr: 'iPhone et Android', en: 'iPhone and Android' },
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
  | { kind: 'text'; id: string; label: L; placeholder?: L }
  | { kind: 'area'; id: string; label: L; placeholder?: L }
  | { kind: 'choice'; id: string; label: L; options: L[] }
  | { kind: 'multi'; id: string; label: L; options: L[] }
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
        ],
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
        ],
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
          { fr: 'iPhone', en: 'iPhone' },
          { fr: 'Android', en: 'Android' },
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
  { kind: 'text', id: 'name', label: { fr: 'Votre nom', en: 'Your name' } },
  { kind: 'text', id: 'email', label: { fr: 'Email', en: 'Email' } },
  { kind: 'text', id: 'phone', label: { fr: 'Téléphone ou WhatsApp', en: 'Phone or WhatsApp' } },
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
