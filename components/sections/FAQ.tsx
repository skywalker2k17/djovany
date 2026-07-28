'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FaqItem {
  q: { fr: string; en: string };
  a: { fr: string; en: string };
}

const FAQS: FaqItem[] = [
  {
    q: {
      fr: 'Où puis-je trouver vos services ?',
      en: 'Where can I find your services?',
    },
    a: {
      fr: 'Vous pouvez voir toute ma gamme de services dans la section Services du site.',
      en: 'You can see my full range of services in the Services section of this site.',
    },
  },
  {
    q: {
      fr: 'Combien de temps prend un projet ?',
      en: 'How long does a project take?',
    },
    a: {
      fr: 'Cela dépend de la complexité de votre projet. Les sites simples peuvent prendre quelques jours, tandis que les solutions plus importantes peuvent prendre quelques semaines. Je vise toujours une livraison rapide et de haute qualité.',
      en: 'It depends on the complexity of your project. Simple sites can take a few days, while larger solutions can take a few weeks. I always aim for fast, high-quality delivery.',
    },
  },
  {
    q: {
      fr: 'Offrez-vous un support continu ?',
      en: 'Do you offer ongoing support?',
    },
    a: {
      fr: 'Oui, je propose des plans de maintenance mensuelle et de support technique adaptés à vos besoins. Ceux-ci incluent des mises à jour régulières, des vérifications de performance, une surveillance de sécurité et des corrections rapides si nécessaire. Les plans de support sont payants et garantissent que votre projet fonctionne sans interruption. Note : tous les sites web ne nécessitent pas de support continu — cela dépend de vos objectifs et de votre configuration.',
      en: 'Yes, I offer monthly maintenance and technical support plans tailored to your needs. These include regular updates, performance checks, security monitoring and quick fixes when needed. Support plans are paid and ensure your project keeps running smoothly. Note: not every website needs ongoing support — it depends on your goals and setup.',
    },
  },
  {
    q: {
      fr: 'Puis-je obtenir un forfait personnalisé ?',
      en: 'Can I get a custom package?',
    },
    a: {
      fr: 'Absolument. Dites-moi ce que vous avez en tête, et je créerai un plan personnalisé qui correspond exactement à vos besoins.',
      en: 'Absolutely. Tell me what you have in mind, and I\'ll put together a custom plan that matches your needs exactly.',
    },
  },
  {
    q: {
      fr: 'Travaillez-vous avec des clients internationaux ?',
      en: 'Do you work with international clients?',
    },
    a: {
      fr: 'Oui, je collabore avec des clients du monde entier. Peu importe où vous êtes, nous pouvons travailler ensemble de manière fluide grâce à la communication en ligne et à une planification flexible.',
      en: 'Yes, I work with clients from all over the world. No matter where you are, we can collaborate smoothly through online communication and flexible scheduling.',
    },
  },
  {
    q: {
      fr: 'Pouvez-vous récupérer des comptes ou sites piratés ?',
      en: 'Can you recover hacked accounts or websites?',
    },
    a: {
      fr: 'Oui, j\'offre des services de récupération pour les comptes et sites web piratés, incluant des audits de sécurité, des réinitialisations de mot de passe et la sécurisation de votre présence numérique. À noter : la récupération n\'est pas garantie à 100 %, le résultat dépend du type d\'attaque, de la plateforme concernée et de la rapidité d\'intervention.',
      en: 'Yes, I offer recovery services for hacked accounts and websites, including security audits, password resets and securing your digital presence. Note: recovery is not 100% guaranteed — the outcome depends on the type of attack, the platform involved and how quickly we act.',
    },
  },
  {
    q: {
      fr: 'Comment puis-je vous contacter rapidement ?',
      en: 'How can I reach you quickly?',
    },
    a: {
      fr: 'Vous pouvez me joindre par email à djovanylevasseur93@gmail.com ou sur WhatsApp.',
      en: 'You can reach me by email at djovanylevasseur93@gmail.com or on WhatsApp.',
    },
  },
];

export default function FAQ({ locale }: { locale: string }) {
  const t = useTranslations('faq');
  const isFr = locale === 'fr';
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ marginBottom: '16px' }}>
          {t('label')}
        </p>
        <h2
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            letterSpacing: '-0.025em',
            margin: '0 0 40px',
          }}
        >
          {t('title')}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q.en}
                className="card-border"
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--text)',
                  }}
                >
                  <span>{isFr ? item.q.fr : item.q.en}</span>
                  <span
                    style={{
                      color: 'var(--accent)',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    style={{
                      margin: 0,
                      padding: '0 24px 20px',
                      color: 'var(--text-muted)',
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {isFr ? item.a.fr : item.a.en}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
