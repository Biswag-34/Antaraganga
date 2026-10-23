import type { Metadata } from 'next';
import { SplitHero } from '@/components/primitives';
import { CareJourney, ServiceExplorer } from '@/components/interactive';
import { InclusiveCareInvite, SupportFamily } from '@/components/sections';
export const metadata: Metadata = { title: 'Care & Services' };
export default function Care() {
  return (
    <>
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
      <CareJourney />
      <SupportFamily />
      <InclusiveCareInvite />
    </>
  );
}
