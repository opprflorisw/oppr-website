"use client";

import {
  Buildings,
  Database,
  Users,
  Warning,
} from "@phosphor-icons/react";
import { SolutionPageHeader } from "@/components/solutions/shared/SolutionPageHeader";
import { ChallengeSection } from "@/components/solutions/shared/ChallengeSection";
import { EnterpriseValueSection } from "@/components/solutions/enterprise/EnterpriseValueSection";
import { EnterpriseUseCasesSection } from "@/components/solutions/enterprise/EnterpriseUseCasesSection";
import { SolutionCTA } from "@/components/solutions/shared/SolutionCTA";

const challenges = [
  {
    icon: Database,
    title: "Massive Investment, Persistent Gap",
    description:
      "MES, historians, SCADA, analytics\u2014you\u2019ve invested millions (on average 12% of revenue). But none capture the human intelligence that explains the machine data. The result: 8% quality costs and 300% replacement costs when key people leave.",
  },
  {
    icon: Users,
    title: "Islands of Human Knowledge",
    description:
      "Each plant has its own practices. Your best operators' knowledge is locked in their heads. Nobody knows what 'best' looks like across the enterprise.",
  },
  {
    icon: Warning,
    title: "70% Transformation Failure Rate",
    description:
      "Digital initiatives deliver dashboards but not improvement. Machine data alone doesn't drive change—the human context layer is missing.",
  },
];

export default function EnterpriseSolutionPage() {
  return (
    <>
      <SolutionPageHeader
        icon={Buildings}
        iconGradient="from-ida/20 to-ida/5"
        label="For Enterprise Manufacturers"
        title="The Human Data Layer Your Tech Stack Is Missing"
        tagline="You've invested millions in MES, historians, and analytics. You have more machine data than ever. Yet your best operators still know things your systems don't capture."
      />
      <ChallengeSection
        title="The Enterprise Paradox"
        intro="Your plants generate terabytes of data. You have dashboards for everything. And yet—when a quality issue occurs, your first call is still to the veteran operator who 'just knows' what's going on."
        challenges={challenges}
      />
      <EnterpriseValueSection />
      <EnterpriseUseCasesSection />
      <SolutionCTA text="Request an Enterprise Evaluation" />
    </>
  );
}
