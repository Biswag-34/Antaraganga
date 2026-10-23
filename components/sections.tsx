import Link from 'next/link';
import { Button, FAQ, Icon, Media, SectionTitle } from './primitives';
import { enquiryUrl, programmes } from '@/content/programmes';
export function FundingHighlights() {
  const featured = ['dialysis', 'rehab', 'icu'].map((id) => programmes.find((p) => p.id === id)!);
  return (
    <section className="funding-highlights section-pad">
      <div className="container">
        <div className="funding-highlights-heading">
          <SectionTitle description="Explore practical ways to strengthen care for rural families.">
            Help bring essential care closer.
          </SectionTitle>
          <Button href="/funding#proposals" tone="gold">
            View all 15 funding proposals
          </Button>
        </div>
        <div className="funding-highlight-grid">
          {featured.map((p) => (
            <Link href={`/funding/${p.id}`} className="funding-highlight-card" key={p.id}>
              <Media id={p.asset} />
              <div>
                <h3>{p.title}</h3>
                <p>{p.need}</p>
                <span className="funding-highlight-link">
                  View funding proposal <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CareContinuum() {
  return (
    <section className="care-continuum navy">
      <Media id="07-care-journey-cutout" className="continuum-photo" />
      <div className="container">
        <div className="continuum-content">
          <h2>From care today, to support for life.</h2>
          <p>A continuum of care for stronger, more independent lives.</p>
          <div className="continuum-steps">
            {[
              {
                title: 'Consultation',
                copy: 'Understand needs with compassion.',
                icon: 'consultation',
              },
              { title: 'Treatment', copy: 'Personalised care and support.', icon: 'treatment' },
              {
                title: 'Rehabilitation',
                copy: 'Build skills for greater independence.',
                icon: 'rehabilitation',
              },
            ].map((s) => (
              <div key={s.title}>
                <span className="icon-circle">
                  <Icon name={s.icon} />
                </span>
                <span>
                  <strong>{s.title}</strong>
                  <small>{s.copy}</small>
                </span>
              </div>
            ))}
          </div>
          <Button href="/care" tone="white">
            Explore care & services
          </Button>
        </div>
      </div>
      <img
        className="hands-divider"
        src="/media/support/dividers/04-care-bottom-hands-desktop.svg"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
export function PartnershipInvite() {
  return (
    <section className="partnership-invite">
      <Media className="invite-landscape" id="08-partnership-landscape" />
      <div className="container invite-grid">
        <SectionTitle description="Work with us to expand access, strengthen care and create more independent lives.">
          A shared commitment
          <br />
          to rural <em>health.</em>
        </SectionTitle>
        <div className="invite-links">
          <Link href="/funding">
            <Icon name="partnership" />
            <span>
              <strong>Support a clinical programme</strong>
              <small>Help deliver essential care to rural communities.</small>
            </span>
            <span>→</span>
          </Link>
          <Link href={enquiryUrl('Research, training and community initiatives', 'outreach')}>
            <Icon name="community-first" />
            <span>
              <strong>Collaborate with our team</strong>
              <small>Partner on research, training and community initiatives.</small>
            </span>
            <span>→</span>
          </Link>
          <Button href="/funding#proposals" tone="gold">
            Explore funding proposals
          </Button>
        </div>
      </div>
    </section>
  );
}
export function SupportFamily() {
  return (
    <section className="navy support-family">
      <div className="container support-family-grid">
        <SectionTitle description="Guidance, training and resources to help caregivers feel confident and supported.">
          Support extends to the family.
        </SectionTitle>
        <Media id="02-mission-rural-family" />
        <FAQ
          items={[
            {
              question: 'What support can caregivers ask about?',
              answer:
                'Ask the team about guidance, care planning and practical support relevant to your family’s needs.',
            },
            {
              question: 'How do I confirm service availability?',
              answer:
                'Contact the hospital before planning your visit. Service schedules and clinical availability must be confirmed by the team.',
            },
          ]}
        />
        <Button href={enquiryUrl('Caregiver support', 'hospital')} tone="gold">
          Learn more about caregiver support
        </Button>
      </div>
    </section>
  );
}
export function InclusiveCareInvite() {
  return (
    <section className="container section-pad inclusive-invite">
      <SectionTitle description="Work with us to expand access to rehabilitation and community-based care for families.">
        Support inclusive <em>care.</em>
      </SectionTitle>
      <Media id="07-care-journey-cutout" />
      <div className="actions">
        <Button href="/funding/rehab" tone="gold">
          Explore rehabilitation partnership
        </Button>
        <Button href="/funding#proposals" tone="text">
          View all funding proposals
        </Button>
      </div>
    </section>
  );
}
export function ConversationLinks() {
  return (
    <section className="conversation-section ice">
      <div className="container section-pad">
        <SectionTitle description="Work with us to expand access, strengthen care and create more independent lives.">
          Find the right conversation.
        </SectionTitle>
        <div className="conversation-links">
          {[
            {
              title: 'For a hospital visit',
              copy: 'Discuss clinical services, patient pathways and referral support.',
              image: '07-care-journey-cutout',
              icon: 'building2',
              href: enquiryUrl('Hospital visit', 'hospital'),
            },
            {
              title: 'For a community programme',
              copy: 'Explore health camps, screening and prevention initiatives.',
              image: '05-programme-rural-health-camp',
              icon: 'community-first',
              href: enquiryUrl('Community programme', 'outreach'),
            },
          ].map((s) => (
            <Link key={s.title} href={s.href}>
              <Media id={s.image} />
              <span className="icon-circle">
                <Icon name={s.icon} />
              </span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.copy}</small>
              </span>
              <span className="round-arrow">›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Leadership() {
  return (
    <>
      <section className="container foundation section-pad">
        <SectionTitle description="Guided by two organisations working towards stronger rural communities.">
          A shared purpose.
        </SectionTitle>
        <div>
          <Icon name="hand-heart" />
          <h3>
            Raghavendra Shri Sai
            <br />
            Rural Healthcare Foundation
          </h3>
        </div>
        <div>
          <Icon name="graduation-cap" />
          <h3>
            Antaragange
            <br />
            Vidya Samste
          </h3>
        </div>
      </section>
      <section className="ice" id="people">
        <div className="container section-pad">
          <SectionTitle>The people behind the purpose.</SectionTitle>
          <div className="leadership-placeholder">
            <span className="icon-circle">
              <Icon name="community-first" />
            </span>
            <div>
              <h3>Meet the hospital team</h3>
              <p>
                Approved leadership profiles and portraits will be added following hospital
                confirmation.
              </p>
            </div>
            <Button href={enquiryUrl('Meet the hospital team', 'hospital')} tone="text">
              Speak with our team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
export function DualCTA() {
  return (
    <div className="navy dual-cta">
      <div className="container">
        <Link href="/work">
          <Icon name="file-text" />
          <span>
            <strong>See our work</strong>
            <small>Explore how we make a difference.</small>
          </span>
          <span>→</span>
        </Link>
        <Link href="/contact">
          <Icon name="community-first" />
          <span>
            <strong>Speak with our team</strong>
            <small>Learn about partnership opportunities.</small>
          </span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
export function LandscapeCTA({
  title,
  copy,
  label,
  href,
}: {
  title: string;
  copy: string;
  label: string;
  href: string;
}) {
  return (
    <section className="landscape-cta">
      <Media id="08-partnership-landscape" />
      <div className="container">
        <div>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <Button href={href} tone="gold">
          {label}
        </Button>
      </div>
    </section>
  );
}
