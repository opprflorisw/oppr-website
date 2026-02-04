"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  LinkBreak,
  CurrencyCircleDollar,
  CheckCircle,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

const patterns = [
  {
    icon: Brain,
    title: "The Knowledge Existed",
    description:
      "In every case, someone knew something valuable. The information was there—in an operator's head, in their senses, in their experience.",
  },
  {
    icon: LinkBreak,
    title: "The Connection Was Missing",
    description:
      "Without capture and correlation, valuable observations stayed disconnected from the data systems that could have acted on them.",
  },
  {
    icon: CurrencyCircleDollar,
    title: "The Cost Was Significant",
    description:
      "Lost production, repeated investigations, knowledge walking out the door. The cost of uncaptured knowledge compounds over time.",
  },
  {
    icon: CheckCircle,
    title: "The Solution Was Simple",
    description:
      "Effortless capture is the key. The technology doesn't need to be complex—it needs to be so simple that using it takes less effort than not using it.",
  },
];

export function PatternSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="The Pattern"
        title="What These Examples Have in Common"
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {patterns.map((pattern) => (
          <motion.div
            key={pattern.title}
            variants={waveChild}
            className="bg-white rounded-2xl border border-border-light p-8 text-center"
          >
            <div className="flex justify-center mb-5">
              <pattern.icon
                size={40}
                weight="duotone"
                className="text-oppr-primary"
              />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {pattern.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {pattern.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
