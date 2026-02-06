"use client";

import {
  ChartLineUp,
  ArrowCounterClockwise,
  FileDashed,
  Repeat,
} from "@phosphor-icons/react";
import { SolutionPageHeader } from "@/components/solutions/shared/SolutionPageHeader";
import { ChallengeSection } from "@/components/solutions/shared/ChallengeSection";
import { ConsultantValueSection } from "@/components/solutions/consultants/ConsultantValueSection";
import { ConsultantDifferentiationSection } from "@/components/solutions/consultants/ConsultantDifferentiationSection";
import { SolutionCTA } from "@/components/solutions/shared/SolutionCTA";
import { NextStepBanner } from "@/components/shared/NextStepBanner";

const challenges = [
  {
    icon: ArrowCounterClockwise,
    title: "Improvements Don't Stick",
    description:
      "Lean programs produce results—for a few months. Six Sigma tools stop being used after certification. The methodology works; the infrastructure to sustain it doesn't exist.",
  },
  {
    icon: FileDashed,
    title: "Documentation Goes Stale",
    description:
      "Detailed procedures reflect reality on the day you wrote them. Within months, drift occurs. Keeping current would require permanent presence.",
  },
  {
    icon: Repeat,
    title: "Repeat Engagements for Same Problems",
    description:
      "Called back to solve problems you solved two years ago. Different people, same issues. The solution existed but wasn't preserved.",
  },
];

export default function ConsultantsSolutionPage() {
  return (
    <>
      <SolutionPageHeader
        icon={ChartLineUp}
        iconGradient="from-docs/20 to-docs/5"
        label="For Operational Excellence Consultants"
        title="The Infrastructure That Makes Your Work Stick"
        tagline="Your methodologies are sound. Your insights are valuable. But six months after the engagement ends, improvements have eroded. It's not your fault—there was no infrastructure to hold them."
      />
      <ChallengeSection
        title="The Consultant's Dilemma"
        intro="You've seen it dozens of times. Successful engagement, energized team, improvements documented. Six months later, results have faded. A year later, back where they started."
        challenges={challenges}
      />
      <ConsultantValueSection />
      <ConsultantDifferentiationSection />
      <SolutionCTA text="Explore a Partnership" />
      <NextStepBanner label="Offer clients a starting point" title="Recommend Oppr Insights" href="/insights" variant="secondary" />
    </>
  );
}
