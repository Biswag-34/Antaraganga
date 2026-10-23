import type { Metadata } from 'next';
import { Button, FAQ, Icon, Media, SectionTitle, SplitHero } from '@/components/primitives';
import ContactForm from '@/components/contact-form';
export const metadata: Metadata = { title: 'Contact & Collaborate' };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; interest?: string }>;
}) {
  const query = await searchParams;
  return (
    <>
      <SplitHero
        className="contact-hero"

        title={
          <>
            How can
            <br />
            we <em>help?</em>
          </>
        }
        description="Choose the right conversation with our team."
        image="07-care-journey-cutout"
      />
      <section className="contact-body ice">
        <div className="container contact-grid">
          <ContactForm
            key={(query.type || 'partnership') + (query.interest || '')}
            initialType={query.type || 'partnership'}
            initialInterest={query.interest || ''}
          />
          <aside className="contact-context navy">
            <Media id="24-clinical-partnership-team" />
            <div>
              <h2>
                A purposeful
                <br />
                conversation.
              </h2>
              {[
                {
                  label: 'Funding proposals',
                  description: 'Understand how we can work together.',
                  icon: 'file-text',
                  href: '/funding#proposals',
                },
                {
                  label: 'Institutional documents',
                  description: 'Information for partners.',
                  icon: 'clipboard-check',
                  href: '/contact?type=partnership&interest=Institutional%20documents',
                },
                {
                  label: 'Site visit enquiry',
                  description: 'Plan a visit to see our work.',
                  icon: 'location',
                  href: '#visit',
                },
              ].map((s) => (
                <a href={s.href} key={s.label}>
                  <span className="icon-circle">
                    <Icon name={s.icon} />
                  </span>
                  <span>
                    <strong>{s.label}</strong>
                    <small>{s.description}</small>
                  </span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <section className="ice visit-section" id="visit">
        <div className="container section-pad">
          <SectionTitle description="We look forward to understanding your goals and exploring how we can work together for stronger, healthier communities.">
            Connect with the Kolar team.
          </SectionTitle>
          <div className="visit-grid">
            <div className="visit-image">
              <Media id="08-partnership-landscape" />
              <div>
                <Icon name="location" />
                <span>
                  <strong>Antharagange</strong>
                  <small>Kolar district, Karnataka</small>
                </span>
              </div>
            </div>
            <div>
              <article>
                <Icon name="consultation" />
                <div>
                  <h3>For hospital and care enquiries</h3>
                  <p>Get in touch with our Kolar team.</p>
                  <Button href="/contact?type=hospital&interest=Hospital%20visit">
                    Prepare a hospital enquiry
                  </Button>
                </div>
              </article>
              <article>
                <Icon name="community-first" />
                <div>
                  <h3>For CSR and community collaboration</h3>
                  <p>Discuss partnership opportunities.</p>
                  <Button href="/network">Explore locations</Button>
                </div>
              </article>
              <p className="small-print">
                Verified direct contact and branch details will be added following hospital
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container section-pad contact-faq">
        <SectionTitle>Common questions.</SectionTitle>
        <FAQ
          items={[
            {
              question: 'Can I enquire about a programme?',
              answer:
                'Select a programme in your enquiry so the team can guide the discussion. This preview lets you review and save a draft; online delivery is not yet connected.',
            },
            {
              question: 'How do I ask about visiting the hospital?',
              answer:
                'Choose Hospital enquiry and Hospital visit. Confirm the exact address, hours and service availability with the hospital before planning a visit.',
            },
          ]}
        />
      </section>
    </>
  );
}
