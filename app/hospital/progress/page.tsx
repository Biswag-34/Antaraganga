import { AwaitingUpdate, CampusImage } from '@/components/hospital-progress';
import styles from '@/components/hospital-pages.module.css';
import { Button, Icon } from '@/components/primitives';
import { PageStructuredData } from '@/components/seo';
import { campusRendering, floorPlans, hospitalProgress } from '@/content/hospital-progress';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/hospital/progress');

export default function HospitalProgress() {
  const { current, milestones, photos, futureProjects } = hospitalProgress;

  return (
    <>
      <PageStructuredData path="/hospital/progress" />
      <section className={styles.progressHero}>
        <div className={'container ' + styles.progressHeroInner}>
          <div>
            <p className={styles.eyebrow}>Our hospital · Kolar, Karnataka</p>
            <h1>
              Hospital <em>progress</em>
            </h1>
            <p className={styles.progressIntro}>
              See how Antharagange Rural Hospital took shape in Kolar and explore the equipment and
              facilities that future support can help provide.
            </p>
            <nav className={styles.progressNav} aria-label="Hospital progress sections">
              <a href="#current-phase">Current phase</a>
              <a href="#construction-milestones">Milestones</a>
              <a href="#campus-photos">Campus photos</a>
              <a href="#floor-plans">Floor plans</a>
              <a href="#future-projects">Future projects</a>
            </nav>
          </div>
          <CampusImage photo={photos[0] ?? campusRendering} eager />
        </div>
      </section>
      <div className={'container ' + styles.progressSections}>
        <section id="current-phase" aria-labelledby="phase-heading" className={styles.currentPhase}>
          <Icon name="building2" />
          <div>
            <h2 id="phase-heading">Current phase</h2>
            {current ? (
              <>
                {current.date && <p className={styles.eyebrow}>{current.date}</p>}
                <h3>{current.title}</h3>
                <p>{current.summary}</p>
              </>
            ) : (
              <p>The hospital will share the current construction phase once it is confirmed.</p>
            )}
          </div>
        </section>
        <section id="construction-milestones" aria-labelledby="milestones-heading">
          <h2 id="milestones-heading">Construction milestones</h2>
          {milestones.length ? (
            <ol className={styles.milestones}>
              {milestones.map(({ title, summary, date }) => (
                <li key={title}>
                  {date && <p className={styles.eyebrow}>{date}</p>}
                  <h3>{title}</h3>
                  <p>{summary}</p>
                </li>
              ))}
            </ol>
          ) : (
            <AwaitingUpdate icon="layers">
              Verified milestones and dates will be added here.
            </AwaitingUpdate>
          )}
        </section>
        <section id="campus-photos" aria-labelledby="photos-heading">
          <h2 id="photos-heading">Campus photos</h2>
          {photos.length ? (
            <div className={styles.photoGrid}>
              {photos.map((photo) => (
                <CampusImage key={photo.src} photo={photo} />
              ))}
            </div>
          ) : (
            <AwaitingUpdate icon="camera">
              Site photos will be shared as they become available.
            </AwaitingUpdate>
          )}
        </section>
        <section id="floor-plans" aria-labelledby="floor-plans-heading">
          <h2 id="floor-plans-heading">Floor plans</h2>
          <p className={styles.floorPlanIntro}>
            These drawings show the planned layout and facilities on each floor. Check with the
            hospital for current service availability.
          </p>
          <div className={styles.floorPlanGrid}>
            {floorPlans.map((plan) => (
              <a
                key={plan.src}
                href={plan.src}
                aria-label={`View full-size ${plan.caption.toLowerCase()}`}
              >
                <CampusImage photo={plan} />
              </a>
            ))}
          </div>
          <Button href="/care" tone="outline">
            Explore care &amp; services
          </Button>
        </section>
        <section id="future-projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Future projects</h2>
          {futureProjects.length ? (
            <ul className={styles.projectList}>
              {futureProjects.map(({ title, summary, date }) => (
                <li key={title}>
                  {date && <p className={styles.eyebrow}>{date}</p>}
                  <h3>{title}</h3>
                  <p>{summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Explore the hospital’s proposals for future facilities, equipment and services.</p>
          )}
          <Button href="/funding#proposals" tone="outline">
            View funding proposals
          </Button>
        </section>
      </div>
    </>
  );
}
