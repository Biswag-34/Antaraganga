import Link from 'next/link';
import { brandLogo } from '@/content/site';

export default function SiteLogo({ className }: { className: string }) {
  return (
    <Link href="/" className={`site-logo ${className}`} aria-label="ARHRI home">
      <img {...brandLogo} alt="Antaraganga Rural Hospital and Research Institute" />
    </Link>
  );
}
