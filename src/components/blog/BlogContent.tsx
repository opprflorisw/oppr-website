"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlogFilter } from "./BlogFilter";
import { BlogCard } from "./BlogCard";
import type { Article, ArticleCategory } from "@/data/article-types";

interface BlogContentProps {
  articles: Article[];
}

export function BlogContent({ articles: allArticles }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState<
    ArticleCategory | "all"
  >("all");
  const [activeLanguage, setActiveLanguage] = useState<"all" | "en" | "nl">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return allArticles
      .filter(
        (a) => activeCategory === "all" || a.category === activeCategory
      )
      .filter(
        (a) => activeLanguage === "all" || a.language === activeLanguage
      )
      .filter((a) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
        );
      });
  }, [allArticles, activeCategory, activeLanguage, searchQuery]);

  return (
    <>
      <BlogFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Results count */}
          <p className="text-sm text-text-muted mb-8">
            Showing {filteredArticles.length} of {allArticles.length} articles
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + activeLanguage + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <BlogCard key={article.slug} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-text-secondary mb-2">
                    No articles found
                  </p>
                  <p className="text-sm text-text-muted">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
