import { notFound } from 'next/navigation';
import { Button, SectionTitle, SplitHero } from '@/components/primitives';
import { PageStructuredData } from '@/components/seo';
import { enquiryUrl } from '@/content/programmes';
import { workStories } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return workStories.map(({ id }) => ({ story: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ story: string }> }) {
  const { story } = await params;
  if (!workStories.some(({ id }) => id === story)) notFound();
  return pageMetadata(`/work/${story}`);
}

export default async function CommunityProgramme({
  params,
}: {
  params: Promise<{ story: string }>;
}) {
  const { story } = await params;
  const programme = workStories.find(({ id }) => id === story);
  if (!programme) notFound();

  return (
    <>
      <PageStructuredData path={`/work/${story}`} />
      <SplitHero title={programme.title} description={programme.audience} image={programme.image}>
        <Button href={enquiryUrl(programme.enquiry, 'outreach')}>Ask about this programme</Button>
        <Button href="/work" tone="text">
          All community programmes
        </Button>
      </SplitHero>
      <section className="container section-pad">
        <SectionTitle description={programme.description}>How the programme works</SectionTitle>
        <ol className="community-detail-steps">
          {programme.steps.map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{step}</h3>
              <p>{programme.details[index]}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="ice">
        <div className="container section-pad">
          <SectionTitle description="Ask about upcoming activities or how to organise a programme with your community.">
            Get involved
          </SectionTitle>
          <Button href={enquiryUrl(programme.enquiry, 'outreach')}>
            Contact the outreach team
          </Button>
        </div>
      </section>
    </>
  );
}
