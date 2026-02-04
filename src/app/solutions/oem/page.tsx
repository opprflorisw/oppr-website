"use client";

import {
  Gear,
  Plug,
  CurrencyCircleDollar,
  GraduationCap,
} from "@phosphor-icons/react";
import { SolutionPageHeader } from "@/components/solutions/shared/SolutionPageHeader";
import { ChallengeSection } from "@/components/solutions/shared/ChallengeSection";
import { OEMValueSection } from "@/components/solutions/oem/OEMValueSection";
import { OEMUseCasesSection } from "@/components/solutions/oem/OEMUseCasesSection";
import { SolutionCTA } from "@/components/solutions/shared/SolutionCTA";

const challenges = [
  {
    icon: Plug,
    title: "You Lose Visibility After Installation",
    description:
      "Once equipment ships, you're disconnected. Customers call when something breaks, not when something is starting to go wrong.",
  },
  {
    icon: CurrencyCircleDollar,
    title: "Service Revenue Is Reactive",
    description:
      "No infrastructure for proactive service or predictive maintenance. Service revenue is unpredictable and margin-compressed.",
  },
  {
    icon: GraduationCap,
    title: "Training Doesn't Stick",
    description:
      "Operators trained during commissioning forget or leave. Customers call with questions you already answered.",
  },
];

export default function OEMSolutionPage() {
  return (
    <>
      <SolutionPageHeader
        icon={Gear}
        iconGradient="from-oppr-primary/20 to-oppr-primary/5"
        label="For Equipment Manufacturers & Machine Builders"
        title="What If Every Machine You Sell Came With Built-In Intelligence?"
        tagline="We\u2019re exploring partnerships with forward-thinking OEMs. Your machines generate data. Your customers generate knowledge. What if you could capture both?"
      />
      <ChallengeSection
        title="The OEM Opportunity"
        intro="You build sophisticated equipment. After installation, you lose visibility. What if the equipment you sell came with an intelligence layer pre-installed?"
        challenges={challenges}
      />
      <OEMValueSection />
      <OEMUseCasesSection />
      <SolutionCTA text="Explore OEM Partnership" />
    </>
  );
}
