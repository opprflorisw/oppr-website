"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Stack,
  Question,
  Gear,
  Database,
  ClipboardText,
  Microphone,
  UserCircleGear,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild, EASE_SNAP } from "@/lib/animations";

/* ---------------------------------------------------------------
   Data
   --------------------------------------------------------------- */

interface Concern {
  icon: Icon;
  text: string;
}

const concerns: Concern[] = [
  { icon: Stack, text: "\"Just another tool to learn\"" },
  { icon: Question, text: "\"Will operators actually use it?\"" },
  { icon: Gear, text: "\"Too complicated for the floor\"" },
  { icon: Database, text: "\"We already have too many systems\"" },
];

interface Pillar {
  icon: Icon;
  title: string;
  description: string;
  benefit: string;
  accentColor: string;
  iconGradient: string;
  iconColor: string;
}

const pillars: Pillar[] = [
  {
    icon: ClipboardText,
    title: "Improvement Shouldn\u2019t Be Administrative Work",
    description:
      "Traditional programs treat logging as paperwork. Fill out forms. Enter data. Track everything manually. It\u2019s exhausting \u2014 and operators know it takes them away from the real work. That\u2019s why they stop doing it.",
    benefit: "20-second voice capture. Zero forms. Knowledge flows without friction.",
    accentColor: "#3B82F6",
    iconGradient: "from-blue-500/15 to-blue-500/5",
    iconColor: "text-blue-500",
  },
  {
    icon: Microphone,
    title: "Everyone Contributes. Nothing Gets Lost.",
    description:
      "We facilitate seamless capture of operator experience and shift knowledge. Voice notes, photos, observations \u2014 in any language, at any time. Collective intelligence becomes a structured, searchable asset instead of scattered sticky notes.",
    benefit: "Speak it. Snap it. Done. The collective intelligence of your entire team.",
    accentColor: "#10B981",
    iconGradient: "from-emerald-500/15 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    icon: UserCircleGear,
    title: "AI That Speaks the Operator\u2019s Language",
    description:
      "We built the AI to augment operators, not replace them. It respects their expertise, structures their knowledge without rigid templates, and makes it accessible to engineers, managers, and the next generation \u2014 without changing how operators work.",
    benefit: "Augmentation, not replacement. Respect, not surveillance.",
    accentColor: "#8B5CF6",
    iconGradient: "from-purple-500/15 to-purple-500/5",
    iconColor: "text-purple-500",
  },
];

/* ---------------------------------------------------------------
   Animation variants
   --------------------------------------------------------------- */

const pillarVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_SNAP },
  },
};

/* ---------------------------------------------------------------
   Component
   --------------------------------------------------------------- */

export function OperatorFirstSection() {
  const concernsRef = useRef(null);
  const concernsInView = useInView(concernsRef, { once: true, margin: "-80px" });

  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="subtle">
      <SectionHeader
        label="Operator First"
        title={
          <>
            We&rsquo;ve Heard the Concerns.
            <br />
            Here&rsquo;s Why Oppr Is Different.
          </>
        }
        subtitle="Operator adoption isn&rsquo;t an afterthought &mdash; it&rsquo;s the foundation of everything we built."
      />

      {/* ---- Concerns row ---- */}
      <motion.div
        ref={concernsRef}
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate={concernsInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        {concerns.map((c) => (
          <motion.div
            key={c.text}
            variants={waveChild}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border-light"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400/12 to-slate-400/5 flex items-center justify-center shrink-0">
              <c.icon size={20} weight="duotone" className="text-text-muted" />
            </div>
            <p className="text-sm text-text-muted leading-snug">{c.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ---- Three pillars ---- */}
      <motion.div
        ref={pillarsRef}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={pillarsInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={pillarVariant}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative p-8 bg-white rounded-2xl border border-border-light hover:shadow-elevated transition-all duration-300 flex flex-col"
            style={{ borderLeft: `4px solid ${p.accentColor}` }}
          >
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.iconGradient} flex items-center justify-center mb-5`}
            >
              <p.icon size={28} weight="duotone" className={p.iconColor} />
            </div>

            <h3 className="text-heading-3 text-text-primary mb-3 font-sans">
              {p.title}
            </h3>

            <p className="text-[0.95rem] text-text-secondary leading-relaxed mb-5 flex-grow">
              {p.description}
            </p>

            {/* "Why Oppr" benefit tag */}
            <div className="pt-4 border-t border-border-light">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-oppr-primary mb-1.5">
                Why Oppr
              </p>
              <p className="text-sm text-text-primary font-medium leading-snug">
                {p.benefit}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ---- Closing statement ---- */}
      <AnimatedSection delay={0.3} className="max-w-[700px] mx-auto">
        <blockquote className="relative text-center px-8 py-8 glass-subtle rounded-2xl">
          {/* Decorative opening quote */}
          <svg
            className="absolute top-4 left-6 w-10 h-10 opacity-20"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="adoption-quote-grad"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#1E3A5F" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="36"
              fontSize="48"
              fontFamily="serif"
              fill="url(#adoption-quote-grad)"
            >
              &ldquo;
            </text>
          </svg>

          <p className="text-xl font-serif text-text-primary italic leading-relaxed relative z-10">
            We know this doesn&rsquo;t happen overnight. Adoption is a critical
            part of any transformation. Our approach: start small, get quick
            results, and let the team embrace AI at their own pace &mdash;
            without ever feeling threatened by it.
          </p>

          {/* Decorative closing quote */}
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
              fill="url(#adoption-quote-grad)"
            >
              &ldquo;
            </text>
          </svg>
        </blockquote>
      </AnimatedSection>
    </SectionWrapper>
  );
}
