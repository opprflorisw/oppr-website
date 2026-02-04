"use client";

import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useMousePosition";

type ModuleType = "logs" | "ida" | "docs";

interface ModuleCardProps {
  module: ModuleType;
  icon: React.ReactNode;
  label: string;
  tagline: string;
  description: string;
  features: string[];
  exampleLabel: string;
  exampleText: string;
}

const moduleStyles: Record<
  ModuleType,
  { border: string; iconBg: string; glow: string; glowColor: string }
> = {
  logs: {
    border: "border-logs/40 hover:border-logs",
    iconBg: "bg-gradient-to-br from-logs to-logs/80",
    glow: "hover:shadow-glow-orange",
    glowColor: "rgba(224, 122, 61, 0.12)",
  },
  ida: {
    border: "border-ida/40 hover:border-ida",
    iconBg: "bg-gradient-to-br from-ida to-ida/80",
    glow: "hover:shadow-glow-blue",
    glowColor: "rgba(59, 130, 246, 0.12)",
  },
  docs: {
    border: "border-docs/40 hover:border-docs",
    iconBg: "bg-gradient-to-br from-docs to-docs/80",
    glow: "hover:shadow-glow-green",
    glowColor: "rgba(16, 185, 129, 0.12)",
  },
};

export function ModuleCard({
  module,
  icon,
  label,
  tagline,
  description,
  features,
  exampleLabel,
  exampleText,
}: ModuleCardProps) {
  const styles = moduleStyles[module];
  const { ref, position, isHovering } = useMousePosition();

  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-white rounded-2xl border-2 p-7 transition-all duration-300 hover:-translate-y-1 overflow-hidden",
        styles.border,
        styles.glow
      )}
    >
      {/* Mouse-tracking gradient highlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(500px circle at ${position.x * 100}% ${position.y * 100}%, ${styles.glowColor}, transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
              styles.iconBg
            )}
          >
            {icon}
          </div>
          <div>
            <div className="text-base font-bold text-text-primary tracking-wide uppercase">
              {label}
            </div>
            <div className="text-sm text-text-muted">{tagline}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[0.925rem] text-text-secondary leading-relaxed mb-5">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <Check
                size={16}
                weight="bold"
                className="text-docs flex-shrink-0 mt-0.5"
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Example */}
        <div className="bg-bg-light/80 backdrop-blur-sm rounded-xl p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
            {exampleLabel}
          </p>
          <p className="text-sm text-text-secondary italic leading-relaxed">
            {exampleText}
          </p>
        </div>
      </div>
    </div>
  );
}
