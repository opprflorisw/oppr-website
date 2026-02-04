"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, morphIn } from "@/lib/animations";

const valueDrivers = [
  {
    number: 1,
    title: "Rapid Operational Diagnostics",
    description:
      "Within weeks, visibility into what operators actually know—problems, improvement ideas, knowledge gaps. Diagnostic informs where to focus.",
    timeline: "4-8 weeks to actionable insights",
  },
  {
    number: 2,
    title: "Knowledge Preservation",
    description:
      "Capture tacit expertise before key people leave. Make institutional knowledge an actual asset—documented, searchable, transferable.",
    timeline: "Ongoing from day one",
  },
  {
    number: 3,
    title: "Accelerated Problem Resolution",
    description:
      "Investigation time drops 60-75%. Faster resolution means less production impact, better margins.",
    timeline: "Immediate once deployed",
  },
  {
    number: 4,
    title: "Cross-Portfolio Learning",
    description:
      "Patterns at one company can transfer to others. Portfolio becomes a network where operational learning compounds.",
    timeline: "Emerging with multiple deployments",
  },
];

export function PEValueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          Value Creation Framework
        </h3>
      </AnimatedSection>

      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-6 max-w-[800px] mx-auto"
      >
        {valueDrivers.map((driver) => (
          <motion.div key={driver.title} variants={morphIn}>
            <GlowCard
              glowColor="rgba(139, 92, 246, 0.1)"
              className="flex gap-5 p-6 border-l-2 border-l-accent-purple/30"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent-purple to-accent-purple/80 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">
                  {driver.number}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">
                  {driver.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {driver.description}
                </p>
                <span className="inline-block text-xs font-semibold text-oppr-secondary bg-oppr-secondary/8 px-3 py-1 rounded-full">
                  {driver.timeline}
                </span>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
