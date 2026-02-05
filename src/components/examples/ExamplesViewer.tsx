"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, CaretRight, CaretDown } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { EASE_SMOOTH_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { examples } from "./examplesData";
import { ExampleViewerContent } from "./ExampleViewerContent";

const categoryColors: Record<string, { bg: string; text: string }> = {
  maintenance: { bg: "rgba(99,102,241,0.1)", text: "#6366F1" },
  quality: { bg: "rgba(245,158,11,0.1)", text: "#D97706" },
  knowledge: { bg: "rgba(236,72,153,0.1)", text: "#DB2777" },
  efficiency: { bg: "rgba(16,185,129,0.1)", text: "#059669" },
};

export function ExamplesViewer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      setDropdownOpen(false);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % examples.length;
    setDirection(1);
    setActiveIndex(next);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + examples.length) % examples.length;
    setDirection(-1);
    setActiveIndex(prev);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setDropdownOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  const active = examples[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <SectionWrapper bg="light">
      <div
        className="max-w-none"
        role="region"
        aria-label="Example scenarios viewer"
      >
        {/* Dropdown selector */}
        <div ref={dropdownRef} className="relative mb-6">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "w-full flex items-center justify-between gap-3 bg-white border rounded-xl px-5 py-4 transition-all shadow-sm",
              dropdownOpen
                ? "border-oppr-primary/40 shadow-md"
                : "border-border-light hover:border-oppr-primary/30 hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${active.iconGradient} flex items-center justify-center flex-shrink-0 shadow-sm`}
              >
                <ActiveIcon size={20} weight="duotone" className="text-white" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-base font-semibold text-text-primary truncate">
                  {active.title}
                </p>
                <p className="text-xs text-text-muted">{active.categoryLabel}</p>
              </div>
            </div>
            <CaretDown
              size={18}
              weight="bold"
              className={cn(
                "text-text-muted flex-shrink-0 transition-transform duration-200",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: EASE_SMOOTH_OUT }}
                className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-border-light rounded-xl shadow-xl overflow-hidden"
              >
                {examples.map((ex, i) => {
                  const ExIcon = ex.icon;
                  const colors = categoryColors[ex.category];
                  return (
                    <button
                      key={ex.title}
                      onClick={() => goTo(i)}
                      className={cn(
                        "w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors",
                        activeIndex === i
                          ? "bg-oppr-primary/[0.04]"
                          : "hover:bg-bg-light/60",
                        i !== examples.length - 1 && "border-b border-border-light/50"
                      )}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${ex.iconGradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <ExIcon size={18} weight="duotone" className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn(
                          "text-sm truncate",
                          activeIndex === i
                            ? "font-semibold text-text-primary"
                            : "font-medium text-text-secondary"
                        )}>
                          {ex.title}
                        </p>
                      </div>
                      {colors && (
                        <span
                          className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full flex-shrink-0 uppercase tracking-wider"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {ex.categoryLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Viewer panel */}
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm">
          <div
            className="p-6 md:p-10"
            role="tabpanel"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: EASE_SMOOTH_OUT }}
              >
                <ExampleViewerContent example={examples[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation bar */}
          <div className="border-t border-border-light bg-bg-light/30 px-6 md:px-10 py-4 flex items-center justify-between">
            <button
              onClick={goPrev}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-oppr-primary transition-colors group"
              aria-label="Previous example"
            >
              <CaretLeft size={16} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {examples.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Example ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === i
                      ? "bg-oppr-primary w-7"
                      : "bg-border-medium hover:bg-oppr-primary/40 w-2"
                  )}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-oppr-primary transition-colors group"
              aria-label="Next example"
            >
              <span className="hidden sm:inline">Next</span>
              <CaretRight size={16} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
