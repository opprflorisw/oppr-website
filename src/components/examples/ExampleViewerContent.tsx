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
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.iconGradient} flex items-center justify-center flex-shrink-0 shadow-sm`}
        >
          <IconComponent size={24} weight="duotone" className="text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-serif text-text-primary leading-tight">{example.title}</h2>
        </div>
      </div>

      {/* The Situation */}
      <div className="mb-5 min-h-[60px]">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-2">
          The Situation
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-3">{example.situation}</p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 flex-1">
        {/* Without Oppr */}
        <div className="rounded-xl border border-red-200/70 bg-red-50/30 overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 flex items-center gap-2 border-b border-red-200/50">
            <XCircle size={16} weight="fill" className="text-red-400" />
            <span className="text-sm font-semibold text-red-700/80">
              Without Oppr
            </span>
          </div>
          <div className="p-4 space-y-3 flex-1">
            {example.withoutTimeline.map((event, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[11px] font-bold text-red-400/80 whitespace-nowrap min-w-[80px] pt-0.5 tabular-nums">
                  {event.day}
                </span>
                <p className="text-[12.5px] text-text-secondary leading-relaxed">
                  {event.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-3 rounded-lg bg-red-100/60 border border-red-200/50 px-3 py-2.5">
            <p className="text-[12.5px] font-semibold text-red-700/80">
              {example.withoutOutcome}
            </p>
          </div>
        </div>

        {/* With Oppr */}
        <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/30 overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 flex items-center gap-2 border-b border-emerald-200/50">
            <CheckCircle size={16} weight="fill" className="text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-700/80">
              With Oppr
            </span>
          </div>
          <div className="p-4 space-y-3 flex-1">
            {example.withTimeline.map((event, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[11px] font-bold text-emerald-500/80 whitespace-nowrap min-w-[80px] pt-0.5 tabular-nums">
                  {event.day}
                </span>
                <p className="text-[12.5px] text-text-secondary leading-relaxed">
                  {event.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-3 rounded-lg bg-emerald-100/60 border border-emerald-200/50 px-3 py-2.5">
            <p className="text-[12.5px] font-semibold text-emerald-700/80">
              {example.withOutcome}
            </p>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-r from-oppr-primary/[0.06] to-oppr-secondary/[0.04] border-l-[3px] border-oppr-primary rounded-r-xl px-5 py-4">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-oppr-primary mb-1.5">
          The Key Insight
        </h4>
        <p className="text-[13px] text-text-secondary leading-relaxed">{example.insight}</p>
      </div>
    </div>
  );
}
