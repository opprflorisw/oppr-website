"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { XCircle, CheckCircle } from "@phosphor-icons/react";
import { morphIn } from "@/lib/animations";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

interface TimelineEvent {
  day: string;
  text: string;
}

interface ExampleCardProps {
  category: string;
  categoryLabel: string;
  icon: PhosphorIcon;
  iconGradient: string;
  title: string;
  situation: string;
  withoutTimeline: TimelineEvent[];
  withTimeline: TimelineEvent[];
  withoutOutcome: string;
  withOutcome: string;
  insight: string;
}

export function ExampleCard({
  categoryLabel,
  icon: IconComponent,
  iconGradient,
  title,
  situation,
  withoutTimeline,
  withTimeline,
  withoutOutcome,
  withOutcome,
  insight,
}: ExampleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={morphIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white border border-border-light rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-8 md:p-10">
        <div className="flex items-start gap-5 mb-6">
          <div
            className={`w-16 h-16 rounded-lg bg-gradient-to-br ${iconGradient} flex items-center justify-center flex-shrink-0`}
          >
            <IconComponent size={32} weight="duotone" className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted mb-1">
              {categoryLabel}
            </p>
            <h2 className="text-2xl font-serif text-text-primary">{title}</h2>
          </div>
        </div>

        {/* The Situation */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-text-muted mb-3">
            The Situation
          </h3>
          <p className="text-text-secondary leading-relaxed">{situation}</p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Without Oppr */}
          <div className="rounded-xl border border-red-200 overflow-hidden">
            <div className="bg-red-50 px-5 py-3 flex items-center gap-2 border-b border-red-200">
              <XCircle
                size={20}
                weight="fill"
                className="text-red-500"
              />
              <span className="text-sm font-semibold text-red-700">
                Without Oppr
              </span>
            </div>
            <div className="p-5 space-y-4">
              {withoutTimeline.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs font-semibold text-red-400 whitespace-nowrap min-w-[70px] pt-0.5">
                    {event.day}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {event.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-5 mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm font-semibold text-red-700">
                {withoutOutcome}
              </p>
            </div>
          </div>

          {/* With Oppr */}
          <div className="rounded-xl border border-green-200 overflow-hidden">
            <div className="bg-green-50 px-5 py-3 flex items-center gap-2 border-b border-green-200">
              <CheckCircle
                size={20}
                weight="fill"
                className="text-green-500"
              />
              <span className="text-sm font-semibold text-green-700">
                With Oppr
              </span>
            </div>
            <div className="p-5 space-y-4">
              {withTimeline.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs font-semibold text-green-500 whitespace-nowrap min-w-[70px] pt-0.5">
                    {event.day}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {event.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-5 mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-sm font-semibold text-green-700">
                {withOutcome}
              </p>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-oppr-primary/5 to-oppr-secondary/5 border-l-4 border-oppr-primary rounded-r-xl px-6 py-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-primary mb-2">
            The Key Insight
          </h4>
          <p className="text-text-secondary leading-relaxed">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
}
