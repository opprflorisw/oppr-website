"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { EASE_SMOOTH_OUT } from "@/lib/animations";

interface NextStepBannerProps {
  label?: string;
  title: string;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const variantStyles = {
  primary: {
    base: "bg-oppr-primary/5 border-oppr-primary/10",
    hover: "hover:bg-oppr-primary/10",
    label: "text-oppr-primary",
  },
  secondary: {
    base: "bg-oppr-secondary/5 border-oppr-secondary/10",
    hover: "hover:bg-oppr-secondary/10",
    label: "text-oppr-secondary",
  },
};

export function NextStepBanner({
  label = "Recommended next step",
  title,
  href,
  variant = "primary",
  className,
}: NextStepBannerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const styles = variantStyles[variant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH_OUT }}
      className={cn("w-full", className)}
    >
      <Link
        href={href}
        className={cn(
          "group flex w-full items-center justify-between gap-4 rounded-xl border px-6 py-4 transition-colors duration-200",
          "flex-col sm:flex-row",
          styles.base,
          styles.hover
        )}
      >
        <span
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.05em]",
            styles.label
          )}
        >
          {label}
        </span>

        <span className="flex items-center gap-2 text-base font-medium text-text-primary">
          {title}
          <ArrowRight
            weight="bold"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
