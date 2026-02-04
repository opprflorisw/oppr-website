import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleMedia } from "@/components/blog/ArticleMedia";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { BlogCTA } from "@/components/blog/BlogCTA";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles
    .filter((a) => !a.draft)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | Oppr.ai Blog" };
  }

  return {
    title: `${article.title} | Oppr.ai Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedDate,
      authors: ["Floris Wyers"],
      ...(article.image && { images: [{ url: article.image }] }),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.draft) {
    notFound();
  }

  const related = getRelatedArticles(article);

  return (
    <>
      <ArticleHeader article={article} />
      <ArticleMedia article={article} />
      <ArticleBody content={article.content} />
      <AuthorCard />
      <RelatedArticles articles={related} />
      <BlogCTA />
    </>
  );
}
