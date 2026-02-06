"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState("0");

  const springValue = useSpring(0, {
    stiffness: 80,
    damping: 30,
    duration: duration * 1000,
  });

  const rounded = useTransform(springValue, (v) =>
    v.toFixed(decimals)
  );

  useEffect(() => {
    if (inView) {
      springValue.set(target);
    }
  }, [inView, target, springValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
