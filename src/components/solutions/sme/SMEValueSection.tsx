"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Microphone,
  MagnifyingGlass,
  BookOpen,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, morphIn } from "@/lib/animations";

const valueItems = [
  {
    icon: Microphone,
    title: "Capture Knowledge Without Stopping Work",
    text: "Operators speak observations in 20 seconds—in any language. Take a photo of something unusual. No forms, no logins, no training. Knowledge gets captured because capturing it takes no extra time.",
  },
  {
    icon: MagnifyingGlass,
    title: "Find Answers Without Analysts",
    text: "\u201CWhen did we last see this quality issue?\u201D Ask questions in plain language and get answers instantly. No database queries, no digging through files. Anyone can investigate.",
  },
  {
    icon: BookOpen,
    title: "Procedures That Reflect Reality",
    text: "Your SOPs probably describe how things should work, not how they actually work. Oppr builds living documentation from what your people actually do.",
  },
];

export function SMEValueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          What Oppr Gives You
        </h3>
      </AnimatedSection>

      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-6 max-w-[800px] mx-auto"
      >
        {valueItems.map((item) => (
          <motion.div key={item.title} variants={morphIn}>
            <GlowCard
              glowColor="rgba(224, 122, 61, 0.1)"
              className="flex gap-5 p-6 border-l-2 border-l-oppr-secondary/30"
            >
              <div className="w-14 h-14 bg-oppr-secondary/8 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon
                  size={24}
                  weight="duotone"
                  className="text-oppr-primary"
                />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.text}
                </p>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
