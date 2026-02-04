import { cn } from "@/lib/utils";

type DividerVariant = "wave" | "curve" | "angle";

interface SectionDividerProps {
  variant?: DividerVariant;
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
}

const paths: Record<DividerVariant, string> = {
  wave: "M0,64 C320,128 640,0 960,64 C1280,128 1600,0 1920,64 L1920,0 L0,0 Z",
  curve: "M0,96 Q960,0 1920,96 L1920,0 L0,0 Z",
  angle: "M0,80 L1920,0 L1920,0 L0,0 Z",
};

export function SectionDivider({
  variant = "wave",
  fromColor = "#F8FAFC",
  toColor,
  flip = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden leading-none",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 128"
        preserveAspectRatio="none"
        className="block h-[40px] w-full md:h-[60px] lg:h-[80px]"
      >
        <path d={paths[variant]} fill={fromColor} />
      </svg>
    </div>
  );
}
