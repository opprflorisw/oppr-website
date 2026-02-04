"use client";

import {
  XCircle,
  CheckCircle,
  CurrencyEur,
  Clock,
  Cpu,
  Plugs,
  GraduationCap,
  Lightning
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function SMEEconomicsSection() {
  return (
    <SectionWrapper bg="white">
      <AnimatedSection>
        <h3 className="text-display-2 font-serif text-text-primary text-center mb-10">
          Built for SME Economics
        </h3>
      </AnimatedSection>

      <AnimatedSection className="max-w-[900px] mx-auto">
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm mb-8">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-bg-subtle border-b border-border-light py-4 px-6 gap-4 items-center">
            <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-text-muted">Requirement</div>
            <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-red-500">Enterprise Systems</div>
            <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-oppr-primary">Oppr Platform</div>
          </div>

          {/* Comparison Rows */}
          {[
            {
              icon: CurrencyEur,
              label: "Implementation Cost",
              enterprise: "€200K-500K",
              oppr: "Affordable Monthly",
            },
            {
              icon: Clock,
              label: "Deployment Time",
              enterprise: "6-12 Months",
              oppr: "2-3 Weeks",
            },
            {
              icon: Cpu,
              label: "IT Resources",
              enterprise: "Dedicated Team Required",
              oppr: "Zero IT Involvement",
            },
            {
              icon: Plugs,
              label: "Integrations",
              enterprise: "Complex & Costly",
              oppr: "None Required to Start",
            },
            {
              icon: GraduationCap,
              label: "Training/Onboarding",
              enterprise: "Lengthy Programs",
              oppr: "15-Min Onboarding",
            },
          ].map((row, idx) => (
            <div key={row.label} className={`grid grid-cols-12 py-5 px-6 gap-4 items-center ${idx !== 4 ? 'border-b border-border-light' : ''}`}>
              {/* Category */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-light flex items-center justify-center text-oppr-primary">
                  <row.icon size={18} weight="bold" />
                </div>
                <span className="text-sm font-semibold text-text-primary">{row.label}</span>
              </div>

              {/* Enterprise */}
              <div className="col-span-4 flex items-center gap-2">
                <XCircle size={16} weight="fill" className="text-red-400 flex-shrink-0" />
                <span className="text-sm text-text-secondary">{row.enterprise}</span>
              </div>

              {/* Oppr */}
              <div className="col-span-4 flex items-center gap-2">
                <CheckCircle size={16} weight="fill" className="text-docs flex-shrink-0" />
                <span className="text-sm font-medium text-text-primary">{row.oppr}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-docs/5 border border-docs/10 rounded-xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-docs/10 flex items-center justify-center text-docs flex-shrink-0">
            <Lightning size={20} weight="fill" />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            <strong className="text-text-primary">8-Week ROI:</strong> Most SME customers see positive ROI within 8 weeks through reduced
            repeat troubleshooting, faster root cause identification, and preserved
            knowledge.
          </p>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
