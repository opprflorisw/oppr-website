"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Info, CheckCircle, Database, Microphone } from "@phosphor-icons/react";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";

const phases = [
  {
    label: "The Challenge",
    icon: Info,
    text: "A PVC pipe manufacturer was losing their 'golden recipe' — the specific combination of settings, timing, and adjustments that produced perfect output. Only two operators knew it. One was retiring in 6 months.",
  },
  {
    label: "Month 1–2: Capture",
    icon: Microphone,
    text: "Both experienced operators used LOGS to voice-capture their observations during production. Every adjustment, every observation about material behavior, every trick they'd learned over decades — captured in 20-second voice logs while they kept working.",
  },
  {
    label: "Month 3: Analyze",
    icon: Database,
    text: "As data accumulated, IDA correlated operator observations with machine data. Patterns emerged: the golden recipe wasn't just settings — it was a sequence of micro-adjustments based on material behavior that no documentation had ever captured. First measurable ROI appeared here.",
  },
  {
    label: "Month 4: Implement & Validate",
    icon: CheckCircle,
    text: "DOCS created living procedures that captured the complete golden recipe — including the contextual adjustments. New operators achieved consistent quality within weeks instead of the usual 6–12 months of trial and error.",
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
        className="max-w-[800px] mx-auto mb-12 space-y-4"
      >
        {phases.map((phase, index) => (
          <motion.div
            key={phase.label}
            variants={waveChild}
            className={`relative group bg-white border border-border-light rounded-2xl p-5 md:p-6 transition-all hover:border-oppr-secondary/30 hover:shadow-sm ${index === 0 ? "bg-slate-50/30" : ""}`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-5">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${index === 0 ? "bg-oppr-secondary/10 text-oppr-secondary" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-500"}`}>
                <phase.icon size={20} weight="duotone" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {phase.label}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {phase.text}
                </p>
              </div>
            </div>

            {/* Connecting line for visual flow */}
            {index < phases.length - 1 && (
              <div className="absolute left-[31px] md:left-[43px] -bottom-4 w-px h-4 bg-border-light translate-x-[-0.5px] hidden md:block" />
            )}
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection delay={0.3} className="max-w-[700px] mx-auto">
        <blockquote className="relative text-center px-8 py-8 glass-subtle rounded-3xl mb-8 border border-border-light">
          <svg
            className="absolute top-6 left-8 w-10 h-10 opacity-[0.08]"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <text
              x="0"
              y="36"
              fontSize="64"
              fontFamily="serif"
              fill="currentColor"
              className="text-oppr-secondary"
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
            className="absolute bottom-6 right-8 w-10 h-10 opacity-[0.08] rotate-180"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <text
              x="0"
              y="36"
              fontSize="64"
              fontFamily="serif"
              fill="currentColor"
              className="text-oppr-secondary"
            >
              &ldquo;
            </text>
          </svg>
        </blockquote>

        <div className="text-center">
          <Link
            href="/examples"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-oppr-secondary hover:text-oppr-primary transition-colors group"
          >
            See more success stories
            <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}

