import type { Metadata } from "next";
import { AboutHeader } from "@/components/about/AboutHeader";
import { MissionSection } from "@/components/about/MissionSection";
import { StorySection } from "@/components/about/StorySection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { CompanyInfoSection } from "@/components/about/CompanyInfoSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Oppr | Our Mission & Team",
  description: "Meet the team behind Oppr.ai. We're building the human data layer for manufacturing — connecting operator knowledge with machine data to transform operations.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <MissionSection />
      <StorySection />
      <FoundersSection />
      <CompanyInfoSection />
      <ValuesSection />
      <AboutCTA />
    </>
  );
}
