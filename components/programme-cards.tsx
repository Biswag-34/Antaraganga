import Link from 'next/link';
import { workStories } from '@/content/site';
import { Media } from './primitives';
import styles from './institutional.module.css';

export function ProgrammeCards({
  heading,
  description = 'Explore the hospital’s ongoing community programmes.',
}: {
  heading: string;
  description?: string;
}) {
  return (
    <section className={styles.programmes}>
      <div className="container">
        <div className={styles.programmeHeading}>
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <ul className={styles.programmeGrid}>
          {workStories.map(({ id, title, image, description }) => (
            <li className={styles.programmeCard} key={id}>
              <Link href={`/work/${id}`} aria-label={`View programme: ${title}`}>
                <Media id={image} />
                <div className={styles.programmeBody}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className={styles.programmeAction}>
                    View programme <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
