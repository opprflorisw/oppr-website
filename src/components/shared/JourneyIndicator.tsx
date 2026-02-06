"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH_OUT } from "@/lib/animations";

const STEPS = [
  { key: "discover", label: "Discover" },
  { key: "evaluate", label: "Evaluate" },
  { key: "implement", label: "Implement" },
  { key: "scale", label: "Scale" },
] as const;

type Step = (typeof STEPS)[number]["key"];

interface JourneyIndicatorProps {
  currentStep: Step;
  className?: string;
}

export function JourneyIndicator({
  currentStep,
  className,
}: JourneyIndicatorProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <motion.nav
      ref={ref}
      aria-label="Journey progress"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH_OUT }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
    >
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        const isFuture = index > currentIndex;

        return (
          <motion.div
            key={step.key}
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.92 }
            }
            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: EASE_SMOOTH_OUT,
            }}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive && "bg-oppr-primary text-white",
                isCompleted && "bg-oppr-primary/10 text-oppr-primary",
                isFuture && "bg-bg-subtle text-text-muted"
              )}
            >
              {isCompleted && (
                <Check size={14} weight="bold" className="shrink-0" />
              )}
              {step.label}
            </span>

            {index < STEPS.length - 1 && (
              <ArrowRight
                size={14}
                className={cn(
                  "shrink-0",
                  index < currentIndex
                    ? "text-oppr-primary/40"
                    : "text-text-muted/40"
                )}
              />
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
