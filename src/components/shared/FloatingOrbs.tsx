"use client";

import { cn } from "@/lib/utils";

interface OrbConfig {
  color: string;
  size: string;
  position: string;
  animation: string;
  blur?: string;
}

const defaultOrbs: OrbConfig[] = [
  {
    color: "rgba(59, 130, 246, 0.12)",
    size: "w-[400px] h-[400px]",
    position: "top-[-10%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[80px]",
  },
  {
    color: "rgba(224, 122, 61, 0.1)",
    size: "w-[350px] h-[350px]",
    position: "bottom-[-5%] right-[-5%]",
    animation: "animate-float-medium",
    blur: "blur-[70px]",
  },
  {
    color: "rgba(139, 92, 246, 0.08)",
    size: "w-[300px] h-[300px]",
    position: "top-[40%] right-[20%]",
    animation: "animate-float",
    blur: "blur-[60px]",
  },
];

interface FloatingOrbsProps {
  orbs?: OrbConfig[];
  className?: string;
}

export function FloatingOrbs({ orbs = defaultOrbs, className }: FloatingOrbsProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            orb.size,
            orb.position,
            orb.animation,
            orb.blur ?? "blur-[60px]"
          )}
          style={{ backgroundColor: orb.color }}
        />
      ))}
    </div>
  );
}
