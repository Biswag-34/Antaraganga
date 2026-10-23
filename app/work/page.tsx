import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
import { Button, FAQ, Icon, Media, SectionTitle } from '@/components/primitives';
import { WorkCarousel } from '@/components/interactive';
import { LandscapeCTA } from '@/components/sections';
import { enquiryUrl } from '@/content/programmes';
export const metadata = pageMetadata('/work');
export default function Work() {
  return (
    <>
      <PageStructuredData path="/work" />
      <section className="work-hero">
        <div className="work-hero-mosaic">
          <Media id="04-programme-eye-care" priority />
          <Media id="05-programme-rural-health-camp" />
          <Media id="06-programme-prachi-first-aid" />
        </div>
        <div className="container">
          <h1>
            Care beyond
            <br />
            the hospital.
          </h1>
          <p>Screening, prevention and practical support in the community.</p>
        </div>
      </section>
      <WorkCarousel feature />
      <section className="ice community-section">
        <div className="container section-pad">
          <SectionTitle>
            Care where
            <br />
            communities gather.
          </SectionTitle>
          <div className="community-layout">
            <Media id="05-programme-rural-health-camp" />
            <div>
              <div>
                <Icon name="community-first" />
                <span>
                  <h3>Charitable clinics</h3>
                  <p>Accessible primary care in the community.</p>
                </span>
              </div>
              <div>
                <Icon name="consultation" />
                <span>
                  <h3>Rural health camps</h3>
                  <p>Screening and essential care close to home.</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="first-aid navy" id="first-aid">
        <Media id="06-programme-prachi-first-aid" />
        <div className="container">
          <h2>
            The first response
            <br />
            can begin with us.
          </h2>
          <h3>PraChi — Prathama Chikitse</h3>
          <p>Practical first-aid skills for safer, stronger communities.</p>
          <Button tone="gold" href={enquiryUrl('First-aid training', 'outreach')}>
            Explore first-aid training
          </Button>
        </div>
      </section>
      <section className="container section-pad programme-focus">
        <FAQ
          items={[
            {
              question: 'Early detection',
              answer:
                'Identify health needs early in the community. Screening camps can help people access an appropriate assessment and referral.',
            },
            {
              question: 'Prevention',
              answer:
                'Practical awareness and training help communities participate in health and wellbeing.',
            },
            {
              question: 'Continuity',
              answer:
                'Follow-up and referral connections help carry support beyond a single visit.',
            },
          ]}
        />
      </section>
      <LandscapeCTA
        title="Bring a programme to your community."
        copy="Let’s work together to expand access to care."
        label="Discuss an outreach collaboration"
        href={enquiryUrl('Community programme', 'outreach')}
      />
    </>
  );
}
