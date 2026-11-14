import { boards } from '@/content/boards';
import Link from 'next/link';
import styles from './board-profiles.module.css';

export function BoardProfiles({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  const BoardHeading = standalone ? 'h2' : 'h3';
  const NameHeading = standalone ? 'h3' : 'h4';

  return (
    <section id="people" aria-labelledby="people-title" className={styles.people}>
      <div className="container">
        <header className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Our people</p>
            <Heading id="people-title" className={styles.title}>
              The people behind
              <br />
              the <em>purpose.</em>
            </Heading>
          </div>
          <div className={styles.introAside}>
            <p>Meet the Trustee Board and Advisory Board of Antharagange Rural Hospital.</p>
            <nav className={styles.boardLinks} aria-label="Our people sections">
              {boards.map((board) => (
                <a key={board.id} href={`#${board.id}`}>
                  {board.name}
                  <span aria-hidden="true">↘</span>
                </a>
              ))}
            </nav>
          </div>
        </header>

        {boards.map((board, boardIndex) => (
          <section
            key={board.id}
            id={board.id}
            aria-labelledby={`${board.id}-title`}
            className={styles.board}
          >
            <div className={styles.boardHeading}>
              <BoardHeading id={`${board.id}-title`}>{board.name}</BoardHeading>
              <span>{board.members.length} members</span>
            </div>
            <ul className={styles.boardGrid}>
              {board.members.map(({ name, portrait }) => (
                <li key={name} className={styles.boardCard}>
                  <div className={styles.portrait}>
                    <img
                      src={`/media/support/board/${portrait.file}`}
                      alt={`Portrait of ${name}`}
                      loading={standalone && boardIndex === 0 ? 'eager' : 'lazy'}
                      width={portrait.width}
                      height={portrait.height}
                    />
                  </div>
                  <div className={styles.namePanel}>
                    <NameHeading>{name}</NameHeading>
                    <p>{board.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className={styles.directoryLink}>
          <span>Our campus doctors</span>
          <Link href={standalone ? '#doctor-directory' : '/team#doctor-directory'}>
            View the doctor directory <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
