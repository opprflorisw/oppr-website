"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";
import { morphIn, EASE_SMOOTH_OUT } from "@/lib/animations";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glassLevel?: "subtle" | "medium" | "heavy" | "none";
  hoverLift?: boolean;
  as?: "div" | "article";
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(224, 122, 61, 0.15)",
  glassLevel = "none",
  hoverLift = true,
  as = "div",
}: GlowCardProps) {
  const { ref, position, isHovering } = useMousePosition();

  const glassClasses = {
    subtle: "glass-subtle",
    medium: "glass-medium",
    heavy: "glass-heavy",
    none: "",
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      variants={morphIn}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-light bg-white transition-all duration-300",
        glassClasses[glassLevel],
        hoverLift && "hover:-translate-y-1",
        className
      )}
      style={{
        boxShadow: isHovering
          ? `0 8px 32px rgba(0,0,0,0.08), 0 0 40px ${glowColor}`
          : "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.4s ease, transform 0.3s ease",
      }}
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: EASE_SMOOTH_OUT }}
    >
      {/* Mouse-tracking gradient highlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
