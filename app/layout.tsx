import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Djovany Levasseur — Full-Stack Developer',
  description: 'Full-Stack Developer & Designer. Next.js, TypeScript, Supabase, React Native.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
