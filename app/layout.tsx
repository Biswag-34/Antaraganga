import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import { SiteStructuredData } from '@/components/seo';
import { seoConfig } from '@/lib/seo';
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
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: 'Antharagange Rural Hospital | Healing closer to home',
    template: '%s | Antharagange Rural Hospital',
  },
  description:
    'Compassionate healthcare for rural families and people with disabilities in Kolar, Karnataka. Explore care, community programmes and institutional partnerships.',
  icons: {
    icon: [{ url: '/media/support/brand/favicon.svg', type: 'image/svg+xml' }],
    apple: [
      { url: '/media/support/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
        <SiteStructuredData />
      </body>
    </html>
  );
}
