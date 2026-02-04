import type { Metadata } from "next";
import { BlogPageHeader } from "@/components/blog/BlogPageHeader";
import { FeaturedArticles } from "@/components/blog/FeaturedArticles";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { getFeaturedArticles, getPublishedArticles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog | Oppr.ai — Manufacturing Transformation Insights",
  description:
    "Insights on operational excellence, AI, knowledge management, and the future of manufacturing from Oppr.ai founder Floris Wyers.",
};

export default function BlogPage() {
  const featured = getFeaturedArticles();
  const published = getPublishedArticles();

  return (
    <>
      <BlogPageHeader />
      {featured.length > 0 && <FeaturedArticles articles={featured} />}
      <BlogContent articles={published} />
      <BlogCTA />
    </>
  );
}
