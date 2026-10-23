import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import './globals.css';
const sans = localFont({
  src: '../public/media/support/fonts/DM-Sans-Variable.ttf',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 1000',
});
const serif = localFont({
  src: '../public/media/support/fonts/Source-Serif-4-Variable.ttf',
  variable: '--font-serif',
  display: 'swap',
  weight: '200 900',
});
export const metadata: Metadata = {
  title: {
    default: 'Antharagange Rural Hospital | Healing closer to home',
    template: '%s | Antharagange Rural Hospital',
  },
  description:
    'Compassionate healthcare for rural families and people with disabilities in Kolar, Karnataka. Explore care, community programmes and institutional partnerships.',
  icons: { icon: '/media/support/brand/favicon.svg' },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
