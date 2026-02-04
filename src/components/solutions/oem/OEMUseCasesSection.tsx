"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, waveChild } from "@/lib/animations";

const useCases = [
  {
    title: "Enhanced Service Delivery",
    description:
      "Before service calls, review operator observations. Technicians arrive informed. Higher first-time fix rate. Happier customers.",
  },
  {
    title: "Proactive Maintenance Programs",
    description:
      "Operator observations surface early warning signs. Offer proactive maintenance before breakdown. New service revenue.",
  },
  {
    title: "Continuous Training Reinforcement",
    description:
      "Training content accessible via QR codes on equipment. New operators learn from accumulated knowledge.",
  },
];

export function OEMUseCasesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          What This Enables
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
              glowColor="rgba(30, 58, 95, 0.1)"
              className="p-7 h-full border-l-2 border-l-oppr-primary/30"
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
