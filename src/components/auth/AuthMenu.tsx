"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { signOut } from "@/utils/supabase/auth";

export function AuthMenu({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}): React.ReactElement | null {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (loading) return null;

  async function handleSignOut(): Promise<void> {
    setBusy(true);
    try {
      await signOut();
      onNavigate?.();
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  if (variant === "mobile") {
    if (!user) {
      return (
        <Link
          href="/auth/login"
          onClick={onNavigate}
          className="py-3 text-[15px] font-medium min-h-[48px] flex items-center border-b border-border/50 text-text hover:text-accent transition-colors duration-150"
        >
          Sign in
        </Link>
      );
    }
    return (
      <>
        <Link
          href="/account"
          onClick={onNavigate}
          className="py-3 text-[15px] font-medium min-h-[48px] flex items-center border-b border-border/50 text-text hover:text-accent transition-colors duration-150"
        >
          Account
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={busy}
          className="py-3 text-[15px] font-medium min-h-[48px] flex items-center border-b border-border/50 text-text-secondary hover:text-text transition-colors duration-150 text-left"
        >
          {busy ? "Signing out…" : "Sign out"}
        </button>
      </>
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="text-sm text-text-secondary hover:text-text transition-colors duration-150"
      >
        Sign in
      </Link>
    );
  }

  const label = user.email ?? "Account";
  return (
    <div className="flex items-center gap-3 text-sm">
      <Link
        href="/account"
        className="text-text-secondary hover:text-text transition-colors duration-150 max-w-[160px] truncate"
        title={label}
      >
        {label}
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={busy}
        className="text-text-secondary hover:text-text transition-colors duration-150 cursor-pointer"
      >
        {busy ? "…" : "Sign out"}
      </button>
    </div>
  );
}
