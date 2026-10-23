import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
import { Button, Icon, Media } from '@/components/primitives';
import { ApproachExplorer, MissionExplorer } from '@/components/interactive';
import { DualCTA, Leadership } from '@/components/sections';
export const metadata = pageMetadata('/hospital');
export default function Hospital() {
  return (
    <>
      <PageStructuredData path="/hospital" />
      <section className="photo-hero hospital-hero">
        <Media id="09-hospital-purpose" priority />
        <div className="container">
          <h1>
            Dignity in care.
            <br />
            <em>Opportunity in life.</em>
          </h1>
          <p>A charitable commitment to rural and disabled communities.</p>
          <div className="actions">
            <Button href="#purpose">Our hospital</Button>
            <Button href="#approach" tone="text">
              Our approach
            </Button>
          </div>
        </div>
      </section>
      <div className="hospital-chapter-nav" id="hospital-sections">
        <nav className="hospital-section-nav container" aria-label="On this page">
          <a href="#purpose">
            <span className="chapter-number">01</span>
            <span className="chapter-label">Our purpose</span>
            <span className="chapter-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <a href="#approach">
            <span className="chapter-number">02</span>
            <span className="chapter-label">Our approach</span>
            <span className="chapter-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <a href="#vision">
            <span className="chapter-number">03</span>
            <span className="chapter-label">Our vision</span>
            <span className="chapter-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <a href="#people">
            <span className="chapter-number">04</span>
            <span className="chapter-label">Our people</span>
            <span className="chapter-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>
      </div>
      <MissionExplorer />
      <ApproachExplorer />
      <section className="vision-section" id="vision">
        <Media id="08-partnership-landscape" />
        <div className="container">
          <h2>Care without barriers.</h2>
          <div className="vision-values">
            <span>
              <Icon name="location" />
              Distance
            </span>
            <span>
              <Icon name="disability-first" />
              Disability
            </span>
            <span className="rupee">
              ₹ <span>Affordability</span>
            </span>
          </div>
        </div>
      </section>
      <Leadership />
      <DualCTA />
    </>
  );
}
