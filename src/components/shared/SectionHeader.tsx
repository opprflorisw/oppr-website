"use client";

import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      className={cn(
        "mb-16",
        align === "center" && "text-center mx-auto max-w-[800px]",
        className
      )}
    >
      {label && (
        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
          {label}
        </p>
      )}
      <h2 className="text-display-2 font-serif text-text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
