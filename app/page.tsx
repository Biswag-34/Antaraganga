import { Button, SplitHero } from '@/components/primitives';
import { PurposeHome, WorkCarousel } from '@/components/interactive';
import { CareContinuum, FundingHighlights, PartnershipInvite } from '@/components/sections';
export default function Home() {
  return (
    <>
      <SplitHero
        className="home-hero"

        title={
          <>
            Healing
            <br />
            closer to <em>home.</em>
          </>
        }
        description="Compassionate healthcare for rural families and people with disabilities."
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
