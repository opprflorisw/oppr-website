import { PageHeader } from "@/components/how-it-works/PageHeader";
import { TwoWorldsSection } from "@/components/how-it-works/TwoWorldsSection";
import { TraditionalApproachesSection } from "@/components/how-it-works/TraditionalApproachesSection";
import { UnifiedTimelineSection } from "@/components/how-it-works/UnifiedTimelineSection";
import { ModulesSection } from "@/components/how-it-works/ModulesSection";
import { ClosedLoopSection } from "@/components/how-it-works/ClosedLoopSection";
import { CaseStudySection } from "@/components/how-it-works/CaseStudySection";
import { GettingStartedSection } from "@/components/how-it-works/GettingStartedSection";
import { HowItWorksCTA } from "@/components/how-it-works/HowItWorksCTA";

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader />
      <TwoWorldsSection />
      <TraditionalApproachesSection />
      <UnifiedTimelineSection />
      <ModulesSection />
      <ClosedLoopSection />
      <CaseStudySection />
      <GettingStartedSection />
      <HowItWorksCTA />
    </>
  );
}
