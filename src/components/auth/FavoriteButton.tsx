"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useAuth } from "./AuthProvider";
import {
  type FavoriteKind,
  getProfile,
  toggleFavorite,
} from "@/lib/preferences/queries";

export function FavoriteButton({
  kind,
  slug,
}: {
  kind: FavoriteKind;
  slug: string;
}): React.ReactElement {
  const { user, loading } = useAuth();
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorited(false);
      return;
    }
    let cancelled = false;
    getProfile(user.id)
      .then((p) => {
        if (cancelled) return;
        const arr =
          kind === "compound" ? p.favorite_compounds : p.favorite_stacks;
        setFavorited(arr.includes(slug));
      })
      .catch(() => {
        // non-fatal — show as not favorited
      });
    return () => {
      cancelled = true;
    };
  }, [user, kind, slug]);

  const handleClick = useCallback(async () => {
    if (!user) {
      setShowPrompt(true);
      return;
    }
    setBusy(true);
    try {
      const next = await toggleFavorite(user.id, kind, slug);
      setFavorited(next.includes(slug));
    } finally {
      setBusy(false);
    }
  }, [user, kind, slug]);

  const label = favorited ? "Remove from favorites" : "Save to favorites";

  return (
    <div className="relative inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || busy}
        aria-pressed={favorited}
        aria-label={label}
        title={label}
        className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[13px] transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
          favorited
            ? "border-accent/50 bg-accent/10 text-accent"
            : "border-border text-text-secondary hover:border-text-secondary hover:text-text"
        }`}
      >
        <Heart
          className="w-4 h-4"
          fill={favorited ? "currentColor" : "none"}
          strokeWidth={1.75}
        />
        <span>{favorited ? "Saved" : "Save"}</span>
      </button>

      {showPrompt && !user && (
        <p
          role="status"
          className="text-[12px] text-text-secondary"
        >
          <Link href="/auth/login" className="text-accent hover:underline">
            Sign in
          </Link>{" "}
          to save favorites.
        </p>
      )}
    </div>
  );
}
