"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, EASE_SNAP } from "@/lib/animations";

const testimonials = [
  {
    text: "Two weeks after starting with Oppr, our operators captured more useful information than we\u2019d collected in the previous decade on paper logs and Excel.",
    name: "Thomas van Dijk",
    company: "Plant Manager, Food Processing, Netherlands",
  },
  {
    text: "One operator observation prevented a \u20AC55,000 bearing failure. The system flagged a pattern we\u2019d never have caught with sensors alone.",
    name: "Maria Schneider",
    company: "Maintenance Director, Chemical Manufacturing, Germany",
  },
  {
    text: "We lost 40 years of expertise when our lead technician retired. With Oppr, we\u2019re capturing that knowledge while people are still here to share it.",
    name: "Jan Verbeke",
    company: "Operations Director, Equipment Manufacturer, Belgium",
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

export function SocialProofSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="Trusted By Manufacturers"
        title="Real results from real operations"
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={cardVariant}
            className="relative p-7 bg-white rounded-2xl border border-border-light hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
          >
            {/* Decorative quote mark */}
            <svg
              className="absolute top-4 left-5 w-8 h-8 opacity-10"
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              <text
                x="0"
                y="36"
                fontSize="48"
                fontFamily="serif"
                fill="#E07A3D"
              >
                &ldquo;
              </text>
            </svg>

            <p className="text-[0.95rem] text-text-secondary leading-relaxed italic mb-6 relative z-10">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="pt-4 border-t border-border-light relative">
              {/* Orange accent line */}
              <div className="absolute top-0 left-0 w-10 h-0.5 bg-gradient-to-r from-oppr-secondary to-oppr-secondary/0" />
              <div className="text-sm font-semibold text-text-primary">
                {t.name}
              </div>
              <div className="text-xs text-text-muted">{t.company}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
