"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Notebook,
  Robot,
  FileText,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild, EASE_SMOOTH_OUT, EASE_SNAP } from "@/lib/animations";

const orbitItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_SMOOTH_OUT, delay: 0.5 },
  },
};

export function PlatformConnectionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      {/* Top: Text content */}
      <AnimatedSection className="text-center max-w-[720px] mx-auto mb-14">
        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
          From Discovery to Execution
        </p>
        <h2 className="text-display-2 font-serif text-text-primary mb-5">
          Insights Structures Your Discovery. The Platform Executes the Solution.
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          Oppr Insights helps you formalize what your team already senses. It
          gives everyone a voice, structures loose ideas, and surfaces what
          matters most. When you&apos;re ready to act — the execution platform
          is your next step.
        </p>
      </AnimatedSection>

      {/* Visual: Two systems side by side */}
      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[860px] mx-auto"
      >
        {/* Labels row — horizontally aligned */}
        <motion.div variants={waveChild} className="flex items-start mb-6">
          {/* Left label */}
          <div className="flex-1 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-oppr-secondary mb-0.5">
              Oppr Insights
            </p>
            <p className="text-sm text-text-muted font-medium">Discovery</p>
          </div>
          {/* Spacer for arrow area */}
          <div className="w-[120px] shrink-0" />
          {/* Right label */}
          <div className="flex-1 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-oppr-primary mb-0.5">
              Oppr Platform
            </p>
            <p className="text-sm text-text-muted font-medium">Execution</p>
          </div>
        </motion.div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-0">

          {/* Left — Insights card */}
          <motion.div variants={orbitItem} className="flex-1 flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-2xl bg-oppr-secondary/8 border border-oppr-secondary/15" />
              <div className="relative flex flex-col items-center gap-2.5 p-7 rounded-xl border-2 border-oppr-secondary bg-white shadow-lg min-w-[120px]">
                <Lightbulb
                  size={36}
                  weight="duotone"
                  className="text-oppr-secondary"
                />
                <span className="text-sm font-bold text-oppr-secondary">
                  Insights
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center — straight arrow */}
          <motion.div
            variants={waveChild}
            className="shrink-0 flex items-center justify-center w-[120px] py-4 lg:py-0"
          >
            {/* Desktop: horizontal arrow */}
            <svg
              width="120"
              height="24"
              viewBox="0 0 120 24"
              fill="none"
              className="hidden lg:block"
            >
              <motion.line
                x1="0"
                y1="12"
                x2="108"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="text-border-medium"
                variants={drawLine}
              />
              <motion.polygon
                points="104,6 116,12 104,18"
                fill="currentColor"
                className="text-text-muted"
                variants={orbitItem}
              />
            </svg>
            {/* Mobile: vertical arrow */}
            <div className="lg:hidden flex flex-col items-center gap-1">
              <div className="w-px h-8 border-l-2 border-dashed border-border-medium" />
              <ArrowRight size={16} weight="bold" className="text-text-muted rotate-90" />
              <div className="w-px h-4 border-l-2 border-dashed border-border-medium" />
            </div>
          </motion.div>

          {/* Right — Platform: 3 modules in a circle */}
          <motion.div variants={waveChild} className="flex-1 flex justify-center">
            <div className="relative w-[260px] h-[250px]">
              {/* Orbit ring — true circle */}
              <motion.svg
                variants={orbitItem}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 260 250"
                fill="none"
              >
                <circle
                  cx="130"
                  cy="125"
                  r="105"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="text-border-light"
                />
              </motion.svg>

              {/* LOGS — top (12 o'clock position) */}
              <motion.div
                variants={orbitItem}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: "-4px" }}
              >
                <div className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-xl border border-border-light bg-white shadow-sm">
                  <Notebook
                    size={28}
                    weight="duotone"
                    className="text-oppr-primary"
                  />
                  <span className="text-xs font-bold text-text-primary">
                    LOGS
                  </span>
                </div>
              </motion.div>

              {/* IDA — bottom left (7 o'clock position) */}
              <motion.div
                variants={orbitItem}
                className="absolute"
                style={{ left: "-10px", bottom: "6px" }}
              >
                <div className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-xl border border-border-light bg-white shadow-sm">
                  <Robot
                    size={28}
                    weight="duotone"
                    className="text-oppr-primary"
                  />
                  <span className="text-xs font-bold text-text-primary">
                    IDA
                  </span>
                </div>
              </motion.div>

              {/* DOCS — bottom right (5 o'clock position) */}
              <motion.div
                variants={orbitItem}
                className="absolute"
                style={{ right: "-10px", bottom: "6px" }}
              >
                <div className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-xl border border-border-light bg-white shadow-sm">
                  <FileText
                    size={28}
                    weight="duotone"
                    className="text-oppr-primary"
                  />
                  <span className="text-xs font-bold text-text-primary">
                    DOCS
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA button */}
        <motion.div variants={waveChild} className="text-center mt-12">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl focus-ring"
          >
            See How the Platform Works
            <ArrowRight size={18} weight="bold" />
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
