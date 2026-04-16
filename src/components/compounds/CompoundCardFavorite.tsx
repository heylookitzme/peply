"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getProfile, toggleFavorite } from "@/lib/preferences/queries";

export function CompoundCardFavorite({
  slug,
}: {
  slug: string;
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
        setFavorited(p.favorite_compounds.includes(slug));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, slug]);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!user) return;
      setBusy(true);
      try {
        const next = await toggleFavorite(user.id, "compound", slug);
        setFavorited(next.includes(slug));
      } finally {
        setBusy(false);
      }
    },
    [user, slug],
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
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150 ${
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
