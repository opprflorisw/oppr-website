"use client";

import { XCircle, CheckCircle } from "@phosphor-icons/react";
import type { Example } from "./examplesData";

interface ExampleViewerContentProps {
  example: Example;
}

export function ExampleViewerContent({ example }: ExampleViewerContentProps) {
  const IconComponent = example.icon;

  return (
    <div className="flex flex-col min-h-[620px] md:min-h-[560px]">
      {/* Header - fixed height zone */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-11 h-11 rounded-lg bg-gradient-to-br ${example.iconGradient} flex items-center justify-center flex-shrink-0`}
        >
          <IconComponent size={22} weight="duotone" className="text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-serif text-text-primary leading-tight">{example.title}</h2>
        </div>
      </div>

      {/* The Situation - fixed height zone */}
      <div className="mb-4 min-h-[60px]">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted mb-1.5">
          The Situation
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{example.situation}</p>
      </div>

      {/* Comparison Grid - takes remaining space */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-1">
        {/* Without Oppr */}
        <div className="rounded-xl border border-border-light overflow-hidden flex flex-col">
          <div className="bg-bg-subtle px-4 py-2 flex items-center gap-2 border-b border-border-light">
            <XCircle size={16} weight="fill" className="text-text-muted" />
            <span className="text-sm font-semibold text-text-secondary">
              Without Oppr
            </span>
          </div>
          <div className="p-4 space-y-2.5 flex-1">
            {example.withoutTimeline.map((event, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[11px] font-semibold text-text-muted whitespace-nowrap min-w-[80px] pt-0.5">
                  {event.day}
                </span>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  {event.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-3 rounded-lg bg-bg-subtle border border-border-light px-3 py-2">
            <p className="text-[12px] font-semibold text-text-secondary">
              {example.withoutOutcome}
            </p>
          </div>
        </div>

        {/* With Oppr */}
        <div className="rounded-xl border border-docs/20 overflow-hidden flex flex-col">
          <div className="bg-docs/5 px-4 py-2 flex items-center gap-2 border-b border-docs/20">
            <CheckCircle size={16} weight="fill" className="text-docs" />
            <span className="text-sm font-semibold text-docs">
              With Oppr
            </span>
          </div>
          <div className="p-4 space-y-2.5 flex-1">
            {example.withTimeline.map((event, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[11px] font-semibold text-docs whitespace-nowrap min-w-[80px] pt-0.5">
                  {event.day}
                </span>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  {event.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-3 rounded-lg bg-docs/5 border border-docs/20 px-3 py-2">
            <p className="text-[12px] font-semibold text-docs">
              {example.withOutcome}
            </p>
          </div>
        </div>
      </div>

      {/* Key Insight - always at bottom */}
      <div className="bg-gradient-to-r from-oppr-primary/5 to-oppr-secondary/5 border-l-3 border-oppr-primary rounded-r-xl px-5 py-3">
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-oppr-primary mb-1">
          The Key Insight
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">{example.insight}</p>
      </div>
    </div>
  );
}
