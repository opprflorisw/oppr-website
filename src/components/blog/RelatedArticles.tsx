"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type Article } from "@/data/article-types";
import { BlogCard } from "./BlogCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { staggerContainer, waveChild } from "@/lib/animations";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles: related }: RelatedArticlesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Don't render if no related articles
  if (related.length === 0) return null;

  return (
    <SectionWrapper bg="light">
      <SectionHeader label="KEEP READING" title="Related Articles" />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {related.map((article) => (
          <motion.div key={article.slug} variants={waveChild}>
            <BlogCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
