import Link from 'next/link';
import type { ReactNode } from 'react';
import { artwork, getMedia } from '@/lib/media';
export function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <img
      className={`icon ${className}`}
      src={artwork(`icons/${name}.svg`)}
      alt=""
      width="28"
      height="28"
      aria-hidden="true"
    />
  );
}
export function Media({
  id,
  className = '',
  priority = false,
  desktopVariant = 'desktop',
}: {
  id: string;
  className?: string;
  priority?: boolean;
  desktopVariant?: 'desktop' | 'mobile';
}) {
  const a = getMedia(id);
  const desktop = a.variants[desktopVariant];
  return (
    <figure className={`media ${className}`}>
      <picture>
        <source
          media="(max-width:767px)"
          srcSet={`/media/${a.variants.mobile.webp}`}
          width={a.variants.mobile.width}
          height={a.variants.mobile.height}
        />
        <source
          media="(max-width:1023px)"
          srcSet={`/media/${a.variants.tablet.webp}`}
          width={a.variants.tablet.width}
          height={a.variants.tablet.height}
        />
        <img
          src={`/media/${desktop.webp}`}
          alt={a.alt}
          width={desktop.width}
          height={desktop.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
      {id === '01-hero-hospital' && (
        <figcaption className="architectural-caption">Architectural visualisation</figcaption>
      )}
    </figure>
  );
}
export function Button({
  href,
  children,
  tone = 'teal',
  className = '',
  download = false,
}: {
  href: string;
  children: ReactNode;
  tone?: 'teal' | 'gold' | 'white' | 'outline' | 'text';
  className?: string;
  download?: boolean;
}) {
  const classes = `button button--${tone} ${className}`;
  return download ? (
    <a className={classes} href={href} download>
      {children}
      <Icon name="download" />
    </a>
  ) : (
    <Link className={classes} href={href}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
export function SectionTitle({
  children,
  description,
}: {
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function SplitHero({
  title,
  description,
  image,
  children,
  className = '',
}: {
  title: ReactNode;
  description: string;
  image: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`split-hero ${className}`}>
      <Media id={image} priority className="split-hero__image" />
      <div className="split-hero__copy">
        <h1>{title}</h1>
        <p>{description}</p>
        {children && <div className="actions">{children}</div>}
      </div>
    </section>
  );
}
export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.question} open={i === 0}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
