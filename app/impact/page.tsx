import { Button, SectionTitle } from '@/components/primitives';
import { ProgrammeCards } from '@/components/programme-cards';
import { PageStructuredData } from '@/components/seo';
import styles from '@/components/institutional.module.css';
import { activityAsOf, communityActivity } from '@/content/impact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/impact');

export default function Impact() {
  return (
    <>
      <PageStructuredData path="/impact" />
      <section className="ice">
        <div className="container section-pad">
          <h1>Impact</h1>
          <p>Explore the hospital’s work at its Kolar campus and in the community.</p>
          <p className={styles.impactDate}>
            Activity as of <time dateTime={activityAsOf.date}>{activityAsOf.label}</time>
          </p>
        </div>
      </section>
      <section id="hospital-activity" className="container section-pad">
        <SectionTitle>Hospital activity</SectionTitle>
        <p>Care has begun at Antharagange Rural Hospital in Kolar.</p>
        <Button href="/care" tone="text">
          Explore care &amp; services
        </Button>
      </section>
      <div id="community-activity" className="ice">
        <ProgrammeCards heading="Community activity" description={communityActivity} />
      </div>
      <section className="container section-pad">
        <SectionTitle description="Support can help equip additional hospital facilities and expand access to care in rural Kolar.">
          What your support can help provide
        </SectionTitle>
        <Button href="/funding">Support the Hospital</Button>
      </section>
    </>
  );
}
