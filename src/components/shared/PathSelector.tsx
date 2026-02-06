"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Crosshair, MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { staggerContainer, EASE_SNAP, EASE_SMOOTH_OUT } from "@/lib/animations";

interface PathSelectorProps {
  className?: string;
}

const pathCardVariant = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

const dividerVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.2, ease: EASE_SMOOTH_OUT },
  },
};

export function PathSelector({ className }: PathSelectorProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(0.12)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-6 md:gap-0",
        className
      )}
    >
      {/* Path A: I know what needs fixing */}
      <motion.div variants={pathCardVariant} className="flex">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: EASE_SMOOTH_OUT }}
          className="group relative flex flex-col rounded-2xl border border-border-light bg-white p-8 transition-all duration-300 hover:path-a-glow hover:border-oppr-primary/40 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-oppr-primary"
        >
          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-oppr-primary/10">
            <Crosshair
              size={28}
              weight="duotone"
              className="text-oppr-primary"
            />
          </div>

          {/* Heading */}
          <h3 className="mb-3 text-xl font-semibold text-text-primary">
            I know what needs to improve
          </h3>

          {/* Description */}
          <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary">
            You&apos;ve identified the gaps in your operation. See how our
            execution platform captures, analyzes, and implements operator
            knowledge — systematically.
          </p>

          {/* CTA */}
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-oppr-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oppr-primary"
          >
            Explore the Platform
            <ArrowRight size={18} weight="bold" />
          </Link>
        </motion.div>
      </motion.div>

      {/* "or" Divider (desktop only) */}
      <motion.div
        variants={dividerVariant}
        className="hidden md:flex flex-col items-center justify-center px-6"
        aria-hidden="true"
      >
        <div className="h-full w-px bg-border-light" />
        <span className="my-4 flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-white text-sm font-medium text-text-secondary shadow-sm">
          or
        </span>
        <div className="h-full w-px bg-border-light" />
      </motion.div>

      {/* "or" Divider (mobile only) */}
      <motion.div
        variants={dividerVariant}
        className="flex md:hidden items-center justify-center gap-4"
        aria-hidden="true"
      >
        <div className="h-px flex-1 bg-border-light" />
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-white text-sm font-medium text-text-secondary shadow-sm">
          or
        </span>
        <div className="h-px flex-1 bg-border-light" />
      </motion.div>

      {/* Path B: I want to discover what's possible */}
      <motion.div variants={pathCardVariant} className="flex">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: EASE_SMOOTH_OUT }}
          className="group relative flex flex-col rounded-2xl border border-border-light bg-white p-8 transition-all duration-300 hover:path-b-glow hover:border-oppr-secondary/40 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-oppr-primary"
        >
          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-oppr-secondary/10">
            <MagnifyingGlass
              size={28}
              weight="duotone"
              className="text-oppr-secondary"
            />
          </div>

          {/* Heading */}
          <h3 className="mb-3 text-xl font-semibold text-text-primary">
            I have a gut feeling — help me formalize it
          </h3>

          {/* Description */}
          <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary">
            You sense there&apos;s room to improve but can&apos;t pinpoint
            where. Oppr Insights gives everyone a voice and uses AI to structure
            what your team already knows into clear starting points.
          </p>

          {/* CTA */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-oppr-secondary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oppr-primary"
          >
            Start with Insights
            <ArrowRight size={18} weight="bold" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
