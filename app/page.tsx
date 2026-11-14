import { HomeHero } from '@/components/home-hero';
import { HospitalProgressPreview } from '@/components/hospital-progress';
import { PurposeHome } from '@/components/interactive';
import { ProgrammeCards } from '@/components/programme-cards';
import { CareContinuum, FundingHighlights, PartnershipInvite } from '@/components/sections';
import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
export const metadata = pageMetadata('/');
export default function Home() {
  return (
    <>
      <PageStructuredData path="/" />
      <HomeHero />
      <PurposeHome />
      <ProgrammeCards heading="Care that reaches the community." />
      <CareContinuum />
      <HospitalProgressPreview />
      <FundingHighlights />
      <PartnershipInvite />
    </>
  );
}
