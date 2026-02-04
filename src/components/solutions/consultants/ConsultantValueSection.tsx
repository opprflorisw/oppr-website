"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, morphIn } from "@/lib/animations";

const useCases = [
  {
    title: "During the Engagement: Capture at Scale",
    before:
      "Gemba walks, interviews—valuable but limited by who you can talk to.",
    withOppr:
      "Every operator contributes observations continuously. Imagine analyzing 400 observations from 45 operators, not interviews with 15 people. That\u2019s the Oppr difference.",
  },
  {
    title: "For Root Cause: Human Context Ready",
    before:
      "Interview people who remember fragments. Piece together narrative from imperfect memory.",
    withOppr:
      "Operator observations from the time of the issue already captured. Contemporaneous data, not reconstructed memories.",
  },
  {
    title: "After the Engagement: Sustainability Built In",
    before:
      "Hand over documentation, hope they maintain momentum.",
    withOppr:
      "System continues capturing. Best practices embedded in living documentation. Your work produces infrastructure that makes PDCA cycles actually cycle\u2014not just documents.",
  },
];

export function ConsultantValueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          How Consultants Use Oppr
        </h3>
      </AnimatedSection>

      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-8 max-w-[800px] mx-auto"
      >
        {useCases.map((uc) => (
          <motion.div
            key={uc.title}
            variants={morphIn}
            className="bg-white border border-border-light rounded-xl p-6"
          >
            <h4 className="font-semibold text-text-primary text-lg mb-4">
              {uc.title}
            </h4>

            <div className="rounded-lg border border-border-light bg-bg-subtle/60 p-4 mb-3">
              <p className="text-sm text-text-secondary leading-relaxed">
                <span className="font-semibold text-text-muted">Before: </span>
                {uc.before}
              </p>
            </div>

            <div className="rounded-lg border border-docs/20 bg-docs/5 p-4">
              <p className="text-sm text-text-secondary leading-relaxed">
                <span className="font-semibold text-docs">
                  With Oppr:{" "}
                </span>
                {uc.withOppr}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
