export const BLOG_CATEGORIES = [
  "compound-update",
  "guide",
  "regulatory",
  "announcement",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  "compound-update": "Compound Update",
  guide: "Guide",
  regulatory: "Regulatory",
  announcement: "Announcement",
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime: string;
  tags: string[];
  relatedCompounds?: string[];
  relatedStacks?: string[];
  content: string;
}
