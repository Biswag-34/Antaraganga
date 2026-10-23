import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { programmes, getProgramme, money, enquiryUrl } from '@/content/programmes';
import { Button, Icon, Media, SectionTitle } from '@/components/primitives';
import { Accountability, ProgrammeScope } from '@/components/interactive';
export const dynamicParams = false;
export function generateStaticParams() {
  return programmes.map((p) => ({ programme: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ programme: string }>;
}): Promise<Metadata> {
  const p = getProgramme((await params).programme);
  return { title: p?.title ?? 'Programme not found' };
}
export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ programme: string }>;
}) {
  const p = getProgramme((await params).programme);
  if (!p) notFound();
  return (
    <>
      <section className="programme-hero navy">
        <Media id={p.id === 'dialysis' ? '02-mission-rural-family' : p.asset} priority />
        <div className="container">
          <nav aria-label="Breadcrumb">
            <a href="/funding">CSR Partnerships</a>
            <span>/</span>
            <span>{p.category}</span>
          </nav>

          <h1>{p.heading}</h1>
          <p>
            {p.id === 'dialysis'
              ? 'Support a local three-station dialysis service.'
              : `Support the proposed ${p.title.toLowerCase()} programme.`}
          </p>
          <div className="actions">
            <Button tone="white" href={enquiryUrl(p.title)}>
              Partner with this programme
            </Button>
            <Button tone="text" href={`/media/support/${p.source_document}`} download>
              Download proposal
            </Button>
          </div>
        </div>
      </section>
      <nav className="section-nav" aria-label="Programme sections">
        <a href="#need">The need</a>
        <a href="#service">Proposed service</a>
        <a href="#scope">Funding scope</a>
        <a href="#accountability">Accountability</a>
        <a className="section-download" href={`/media/support/${p.source_document}`} download>
          <Icon name="file-text" />
          Download proposal
        </a>
      </nav>
      <section className="programme-need container section-pad" id="need">
        <div>
          <SectionTitle description={p.need}>
            {p.id === 'dialysis' ? (
              <>
                Repeated care should not mean
                <br />
                repeated barriers.
              </>
            ) : (
              p.heading
            )}
          </SectionTitle>
          <div className="need-journey">
            <Icon name="location" />
            <span>Care closer to home</span>
            <span className="need-line" />
            <Icon name="heart" />
            <span>Support for rural families</span>
          </div>
        </div>
        <Media id="07-care-journey-cutout" />
      </section>
      <section className="ice" id="service">
        <div className="container section-pad">
          <SectionTitle
            description={
              p.id === 'dialysis'
                ? 'A three-station dialysis service with essential infrastructure and support systems.'
                : `Proposed equipment, infrastructure and support for ${p.title.toLowerCase()}.`
            }
          >
            What this programme includes.
          </SectionTitle>
          <ProgrammeScope scope={p.scope} image={p.asset} />
        </div>
      </section>
      <section className="container section-pad funding-scope" id="scope">
        <div>
          <SectionTitle>A defined capital scope.</SectionTitle>
          <p>This programme sets out a proposed scope for equipment and infrastructure.</p>
          <div className="budget-box">
            <span>{p.budget ? 'Source planning allocation' : 'Proposed allocation'}</span>
            <strong>{p.budget ? money(p.budget) : 'To be confirmed'}</strong>
            <small>Planning estimate · current funding status unconfirmed</small>
          </div>
        </div>
        <div>
          {p.id === 'dialysis' ? (
            <div className="budget-lines">
              {[
                ['Machines (three haemodialysis machines)', '₹6.00 lakh'],
                ['Beds / recliners (three)', '₹1.50 lakh'],
                ['RO water system', '₹2.00 lakh'],
                ['Monitoring, emergency support, furniture, electrical & backup', '₹3.00 lakh'],
              ].map((b, i) => (
                <div key={b[0]}>
                  <Icon name={['treatment', 'bed-double', 'layers', 'shield-check'][i]} />
                  <span>{b[0]}</span>
                  <strong>{b[1]}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="scope-summary">
              <h3>Source-based proposal</h3>
              <p>
                Read the original document for the complete scope, source allocations, readiness
                requirements and financial disclosures.
              </p>
              {p.disclosure && <p className="disclosure">{p.disclosure}</p>}
            </div>
          )}
          <p className="small-print">
            Planning estimate. Staffing, consumables, maintenance and recurring costs require an
            operating plan. Some programme allocations overlap; do not add programme totals
            together.
          </p>
          <Button tone="text" href={`/media/support/${p.source_document}`} download>
            Download itemised proposal (DOCX)
          </Button>
        </div>
      </section>
      <div id="accountability">
        <Accountability />
      </div>
      <section className="container section-pad programme-end">
        <SectionTitle description="Partner with us to bring essential care closer to rural families.">
          Discuss support for {p.id === 'dialysis' ? 'kidney care' : p.title.toLowerCase()}.
        </SectionTitle>
        <div className="actions">
          <Button href={enquiryUrl(p.title)}>Request a programme discussion</Button>
          <Button tone="outline" href="/funding#proposals">
            View related care programmes
          </Button>
        </div>
      </section>
    </>
  );
}
