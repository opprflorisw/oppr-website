"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Desktop,
  Plug,
  GraduationCap,
  ChartLineUp,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";
import type { Icon } from "@phosphor-icons/react";

const deploymentSteps = [
  {
    number: "01",
    title: "Knowledge Risk Assessment",
    timeline: "~2 Weeks",
    color: "#E07A3D",
    text: "We assess where your critical knowledge lives, identify key-person dependencies, and pinpoint the highest-value starting point.",
  },
  {
    number: "02",
    title: "Single-Line Pilot",
    timeline: "First 2 Months",
    color: "#E07A3D",
    text: "Deploy on one production line. Train operators in 15 minutes. Value starts from day one \u2014 every captured observation builds your knowledge base.",
  },
  {
    number: "03",
    title: "Analysis & First Results",
    timeline: "Month 3",
    color: "#3B82F6",
    text: "Review captured data, surface first insights, and demonstrate measurable value. First ROI typically appears here \u2014 prove it before expanding.",
  },
  {
    number: "04",
    title: "Scale What Works",
    timeline: "Onwards",
    color: "#10B981",
    text: "Expand to additional lines, shifts, or sites based on proven results. ROI compounds as the knowledge base grows \u2014 no big bang required.",
  },
];

const features: { icon: Icon; title: string; text: string }[] = [
  {
    icon: Desktop,
    title: "No IT Project",
    text: "Cloud-based, mobile-first. Works on existing devices. No hardware installation.",
  },
  {
    icon: Plug,
    title: "Optional Integration",
    text: "Start standalone. Connect to historians/MES when ready. Integration enhances but isn't required.",
  },
  {
    icon: GraduationCap,
    title: "Minimal Training",
    text: "If they can send a voice message, they can use LOGS. Real training time: 15 minutes.",
  },
  {
    icon: ChartLineUp,
    title: "Quick ROI",
    text: "Most customers see measurable value within the first months. Often from a single prevented failure.",
  },
];

export function GettingStartedSection() {
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="Start Small. Prove Fast."
        title="Deployed in Weeks, Not Months"
        subtitle="No IT project. No complex integration. Start with one line, prove value, then scale what works."
      />

      {/* Deployment steps */}
      <motion.div
        ref={stepsRef}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={stepsInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {deploymentSteps.map((step) => (
          <motion.div
            key={step.number}
            variants={waveChild}
            className="rounded-xl border border-border-light bg-white p-7 transition-colors"
            style={{ borderLeftWidth: 4, borderLeftColor: step.color }}
          >
            <span
              className="block text-5xl font-serif leading-none mb-4"
              style={{ color: `${step.color}20` }}
            >
              {step.number}
            </span>
            <h3 className="text-lg font-semibold text-text-primary mb-2 min-h-[3.5rem] flex items-start">
              {step.title}
            </h3>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: step.color }}
            >
              {step.timeline}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {step.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        ref={featRef}
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate={featInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {features.map((feat) => (
          <motion.div
            key={feat.title}
            variants={waveChild}
            className="text-center p-6 bg-white rounded-xl border border-border-light"
          >
            <feat.icon
              size={32}
              weight="duotone"
              className="text-oppr-primary mx-auto mb-3"
            />
            <h4 className="font-semibold text-text-primary mb-2">
              {feat.title}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {feat.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
