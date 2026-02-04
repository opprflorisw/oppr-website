"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Clock, Translate } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { staggerContainer, waveChild } from "@/lib/animations";

const stats = [
  {
    value: 90,
    suffix: "%",
    label: "Of operational knowledge goes undocumented",
  },
  {
    value: 27,
    suffix: "%",
    label: "Of manufacturing workers retire in the next 5 years",
  },
  {
    prefix: "€",
    value: 1,
    suffix: "M+",
    label: "Average annual cost of knowledge loss for mid-sized manufacturers",
  },
];

const problems = [
  {
    icon: Users,
    title: "You Only Hear a Few Voices",
    description:
      "Meetings and surveys capture input from the loudest or most available. The frontline worker with the critical insight? They're too busy to attend.",
  },
  {
    icon: Clock,
    title: "Feedback Requires Meetings",
    description:
      "Synchronous sessions exclude shift workers, field staff, and anyone not in the room. Real insights come from those closest to the work.",
  },
  {
    icon: Translate,
    title: "Language Barriers Block Input",
    description:
      "Multi-language workforces can't contribute equally in English-only surveys. Valuable perspectives get lost in translation—or never shared.",
  },
];

export function ChallengeSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const problemsRef = useRef(null);
  const problemsInView = useInView(problemsRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="The Challenge"
        title="Critical Knowledge Disappears Every Day"
      />

      {/* Stats grid */}
      <motion.div
        ref={statsRef}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={waveChild}
            className="rounded-2xl border border-border-light bg-white p-8 text-center"
          >
            <AnimatedCounter
              target={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="text-5xl md:text-6xl font-serif font-bold text-oppr-primary block mb-3"
            />
            <p className="text-text-secondary leading-relaxed">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Problem cards */}
      <motion.div
        ref={problemsRef}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={problemsInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            variants={waveChild}
            className="text-center p-8"
          >
            <div className="w-14 h-14 rounded-xl bg-oppr-light flex items-center justify-center mx-auto mb-5">
              <problem.icon size={28} weight="duotone" className="text-oppr-primary" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              {problem.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {problem.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
