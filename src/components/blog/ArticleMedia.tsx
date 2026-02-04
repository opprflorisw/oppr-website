"use client";

import {
  PlayCircle,
  FilePdf,
  DownloadSimple,
} from "@phosphor-icons/react";
import { type Article } from "@/data/article-types";

interface ArticleMediaProps {
  article: Article;
}

/**
 * Extract YouTube video ID from various URL formats.
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function ArticleMedia({ article }: ArticleMediaProps) {
  const hasYouTube = !!article.youtubeUrl;
  const hasPdf = !!article.pdfUrl;

  // Don't render anything if no media
  if (!hasYouTube && !hasPdf) return null;

  const videoId = hasYouTube ? extractYouTubeId(article.youtubeUrl!) : null;

  return (
    <div className="container-narrow px-4">
      {/* YouTube embed */}
      {videoId && (
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated mb-8">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Video: ${article.title}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Fallback if YouTube URL was provided but ID couldn't be extracted */}
      {hasYouTube && !videoId && (
        <a
          href={article.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 bg-bg-light rounded-2xl border border-border-light hover:border-oppr-primary/40 hover:shadow-md transition-all mb-8"
        >
          <PlayCircle size={40} className="text-oppr-secondary shrink-0" />
          <div>
            <p className="font-semibold text-text-primary">Watch Video</p>
            <p className="text-sm text-text-muted">
              Open on YouTube
            </p>
          </div>
        </a>
      )}

      {/* PDF download */}
      {hasPdf && (
        <a
          href={article.pdfUrl}
          download
          className="flex items-center gap-4 p-6 bg-bg-light rounded-2xl border border-border-light hover:border-oppr-primary/40 hover:shadow-md transition-all mb-8"
        >
          <FilePdf size={40} className="text-oppr-secondary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary">
              Download Resource
            </p>
            <p className="text-sm text-text-muted">
              Oppr Operational Maturity Matrix
            </p>
          </div>
          <DownloadSimple
            size={24}
            className="text-text-muted shrink-0"
          />
        </a>
      )}
    </div>
  );
}
