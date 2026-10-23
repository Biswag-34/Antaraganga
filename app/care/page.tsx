import Link from 'next/link';
import { SplitHero } from '@/components/primitives';
import { services } from '@/content/site';
import { getProgramme } from '@/content/programmes';
import { PageStructuredData } from '@/components/seo';
import { pageMetadata } from '@/lib/seo';
import { CareJourney, ServiceExplorer } from '@/components/interactive';
import { InclusiveCareInvite, SupportFamily } from '@/components/sections';
export const metadata = pageMetadata('/care');
export default function Care() {
  return (
    <>
      <PageStructuredData path="/care" />
      <SplitHero
        className="care-hero"

        title={
          <>
            Care for every
            <br />
            stage of <em>life.</em>
          </>
        }
        description="Explore our clinical and rehabilitation focus."
        image="10-adult-rehabilitation"
      />
      <ServiceExplorer />
      <section
        className="container section-pad care-overview"
        aria-labelledby="care-overview-title"
      >
        <div className="section-title">
          <h2 id="care-overview-title">Care and proposed facilities in Kolar.</h2>
          <p>
            These summaries describe areas of focus and proposed facilities. Current service
            availability, schedules and access arrangements require confirmation.
          </p>
        </div>
        <div className="care-overview-grid">
          {services.map((service) => (
            <article key={service.id} id={`care-${service.id}`}>
              <h3>{service.title}</h3>
              <p className="care-status">
                {['wound', 'kidney', 'telemedicine'].includes(service.id)
                  ? 'Proposed facility or pathway'
                  : 'Availability requires confirmation'}
              </p>
              <p>{service.description}</p>
              {service.programme && (
                <Link href={`/funding/${service.programme}`}>
                  View {getProgramme(service.programme)?.title} funding proposal{' '}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
      <CareJourney />
      <SupportFamily />
      <InclusiveCareInvite />
    </>
  );
}
