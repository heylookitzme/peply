"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/calculator", label: "Calculator" },
  { href: "/compounds", label: "Compounds" },
  { href: "/stacks", label: "Stacks" },
  { href: "/regulatory", label: "Regulatory" },
  { href: "/submit", label: "Community" },
] as const;

export function Header(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-[960px] px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif italic text-2xl tracking-tight"
        >
          Peply
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-150 ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-text"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-md text-text-secondary hover:text-text transition-colors duration-150"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-background/60 md:hidden"
            onClick={closeMenu}
          />
          {/* Panel */}
          <nav className="fixed top-0 right-0 z-50 w-72 h-full bg-surface border-l border-border flex flex-col md:hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-serif italic text-xl">Peply</span>
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="p-2 rounded-md text-text-secondary hover:text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`py-3 text-[15px] font-medium min-h-[48px] flex items-center border-b border-border/50 transition-colors duration-150 ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-accent"
                      : "text-text hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-text-secondary">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
