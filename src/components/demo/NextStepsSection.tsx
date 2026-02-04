"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Envelope, CalendarBlank, VideoCamera } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

const steps = [
  {
    icon: Envelope,
    title: "1. We'll Email You",
    description:
      "Within one business day, you'll hear from us with some available times.",
  },
  {
    icon: CalendarBlank,
    title: "2. Schedule the Demo",
    description:
      "Pick a 30-minute slot that works for you. We'll send a calendar invite.",
  },
  {
    icon: VideoCamera,
    title: "3. See It Live",
    description:
      "We'll walk through the platform and discuss how it applies to your operation.",
  },
];

export function NextStepsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader title="What Happens After You Submit" />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col md:flex-row items-stretch gap-0"
      >
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col md:flex-row items-center flex-1">
            <motion.div
              variants={waveChild}
              className="bg-bg-light rounded-xl border border-border-light p-7 text-center flex-1 w-full"
            >
              <div className="w-14 h-14 rounded-full bg-oppr-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon
                  size={26}
                  weight="duotone"
                  className="text-oppr-primary"
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="hidden md:block w-10 h-px bg-border-light shrink-0" />
            )}
            {i < steps.length - 1 && (
              <div className="md:hidden h-8 w-px bg-border-light shrink-0" />
            )}
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
