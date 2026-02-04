"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, waveChild } from "@/lib/animations";

const useCases = [
  {
    title: "Cross-Site Knowledge Transfer",
    description:
      "All sites capture observations on the same platform. Best practices emerge from actual performance data. Living knowledge transfers, not dead documents.",
  },
  {
    title: "Accelerated Root Cause Analysis",
    description:
      "Operator observations from the time of incidents are already captured. Investigation time drops from weeks to hours.",
  },
  {
    title: "Expertise Preservation at Scale",
    description:
      "Knowledge capture becomes automatic across all facilities. When expertise walks out the door, observations and patterns remain.",
  },
];

export function EnterpriseUseCasesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          Enterprise Use Cases
        </h3>
      </AnimatedSection>

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {useCases.map((uc) => (
          <motion.div key={uc.title} variants={waveChild}>
            <GlowCard
              glassLevel="subtle"
              glowColor="rgba(59, 130, 246, 0.1)"
              className="p-7 h-full border-l-2 border-l-ida/30"
            >
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {uc.title}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {uc.description}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
