"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  type FavoriteKind,
  getProfile,
  toggleFavorite,
} from "@/lib/preferences/queries";

export function CompoundCardFavorite({
  slug,
  kind = "compound",
}: {
  slug: string;
  kind?: FavoriteKind;
}): React.ReactElement {
  const { user, loading } = useAuth();
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState(false);

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
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, slug, kind]);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!user) return;
      setBusy(true);
      try {
        const next = await toggleFavorite(user.id, kind, slug);
        setFavorited(next.includes(slug));
      } finally {
        setBusy(false);
      }
    },
    [user, kind, slug],
  );

  const tooltip = !user
    ? "Sign in to save"
    : favorited
      ? "Remove from favorites"
      : "Save to favorites";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || busy}
      aria-pressed={favorited}
      aria-label={tooltip}
      title={tooltip}
      className={`inline-flex items-center justify-center w-6 h-6 shrink-0 rounded-md transition-colors duration-150 ${
        favorited
          ? "text-accent"
          : "text-text-secondary/40 hover:text-text-secondary"
      }`}
    >
      <Heart
        className="w-4 h-4"
        fill={favorited ? "currentColor" : "none"}
        strokeWidth={1.75}
      />
    </button>
  );
}
