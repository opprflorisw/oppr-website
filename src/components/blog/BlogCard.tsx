"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  PlayCircle,
  FilePdf,
  Clock,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";
import { categoryColors } from "@/data/article-types";
import type { Article } from "@/data/article-types";

interface BlogCardProps {
  article: Article;
}

export function BlogCard({ article }: BlogCardProps) {
  const colors = categoryColors[article.category];
  const videoId = article.youtubeUrl?.split("v=")[1]?.split("&")[0];
  const isExternalImage = article.image?.startsWith("http");

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="flex flex-col h-full bg-white rounded-2xl border border-border-light hover:border-oppr-primary/40 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
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
            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-80 flex items-center justify-center grayscale transition-all duration-500 group-hover:grayscale-0`}
          >
            <GlobeHemisphereWest size={48} className="text-white/30" />
          </div>
        )}

        {/* Video overlay icon */}
        {videoId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircle
              size={48}
              weight="fill"
              className="text-white/80 drop-shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-6 flex flex-col flex-1">
        {/* Top row: category + language + reading time */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
          >
            {article.categoryLabel}
          </span>
          <span className="text-xs font-medium text-text-muted uppercase">
            {article.language}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted ml-auto">
            <Clock size={14} />
            {article.readingTime} min
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-oppr-primary transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Bottom row: date + media icons + read link */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-light">
          <span className="text-xs text-text-muted">
            {new Date(article.publishedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <div className="flex items-center gap-2">
            {article.youtubeUrl && (
              <PlayCircle
                size={18}
                weight="duotone"
                className="text-text-muted"
              />
            )}
            {article.pdfUrl && (
              <FilePdf
                size={18}
                weight="duotone"
                className="text-text-muted"
              />
            )}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-oppr-primary group-hover:gap-2 transition-all">
              Read
              <ArrowRight size={14} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
