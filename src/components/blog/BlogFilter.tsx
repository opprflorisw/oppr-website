"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { categoryLabels } from "@/data/article-types";
import type { ArticleCategory } from "@/data/article-types";
import { cn } from "@/lib/utils";

interface BlogFilterProps {
  activeCategory: ArticleCategory | "all";
  onCategoryChange: (category: ArticleCategory | "all") => void;
  activeLanguage: "all" | "en" | "nl";
  onLanguageChange: (language: "all" | "en" | "nl") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const allCategories: { key: ArticleCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...Object.entries(categoryLabels).map(([key, label]) => ({
    key: key as ArticleCategory,
    label,
  })),
];

const languages: { key: "all" | "en" | "nl"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "en", label: "EN" },
  { key: "nl", label: "NL" },
];

export function BlogFilter({
  activeCategory,
  onCategoryChange,
  activeLanguage,
  onLanguageChange,
  searchQuery,
  onSearchChange,
}: BlogFilterProps) {
  return (
    <div className="sticky top-[72px] z-40">
      <div className="bg-white/90 backdrop-blur-sm border-b border-border-light py-4">
        <div className="container-wide">
          {/* Mobile: search on top, pills below */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left side: Category pills */}
            <div className="flex gap-2 flex-wrap order-2 lg:order-1">
              {allCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => onCategoryChange(cat.key)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === cat.key
                      ? "bg-oppr-primary text-white"
                      : "bg-bg-subtle text-text-secondary hover:bg-bg-light"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right side: Search + Language toggle */}
            <div className="flex items-center gap-3 order-1 lg:order-2 flex-shrink-0">
              {/* Search input */}
              <div className="relative flex-1 lg:flex-initial">
                <MagnifyingGlass
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full lg:w-56 rounded-lg border border-border-light bg-white pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-oppr-primary/50 focus:ring-1 focus:ring-oppr-primary/20 transition-colors"
                />
              </div>

              {/* Language toggle */}
              <div className="flex items-center rounded-lg border border-border-light overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.key}
                    onClick={() => onLanguageChange(lang.key)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium transition-colors",
                      activeLanguage === lang.key
                        ? "bg-oppr-primary/10 text-oppr-primary"
                        : "text-text-secondary hover:bg-bg-light"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
