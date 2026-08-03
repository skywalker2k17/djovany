export type FilterCat = 'all' | 'web' | 'marketing' | 'support';

export interface Service {
  icon: string;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  plain?: { fr: string; en: string };
  tags: string[];
  category: Exclude<FilterCat, 'all'>;
  popular?: boolean;
}

export const FILTERS: { id: FilterCat; fr: string; en: string }[] = [
  { id: 'all', fr: 'Tout voir', en: 'All Services' },
  { id: 'web', fr: 'Web & Dev', en: 'Web & Dev' },
  { id: 'marketing', fr: 'Marketing', en: 'Marketing' },
  { id: 'support', fr: 'Support Tech', en: 'Tech Support' },
];

export const SERVICES: Service[] = [
  {
    icon: '⬡',
    title: { fr: 'Développement SaaS', en: 'SaaS Development' },
    desc: {
      fr: 'Plateformes SaaS complètes — architecture Turborepo, auth Supabase, paiements MonCash / Stripe, dashboard admin.',
      en: 'Complete SaaS platforms — Turborepo architecture, Supabase auth, MonCash / Stripe payments, admin dashboard.',
    },
    plain: {
      fr: 'Vos clients réservent et paient en ligne, vous suivez tout depuis un tableau de bord.',
      en: 'Your customers book and pay online, you track everything from one dashboard.',
    },
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Turborepo'],
    category: 'web',
    popular: true,
  },
  {
    icon: '◈',
    title: { fr: 'Site Web & Landing Page', en: 'Website & Landing Page' },
    desc: {
      fr: 'Sites rapides, SEO-optimisés, mobile-first. De la landing page au site multi-pages avec CMS intégré.',
      en: 'Fast, SEO-optimized, mobile-first sites. From landing pages to multi-page sites with integrated CMS.',
    },
    plain: {
      fr: 'Un site rapide et beau qui vous fait trouver sur Google, même depuis un téléphone.',
      en: 'A fast, attractive site that helps people find you on Google, even from a phone.',
    },
    tags: ['Next.js', 'WordPress', 'Tailwind CSS', 'SEO'],
    category: 'web',
  },
  {
    icon: '◉',
    title: { fr: 'Application Mobile', en: 'Mobile App' },
    desc: {
      fr: 'Apps React Native / Expo pour iOS et Android. AdMob, push notifications, publication App Store & Play Store.',
      en: 'React Native / Expo apps for iOS and Android. AdMob, push notifications, App Store & Play Store publishing.',
    },
    plain: {
      fr: 'Une application pour iPhone et Android, publiée dans les magasins d\'applications officiels.',
      en: 'An app for iPhone and Android, published on the official app stores.',
    },
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
    category: 'web',
  },
  {
    icon: '📈',
    title: { fr: 'SEO & Marketing Digital', en: 'SEO & Digital Marketing' },
    desc: {
      fr: 'Référencement naturel, Google Ads, Facebook Ads et gestion des réseaux sociaux. Stratégie complète pour votre croissance.',
      en: 'SEO, Google Ads, Facebook Ads and social media management. Complete strategy for your growth.',
    },
    plain: {
      fr: 'Plus de clients vous trouvent en ligne et sur les réseaux sociaux grâce à des publicités ciblées.',
      en: 'More customers find you online and on social media through targeted ads.',
    },
    tags: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics'],
    category: 'marketing',
  },
  {
    icon: '✎',
    title: { fr: 'Contenu & Stratégie', en: 'Content & Strategy' },
    desc: {
      fr: 'Rédaction du contenu de votre site page par page, structure, analyse concurrentielle et positionnement. Livré prêt à intégrer, même si vous avez déjà un développeur.',
      en: 'Website copy written page by page, site structure, competitor analysis and positioning. Delivered ready to build — even if you already have a developer.',
    },
    plain: {
      fr: 'On écrit les textes de votre site, prêts à utiliser, même si quelqu\'un d\'autre le construit.',
      en: 'We write your website text, ready to use, even if someone else is building it.',
    },
    tags: ['Copywriting', 'Structure', 'Competitor Analysis', 'Positioning'],
    category: 'marketing',
  },
  {
    icon: '🎵',
    title: { fr: 'Technologie Musicale & Droits', en: 'Music Tech & Rights' },
    desc: {
      fr: 'Distribution numérique, protection des droits d\'auteur, collecte de royalties et stratégie de promotion artistique.',
      en: 'Digital distribution, copyright protection, royalty collection and artistic promotion strategy.',
    },
    plain: {
      fr: 'Votre musique diffusée partout, vos droits protégés, et l\'argent qui vous revient collecté pour vous.',
      en: 'Your music released everywhere, your rights protected, and the money owed to you collected for you.',
    },
    tags: ['Distribution', 'Copyright', 'Royalties', 'Promotion'],
    category: 'marketing',
  },
  {
    icon: '🖥️',
    title: { fr: 'Maintenance & Support', en: 'Maintenance & Support' },
    desc: {
      fr: 'Optimisation PC, suppression de virus, mises à jour logicielles et monitoring mensuel de vos projets web.',
      en: 'PC optimization, virus removal, software updates and monthly monitoring of your web projects.',
    },
    plain: {
      fr: 'Votre ordinateur nettoyé et rapide, votre site web surveillé chaque mois pour éviter les pannes.',
      en: 'Your computer cleaned and fast, your website checked every month to prevent problems.',
    },
    tags: ['Monitoring', 'Optimization', 'Updates', 'Performance'],
    category: 'support',
  },
  {
    icon: '🔒',
    title: { fr: 'Cybersécurité', en: 'Cybersecurity' },
    desc: {
      fr: 'Audits de sécurité, suppression de malware, tests de pénétration et formation à la sécurité informatique.',
      en: 'Security audits, malware removal, penetration testing and cybersecurity training.',
    },
    plain: {
      fr: 'On vérifie que votre entreprise est protégée contre le piratage et on répare les failles trouvées.',
      en: 'We check that your business is protected from hacking and fix any weaknesses found.',
    },
    tags: ['Pentesting', 'Audit', 'Malware', 'Training'],
    category: 'support',
  },
  {
    icon: '🔑',
    title: { fr: 'Récupération de Compte', en: 'Account Recovery' },
    desc: {
      fr: 'Récupération de comptes email, réseaux sociaux et plateformes piratés ou verrouillés. Mise en place d\'une sécurité renforcée.',
      en: 'Recovery of hacked or locked email, social media and platform accounts. Enhanced security setup.',
    },
    plain: {
      fr: 'On vous redonne l\'accès à votre email ou vos réseaux sociaux piratés ou bloqués, en sécurité.',
      en: 'We get you back into your hacked or locked email or social media accounts, safely.',
    },
    tags: ['Email', 'Social Media', '2FA', 'Security'],
    category: 'support',
  },
  {
    icon: '📲',
    title: { fr: 'Réparation Téléphone', en: 'Phone Repair' },
    desc: {
      fr: 'Diagnostic logiciel et hardware, récupération de données, mise à jour firmware et optimisation des performances.',
      en: 'Software and hardware diagnostics, data recovery, firmware updates and performance optimization.',
    },
    plain: {
      fr: 'Votre téléphone réparé, vos photos et données récupérées, votre appareil qui fonctionne comme neuf.',
      en: 'Your phone fixed, your photos and data recovered, your device working like new again.',
    },
    tags: ['Diagnostic', 'Data Recovery', 'Firmware', 'Performance'],
    category: 'support',
  },
];
