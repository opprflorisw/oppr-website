"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Lightning, Brain, Repeat, UserCirclePlus } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, EASE_SNAP } from "@/lib/animations";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const values = [
  {
    icon: Lightning,
    title: "Root cause in hours, not weeks",
    text: "When something goes wrong, you see what people noticed—not just what sensors recorded. The investigation that used to take three weeks now takes an afternoon.",
    iconGradient: "from-amber-400/20 to-amber-500/5",
  },
  {
    icon: Brain,
    title: "Knowledge that compounds",
    text: "Every observation stays. Every insight is searchable. Every pattern gets smarter. The longer you use it, the more valuable it becomes.",
    iconGradient: "from-blue-400/20 to-blue-500/5",
  },
  {
    icon: Repeat,
    title: "Improvements that stick",
    text: "The knowing-doing gap closes when documentation reflects what actually works. Best practices captured, validated, embedded—not forgotten after the Kaizen event.",
    iconGradient: "from-green-400/20 to-green-500/5",
  },
  {
    icon: UserCirclePlus,
    title: "Expertise preserved",
    text: "When your best operator retires, their knowledge doesn't walk out the door. It's captured, searchable, and available to train the next generation.",
    iconGradient: "from-purple-400/20 to-purple-500/5",
  },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

export function ValueSection() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="What Becomes Possible"
        title="When human knowledge and machine data connect"
      />

      {/* Value Cards */}
      <motion.div
        ref={gridRef}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        {values.map((v) => (
          <motion.div
            key={v.title}
            variants={cardVariant}
            className="p-7 bg-white rounded-2xl border border-border-light hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.iconGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <v.icon size={24} weight="duotone" className="text-oppr-primary" />
            </div>
            <h3 className="text-heading-3 text-text-primary mb-3 font-sans">
              {v.title}
            </h3>
            <p className="text-[0.925rem] text-text-secondary leading-relaxed">
              {v.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats */}
      <AnimatedSection delay={0.2}>
        <div className="glass-medium rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-mono font-bold text-oppr-primary mb-1">
              <AnimatedCounter target={20} suffix=" sec" />
            </div>
            <div className="text-sm font-medium text-text-primary mb-1">Average time to capture an observation</div>
            <div className="text-xs text-text-muted">vs. 8 minutes for forms</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-oppr-secondary to-transparent" />
          </div>
          <div className="text-center pt-8 sm:pt-0">
            <div className="text-3xl lg:text-4xl font-mono font-bold text-oppr-primary mb-1">
              <AnimatedCounter target={95} suffix="%" />
            </div>
            <div className="text-sm font-medium text-text-primary mb-1">Faster root cause identification</div>
            <div className="text-xs text-text-muted">Hours instead of weeks</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-ida to-transparent" />
          </div>
          <div className="text-center pt-8 sm:pt-0">
            <div className="text-3xl lg:text-4xl font-mono font-bold text-oppr-primary mb-1">
              &lt;<AnimatedCounter target={8} suffix=" weeks" />
            </div>
            <div className="text-sm font-medium text-text-primary mb-1">Typical time to deployment</div>
            <div className="text-xs text-text-muted">No IT project required</div>
            <div className="mt-2 h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-docs to-transparent" />
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
