import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: "white" | "light" | "subtle";
  className?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  bg = "white",
  className,
  id,
}: SectionWrapperProps) {
  const bgMap = {
    white: "bg-bg-white",
    light: "bg-bg-light",
    subtle: "bg-bg-subtle",
  };

  return (
    <section
      id={id}
      className={cn("section-padding", bgMap[bg], className)}
    >
      <div className="container-wide">{children}</div>
    </section>
  );
}
