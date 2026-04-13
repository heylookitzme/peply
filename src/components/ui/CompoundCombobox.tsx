"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import type { Compound, CompoundCategory } from "@/types/content";
import { CATEGORY_LABELS } from "@/lib/constants/compounds/labels";
import { formatDoseRange } from "@/lib/formatDoseRange";

interface CompoundComboboxProps {
  compounds: readonly Compound[];
  value: string;
  onChange: (slug: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
}

/** Category display order for grouped dropdown. */
const CATEGORY_ORDER: CompoundCategory[] = [
  "glp1",
  "dual-agonist",
  "triple-agonist",
  "growth-hormone",
  "growth-recovery",
  "gh-secretagogue",
  "neuropeptide",
  "longevity-immune",
  "metabolic",
  "other",
];

interface GroupedCompounds {
  category: CompoundCategory;
  label: string;
  compounds: Compound[];
}

function groupCompounds(compounds: readonly Compound[]): GroupedCompounds[] {
  const map = new Map<CompoundCategory, Compound[]>();
  for (const c of compounds) {
    const list = map.get(c.category) ?? [];
    list.push(c);
    map.set(c.category, list);
  }
  return CATEGORY_ORDER
    .filter((cat) => map.has(cat))
    .map((cat) => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      compounds: map.get(cat)!,
    }));
}

export function CompoundCombobox({
  compounds,
  value,
  onChange,
  id,
  name,
  required,
  placeholder = "Search compounds...",
}: CompoundComboboxProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusIndex, setFocusIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = compounds.find((c) => c.slug === value) ?? null;

  const filtered = useMemo(() => {
    if (!search.trim()) return [...compounds];
    const q = search.toLowerCase();
    return compounds.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.aliases.some((a) => a.toLowerCase().includes(q)) ||
        CATEGORY_LABELS[c.category].toLowerCase().includes(q),
    );
  }, [compounds, search]);

  const grouped = useMemo(() => groupCompounds(filtered), [filtered]);

  // Flat list of slugs for keyboard navigation (manual entry = "")
  const flatSlugs = useMemo(() => {
    const slugs = [""];
    for (const group of grouped) {
      for (const c of group.compounds) {
        slugs.push(c.slug);
      }
    }
    return slugs;
  }, [grouped]);

  const openDropdown = useCallback(() => {
    setOpen(true);
    setSearch("");
    setFocusIndex(-1);
    setTimeout(() => searchRef.current?.focus(), 0);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setSearch("");
    setFocusIndex(-1);
  }, []);

  const selectSlug = useCallback(
    (slug: string) => {
      onChange(slug);
      closeDropdown();
    },
    [onChange, closeDropdown],
  );

  // Click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeDropdown]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-combobox-item]");
    items[focusIndex]?.scrollIntoView({ block: "nearest" });
  }, [focusIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          openDropdown();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusIndex((prev) => Math.min(prev + 1, flatSlugs.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (focusIndex >= 0 && focusIndex < flatSlugs.length) {
            selectSlug(flatSlugs[focusIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          closeDropdown();
          break;
        case "Tab":
          closeDropdown();
          break;
      }
    },
    [open, openDropdown, closeDropdown, selectSlug, focusIndex, flatSlugs],
  );

  // Display label for the trigger button
  const displayLabel = selected
    ? selected.name
    : placeholder === "Search compounds..." ? "Custom / Manual Entry" : "Select a compound";

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Hidden input for form submission */}
      {name && (
        <input type="hidden" name={name} value={value} required={required} />
      )}

      {/* Trigger button */}
      <button
        type="button"
        id={id}
        onClick={() => (open ? closeDropdown() : openDropdown())}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-left transition-colors duration-150 focus:border-accent focus:outline-none flex items-center justify-between"
      >
        <span className={selected ? "text-text" : "text-text-secondary/70"}>
          {displayLabel}
        </span>
        <svg
          className={`w-4 h-4 text-text-secondary shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg max-h-[360px] flex flex-col overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-border">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFocusIndex(-1);
              }}
              placeholder="Search compounds..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
              autoComplete="off"
            />
          </div>

          {/* Options list */}
          <div ref={listRef} className="overflow-y-auto" role="listbox">
            {/* Manual entry option */}
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              data-combobox-item
              onClick={() => selectSlug("")}
              className={`w-full text-left px-3.5 py-3 text-sm transition-colors duration-100 min-h-[44px] flex items-center ${
                focusIndex === 0
                  ? "bg-accent/10 text-accent"
                  : value === ""
                    ? "text-accent"
                    : "text-text-secondary hover:bg-surface-alt"
              }`}
            >
              Custom / Manual Entry
            </button>

            {grouped.length === 0 && search.trim() && (
              <p className="px-3.5 py-3 text-sm text-text-secondary">
                No compounds match &ldquo;{search}&rdquo;
              </p>
            )}

            {grouped.map((group) => (
              <div key={group.category}>
                {/* Category header */}
                <div className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent bg-surface sticky top-0">
                  {group.label}
                </div>

                {group.compounds.map((c) => {
                  const itemIndex = flatSlugs.indexOf(c.slug);
                  const isFocused = focusIndex === itemIndex;
                  const isSelected = value === c.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      role="option"
                      aria-selected={value === c.slug}
                      data-combobox-item
                      onClick={() => selectSlug(c.slug)}
                      className={`w-full text-left px-3.5 py-2.5 min-h-[44px] flex flex-col transition-colors duration-100 ${
                        isFocused
                          ? "bg-accent/10"
                          : isSelected
                            ? "bg-accent/5"
                            : "hover:bg-surface-alt"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          isSelected ? "text-accent font-medium" : "text-text"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        {formatDoseRange(c.clinicalDoseRange)}{" "}
                        {c.clinicalDoseRange.frequencyLabel.toLowerCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
