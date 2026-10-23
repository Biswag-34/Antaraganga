'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Icon, Media, SectionTitle } from './primitives';
import { careSteps, commitments, services, workStories } from '@/content/site';
import { enquiryUrl, programmes } from '@/content/programmes';
import { useSwipe } from './use-swipe';

export function Selector({
  labels,
  selected,
  onChange,
  icons,
  descriptions,
  className = '',
}: {
  labels: string[];
  selected: number;
  onChange: (i: number) => void;
  icons?: string[];
  descriptions?: string[];
  className?: string;
}) {
  return (
    <div className={`selector ${className}`} role="group" aria-label="Choose a category">
      {labels.map((label, i) => (
        <button
          key={label}
          aria-pressed={selected === i}
          className={selected === i ? 'selected' : ''}
          onClick={() => onChange(i)}
          onKeyDown={(e) => {
            if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
              e.preventDefault();
              const next =
                e.key === 'Home'
                  ? 0
                  : e.key === 'End'
                    ? labels.length - 1
                    : (i + (e.key === 'ArrowRight' ? 1 : -1) + labels.length) % labels.length;
              onChange(next);
              const el = e.currentTarget.parentElement?.children[next] as HTMLButtonElement;
              el?.focus();
            }
          }}
        >
          {icons && <Icon name={icons[i]} />}
          <span>
            {descriptions ? (
              <>
                <strong>{label}</strong>
                <small>{descriptions[i]}</small>
              </>
            ) : (
              label
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
export function CarouselControls({
  index,
  total,
  onChange,
  label = 'story',
}: {
  index: number;
  total: number;
  onChange: (i: number) => void;
  label?: string;
}) {
  return (
    <div className="carousel-controls">
      <span>
        {String(index + 1).padStart(2, '0')}{' '}
        <span className="muted">/ {String(total).padStart(2, '0')}</span>
      </span>
      <button
        aria-label={`Previous ${label}`}
        onClick={() => onChange((index - 1 + total) % total)}
      >
        ‹
      </button>
      <button aria-label={`Next ${label}`} onClick={() => onChange((index + 1) % total)}>
        ›
      </button>
    </div>
  );
}
export function PurposeHome() {
  const [selected, setSelected] = useState(1);
  const swipe = useSwipe((direction) =>
    setSelected((current) => (current + direction + commitments.length) % commitments.length)
  );
  return (
    <section className="purpose-home ice">
      <div className="container">
        <div className="commitment-rail">
          {commitments.map((c, i) => (
            <button
              key={c.title}
              className={i === selected ? 'selected' : ''}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              <span className="icon-circle">
                <Icon name={c.icon} />
              </span>
              <span>
                <strong>{c.title}</strong>
                <small>{c.description}</small>
              </span>
              <span className="rail-arrow">→</span>
            </button>
          ))}
        </div>
        <div className="purpose-heading">
          <h2>
            Our purpose.
            <br />
            <em>Your right to care.</em>
          </h2>
        </div>
      </div>
      <div className="purpose-mosaic" {...swipe}>
        {commitments.map((c, i) => (
          <button
            key={c.title}
            data-swipe-item
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            className={`mosaic-panel ${selected === i ? 'active' : ''}`}
          >
            <Media id={c.image} />
            <span className="mosaic-caption">
              <Icon name={c.icon} />
              <span>
                <strong>{c.title}</strong>
                {selected === i && <small>{c.detail}</small>}
              </span>
              <span className="round-arrow">→</span>
            </span>
          </button>
        ))}
        <div className="mobile-carousel-nav">
          <button aria-label="Previous commitment" onClick={() => setSelected((selected + 2) % 3)}>
            ‹
          </button>
          <button aria-label="Next commitment" onClick={() => setSelected((selected + 1) % 3)}>
            ›
          </button>
        </div>
      </div>
      <div className="dots">
        {commitments.map((c, i) => (
          <button
            key={c.title}
            aria-label={`Show ${c.title}`}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
            className={i === selected ? 'selected' : ''}
          />
        ))}
      </div>
    </section>
  );
}
export function WorkCarousel({ feature = false }: { feature?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState(0);
  const story = workStories[selected];
  const showStory = (index: number) => {
    setSelected(index);
    setFilter(0);
  };
  const swipe = useSwipe((direction) => {
    setSelected((current) => (current + direction + workStories.length) % workStories.length);
    setFilter(0);
  });
  return (
    <div className={feature ? 'work-explorer' : 'home-work container section-pad'}>
      {!feature && (
        <div className="title-row">
          <SectionTitle>Care that reaches the community.</SectionTitle>
          <CarouselControls index={selected} total={3} onChange={showStory} />
        </div>
      )}
      {feature && (
        <Selector
          labels={['All programmes', ...workStories.map((s) => s.tab)]}
          selected={filter}
          onChange={(i) => {
            setFilter(i);
            setSelected(Math.max(0, i - 1));
          }}
        />
      )}
      <div className={`work-slide ${feature ? 'work-slide--feature' : ''}`} {...swipe}>
        <Media id={story.image} />
        {feature ? (
          <div className="work-story navy" aria-live="polite">
            <h2>{story.heading}</h2>
            <p>{story.description}</p>
            <div className="story-steps">
              {story.steps.map((s, i) => (
                <div key={s}>
                  <span className="icon-circle">
                    <Icon name={i === 0 ? story.icon : i === 1 ? 'file-text' : 'community-first'} />
                  </span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <Button tone="text" href={enquiryUrl(story.enquiry, 'outreach')}>
              Explore the programme
            </Button>
            <CarouselControls index={selected} total={3} onChange={showStory} />
          </div>
        ) : (
          <>
            <div className="work-slide-caption" aria-live="polite">
              <strong>{story.title}</strong>
              <p>{story.description}</p>
              <Link href="/work" className="round-arrow" aria-label={`Explore ${story.title}`}>
                →
              </Link>
            </div>
            <button
              className="next-story"
              data-swipe-item
              aria-label={`Show next story: ${workStories[(selected + 1) % workStories.length].title}`}
              onClick={() => showStory((selected + 1) % workStories.length)}
            >
              <Media id={workStories[(selected + 1) % workStories.length].image} />
            </button>
          </>
        )}
      </div>
      {!feature && (
        <Selector
          labels={workStories.map((s) => s.tab)}
          icons={workStories.map((s) => s.icon)}
          selected={selected}
          onChange={setSelected}
        />
      )}
    </div>
  );
}
export function MissionExplorer() {
  const [selected, setSelected] = useState(1);
  return (
    <section className="mission-section" id="purpose">
      <div className="container hospital-mission section-pad">
        <div>
          <h2>
            Rural-first.
            <br />
            Disability-first.
            <br />
            <em>Community-first.</em>
          </h2>
          <p>Healthcare shaped around the needs of people with disabilities and their families.</p>
          <Selector
            labels={commitments.map((c) => c.title)}
            icons={commitments.map((c) => c.icon)}
            selected={selected}
            onChange={setSelected}
          />
          <p className="mission-description" aria-live="polite">
            {commitments[selected].detail}
          </p>
        </div>
        <div className="mission-symbol">
          <Media id={commitments[selected].image} />
          <svg className="mission-art" viewBox="0 0 640 520" aria-hidden="true">
            <g fill="var(--teal)">
              <path d="M35 123C6 222 46 321 151 376C213 410 266 452 311 502C282 416 234 371 155 327C84 287 60 216 51 143C49 129 43 122 35 123Z" />
              <path
                transform="translate(640 0) scale(-1 1)"
                d="M35 123C6 222 46 321 151 376C213 410 266 452 311 502C282 416 234 371 155 327C84 287 60 216 51 143C49 129 43 122 35 123Z"
              />
            </g>
            <path fill="var(--gold)" d="M300 8H340V48H380V88H340V128H300V88H260V48H300Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
export function ApproachExplorer() {
  const options = [
    {
      title: 'Treat',
      icon: 'consultation',
      image: '07-care-journey-cutout',
      description: 'Understand needs and support appropriate treatment.',
    },
    {
      title: 'Rehabilitate',
      icon: 'rehabilitation',
      image: '10-adult-rehabilitation',
      description: 'Build skills for greater independence.',
    },
    {
      title: 'Prevent',
      icon: 'shield-check',
      image: '04-programme-eye-care',
      description: 'Connect people with screening, awareness and prevention.',
    },
    {
      title: 'Support',
      icon: 'community-first',
      image: '03-mission-disability-rehab',
      description: 'Walk alongside individuals, caregivers and families.',
    },
  ];
  const [selected, setSelected] = useState(1);
  const item = options[selected];
  return (
    <section id="approach" className="ice approach-section">
      <div className="container approach-grid">
        <SectionTitle description="From early support to long-term independence, we walk alongside individuals and families.">
          One connected
          <br />
          approach to <em>care.</em>
        </SectionTitle>
        <div className="approach-orbit" role="group" aria-label="Explore our approach">
          {options.map((o, i) => (
            <button
              key={o.title}
              className={i === selected ? 'selected' : ''}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              <Icon name={o.icon} />
              <span>{o.title}</span>
            </button>
          ))}
        </div>
        <div className="approach-preview" aria-live="polite">
          <Media id={item.image} />
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link href="/care" aria-label={`Explore ${item.title.toLowerCase()}`}>
              →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ServiceExplorer() {
  const [selected, setSelected] = useState(1);
  const item = services[selected];
  return (
    <section className="service-explorer">
      <div className="container">
        <Selector
          labels={['Clinical care', 'Disability & rehabilitation', 'Community care']}
          icons={['heart', 'disability-first', 'community-first']}
          selected={item.group}
          onChange={(i) => setSelected(services.findIndex((s) => s.group === i))}
        />
        <div className="service-layout">
          <div className="service-list" role="group" aria-label="Care and services">
            {services.map((s, i) => (
              <button
                key={s.id}
                aria-pressed={selected === i}
                className={selected === i ? 'selected' : ''}
                onClick={() => setSelected(i)}
              >
                <Icon name={s.icon} />
                <span>{s.title}</span>
                <span aria-hidden="true">›</span>
              </button>
            ))}
          </div>
          <div className="service-panel" aria-live="polite">
            <Media id={item.image} />
            <div className="service-caption">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="service-features">
                {item.features.map((f, i) => (
                  <span key={f}>
                    <Icon name={['rehabilitation', 'disability-first', 'community-first'][i]} />
                    {f}
                  </span>
                ))}
                <Button href={enquiryUrl(item.title, 'hospital')} tone="gold">
                  Ask about this service
                </Button>
              </div>
              <small className="availability">
                Contact the hospital to confirm availability before planning your visit.
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function CareJourney() {
  const [selected, setSelected] = useState(2);
  return (
    <section className="container section-pad care-journey">
      <div className="title-row">
        <SectionTitle>Understand the care journey.</SectionTitle>
        <CarouselControls label="care step" index={selected} total={4} onChange={setSelected} />
      </div>
      <div className="journey-steps" role="group" aria-label="Care journey">
        {careSteps.map((s, i) => (
          <button
            key={s.title}
            className={selected === i ? 'selected' : ''}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="step-number">0{i + 1}</span>
            <Media id={s.image} />
            <div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="journey-detail" aria-live="polite">
        <strong>{careSteps[selected].title}</strong> {careSteps[selected].description}
      </p>
    </section>
  );
}
export function FundingExplorer() {
  const categories = ['Critical care', 'Diagnostics', 'Rehabilitation', 'Hospital systems'];
  const [selected, setSelected] = useState(2);
  const featured = [
    programmes.find((p) => p.id === 'icu')!,
    programmes.find((p) => p.id === 'lab')!,
    programmes.find((p) => p.id === 'rehab')!,
    programmes.find((p) => p.id === 'it')!,
  ];
  const p = featured[selected];
  return (
    <section className="funding-explorer ice" id="needs">
      <div className="container section-pad">
        <div className="title-row">
          <SectionTitle>Where your partnership can help.</SectionTitle>
          <CarouselControls
            label="area of need"
            index={selected}
            total={4}
            onChange={setSelected}
          />
        </div>
        <Selector labels={categories} selected={selected} onChange={setSelected} />
        <div className="funding-feature" aria-live="polite">
          <Media id={p.asset} />
          <div className="funding-feature__detail">
            <h3>
              {selected === 2 ? (
                <>
                  Support mobility.
                  <br />
                  Strengthen independence.
                </>
              ) : (
                p.heading
              )}
            </h3>
            <ul>
              {p.scope.map((s, i) => (
                <li key={s}>
                  <Icon name={['rehabilitation', 'treatment', 'disability-first'][i]} />
                  {s}
                </li>
              ))}
            </ul>
            <Button tone="text" href={`/funding/${p.id}`}>
              Read the programme brief
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ProposalDirectory() {
  const [category, setCategory] = useState(0);
  const categories = [
    'All proposals',
    'Critical care',
    'Diagnostics',
    'Rehabilitation',
    'Hospital systems',
  ];
  const visible =
    category === 0 ? programmes : programmes.filter((p) => p.category === categories[category]);
  return (
    <section className="container proposal-directory section-pad" id="proposals">
      <div className="proposal-directory-heading">
        <SectionTitle description="Explore every programme, review its scope and download the original funding proposal.">
          Find a programme to support.
        </SectionTitle>
        <span className="proposal-total">15 funding proposals</span>
      </div>
      <Selector
        labels={categories}
        selected={category}
        onChange={setCategory}
        className="proposal-filters"
      />
      <p className="proposal-results" role="status">
        Showing {visible.length} of 15 proposals
      </p>
      <div className="proposal-rows">
        {visible.map((p) => (
          <article key={p.id}>
            <Link
              className="proposal-thumb"
              href={`/funding/${p.id}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Media id={p.asset} />
            </Link>
            <div>
              <Link className="proposal-title" href={`/funding/${p.id}`}>
                {p.title}
              </Link>
              <span className="proposal-category">{p.category}</span>
              <p>{p.scope[0]}.</p>
            </div>
            <a
              className="proposal-download"
              href={`/media/support/${p.source_document}`}
              download
              aria-label={`Download ${p.title} proposal DOCX`}
            >
              <Icon name="file-text" />
              <span>
                Download proposal <small>(DOCX)</small>
              </span>
            </a>
            <Link
              className="round-arrow"
              href={`/funding/${p.id}`}
              aria-label={`Read ${p.title} programme`}
            >
              ›
            </Link>
          </article>
        ))}
      </div>
      <div className="directory-foot">
        <small>Planning estimates and overlapping scopes are disclosed within each proposal.</small>
      </div>
    </section>
  );
}
export function PartnershipPath() {
  const [selected, setSelected] = useState(0);
  const items = [
    ['Define the scope', 'Agree a clinical programme and a documented scope of support.'],
    ['Review procurement', 'Source and procure equipment and services.'],
    ['Equip & train', 'Install equipment and build team capability.'],
    ['Report utilisation', 'Share how support is put to use.'],
  ];
  return (
    <section className="navy partnership-path">
      <div className="container section-pad">
        <h2>A clear path from support to service.</h2>
        <div className="path-steps">
          {items.map((s, i) => (
            <button
              key={s[0]}
              className={selected === i ? 'selected' : ''}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
            >
              <span className="step-number">{i + 1}</span>
              <span>
                <strong>{s[0]}</strong>
                <small>{s[1]}</small>
              </span>
            </button>
          ))}
        </div>
        <p className="path-detail" aria-live="polite">
          {items[selected][1]}
        </p>
      </div>
    </section>
  );
}
export function DocumentExplorer() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="container document-section section-pad">
      <SectionTitle description="Access detailed proposals, institutional documents and our reporting approach.">
        Transparent information
        <br />
        for confident partnership.
      </SectionTitle>
      <div className="document-explorer">
        <Selector
          labels={['Proposals', 'Institutional documents', 'Reporting framework']}
          selected={selected}
          onChange={setSelected}
        />
        <div className="document-content" aria-live="polite">
          {selected === 0 ? (
            <>
              <img
                src="/media/support/covers/dialysis-programme-cover.svg"
                alt="Dialysis programme proposal cover"
                width="170"
                height="230"
              />
              <div>
                <h3>Detailed programme proposals</h3>
                <p>Clinical objectives, proposed scope and source equipment allocations.</p>
                <Button href="/media/support/documents/dialysis.docx" tone="text" download>
                  Download dialysis DOCX
                </Button>
                <Button href="#proposals" tone="text">
                  Explore all proposals
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Icon name={selected === 1 ? 'file-text' : 'clipboard-check'} />
              <h3>{selected === 1 ? 'Institutional documents' : 'A shared reporting approach'}</h3>
              <p>
                {selected === 1
                  ? 'Request approved institutional and due diligence documents directly from the team.'
                  : 'Discuss procurement records, commissioning confirmation and utilisation reporting with the team. Sample records are not evidence of completed procurement.'}
              </p>
              <Button
                href={enquiryUrl(
                  selected === 1 ? 'Institutional documents' : 'Reporting framework'
                )}
                tone="text"
              >
                Request information
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export function HealthCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="health-card-stage">
      <button
        className={`health-card ${flipped ? 'flipped' : ''}`}
        aria-label={`Show ${flipped ? 'front' : 'back'} of sample health card`}
        onClick={() => setFlipped(!flipped)}
      >
        <img
          src={`/media/support/cards/health-card-${flipped ? 'back' : 'front'}.svg`}
          alt={`Demo health card ${flipped ? 'back' : 'front'} — sample patient, not a real identity`}
          width="540"
          height="340"
        />
      </button>
      <button
        className="button button--white"
        onClick={() => setFlipped(!flipped)}
        aria-pressed={flipped}
      >
        Turn the card <span aria-hidden="true">⟳</span>
      </button>
    </div>
  );
}
export function CardProcess() {
  const [selected, setSelected] = useState(2);
  const steps = [
    ['Register', 'Add basic details'],
    ['Identify', 'Confirm the patient'],
    ['Print', 'Create the health card'],
    ['Use at care points', 'Show card at each visit'],
  ];
  return (
    <div className="card-process">
      <div className="card-process-steps">
        {steps.map((s, i) => (
          <button
            className={selected === i ? 'selected' : ''}
            key={s[0]}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span className="step-number">{i + 1}</span>
            <span>
              <strong>{s[0]}</strong>
              <small>{s[1]}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="printing-layout">
        <Media
          id={
            selected === 2
              ? '23-health-card-registration'
              : selected === 3
                ? '02-mission-rural-family'
                : '21-hospital-it-systems'
          }
        />
        <div aria-live="polite">
          <h3>{selected === 2 ? 'Two printing modes' : steps[selected][0]}</h3>
          {selected === 2 ? (
            <>
              <details open>
                <summary>
                  <Icon name="printer" />
                  At the clinic or camp
                </summary>
                <p>Print cards on-site during registration.</p>
              </details>
              <details>
                <summary>
                  <Icon name="community-first" />
                  Central batch printing
                </summary>
                <p>Print multiple cards for camp or clinic use.</p>
              </details>
            </>
          ) : (
            <p>
              {steps[selected][1]}. This is a proposed workflow; final deployment details require
              confirmation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export function CampusExplorer() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="container campus-selector">
        <Selector
          labels={['Hospital campus', 'Community outreach']}
          icons={['building2', 'community-first']}
          selected={selected}
          onChange={setSelected}
        />
      </div>
      <section className="campus-section container" id="campus">
        <Media
          id={selected === 0 ? '01-hero-hospital' : '05-programme-rural-health-camp'}
          desktopVariant={selected === 0 ? 'mobile' : 'desktop'}
        />
        <div aria-live="polite">
          <h2>{selected === 0 ? 'Antharagange, Kolar' : 'Care in our communities'}</h2>
          <p>
            {selected === 0
              ? 'Kolar district, Karnataka'
              : 'Health camps, screening and prevention.'}
          </p>
          <div className="campus-care">
            {['Clinical care', 'Rehabilitation', 'Referral support'].map((s, i) => (
              <Link href="/care" key={s}>
                <span className="icon-circle">
                  <Icon name={['consultation', 'rehabilitation', 'community-first'][i]} />
                </span>
                {s}
                <span>›</span>
              </Link>
            ))}
          </div>
          <Button href={selected === 0 ? enquiryUrl('Hospital visit', 'hospital') : '/work'}>
            {selected === 0 ? 'Contact the hospital team' : 'See our community work'}
          </Button>
        </div>
      </section>
    </>
  );
}
export function ReachExplorer() {
  const [selected, setSelected] = useState(1);
  const steps = [
    {
      title: 'Campus',
      image: '01-hero-hospital',
      description: 'Explore the hospital campus and proposed care pathways',
    },
    {
      title: 'Community',
      image: '05-programme-rural-health-camp',
      description: 'Health camps, screening and prevention',
    },
    {
      title: 'Follow-up',
      image: '03-mission-disability-rehab',
      description: 'Ongoing care and support in the community',
    },
  ];
  return (
    <section className="navy reach-section" id="outreach">
      <div className="container section-pad">
        <h2>The care journey reaches further.</h2>
        <p>
          From our hospital campus to communities across Kolar, a continuum of care for stronger
          lives.
        </p>
        <div className="reach-items" role="group" aria-label="Care connections">
          {steps.map((s, i) => (
            <button
              key={s.title}
              aria-pressed={selected === i}
              className={selected === i ? 'selected' : ''}
              onClick={() => setSelected(i)}
            >
              <Media
                id={s.image}
                desktopVariant={s.image === '01-hero-hospital' ? 'mobile' : 'desktop'}
              />
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </button>
          ))}
        </div>
        <small>Illustrative care model · Exact locations and schedules to be confirmed.</small>
      </div>
    </section>
  );
}
export function ProgrammeScope({ scope, image }: { scope: string[]; image: string }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="programme-scope">
      <div className="hotspot-scene">
        <Media id={image} />
        {scope.map((s, i) => (
          <button
            key={s}
            className={`hotspot hotspot--${i} ${i === selected ? 'selected' : ''}`}
            aria-label={`Explore ${s}`}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {i + 1}
          </button>
        ))}
        <div className="hotspot-label" aria-live="polite">
          <strong>{scope[selected]}</strong>
          <small>Proposed scope · final specifications require confirmation.</small>
        </div>
      </div>
      <div className="scope-legend">
        {scope.map((s, i) => (
          <button
            key={s}
            className={selected === i ? 'selected' : ''}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="step-number">{i + 1}</span>
            <Icon name={['treatment', 'layers', 'shield-check'][i]} />
            <span>{s}</span>
          </button>
        ))}
      </div>
      <small className="scope-disclaimer">
        Illustrative service layout; not a final room plan.
      </small>
    </div>
  );
}
export function Accountability() {
  const [selected, setSelected] = useState(0);
  const titles = ['Procurement records', 'Commissioning record', 'Utilisation reporting'];
  const copy = [
    'Agree purchase orders, invoices and related records for equipment and systems.',
    'Confirm installation, acceptance and service readiness with the hospital.',
    'Define an appropriate reporting schedule and indicators, protecting patient confidentiality.',
  ];
  return (
    <section className="navy accountability">
      <div className="container section-pad">
        <SectionTitle description="Agree the records and reporting needed to support transparency and accountability.">
          Support that can be
          <br />
          followed through.
        </SectionTitle>
        <div>
          <Selector labels={titles} selected={selected} onChange={setSelected} />
          <div className="accountability-content" aria-live="polite">
            <Icon name={['file-text', 'clipboard-check', 'layers'][selected]} />
            <div>
              <h3>{titles[selected]}</h3>
              <p>{copy[selected]}</p>
              <Button tone="white" href={enquiryUrl(titles[selected])}>
                Discuss reporting
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
