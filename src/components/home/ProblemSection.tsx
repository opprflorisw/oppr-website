"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ClockCountdown, UserMinus, LinkBreak } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, EASE_SNAP } from "@/lib/animations";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const problems = [
  {
    icon: ClockCountdown,
    title: "The Missing Context",
    text: "Your dashboards show the spike. Your MES recorded the quality drop. But the operator who noticed something an hour before? That observation isn\u2019t in any system.",
    solution: "Captured in 20 seconds. Structured by AI. Searchable forever.",
    accentColor: "#EF4444",
  },
  {
    icon: UserMinus,
    title: "The Knowledge Crisis",
    text: "Your best operator can hear when a bearing is about to fail. In 18 months she retires\u2014and 30 years of expertise walks out the door. You can\u2019t Google tribal knowledge.",
    solution: "Expertise captured continuously. Never lost. Always accessible.",
    accentColor: "#EF4444",
  },
  {
    icon: LinkBreak,
    title: "The Methods That Failed",
    text: "Paper logs, digital forms, Kaizen events\u2014they all fail the same way: they require operators to stop working to fill in what someone else thinks matters. The result? PDF graveyards.",
    solution: "Zero-friction voice capture in the flow of work. No forms.",
    accentColor: "#EF4444",
  },
];

const cardVariant: Variants = {
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

export function ProblemSection() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="The Gap Nobody Talks About"
        title={
          <>
            Your Dashboards Show What Happened.
            <br />
            Your Operators Know <em>Why</em>.
            <br />
            Nobody Connects Them.
          </>
        }
      />

      <motion.div
        ref={gridRef}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {problems.map((problem) => (
          <motion.div
            key={problem.title}
            variants={cardVariant}
            className="relative p-8 bg-white rounded-2xl border border-border-light hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            style={{ borderLeft: `4px solid ${problem.accentColor}` }}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-red/15 to-accent-red/5 flex items-center justify-center mb-5 group-hover:from-accent-red/20 group-hover:to-accent-red/10 transition-colors">
              <problem.icon size={28} weight="duotone" className="text-accent-red" />
            </div>
            <h3 className="text-heading-3 text-text-primary mb-3 font-sans">
              {problem.title}
            </h3>
            <p className="text-[0.95rem] text-text-secondary leading-relaxed mb-5">
              {problem.text}
            </p>
            {/* With Oppr solution hint */}
            <div className="pt-4 border-t border-border-light">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-oppr-secondary mb-1.5">
                With Oppr
              </p>
              <p className="text-sm text-text-primary font-medium leading-snug">
                {problem.solution}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection delay={0.3} className="max-w-[700px] mx-auto">
        <blockquote className="relative text-center px-8 py-8 glass-subtle rounded-2xl">
          {/* Decorative SVG quotes */}
          <svg
            className="absolute top-4 left-6 w-10 h-10 opacity-20"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="quote-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E07A3D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="36"
              fontSize="48"
              fontFamily="serif"
              fill="url(#quote-grad)"
            >
              &ldquo;
            </text>
          </svg>
          <p className="text-xl font-serif text-text-primary italic leading-relaxed relative z-10">
            70% of digital transformation projects in manufacturing fail. Not
            because of technology&mdash;because they ignore the human side of
            operations.
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
              fill="url(#quote-grad)"
            >
              &ldquo;
            </text>
          </svg>
        </blockquote>
      </AnimatedSection>
    </SectionWrapper>
  );
}
