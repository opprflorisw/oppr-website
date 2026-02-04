"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, waveChild } from "@/lib/animations";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonLabel: string;
  buttonHref: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    description:
      "Get hands-on with capturing knowledge and improving operations at no cost.",
    price: "\u20AC0/month",
    features: [
      "Up to 3 users",
      "Up to 50 topics/feedbacks/insights per month",
      "Text/voice notes/photos",
      "Basic AI-generated insights",
      "User dashboard",
    ],
    buttonLabel: "Start Free Trial",
    buttonHref: "/demo",
  },
  {
    name: "Growth",
    description:
      "All Starter features, plus enhanced capacity and deeper AI insights.",
    price: "\u20AC499/month",
    features: [
      "Up to 25 users",
      "Up to 500 topics/feedbacks/insights per month",
      "Advanced AI-generated insights",
      "Sentiment indicators",
      "IDA natural language query",
      "CSV export",
    ],
    buttonLabel: "Choose Growth",
    buttonHref: "/demo",
  },
  {
    name: "Scale",
    description:
      "All Growth features, plus advanced AI and integration into Oppr ecosystem.",
    price: "\u20AC899/month",
    features: [
      "Up to 100 users",
      "Up to 1500 topics/feedbacks/insights per month",
      "Pattern identification & contradiction analysis",
      "Full IDA with deeper research",
      "AI-drafted SOPs from insights",
      "Full API access",
      "LOGS/DOCS integration",
    ],
    buttonLabel: "Get Scale",
    buttonHref: "/demo",
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(1);

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Pricing"
        title="Plans for Every Stage"
        subtitle="Start free, scale as you grow. No credit card required to try."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch"
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
              {/* "Most Popular" badge — always on Growth card, color toggles */}
              {i === 1 && (
                <span
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200 ${
                    selected === 1
                      ? "bg-oppr-primary text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  Most Popular
                </span>
              )}

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
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Enterprise bar */}
      <AnimatedSection delay={0.3}>
        <div className="bg-bg-light rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-1">
              Enterprise
            </h3>
            <p className="text-text-secondary">
              Custom solutions, unlimited scale, and dedicated support for
              organizations with advanced needs.
            </p>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-3 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl shrink-0"
          >
            Contact Sales
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
