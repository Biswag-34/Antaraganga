'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/content/site';
import { Icon } from '@/components/primitives';
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const closeDesktop = () => {
    cancelClose();
    setActiveMenu(null);
  };
  const showMenu = (href: string) => {
    cancelClose();
    setActiveMenu(href);
  };
  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, [path]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveMenu(null);
        setOpen(false);
      }
    };
    const reset = () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setActiveMenu(null);
      setOpen(false);
    };
    let viewportWidth = window.innerWidth;
    const resize = () => {
      if (window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      reset();
    };
    document.addEventListener('pointerdown', dismiss);
    window.addEventListener('resize', resize);
    window.addEventListener('blur', reset);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', reset);
    };
  }, []);
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
    <header className="site-header" ref={header}>
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
            <div
              className="nav-group"
              key={n.href}
              data-open={activeMenu === n.href}
              onPointerOver={(event) => {
                if (event.pointerType !== 'mouse') return;
                cancelClose();
                // The chevron has its own toggle. Opening on pointer entry would
                // race its first click and immediately close the same menu.
                if (!(event.target as HTMLElement).closest('.nav-disclosure')) showMenu(n.href);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== 'mouse') return;
                cancelClose();
                // A short grace period lets the pointer cross into the panel naturally.
                closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                  closeDesktop();
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  closeDesktop();
                  event.currentTarget.querySelector<HTMLButtonElement>('button')?.focus();
                }
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  showMenu(n.href);
                  const links =
                    event.currentTarget.querySelectorAll<HTMLAnchorElement>('.nav-dropdown a');
                  const index = Array.from(links).indexOf(
                    document.activeElement as HTMLAnchorElement
                  );
                  const next =
                    event.key === 'ArrowDown'
                      ? (index + 1) % links.length
                      : index <= 0
                        ? links.length - 1
                        : index - 1;
                  requestAnimationFrame(() => links[next]?.focus());
                }
              }}
            >
              <Link
                className={path.startsWith(n.href) ? 'current' : ''}
                href={n.href}
                aria-current={path === n.href ? 'page' : undefined}
                onClick={closeDesktop}
              >
                {n.label}
              </Link>
              <button
                type="button"
                className="nav-disclosure"
                aria-label={`${n.label} submenu`}
                aria-expanded={activeMenu === n.href}
                aria-controls={`nav-${n.href.slice(1)}`}
                onClick={() => (activeMenu === n.href ? closeDesktop() : showMenu(n.href))}
              >
                <svg className="chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className="nav-dropdown"
                id={`nav-${n.href.slice(1)}`}
                inert={activeMenu !== n.href}
              >
                {n.children.map((c) => (
                  <Link key={c.href} href={c.href} onClick={closeDesktop}>
                    {c.label}
                    <svg
                      className="nav-link-arrow"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10h12m-5-5 5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
      <nav
        ref={panel}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
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
        <Link className="mobile-proposals" href="/funding#proposals" onClick={() => setOpen(false)}>
          Funding proposals <span>15 programmes →</span>
        </Link>
        <Link href="/funding" onClick={() => setOpen(false)}>
          Partner with Us →
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact & Collaborate →
        </Link>
      </nav>
    </header>
  );
}
