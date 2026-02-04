/* ── Article types & constants (safe for client components) ── */

export type ArticleCategory =
  | "digital-transformation"
  | "knowledge-management"
  | "operational-excellence"
  | "product-platform"
  | "data-quality";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  categoryLabel: string;
  language: "en" | "nl";
  format: "post" | "article";
  publishedDate: string;
  readingTime: number;
  image?: string;
  youtubeUrl?: string;
  pdfUrl?: string;
  featured: boolean;
  draft: boolean;
}

export const categoryLabels: Record<ArticleCategory, string> = {
  "digital-transformation": "Digital",
  "knowledge-management": "Knowledge",
  "operational-excellence": "Operations",
  "product-platform": "Product",
  "data-quality": "Data Quality",
};

export const categoryColors: Record<
  ArticleCategory,
  { bg: string; text: string; gradient: string; border: string }
> = {
  "digital-transformation": {
    bg: "bg-accent-blue/10",
    text: "text-accent-blue",
    gradient: "from-accent-blue to-accent-blue/70",
    border: "border-accent-blue/20",
  },
  "knowledge-management": {
    bg: "bg-accent-purple/10",
    text: "text-accent-purple",
    gradient: "from-accent-purple to-accent-purple/70",
    border: "border-accent-purple/20",
  },
  "operational-excellence": {
    bg: "bg-accent-green/10",
    text: "text-accent-green",
    gradient: "from-accent-green to-accent-green/70",
    border: "border-accent-green/20",
  },
  "product-platform": {
    bg: "bg-accent-orange/10",
    text: "text-accent-orange",
    gradient: "from-accent-orange to-accent-orange/70",
    border: "border-accent-orange/20",
  },
  "data-quality": {
    bg: "bg-accent-red/10",
    text: "text-accent-red",
    gradient: "from-accent-red to-accent-red/70",
    border: "border-accent-red/20",
  },
};
