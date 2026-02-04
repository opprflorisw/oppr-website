"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb,
  MagnifyingGlass,
  Brain,
  GitMerge,
  ShieldCheck,
  ChartLineUp,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, waveChild } from "@/lib/animations";
import type { Icon } from "@phosphor-icons/react";

interface UseCase {
  icon: Icon;
  title: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    icon: Lightbulb,
    title: "Improvement Ideas at Scale",
    description:
      "Your frontline has hundreds of improvement ideas. Most never surface. Oppr Insights captures them systematically—then AI identifies the highest-impact opportunities.",
  },
  {
    icon: MagnifyingGlass,
    title: "Root Cause Investigation",
    description:
      "When something goes wrong, gather observations from everyone involved—different shifts, departments, perspectives. AI synthesizes the complete picture.",
  },
  {
    icon: Brain,
    title: "Expertise Capture",
    description:
      "Before key people retire, capture what they know. Ask them questions, record their answers, preserve their expertise in searchable form.",
  },
  {
    icon: GitMerge,
    title: "Change Management",
    description:
      "Rolling out new processes? Gather feedback on what's working and what isn't—from everyone affected, not just those who attend meetings.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Observations",
    description:
      "Make it easy to report near-misses and safety concerns. Voice input removes barriers. AI identifies patterns before incidents occur.",
  },
  {
    icon: ChartLineUp,
    title: "Strategic Planning Input",
    description:
      "Planning next year's priorities? Get input from the people who do the work. See what themes emerge across the organization.",
  },
];

export function UseCasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="Use Cases"
        title="Insights in Action"
        subtitle="See how teams across industries use Oppr Insights to unlock workforce knowledge."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {useCases.map((useCase, i) => {
          const IconComponent = useCase.icon;
          return (
            <GlowCard key={i} glassLevel="subtle" className="p-8">
              <div className="w-12 h-12 rounded-xl bg-oppr-light flex items-center justify-center mb-5">
                <IconComponent
                  size={24}
                  weight="duotone"
                  className="text-oppr-primary"
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {useCase.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {useCase.description}
              </p>
            </GlowCard>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
