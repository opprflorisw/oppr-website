"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Icon } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, waveChild } from "@/lib/animations";

interface Challenge {
  icon: Icon;
  title: string;
  description: string;
}

interface ChallengeSectionProps {
  title: string;
  intro: string;
  challenges: Challenge[];
}

export function ChallengeSection({
  title,
  intro,
  challenges,
}: ChallengeSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <div className="text-center mb-10">
        <h2 className="text-display-2 font-serif text-text-primary mb-4">
          {title}
        </h2>
        <p className="text-lg text-text-secondary max-w-[650px] mx-auto">
          {intro}
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {challenges.map((c) => (
          <motion.div key={c.title} variants={waveChild}>
            <GlowCard
              glassLevel="subtle"
              glowColor="rgba(224, 122, 61, 0.1)"
              className="p-7 h-full"
            >
              <div className="w-11 h-11 rounded-lg bg-oppr-secondary/10 flex items-center justify-center mb-4">
                <c.icon
                  size={24}
                  weight="duotone"
                  className="text-oppr-secondary"
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {c.description}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
