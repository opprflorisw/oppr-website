"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Microphone,
  MagnifyingGlass,
  BookOpen,
  ArrowRight,
  ArrowBendDownLeft,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";

/* ──────────────────────────── Data ──────────────────────────── */

interface LoopStep {
  name: string;
  module: string;
  description: string;
  icon: Icon;
  color: string;
  detail: string;
}

const loopSteps: LoopStep[] = [
  {
    name: "Capture",
    module: "LOGS",
    description: "Knowledge enters the system",
    icon: Microphone,
    color: "#E07A3D",
    detail:
      "Every observation is a data point that didn't exist before. The more you capture, the richer the dataset for analysis.",
  },
  {
    name: "Analyze",
    module: "IDA",
    description: "Patterns surface automatically",
    icon: MagnifyingGlass,
    color: "#3B82F6",
    detail:
      "IDA finds correlations humans miss — connecting observations across shifts, time periods, and equipment.",
  },
  {
    name: "Implement",
    module: "DOCS",
    description: "Improvements become permanent",
    icon: BookOpen,
    color: "#10B981",
    detail:
      "Validated insights become living documentation. What's learned stays learned. Accessible at the point of work.",
  },
];

/* ──────────────────────────── Step Card ──────────────────────────── */

function StepCard({ step, index }: { step: LoopStep; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={waveChild}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="rounded-2xl border border-border-light bg-white p-6 transition-all duration-300 h-full"
        style={{
          boxShadow: isHovered
            ? `0 8px 30px ${step.color}15, 0 2px 8px rgba(0,0,0,0.04)`
            : "0 1px 3px rgba(0,0,0,0.04)",
          borderColor: isHovered ? `${step.color}30` : undefined,
        }}
      >
        {/* Icon + module badge */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${step.color}10` }}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <step.icon
              size={24}
              weight="duotone"
              style={{ color: step.color }}
            />
          </motion.div>
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${step.color}10`,
                color: step.color,
              }}
            >
              {step.module}
            </span>
          </div>
        </div>

        {/* Title + description */}
        <h4 className="text-lg font-semibold text-text-primary mb-1.5">
          {step.name}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {step.description}
        </p>

        {/* Expanded detail on hover */}
        <motion.div
          initial={false}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div
            className="pt-3 border-t"
            style={{ borderColor: `${step.color}15` }}
          >
            <p className="text-sm text-text-secondary leading-relaxed">
              {step.detail}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Arrow connector (desktop, between cards) */}
      {index < loopSteps.length - 1 && (
        <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
          <ArrowRight size={18} weight="bold" className="text-border-medium" />
        </div>
      )}
    </motion.div>
  );
}

/* ──────────────────────────── Main Section ──────────────────────────── */

export function ClosedLoopSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="The Closed Loop"
        title="From Capture to Analysis to Implementation"
        subtitle="Each module feeds the next. The loop closes. Value compounds with every cycle."
      />

      {/* 3-column step cards */}
      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-[1000px] mx-auto mb-8"
      >
        {loopSteps.map((step, i) => (
          <StepCard key={step.module} step={step} index={i} />
        ))}
      </motion.div>

      {/* Loop-back indicator */}
      <AnimatedSection>
        <div className="flex items-center justify-center gap-2 text-text-muted">
          <ArrowBendDownLeft size={16} weight="bold" />
          <p className="text-sm italic">
            Better practices lead to better observations — the loop continues
          </p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
