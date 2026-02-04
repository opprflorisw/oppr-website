"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";

const phases = [
  {
    label: "The Challenge",
    color: "#EF4444",
    text: "A PVC pipe manufacturer was losing their 'golden recipe' — the specific combination of settings, timing, and adjustments that produced perfect output. Only two operators knew it. One was retiring in 6 months.",
  },
  {
    label: "Month 1\u20132: Capture",
    color: "#E07A3D",
    text: "Both experienced operators used LOGS to voice-capture their observations during production. Every adjustment, every observation about material behavior, every trick they'd learned over decades — captured in 20-second voice logs while they kept working.",
  },
  {
    label: "Month 3: Analyze",
    color: "#3B82F6",
    text: "As data accumulated, IDA correlated operator observations with machine data. Patterns emerged: the golden recipe wasn't just settings — it was a sequence of micro-adjustments based on material behavior that no documentation had ever captured. First measurable ROI appeared here.",
  },
  {
    label: "Month 4: Implement & Validate",
    color: "#10B981",
    text: "DOCS created living procedures that captured the complete golden recipe — including the contextual adjustments. New operators achieved consistent quality within weeks instead of the usual 6\u201312 months of trial and error.",
  },
];

export function CaseStudySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="Case Study"
        title='Saving the "Golden Recipe"'
        subtitle="How a PVC pipe manufacturer preserved decades of operator expertise before it walked out the door."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto mb-10"
      >
        {phases.map((phase) => (
          <motion.div
            key={phase.label}
            variants={waveChild}
            className="rounded-xl border border-border-light bg-white p-6 transition-colors"
            style={{ borderLeftWidth: 4, borderLeftColor: phase.color }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-sm font-bold text-text-primary">
                {phase.label}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {phase.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection delay={0.3} className="max-w-[700px] mx-auto">
        <blockquote className="relative text-center px-8 py-8 glass-subtle rounded-2xl mb-6">
          <svg
            className="absolute top-4 left-6 w-10 h-10 opacity-20"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cs-quote-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E07A3D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="36"
              fontSize="48"
              fontFamily="serif"
              fill="url(#cs-quote-grad)"
            >
              &ldquo;
            </text>
          </svg>
          <p className="text-lg font-serif text-text-primary italic leading-relaxed relative z-10">
            We thought we were documenting a recipe. What we actually captured
            was 30 years of intuition that no interview or training session
            could have extracted.
          </p>
          <svg
            className="absolute bottom-4 right-6 w-10 h-10 opacity-20 rotate-180"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <text
              x="0"
              y="36"
              fontSize="48"
              fontFamily="serif"
              fill="url(#cs-quote-grad)"
            >
              &ldquo;
            </text>
          </svg>
        </blockquote>

        <div className="text-center">
          <Link
            href="/examples"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-oppr-secondary hover:text-oppr-primary transition-colors"
          >
            See more examples
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
