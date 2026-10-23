import { Button, SplitHero } from '@/components/primitives';
import { PurposeHome, WorkCarousel } from '@/components/interactive';
import { CareContinuum, FundingHighlights, PartnershipInvite } from '@/components/sections';
import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
export const metadata = pageMetadata('/');
export default function Home() {
  return (
    <>
      <PageStructuredData path="/" />
      <SplitHero
        className="home-hero"

        title={
          <>
            Healing
            <br />
            closer to <em>home.</em>
          </>
        }
        description="Antharagange Rural Hospital in Kolar, Karnataka: a charitable healthcare initiative for rural families and people with disabilities."
        image="01-hero-hospital"
      >
        <Button href="/hospital">Discover our hospital</Button>
        <Button href="/work" tone="text">
          Explore our work
        </Button>
      </SplitHero>
      <PurposeHome />
      <FundingHighlights />
      <WorkCarousel />
      <CareContinuum />
      <PartnershipInvite />
    </>
  );
}
