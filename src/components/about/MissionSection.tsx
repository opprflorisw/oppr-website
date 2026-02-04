"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { staggerContainer, waveChild } from "@/lib/animations";

const stats = [
  { value: 90, suffix: "%", label: "Of operational knowledge is undocumented" },
  { value: 2.1, suffix: "M", label: "Manufacturing workers retiring in the next decade", decimals: 1 },
  { value: 90, suffix: "%", label: "Of root cause context exists only in people's heads" },
];

export function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <AnimatedSection>
          <h2 className="text-display-2 font-serif text-text-primary mb-6">
            Digitizing Your Shop Floor, Future-Proofing Your Manufacturing
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Our mission is to empower SME manufacturers to stay competitive. We digitize your shop floor, make your assets future-proof, and turn your data and team knowledge into a powerful operational advantage.
          </p>
          <div className="p-6 bg-oppr-primary/5 rounded-2xl border border-oppr-primary/10 italic text-oppr-primary relative">
            <span className="absolute -top-4 -left-2 text-6xl opacity-10 font-serif">&ldquo;</span>
            &ldquo;We created Oppr.ai so you never have to guess what&apos;s happening on your own shop-floor again. Imagine a colleague who never sleeps—and always knows.&rdquo;
            <div className="mt-4 font-sans font-semibold text-sm not-italic">&mdash; Floris Wyers, Founder & CEO</div>
          </div>
        </AnimatedSection>

        {/* Right — Pillars */}
        <motion.div
          ref={ref}
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6"
        >
          {[
            {
              title: "Empower Your People",
              desc: "Our intuitive tools give operators real-time insights and make it easy to capture and share vital shop-floor knowledge, turning every team member into an expert.",
              color: "border-logs",
              iconBg: "bg-logs/10",
              iconColor: "text-logs"
            },
            {
              title: "Enhance Your Assets",
              desc: "Make your existing machinery smarter. We layer modern AI onto your current equipment to boost uptime and extend asset life, helping you avoid costly replacements.",
              color: "border-ida",
              iconBg: "bg-ida/10",
              iconColor: "text-ida"
            },
            {
              title: "Elevate Your Performance",
              desc: "Our AI-powered recommendations help you optimize processes, reduce waste, and consistently hit production targets to drive continuous improvement 24/7.",
              color: "border-docs",
              iconBg: "bg-docs/10",
              iconColor: "text-docs"
            }
          ].map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={waveChild}
              className={`bg-white rounded-xl p-6 border-l-4 shadow-sm ${pillar.color} border-y border-r border-border-light`}
            >
              <h3 className="text-xl font-bold text-text-primary mb-2">{pillar.title}</h3>
              <p className="text-text-secondary leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
