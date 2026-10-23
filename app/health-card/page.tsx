import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
import { Button, FAQ, Icon, Media, SectionTitle } from '@/components/primitives';
import { CardProcess, HealthCard } from '@/components/interactive';
import { enquiryUrl } from '@/content/programmes';
export const metadata = pageMetadata('/health-card');
export default function HealthCardPage() {
  return (
    <>
      <PageStructuredData path="/health-card" />
      <section className="health-card-hero">
        <Media id="23-health-card-registration" priority />
        <div className="container">
          <div>
            <h1>
              One identity.
              <br />
              <em>Across the care journey.</em>
            </h1>
            <p>
              A proposed health-card initiative for patient identification across clinics and camps.
            </p>
          </div>
          <HealthCard />
        </div>
      </section>
      <div className="identification-note">
        <Icon name="id-card" />
        An identification aid. Not an insurance card.
      </div>
      <section className="container section-pad">
        <SectionTitle description="A straightforward process to help link a patient to their health information across our clinics and camps.">
          A simpler connection to care.
        </SectionTitle>
        <CardProcess />
      </section>
      <section className="navy card-responsibilities">
        <div className="container section-pad">
          <SectionTitle description="A shared approach with defined roles to protect patient information and support continuous care.">
            Thoughtful access. Clear responsibility.
          </SectionTitle>
          <div>
            {[
              {
                title: 'Authorised staff',
                copy: 'Trained personnel register patients and manage card printing.',
                image: '23-health-card-registration',
                icon: 'user-round',
              },
              {
                title: 'Clinic oversight',
                copy: 'Designated staff oversee proper use and support across care points.',
                image: '24-clinical-partnership-team',
                icon: 'community-first',
              },
              {
                title: 'Controlled record updates',
                copy: 'Updates are made only by authorised staff at the point of care.',
                image: '21-hospital-it-systems',
                icon: 'file-text',
              },
            ].map((s) => (
              <article key={s.title}>
                <Media id={s.image} />
                <span className="icon-circle">
                  <Icon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </article>
            ))}
          </div>
          <small>Proposed workflow; deployment details to be confirmed.</small>
        </div>
      </section>
      <section className="container section-pad card-faq">
        <SectionTitle>Before using a health card.</SectionTitle>
        <div>
          <FAQ
            items={[
              {
                question: 'Does a card guarantee treatment benefits?',
                answer:
                  'Eligibility and benefits must be confirmed by the hospital. The proposed card is an identification aid and does not establish insurance or entitlement.',
              },
              {
                question: 'How do I ask about enrolment?',
                answer:
                  'Use the enquiry form to request information about the proposed initiative. Enrolment details will be added once confirmed.',
              },
            ]}
          />
          <div>
            <Media id="02-mission-rural-family" />
            <Button href={enquiryUrl('Health-card initiative', 'hospital')} tone="gold">
              Ask about the health-card initiative
            </Button>
            <Button href="/network" tone="text">
              View the care network
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
