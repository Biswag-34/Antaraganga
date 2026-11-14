import CareerApplications from '@/components/career-applications';
import styles from '@/components/hospital-pages.module.css';
import { Button } from '@/components/primitives';
import { PageStructuredData } from '@/components/seo';
import { careerRoles } from '@/content/careers';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/careers');

export default function Careers() {
  return (
    <>
      <PageStructuredData path="/careers" />
      <section className={'navy ' + styles.careerHero}>
        <div className={'container ' + styles.careerHeroInner}>
          <div>
            <p className={styles.eyebrow}>Staff recruitment · Kolar, Karnataka</p>
            <h1>
              Careers at <em>Antharagange</em>
            </h1>
            <p>Join the clinical and support teams at Antharagange Rural Hospital.</p>
            <div className="actions">
              <Button href="#apply" tone="white">
                Apply now
              </Button>
              <Button href="#open-positions" tone="text">
                Browse openings
              </Button>
            </div>
          </div>
          <div className={styles.openingCount}>
            <strong>{careerRoles.length}</strong>
            <span>Open positions</span>
          </div>
        </div>
      </section>
      <CareerApplications preview={process.env.NODE_ENV === 'development'} />
    </>
  );
}
