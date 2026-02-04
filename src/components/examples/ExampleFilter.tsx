"use client";

import { cn } from "@/lib/utils";

const filters = [
  { key: "all", label: "All Examples" },
  { key: "maintenance", label: "Maintenance" },
  { key: "quality", label: "Quality" },
  { key: "knowledge", label: "Knowledge Preservation" },
  { key: "efficiency", label: "Efficiency" },
];

interface ExampleFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ExampleFilter({
  activeFilter,
  onFilterChange,
}: ExampleFilterProps) {
  return (
    <div className="sticky top-[70px] z-40 bg-white border-b border-border-light py-4">
      <div className="container-wide">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === filter.key
                  ? "bg-oppr-primary text-white"
                  : "bg-bg-light text-text-secondary hover:border-oppr-primary border border-transparent"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
