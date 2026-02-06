import type { Metadata } from "next";
import { PageHeader } from "@/components/how-it-works/PageHeader";
import { TwoWorldsSection } from "@/components/how-it-works/TwoWorldsSection";
import { TraditionalApproachesSection } from "@/components/how-it-works/TraditionalApproachesSection";
import { UnifiedTimelineSection } from "@/components/how-it-works/UnifiedTimelineSection";
import { ModulesSection } from "@/components/how-it-works/ModulesSection";
import { ClosedLoopSection } from "@/components/how-it-works/ClosedLoopSection";
import { CaseStudySection } from "@/components/how-it-works/CaseStudySection";
import { GettingStartedSection } from "@/components/how-it-works/GettingStartedSection";
import { HowItWorksCTA } from "@/components/how-it-works/HowItWorksCTA";

export const metadata: Metadata = {
  title: "How It Works | The Digital Operator Platform",
  description: "Discover how Oppr captures operator knowledge with LOGS, analyzes it with IDA, and turns insights into living documentation with DOCS. Three modules, one continuous loop.",
};

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
