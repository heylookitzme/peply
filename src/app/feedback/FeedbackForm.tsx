"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SUGGESTION_CATEGORIES } from "@/lib/feedback/types";
import { submitSuggestion } from "./actions";

export function FeedbackForm({
  isSignedIn,
}: {
  isSignedIn: boolean;
}): React.ReactElement {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [titleLen, setTitleLen] = useState(0);
  const [descLen, setDescLen] = useState(0);
  const router = useRouter();

  function handleSubmit(formData: FormData): void {
    setError(null);
    startTransition(async () => {
      const result = await submitSuggestion(formData);
      if (!result.success) {
        setError(result.error ?? "Submission failed.");
        return;
      }
      setDone(true);
      router.refresh();
    });
  }

  if (done) {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent/[0.08] p-5">
        <p className="text-[15px] text-text mb-1">Thanks — we got it.</p>
        <p className="text-[13px] text-text-secondary">
          Your suggestion is now visible in the list below.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setTitleLen(0);
            setDescLen(0);
          }}
          className="mt-3 text-[13px] text-accent hover:underline cursor-pointer"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="category"
          className="block text-[13px] font-medium text-text-secondary"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue="feature_request"
          className="w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150"
        >
          {SUGGESTION_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Input
          id="title"
          name="title"
          label="Title (short summary)"
          required
          maxLength={200}
          placeholder="e.g. Add support for tesamorelin"
          onChange={(e) => setTitleLen(e.target.value.length)}
        />
        <p className="mt-1 text-[11px] text-text-secondary text-right">
          {titleLen}/200
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="block text-[13px] font-medium text-text-secondary"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={1000}
          onChange={(e) => setDescLen(e.target.value.length)}
          placeholder="What would you like, and why does it matter?"
          className="w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150 resize-y"
        />
        <p className="mt-1 text-[11px] text-text-secondary text-right">
          {descLen}/1000
        </p>
      </div>

      {isSignedIn ? (
        <label className="flex items-start gap-3 text-[13px] text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            name="show_attribution"
            className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--color-accent,#C8572D)]"
          />
          <span>
            Show my display name on this suggestion. Off by default — leave
            unchecked to stay anonymous even though you&apos;re signed in.
          </span>
        </label>
      ) : (
        <p className="text-[12px] text-text-secondary">
          Submitting anonymously.{" "}
          <Link href="/auth/login?next=/feedback" className="text-accent hover:underline">
            Sign in
          </Link>{" "}
          if you&apos;d like the option to attach your name and upvote others.
        </p>
      )}

      {error && (
        <p role="alert" className="text-[13px] text-error">
          {error}
        </p>
      )}

      <Button type="submit" disabled={pending} fullWidth>
        {pending ? "Submitting…" : "Submit suggestion"}
      </Button>

      <p className="text-[12px] text-text-secondary">
        Suggestions are public and visible to other users. Peply does not
        respond to individual suggestions, but we read them all.
      </p>
    </form>
  );
}
