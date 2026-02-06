"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

interface PricingTier {
  name: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
  buttonLabel: string;
  buttonHref: string;
}

const tiers: PricingTier[] = [
  {
    name: "Idea Starter",
    tagline: "Explore structured ideation",
    description:
      "Perfect for teams beginning to formalize their improvement thinking. Capture initial ideas, run focused discovery topics, and experience how AI transforms scattered observations into clear starting points.",
    price: "\u20AC299/month",
    features: [
      "Run focused discovery topics with your team",
      "AI-powered structuring of voice, text, and photo input",
      "Any language \u2014 auto-translated",
      "AI-generated theme detection and summaries",
      "Dashboard to track and review structured ideas",
    ],
    buttonLabel: "Get Started",
    buttonHref: "/insights/contact?plan=idea-starter",
  },
  {
    name: "Idea Engine",
    tagline: "Build your ideation rhythm",
    description:
      "For organizations making structured ideation a core part of how they operate. Run multiple concurrent topics across departments and regions. Build a continuous pipeline of AI-structured ideas. The perfect foundation for downstream execution with the Oppr core platform.",
    price: "\u20AC899/month",
    features: [
      "Everything in Idea Starter",
      "Run concurrent topics across departments and regions",
      "Advanced pattern identification across multiple topics",
      "Build a continuous pipeline of structured ideas",
      "Full integration readiness with the Oppr execution platform",
      "API access for connecting to your existing workflows",
    ],
    buttonLabel: "Scale Your Ideation",
    buttonHref: "/insights/contact?plan=idea-engine",
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(0);

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Pricing"
        title="Plans for Every Stage"
        subtitle="Start small, build momentum. Choose the pace that fits your organization."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto items-stretch"
      >
        {tiers.map((tier, i) => {
          const isSelected = selected === i;

          return (
            <motion.div
              key={i}
              variants={waveChild}
              animate={{
                scale: isSelected ? 1.02 : 1,
                borderColor: isSelected ? "#1E3A5F" : "#E2E8F0",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setSelected(i)}
              className={`relative rounded-2xl bg-white p-8 flex flex-col cursor-pointer transition-shadow duration-300 ${
                isSelected
                  ? "border-2 border-oppr-primary shadow-lg"
                  : "border-2 border-border-light hover:shadow-elevated"
              }`}
            >
              {/* Tagline badge */}
              <span
                className={`inline-block self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 transition-colors duration-200 ${
                  isSelected
                    ? "bg-oppr-primary/10 text-oppr-primary"
                    : "bg-bg-light text-text-muted"
                }`}
              >
                {tier.tagline}
              </span>

              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {tier.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {tier.description}
              </p>
              <p className="text-3xl font-serif font-bold text-text-primary mb-6">
                {tier.price}
              </p>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <Check
                      size={18}
                      weight="bold"
                      className={`shrink-0 mt-0.5 transition-colors duration-200 ${
                        isSelected ? "text-oppr-primary" : "text-oppr-primary/60"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.buttonHref}
                className={`block text-center w-full px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 mt-auto ${
                  isSelected
                    ? "bg-oppr-primary text-white hover:bg-oppr-dark hover:shadow-xl"
                    : "bg-bg-light text-text-primary border border-border-light hover:bg-bg-subtle hover:shadow-md"
                }`}
              >
                {tier.buttonLabel}
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="inline-block ml-2"
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
