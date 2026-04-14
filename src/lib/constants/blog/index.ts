import type { BlogPost } from "@/types/blog";
import { peplyLaunch } from "./peplyLaunch";
import { retatrutide2026 } from "./retatrutide2026";

export const BLOG_POSTS: readonly BlogPost[] = [
  retatrutide2026,
  peplyLaunch,
] as const;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function sortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getAdjacentPosts(slug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const ordered = sortedPosts();
  const idx = ordered.findIndex((p) => p.slug === slug);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}

export { peplyLaunch, retatrutide2026 };
