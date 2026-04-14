"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { signOut } from "@/utils/supabase/auth";

const ACCOUNT_LINKS = [
  { href: "/favorites", label: "Favorites" },
  { href: "/account/presets", label: "Presets" },
  { href: "/account", label: "Account" },
] as const;

export function AuthMenu({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}): React.ReactElement | null {
  const { user, displayName, loading } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent): void {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (loading) return null;

  async function handleSignOut(): Promise<void> {
    setBusy(true);
    try {
      await signOut();
      setOpen(false);
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
        {ACCOUNT_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="py-3 text-[15px] font-medium min-h-[48px] flex items-center border-b border-border/50 text-text hover:text-accent transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
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

  const label = displayName?.trim() || user.email || "Account";

  return (
    <div ref={containerRef} className="relative text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-text-secondary hover:text-text transition-colors duration-150 cursor-pointer max-w-[200px]"
        title={label}
      >
        <span className="truncate">{label}</span>
        <ChevronDown className="w-3.5 h-3.5 shrink-0" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-surface py-1.5 z-50"
        >
          {ACCOUNT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block px-4 py-2 text-text hover:bg-surface-alt transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-1 border-t border-border" />
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={busy}
            className="w-full text-left px-4 py-2 text-text-secondary hover:text-text hover:bg-surface-alt transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed"
          >
            {busy ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
