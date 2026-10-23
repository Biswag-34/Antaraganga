import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
import { SplitHero } from '@/components/primitives';
import { CampusExplorer, ReachExplorer } from '@/components/interactive';
import { ConversationLinks } from '@/components/sections';
export const metadata = pageMetadata('/network');
export default function Network() {
  return (
    <>
      <PageStructuredData path="/network" />
      <SplitHero
        className="network-hero"

        title={
          <>
            Rooted in Kolar.
            <br />
            Connected to our
            <br />
            <em>communities.</em>
          </>
        }
        description="Quality healthcare for rural families and people with disabilities, across Kolar district."
        image="08-partnership-landscape"
      />
      <CampusExplorer />
      <ReachExplorer />
      <ConversationLinks />
    </>
  );
}
