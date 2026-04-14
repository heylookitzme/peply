"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowBigUp } from "lucide-react";
import {
  SUGGESTION_CATEGORIES,
  SUGGESTION_CATEGORY_LABELS,
  type SuggestionCategory,
  type SuggestionWithVote,
} from "@/lib/feedback/types";
import { toggleUpvote } from "./actions";

function timeAgo(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function SuggestionsFeed({
  items,
  sort,
  category,
  isSignedIn,
}: {
  items: SuggestionWithVote[];
  sort: "recent" | "popular";
  category: SuggestionCategory | null;
  isSignedIn: boolean;
}): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function buildHref(next: {
    sort?: "recent" | "popular";
    category?: SuggestionCategory | null;
  }): string {
    const params = new URLSearchParams(search);
    if (next.sort) params.set("sort", next.sort);
    if ("category" in next) {
      if (next.category) params.set("category", next.category);
      else params.delete("category");
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  async function handleUpvote(id: string): Promise<void> {
    if (!isSignedIn) return;
    setPendingId(id);
    setError(null);
    const result = await toggleUpvote(id);
    setPendingId(null);
    if (!result.success) {
      setError(result.error ?? "Vote failed.");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={buildHref({ sort: "popular" })}
          className={`rounded-full px-3 py-1 text-[12px] uppercase tracking-[0.05em] transition-colors duration-150 ${
            sort === "popular"
              ? "bg-accent text-white"
              : "border border-border text-text-secondary hover:text-text hover:border-text-secondary"
          }`}
        >
          Most upvoted
        </Link>
        <Link
          href={buildHref({ sort: "recent" })}
          className={`rounded-full px-3 py-1 text-[12px] uppercase tracking-[0.05em] transition-colors duration-150 ${
            sort === "recent"
              ? "bg-accent text-white"
              : "border border-border text-text-secondary hover:text-text hover:border-text-secondary"
          }`}
        >
          Most recent
        </Link>
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        <Link
          href={buildHref({ category: null })}
          className={`rounded-full px-3 py-1 text-[12px] uppercase tracking-[0.05em] transition-colors duration-150 ${
            !category
              ? "bg-accent/10 border border-accent/40 text-accent"
              : "border border-border text-text-secondary hover:text-text hover:border-text-secondary"
          }`}
        >
          All
        </Link>
        {SUGGESTION_CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={buildHref({ category: c.value })}
            className={`rounded-full px-3 py-1 text-[12px] uppercase tracking-[0.05em] transition-colors duration-150 ${
              category === c.value
                ? "bg-accent/10 border border-accent/40 text-accent"
                : "border border-border text-text-secondary hover:text-text hover:border-text-secondary"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-[13px] text-error">
          {error}
        </p>
      )}

      {items.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-6 text-center">
          <p className="text-[14px] text-text-secondary">
            No suggestions yet. Be the first.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-border bg-surface px-4 py-4 flex gap-4"
            >
              <button
                type="button"
                onClick={() => handleUpvote(item.id)}
                disabled={!isSignedIn || pendingId === item.id}
                aria-pressed={item.viewerUpvoted}
                aria-label={
                  isSignedIn
                    ? item.viewerUpvoted
                      ? "Remove upvote"
                      : "Upvote"
                    : "Sign in to upvote"
                }
                title={
                  isSignedIn
                    ? item.viewerUpvoted
                      ? "Remove upvote"
                      : "Upvote"
                    : "Sign in to upvote"
                }
                className={`flex flex-col items-center justify-start shrink-0 w-12 h-14 rounded-md border transition-colors duration-150 ${
                  item.viewerUpvoted
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-border text-text-secondary hover:border-text-secondary hover:text-text"
                } ${!isSignedIn ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <ArrowBigUp
                  className="w-5 h-5"
                  fill={item.viewerUpvoted ? "currentColor" : "none"}
                  strokeWidth={1.75}
                />
                <span className="font-mono text-[13px] leading-none mt-1">
                  {item.upvotes}
                </span>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="inline-block rounded-full border border-border px-2 py-[2px] text-[10px] uppercase tracking-[0.08em] text-text-secondary">
                    {SUGGESTION_CATEGORY_LABELS[item.category]}
                  </span>
                  <span className="text-[11px] text-text-secondary">
                    {timeAgo(item.created_at)}
                  </span>
                  {item.attributionName && (
                    <span className="text-[11px] text-text-secondary">
                      by{" "}
                      <span className="text-text">{item.attributionName}</span>
                    </span>
                  )}
                </div>
                <h3 className="text-[15px] font-medium text-text mb-1 break-words">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isSignedIn && items.length > 0 && (
        <p className="text-[12px] text-text-secondary">
          <Link
            href="/auth/login?next=/feedback"
            className="text-accent hover:underline"
          >
            Sign in
          </Link>{" "}
          to upvote the suggestions that matter to you.
        </p>
      )}
    </div>
  );
}
