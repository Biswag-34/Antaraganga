import { Button } from './primitives';
import styles from './home-sections.module.css';

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <figure className={styles.heroPhoto}>
        <img
          src="/media/mobile/01-hero-hospital.webp"
          alt="Architectural visualisation of Antharagange Rural Hospital"
          width={1448}
          height={1086}
          fetchPriority="high"
        />
      </figure>
      <div className={styles.heroSurface} aria-hidden="true" />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Charitable care · Kolar, Karnataka</p>
          <h1 id="home-heading">
            Healing
            <br />
            closer to <em>home.</em>
          </h1>
          <p className={styles.heroDescription}>
            Compassionate healthcare for rural families and people with disabilities.
          </p>
          <div className={styles.heroActions}>
            <Button href="/funding">Support the Hospital</Button>
            <Button href="/hospital" tone="text">
              Discover our hospital
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
