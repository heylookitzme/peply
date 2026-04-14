import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { sortedPosts } from "@/lib/constants/blog";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  type BlogCategory,
} from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the Peply team. Compound deep-dives, regulatory updates, guides, and announcements.",
  alternates: { canonical: "/blog" },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogListPage({
  searchParams,
}: BlogPageProps): Promise<React.ReactElement> {
  const params = await searchParams;
  const activeCategory =
    params.category && BLOG_CATEGORIES.includes(params.category as BlogCategory)
      ? (params.category as BlogCategory)
      : null;

  const posts = sortedPosts().filter(
    (p) => activeCategory === null || p.category === activeCategory,
  );

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <SectionHeader
        label="Blog"
        title="Notes from the Peply team"
        emphasisWord="Peply"
        subtitle="Compound deep-dives, regulatory updates, guides, and announcements."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        <CategoryPill href="/blog" active={activeCategory === null}>
          All
        </CategoryPill>
        {BLOG_CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat}
            href={`/blog?category=${cat}`}
            active={activeCategory === cat}
          >
            {BLOG_CATEGORY_LABELS[cat]}
          </CategoryPill>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-[14px] text-text-secondary">
            No posts in this category yet.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="h-full">
              <Card className="h-full flex flex-col hover:border-text-secondary transition-colors duration-150">
                <span className="inline-block self-start rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-text-secondary mb-3">
                  {BLOG_CATEGORY_LABELS[post.category]}
                </span>
                <h2 className="font-serif text-[22px] leading-tight text-text mb-2">
                  {post.title}
                </h2>
                <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.05em] text-text-secondary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 text-[12px] uppercase tracking-[0.05em] transition-colors duration-150 ${
        active
          ? "bg-accent text-white"
          : "border border-border text-text-secondary hover:text-text hover:border-text-secondary"
      }`}
    >
      {children}
    </Link>
  );
}
