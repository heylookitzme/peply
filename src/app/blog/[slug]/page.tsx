import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BLOG_POSTS,
  getPostBySlug,
  getAdjacentPosts,
} from "@/lib/constants/blog";
import { BLOG_CATEGORY_LABELS } from "@/types/blog";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import { getStackBySlug } from "@/lib/constants/stacks";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const url = `https://peply.bio/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `https://peply.bio/blog/${post.slug}`;
  const { previous, next } = getAdjacentPosts(post.slug);
  const relatedCompounds = (post.relatedCompounds ?? [])
    .map((s) => getCompoundBySlug(s))
    .filter(
      (c): c is NonNullable<ReturnType<typeof getCompoundBySlug>> => !!c,
    );
  const relatedStacks = (post.relatedStacks ?? [])
    .map((s) => getStackBySlug(s))
    .filter(
      (s): s is NonNullable<ReturnType<typeof getStackBySlug>> => !!s,
    );

  return (
    <article className="mx-auto max-w-[720px] px-6 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: {
            "@type": "Organization",
            name: "Peply",
            url: "https://peply.bio",
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          keywords: post.tags.join(", "),
        }}
      />

      <Link
        href="/blog"
        className="text-[13px] text-text-secondary hover:text-text transition-colors duration-150 mb-6 inline-block"
      >
        &larr; All Posts
      </Link>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="inline-block rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-text-secondary">
          {BLOG_CATEGORY_LABELS[post.category]}
        </span>
        <time
          dateTime={post.publishedAt}
          className="text-[12px] text-text-secondary"
        >
          {formatDate(post.publishedAt)}
        </time>
        <span className="text-[12px] text-text-secondary" aria-hidden>
          ·
        </span>
        <span className="text-[12px] text-text-secondary">
          {post.readingTime}
        </span>
      </div>

      <h1 className="font-serif text-[36px] leading-tight text-text mb-4">
        {post.title}
      </h1>

      <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
        {post.description}
      </p>

      <hr className="border-border mb-8" />

      <MarkdownContent source={post.content} />

      {post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-[0.05em] text-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        <ShareButtons url={url} title={post.title} />
      </div>

      {(relatedCompounds.length > 0 || relatedStacks.length > 0) && (
        <>
          <hr className="border-border my-10" />
          <section className="space-y-6">
            {relatedCompounds.length > 0 && (
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-3">
                  Related compounds
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedCompounds.map((c) => (
                    <Link key={c.slug} href={`/compounds/${c.slug}`}>
                      <Card padding="sm" className="hover:border-text-secondary transition-colors duration-150">
                        <p className="font-serif text-[18px] leading-tight">
                          {c.name}
                        </p>
                        <p className="text-[12px] text-text-secondary mt-1 line-clamp-2">
                          {c.summary}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedStacks.length > 0 && (
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-3">
                  Related stacks
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedStacks.map((s) => (
                    <Link key={s.slug} href={`/stacks/${s.slug}`}>
                      <Card padding="sm" className="hover:border-text-secondary transition-colors duration-150">
                        <p className="font-serif text-[18px] leading-tight">
                          {s.name}
                        </p>
                        <p className="text-[12px] text-text-secondary mt-1 line-clamp-2">
                          {s.summary}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {(previous || next) && (
        <>
          <hr className="border-border my-10" />
          <nav className="grid gap-4 sm:grid-cols-2" aria-label="Post navigation">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="rounded-lg border border-border p-4 hover:border-text-secondary transition-colors duration-150"
              >
                <p className="text-[10px] uppercase tracking-[0.08em] text-text-secondary mb-1">
                  Previous
                </p>
                <p className="font-serif text-[16px] leading-tight">
                  {previous.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="rounded-lg border border-border p-4 hover:border-text-secondary transition-colors duration-150 sm:text-right"
              >
                <p className="text-[10px] uppercase tracking-[0.08em] text-text-secondary mb-1">
                  Next
                </p>
                <p className="font-serif text-[16px] leading-tight">
                  {next.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </>
      )}
    </article>
  );
}
