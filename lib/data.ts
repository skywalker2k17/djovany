export type Category =
  | 'all'
  | 'healthcare'
  | 'security'
  | 'ecommerce'
  | 'beauty'
  | 'photography'
  | 'music'
  | 'business'
  | 'education'
  | 'saas'
  | 'mobile';

export interface Project {
  slug: string;
  title: string;
  description: { fr: string; en: string };
  category: Category;
  tags: string[];
  url?: string;
  status?: 'live' | 'development' | 'unavailable';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'wellpax',
    title: 'WellPax',
    description: {
      fr: 'SaaS de suivi de colis Haïti–USA. Dashboard client, calculateur de fret, tracking en temps réel.',
      en: 'Haiti–USA package tracking SaaS. Client dashboard, freight calculator, real-time tracking.',
    },
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Turborepo', 'next-intl'],
    url: 'https://web-two-weld-75.vercel.app',
    status: 'live',
    featured: true,
  },
  {
    slug: 'chiccils',
    title: 'Chiccils',
    description: {
      fr: 'SaaS de réservation pour salon de beauté. Booking en ligne, gestion des slots, notifications email.',
      en: 'Beauty salon booking SaaS. Online booking, slot management, email notifications.',
    },
    category: 'beauty',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Turborepo', 'PWA'],
    url: 'https://chiccils.com',
    status: 'live',
    featured: true,
  },
  {
    slug: 'sarh',
    title: 'Centre Dentaire SARH',
    description: {
      fr: 'SaaS dentaire complet — clinique, pharmacie et école hygiéniste. Mode sombre/clair, sidebar rétractable.',
      en: 'Full dental SaaS — clinic, pharmacy and dental school. Dark/light mode, retractable sidebar.',
    },
    category: 'healthcare',
    tags: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    url: 'https://centredentairesarh.com',
    status: 'live',
    featured: true,
  },
  {
    slug: 'care-restore',
    title: 'Care & Restore',
    description: {
      fr: 'Plateforme SaaS de soins à domicile. Gestion patients, soignants, facturation et KPIs.',
      en: 'Homecare SaaS platform. Patient management, caregivers, billing and KPIs.',
    },
    category: 'healthcare',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Turborepo'],
    status: 'development',
    featured: true,
  },
  {
    slug: 'prime-home-care',
    title: 'Prime Home Care',
    description: {
      fr: 'Site vitrine pour services de soins à domicile premium.',
      en: 'Landing page for premium homecare services.',
    },
    category: 'healthcare',
    tags: ['WordPress'],
    url: 'https://primehome.care',
    status: 'live',
  },
  {
    slug: 'mci',
    title: 'Matching Caregivers Institute',
    description: {
      fr: 'Site éducatif pour institut de formation de soignants en Floride. HHA, CNA, CPR.',
      en: 'Educational site for Florida caregiver training institute. HHA, CNA, CPR.',
    },
    category: 'education',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'http://matchingcaregivers.institute',
    status: 'development',
  },
  {
    slug: 'jjs-imex',
    title: 'JJS IMEX',
    description: {
      fr: 'SaaS de shipping USA/Haïti/RD. God Mode Arsenal, audit logs, product scraper intégré.',
      en: 'USA/Haiti/DR shipping SaaS. God Mode Arsenal, audit logs, integrated product scraper.',
    },
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Turborepo'],
    url: 'https://jjsimex.com',
    status: 'live',
  },
  {
    slug: 'jdp-rentacar',
    title: 'JDP Rentacar',
    description: {
      fr: 'SaaS de location de voitures. Flotte, réservations, mode démo localStorage.',
      en: 'Car rental SaaS. Fleet management, bookings, localStorage demo mode.',
    },
    category: 'saas',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Turborepo'],
    status: 'development',
  },
  {
    slug: 'mb-tax-plus',
    title: 'MB Tax Plus',
    description: {
      fr: 'Site multi-services en Floride. Impôts, DNA Testing, Drug Testing, services administratifs.',
      en: 'Florida multi-service business site. Tax, DNA Testing, Drug Testing, admin services.',
    },
    category: 'business',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'development',
  },
  {
    slug: 'rtm',
    title: 'Radio Télé Tout Moun',
    description: {
      fr: 'Site de radio/TV en ligne. Lecteur Zenoradio live, YouTube player, gestion publicités.',
      en: 'Online radio/TV site. Live Zenoradio player, YouTube player, ad management.',
    },
    category: 'music',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://radiotoutmoun.com',
    status: 'live',
  },
  {
    slug: 'stockeasy',
    title: 'StockEasy',
    description: {
      fr: 'App mobile de gestion de stock. CRDT conflict resolution, compression RLE, backup Google Drive.',
      en: 'Mobile inventory management app. CRDT conflict resolution, RLE compression, Google Drive backup.',
    },
    category: 'mobile',
    tags: ['React Native', 'Expo', 'TypeScript'],
    status: 'live',
    url: 'https://apps.apple.com/app/id6767330659',
  },
  {
    slug: 'fingerprint-services',
    title: 'Fingerprint Services of South Florida',
    description: {
      fr: 'Site pour services d\'empreintes digitales et conformité sécuritaire en Floride.',
      en: 'Site for fingerprint services and security compliance in South Florida.',
    },
    category: 'security',
    tags: ['WordPress'],
    url: 'https://fingerprintservicesofsouthflorida.com',
    status: 'live',
  },
  {
    slug: 'synergy-real-tech',
    title: 'Synergy Real-Tech',
    description: {
      fr: 'Site WordPress pour agence de solutions technologiques.',
      en: 'WordPress site for technology solutions agency.',
    },
    category: 'business',
    tags: ['WordPress'],
    url: 'https://synergyreal-tech.net',
    status: 'live',
  },
  {
    slug: 'castdesign',
    title: 'CastDesign Studio',
    description: {
      fr: 'Portfolio de photographie professionnel. Design vibrant et moderne.',
      en: 'Professional photography portfolio. Vibrant and modern design.',
    },
    category: 'photography',
    tags: ['Next.js', 'Tailwind CSS'],
    url: 'https://castdesignstudio.com',
    status: 'live',
  },
  {
    slug: 'panoutchic-panou',
    title: 'PanoutchicPanou',
    description: {
      fr: 'Portfolio artiste et vitrine musicale.',
      en: 'Artist portfolio and music showcase.',
    },
    category: 'music',
    tags: ['WordPress'],
    url: 'https://panoutchicpanou.com',
    status: 'live',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'other';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
  // Backend
  { name: 'Supabase', icon: 'supabase', category: 'backend' },
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'backend' },
  // Mobile
  { name: 'React Native', icon: 'react', category: 'mobile' },
  { name: 'Expo', icon: 'expo', category: 'mobile' },
  // DevOps
  { name: 'Turborepo', icon: 'turborepo', category: 'devops' },
  { name: 'Vercel', icon: 'vercel', category: 'devops' },
  { name: 'Git', icon: 'git', category: 'devops' },
];
