'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/content/site';
import { Icon } from '@/components/primitives';
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === 'Tab') {
        const links = panel.current?.querySelectorAll<HTMLAnchorElement>('a');
        if (!links?.length) return;
        const first = links[0],
          last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          trigger.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="utility">
        <div className="container">
          <span>
            <Icon name="location" />
            Kolar, Karnataka
          </span>
          <div className="utility-actions">
            <Link
              className="utility-proposals"
              href="/funding#proposals"
              aria-label="Funding proposals"
            >
              <Icon name="file-text" />
              <span>Proposals</span>
            </Link>
            <Link href="/contact">
              <Icon name="phone" />
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="main-nav container">
        <Link href="/" className="brand" aria-label="Antharagange Rural Hospital home">
          <img
            src="/media/support/brand/wordmark-concept.svg"
            alt="Antharagange Rural Hospital & Research Institute"
            width="310"
            height="58"
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((n) => (
            <div className="nav-group" key={n.href}>
              <Link
                className={path.startsWith(n.href) ? 'current' : ''}
                href={n.href}
                aria-current={path === n.href ? 'page' : undefined}
              >
                {n.label}
                <span className="chevron">⌄</span>
              </Link>
              <div className="nav-dropdown">
                {n.children.map((c) => (
                  <Link key={c.href} href={c.href}>
                    {c.label}
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <Link href="/funding" className="button button--teal nav-partner">
          Partner with Us <span aria-hidden="true">→</span>
        </Link>
        <button
          className="menu-toggle"
          ref={trigger}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : <Icon name="menu" />}
        </button>
      </div>
      {open && (
        <nav
          ref={panel}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map((n) => (
            <div key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                {n.label}
                <span>→</span>
              </Link>
              {n.children.map((c) => (
                <Link
                  key={c.href}
                  className="mobile-sub"
                  href={c.href}
                  onClick={() => setOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            className="mobile-proposals"
            href="/funding#proposals"
            onClick={() => setOpen(false)}
          >
            Funding proposals <span>15 programmes →</span>
          </Link>
          <Link href="/funding" onClick={() => setOpen(false)}>
            Partner with Us →
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact & Collaborate →
          </Link>
        </nav>
      )}
    </header>
  );
}
