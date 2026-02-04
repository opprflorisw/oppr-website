"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  GlobeHemisphereWest,
  Tag,
} from "@phosphor-icons/react";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { type Article, categoryColors } from "@/data/article-types";

interface ArticleHeaderProps {
  article: Article;
}

const headerOrbs = [
  {
    color: "rgba(59, 130, 246, 0.10)",
    size: "w-[350px] h-[350px]",
    position: "top-[-10%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[80px]",
  },
  {
    color: "rgba(224, 122, 61, 0.08)",
    size: "w-[300px] h-[300px]",
    position: "bottom-[-5%] right-[-5%]",
    animation: "animate-float-medium",
    blur: "blur-[70px]",
  },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const colors = categoryColors[article.category];

  return (
    <section className="relative gradient-mesh-hero noise-overlay overflow-hidden bg-oppr-dark">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-oppr-dark via-oppr-dark/95 to-oppr-dark/90" />

      <FloatingOrbs orbs={headerOrbs} />

      <div className="relative z-10 container-wide section-padding">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <AnimatedSection>
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Category badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
            >
              <Tag size={12} />
              {article.categoryLabel}
            </span>

            {/* Language badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">
              <GlobeHemisphereWest size={12} />
              {article.language === "nl" ? "🇳🇱 NL" : "🇬🇧 EN"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-display-1 font-serif text-white max-w-4xl mb-8">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            {/* Date */}
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={16} />
              {formatDate(article.publishedDate)}
            </span>

            <span className="hidden sm:inline text-white/30">|</span>

            {/* Reading time */}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} />
              {article.readingTime} min read
            </span>

            <span className="hidden sm:inline text-white/30">|</span>

            {/* Format badge */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 text-white/70">
              {article.format === "article"
                ? "Long-form Article"
                : "LinkedIn Post"}
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
