import { describe, it, expect } from "vitest";
import {
  BLOG_POSTS,
  getPostBySlug,
  sortedPosts,
  getAdjacentPosts,
} from "@/lib/constants/blog";
import { BLOG_CATEGORIES } from "@/types/blog";
import { parseMarkdown, parseInline, stripMarkdown } from "@/lib/blog/markdown";
import { getCompoundBySlug } from "@/lib/constants/compounds";

describe("blog data integrity", () => {
  it("has at least 2 posts", () => {
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(2);
  });

  it("every post has unique slug and required fields", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of BLOG_POSTS) {
      expect(p.title.length).toBeGreaterThan(5);
      expect(p.description.length).toBeGreaterThan(20);
      expect(BLOG_CATEGORIES).toContain(p.category);
      expect(p.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(p.author).toBeTruthy();
      expect(p.readingTime).toMatch(/\d+ min read/);
      expect(p.content.length).toBeGreaterThan(100);
    }
  });

  it("getPostBySlug returns the right post", () => {
    const post = getPostBySlug("introducing-peply");
    expect(post?.title).toContain("Peply");
  });

  it("getPostBySlug returns undefined for unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeUndefined();
  });

  it("sortedPosts returns posts in reverse chronological order", () => {
    const ordered = sortedPosts();
    for (let i = 1; i < ordered.length; i++) {
      expect(
        ordered[i - 1].publishedAt >= ordered[i].publishedAt,
      ).toBe(true);
    }
  });

  it("retatrutide post references the retatrutide compound", () => {
    const post = getPostBySlug("retatrutide-2026-triple-agonist-explained");
    expect(post?.relatedCompounds).toContain("retatrutide");
    // Cross-linked compound slugs should resolve to real compounds
    for (const slug of post?.relatedCompounds ?? []) {
      expect(getCompoundBySlug(slug)).toBeTruthy();
    }
  });

  it("getAdjacentPosts returns null at the ends", () => {
    const ordered = sortedPosts();
    const first = getAdjacentPosts(ordered[0].slug);
    expect(first.previous).toBeNull();
    const last = getAdjacentPosts(ordered[ordered.length - 1].slug);
    expect(last.next).toBeNull();
  });
});

describe("markdown parser", () => {
  it("parses a level-2 heading", () => {
    const blocks = parseMarkdown("## Hello world");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe("h2");
  });

  it("parses a level-3 heading", () => {
    const blocks = parseMarkdown("### Section");
    expect(blocks[0].type).toBe("h3");
  });

  it("parses paragraphs separated by blank lines", () => {
    const blocks = parseMarkdown("First para.\n\nSecond para.");
    expect(blocks).toHaveLength(2);
    expect(blocks[0].type).toBe("p");
    expect(blocks[1].type).toBe("p");
  });

  it("parses unordered lists", () => {
    const blocks = parseMarkdown("- a\n- b\n- c");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe("ul");
    if (blocks[0].type === "ul") expect(blocks[0].items).toHaveLength(3);
  });

  it("parses ordered lists", () => {
    const blocks = parseMarkdown("1. a\n2. b");
    expect(blocks[0].type).toBe("ol");
  });

  it("parses blockquotes", () => {
    const blocks = parseMarkdown("> quoted");
    expect(blocks[0].type).toBe("blockquote");
  });

  it("parses bold, italic, and inline code", () => {
    const inline = parseInline("**strong** and *soft* and `code`");
    const types = inline.map((n) => n.type);
    expect(types).toContain("bold");
    expect(types).toContain("italic");
    expect(types).toContain("code");
  });

  it("parses links with text and href", () => {
    const inline = parseInline("see [docs](https://example.com) now");
    const link = inline.find((n) => n.type === "link");
    expect(link).toBeTruthy();
    if (link && link.type === "link") {
      expect(link.href).toBe("https://example.com");
    }
  });

  it("stripMarkdown returns readable plain text", () => {
    const plain = stripMarkdown(
      "## Heading\n\n**Bold** and *italic* with `code` and [link](https://x).",
    );
    expect(plain).toContain("Heading");
    expect(plain).toContain("Bold");
    expect(plain).toContain("italic");
    expect(plain).toContain("code");
    expect(plain).toContain("link");
    expect(plain).not.toContain("**");
    expect(plain).not.toContain("`");
    expect(plain).not.toContain("[");
  });

  it("handles a realistic mixed document", () => {
    const src = `## Intro\n\nA paragraph with **bold** and a [link](/calculator).\n\n- one\n- two\n\n### Subhead\n\n> remember this`;
    const blocks = parseMarkdown(src);
    expect(blocks.map((b) => b.type)).toEqual([
      "h2",
      "p",
      "ul",
      "h3",
      "blockquote",
    ]);
  });
});
