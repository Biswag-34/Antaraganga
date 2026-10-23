import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
import { Button, Icon, Media } from '@/components/primitives';
import {
  DocumentExplorer,
  FundingExplorer,
  PartnershipPath,
  ProposalDirectory,
} from '@/components/interactive';
import { LandscapeCTA } from '@/components/sections';
import { enquiryUrl } from '@/content/programmes';
export const metadata = pageMetadata('/funding');
export default function Funding() {
  return (
    <>
      <PageStructuredData path="/funding" />
      <section className="funding-hero navy">
        <Media id="09-hospital-purpose" priority />
        <div>
          <h1>
            Partner in care
            <br />
            for <em>rural Kolar.</em>
          </h1>
          <p>Support clinical services, disability inclusion and community healthcare.</p>
          <div className="actions">
            <Button tone="gold" href="#proposals">
              View all 15 funding proposals
            </Button>
            <Button tone="text" href={enquiryUrl('Institutional partnership')}>
              Discuss a partnership
            </Button>
            <Button tone="text" href="#needs">
              Explore areas of need
            </Button>
          </div>
        </div>
      </section>
      <div className="container funding-pillars">
        {[
          {
            title: 'Clinical access',
            copy: 'More people can receive essential care.',
            icon: 'consultation',
          },
          {
            title: 'Inclusive rehabilitation',
            copy: 'Greater independence for people with disabilities.',
            icon: 'disability-first',
          },
          {
            title: 'Community health',
            copy: 'Stronger, healthier rural communities.',
            icon: 'community-first',
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
      <ProposalDirectory />
      <FundingExplorer />
      <PartnershipPath />
      <DocumentExplorer />
      <LandscapeCTA
        title="Let’s identify the right partnership."
        copy="Work together to expand access, strengthen care and create more independent lives."
        label="Discuss partnership opportunities"
        href={enquiryUrl('Institutional partnership')}
      />
    </>
  );
}
