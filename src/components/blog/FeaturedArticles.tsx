"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { categoryColors } from "@/data/article-types";
import type { Article } from "@/data/article-types";

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <SectionWrapper bg="light">
      <SectionHeader label="FEATURED" title="Long-Form Articles" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.slice(0, 2).map((article, index) => (
          <FeaturedCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function FeaturedCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const colors = categoryColors[article.category];
  const videoId = article.youtubeUrl?.split("v=")[1]?.split("&")[0];
  const isExternalImage = article.image?.startsWith("http");

  return (
    <AnimatedSection delay={index * 0.15}>
      <Link
        href={`/blog/${article.slug}`}
        className="flex flex-col md:flex-row bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-elevated transition-all duration-300 group h-full"
      >
        {/* Image area */}
        <div className="relative md:w-2/5 h-64 md:h-auto flex-shrink-0 overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              unoptimized={isExternalImage ?? false}
            />
          ) : videoId ? (
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={article.title}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              unoptimized
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-80 grayscale transition-all duration-500 group-hover:grayscale-0`}
            />
          )}
        </div>

        {/* Content area */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Featured badge */}
          <div className="flex items-center gap-1.5 text-oppr-secondary mb-3">
            <Star size={16} weight="fill" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Featured Article
            </span>
          </div>

          {/* Category badge */}
          <span
            className={`inline-block self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} mb-3`}
          >
            {article.categoryLabel}
          </span>

          {/* Title */}
          <h3 className="text-xl font-serif font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-oppr-primary transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-4 flex-1">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-light">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>
                {new Date(article.publishedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {article.readingTime} min
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-oppr-primary group-hover:gap-2 transition-all">
              Read article
              <ArrowRight size={14} weight="bold" />
            </span>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
