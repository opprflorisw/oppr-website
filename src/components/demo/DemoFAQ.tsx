"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

const faqs = [
  {
    question: "How long is the demo?",
    answer:
      "About 30 minutes. We'll show you the platform and leave time for questions. We respect your time.",
  },
  {
    question: "Is there any cost or commitment?",
    answer:
      "The demo is completely free with no obligation. We'll only move forward if there's a clear fit.",
  },
  {
    question: "What if I'm just exploring?",
    answer:
      "That's fine! Many people want to understand what's possible before making any decisions. We're happy to show you.",
  },
  {
    question: "Can I bring colleagues?",
    answer:
      "Absolutely. We often demo to teams—plant managers, operators, IT, whoever would be involved.",
  },
];

export function DemoFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="light">
      <SectionHeader title="Common Questions" />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto"
      >
        {faqs.map((faq) => (
          <motion.div
            key={faq.question}
            variants={waveChild}
            className="bg-white rounded-xl p-6 border border-border-light"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {faq.question}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
