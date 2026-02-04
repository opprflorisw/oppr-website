"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

const values = [
  {
    number: "01",
    title: "Operators First",
    description:
      "Technology should adapt to how people work, not the other way around. If operators won't use it voluntarily, we've failed.",
  },
  {
    number: "02",
    title: "Zero Friction",
    description:
      "Capturing knowledge must be faster than forgetting it. If it takes effort, it won't happen. We obsess over removing every barrier.",
  },
  {
    number: "03",
    title: "Practical Over Theoretical",
    description:
      "We build for real factory floors, not conference room demos. Everything we ship has to work in noisy, busy, real-world conditions.",
  },
  {
    number: "04",
    title: "Knowledge Compounds",
    description:
      "Individual observations become organizational intelligence. The system gets smarter over time. That's the goal.",
  },
  {
    number: "05",
    title: "Honest Technology",
    description:
      "AI should augment human intelligence, not replace it. We're transparent about what AI does and doesn't do.",
  },
  {
    number: "06",
    title: "Measured Impact",
    description:
      "If we can't measure the value, we haven't delivered it. Every deployment should demonstrate concrete, quantifiable results.",
  },
  {
    number: "07",
    title: "Humans Are Sensors",
    description:
      "Humans are the most advanced sensors in any factory. They see, hear, smell, and feel things no instrument can measure. Our job is to turn those sensors into a datasource.",
  },
];

export function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader label="What We Believe" title="Our Values" />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {values.map((value) => (
          <motion.div
            key={value.number}
            variants={waveChild}
            className="bg-bg-light rounded-xl border border-border-light p-7"
          >
            <span className="text-display-2 font-serif text-oppr-primary/20 block mb-3">
              {value.number}
            </span>
            <h4 className="text-lg font-semibold text-text-primary mb-2">
              {value.title}
            </h4>
            <p className="text-text-secondary leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
