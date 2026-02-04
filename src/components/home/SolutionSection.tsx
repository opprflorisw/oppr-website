"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Microphone, Brain, ChartLine, ArrowRight } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { BearingTimeline } from "./BearingTimeline";
import { staggerContainer, EASE_SNAP, EASE_SMOOTH_OUT } from "@/lib/animations";

const steps = [
  {
    num: "1",
    icon: Microphone,
    title: "Operators speak what they notice",
    text: "20 seconds. Any language. Voice, photos, observations. Zero friction.",
  },
  {
    num: "2",
    icon: Brain,
    title: "AI structures and connects",
    text: "Timestamped. Tagged to equipment. Linked in the knowledge graph.",
  },
  {
    num: "3",
    icon: ChartLine,
    title: "Everything on one timeline",
    text: "Human observations + machine data. Correlatable. Queryable. Connected.",
  },
];

const stepVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

export function SolutionSection() {
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="The Solution"
        title="Capture the 'why' that explains the 'what'"
        subtitle="Operators capture what they notice—voice, photos, as easy as sending a message. We bring it together with machine data on one unified timeline. Now you can finally see what happened AND why."
      />

      {/* 3-Step Flow */}
      <motion.div
        ref={flowRef}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={flowInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 mb-12 relative"
      >
        {steps.map((step, i) => (
          <motion.div key={step.num} variants={stepVariant} className="relative">
            <div className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-0 p-6">
              {/* Number Badge with pulse ring */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oppr-primary to-oppr-dark text-white flex items-center justify-center text-lg font-bold shadow-lg relative z-10">
                  {step.num}
                </div>
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-xl bg-oppr-primary/20" style={{ animation: `pulse-ring 2s ease-out ${i * 0.3 + 0.5}s infinite` }} />
              </div>

              <div className="md:mt-4">
                <div className="w-10 h-10 rounded-lg bg-bg-subtle flex items-center justify-center mb-3 mx-auto hidden md:flex">
                  <step.icon size={22} weight="duotone" className="text-oppr-primary" />
                </div>
                <h3 className="text-heading-3 text-text-primary mb-2 font-sans">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-[260px] md:mx-auto">
                  {step.text}
                </p>
              </div>
            </div>

            {/* Animated arrow connector (desktop only) */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 text-oppr-primary/40">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={flowInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.4, ease: EASE_SMOOTH_OUT }}
                >
                  <ArrowRight size={20} weight="bold" />
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Bearing Timeline */}
      <div className="max-w-[700px] mx-auto">
        <BearingTimeline />
      </div>
    </SectionWrapper>
  );
}
