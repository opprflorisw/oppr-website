"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Quotes } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { staggerContainer, EASE_SNAP, EASE_SMOOTH_OUT } from "@/lib/animations";

const testimonials = [
  {
    text: "Two weeks after starting with Oppr, our operators captured more useful information than we\u2019d collected in the previous decade on paper logs and Excel.",
    name: "Thomas van Dijk",
    role: "Plant Manager",
    company: "Food Processing, Netherlands",
  },
  {
    text: "One operator observation prevented a \u20AC55,000 bearing failure. The system flagged a pattern we\u2019d never have caught with sensors alone.",
    name: "Maria Schneider",
    role: "Maintenance Director",
    company: "Chemical Manufacturing, Germany",
  },
  {
    text: "We lost 40 years of expertise when our lead technician retired. With Oppr, we\u2019re capturing that knowledge while people are still here to share it.",
    name: "Jan Verbeke",
    role: "Operations Director",
    company: "Equipment Manufacturer, Belgium",
  },
];

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
      >
        {testimonials.map((t) => {
          const initials = t.name
            .split(" ")
            .map((n) => n[0])
            .join("");
          return (
            <motion.div
              key={t.name}
              variants={cardVariant}
              whileHover={{
                y: -6,
                boxShadow:
                  "0 20px 40px -12px rgba(30, 58, 95, 0.12), 0 8px 20px -8px rgba(30, 58, 95, 0.08)",
              }}
              transition={{ duration: 0.35, ease: EASE_SMOOTH_OUT }}
              className="relative p-8 bg-white rounded-2xl border border-border-light shadow-sm transition-colors duration-300 hover:border-oppr-primary/20 flex flex-col group"
            >
              {/* Quote icon */}
              <div className="mb-5">
                <Quotes
                  size={32}
                  weight="fill"
                  className="text-oppr-primary/10 group-hover:text-oppr-primary/20 transition-colors duration-300"
                />
              </div>

              {/* Testimonial text */}
              <p className="text-[0.95rem] text-text-secondary leading-relaxed mb-8 flex-grow">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-5 border-t border-border-light/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oppr-primary/10 to-oppr-primary/5 flex items-center justify-center text-oppr-primary text-xs font-bold shrink-0 group-hover:from-oppr-primary/15 group-hover:to-oppr-primary/10 transition-colors duration-300">
                    {initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {t.name}
                    </div>
                    <div className="text-xs text-text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
