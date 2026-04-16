"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Compound, CompoundCategory } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { CATEGORY_LABELS } from "@/lib/constants/compounds/labels";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import { formatDoseRange } from "@/lib/formatDoseRange";
import { CompoundCardFavorite } from "./CompoundCardFavorite";

const FILTER_OPTIONS: { value: CompoundCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "glp1", label: "GLP-1" },
  { value: "dual-agonist", label: "Dual Agonist" },
  { value: "triple-agonist", label: "Triple Agonist" },
  { value: "growth-recovery", label: "Growth & Recovery" },
  { value: "gh-secretagogue", label: "GH Secretagogue" },
  { value: "neuropeptide", label: "Neuropeptide" },
  { value: "longevity-immune", label: "Longevity & Immune" },
  { value: "metabolic", label: "Metabolic" },
  { value: "growth-hormone", label: "Growth Hormone" },
];

type SortOption = "status" | "name" | "category";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "status", label: "Status" },
  { value: "name", label: "Name (A-Z)" },
  { value: "category", label: "Category" },
];

const CATEGORY_BADGE_COLORS: Record<CompoundCategory, string> = {
  glp1: "bg-info/10 text-info border-info/25",
  "dual-agonist": "bg-info/10 text-info border-info/25",
  "triple-agonist": "bg-info/10 text-info border-info/25",
  "growth-recovery": "bg-success/10 text-success border-success/25",
  "growth-hormone": "bg-success/10 text-success border-success/25",
  "gh-secretagogue": "bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/25",
  neuropeptide: "bg-warning/10 text-warning border-warning/25",
  "longevity-immune": "bg-[#2dd4bf]/10 text-[#2dd4bf] border-[#2dd4bf]/25",
  metabolic: "bg-accent/10 text-accent border-accent/25",
  other: "bg-text-secondary/10 text-text-secondary border-text-secondary/25",
};

function statusOrder(compound: Compound): number {
  if (compound.regulatoryStatus.currentCategory === "approved") return 0;
  if (compound.regulatoryStatus.reclassificationStatus === "removed-from-cat2")
    return 1;
  if (compound.regulatoryStatus.currentCategory === "investigational") return 2;
  return 3;
}

function sortCompounds(
  compounds: Compound[],
  sortBy: SortOption,
): Compound[] {
  return [...compounds].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      const catCmp = CATEGORY_LABELS[a.category].localeCompare(
        CATEGORY_LABELS[b.category],
      );
      return catCmp !== 0 ? catCmp : a.name.localeCompare(b.name);
    }
    // status (default)
    const statusCmp = statusOrder(a) - statusOrder(b);
    return statusCmp !== 0 ? statusCmp : a.name.localeCompare(b.name);
  });
}

function truncateMechanism(text: string, maxWords: number = 15): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

interface CompoundFiltersProps {
  compounds: readonly Compound[];
}

export function CompoundFilters({
  compounds,
}: CompoundFiltersProps): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<
    CompoundCategory | "all"
  >("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("status");

  const filtered = useMemo(() => {
    let result =
      activeFilter === "all"
        ? [...compounds]
        : compounds.filter((c) => c.category === activeFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q)) ||
          c.mechanism.toLowerCase().includes(q) ||
          CATEGORY_LABELS[c.category].toLowerCase().includes(q),
      );
    }

    return sortCompounds(result, sortBy);
  }, [compounds, activeFilter, search, sortBy]);

  const availableCategories = new Set(compounds.map((c) => c.category));

  return (
    <>
      {/* Search + Sort row */}
      <div className="mt-6 mb-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, alias, or mechanism..."
          className="flex-1 rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          aria-label="Sort compounds by"
          className="rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150 sm:w-44"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.filter(
          (opt) =>
            opt.value === "all" ||
            availableCategories.has(opt.value as CompoundCategory),
        ).map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
              activeFilter === opt.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-text-secondary hover:border-text-secondary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="text-[13px] text-text-secondary mb-6">
        {filtered.length} compound{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Card grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((compound) => {
          const regBadge = getRegulatoryBadge(compound);
          const catColor = CATEGORY_BADGE_COLORS[compound.category];
          return (
            <Card
              key={compound.id}
              className="hover:border-accent/40 transition-colors duration-150 h-full flex flex-col"
            >
              {/* Row 1: Name + heart */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link href={`/compounds/${compound.slug}`}>
                  <h2 className="font-serif text-xl leading-tight hover:text-accent transition-colors duration-150">
                    {compound.name}
                  </h2>
                </Link>
                <CompoundCardFavorite slug={compound.slug} />
              </div>

              {/* Row 2: Category badge */}
              <div className="mb-1.5">
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${catColor}`}
                >
                  {CATEGORY_LABELS[compound.category]}
                </span>
              </div>

              {/* Row 3: Regulatory badge */}
              <div className="mb-3">
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide cursor-help ${regBadge.style}`}
                  title={regBadge.tooltip}
                >
                  {regBadge.label}
                </span>
              </div>

              {compound.aliases.length > 0 && (
                <p className="text-[11px] text-text-secondary mb-2">
                  {compound.aliases.slice(0, 2).join(", ")}
                </p>
              )}

              {/* Mechanism (truncated) */}
              <p className="text-[13px] text-text-secondary leading-relaxed flex-1 mb-4 line-clamp-1">
                {truncateMechanism(compound.mechanism)}
              </p>

              {/* Dose info */}
              <div className="flex items-center gap-3 text-[12px] text-text-secondary border-t border-border pt-3 mt-auto">
                <span className="font-mono">
                  {formatDoseRange(compound.clinicalDoseRange)}
                </span>
                <span className="text-border">|</span>
                <span>{compound.clinicalDoseRange.frequencyLabel}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-3">
                <Link
                  href={`/compounds/${compound.slug}`}
                  className="text-[12px] text-accent hover:underline"
                >
                  View Details &rarr;
                </Link>
                {compound.defaultRoute !== "oral" && (
                  <Link
                    href={`/calculator?compound=${compound.slug}`}
                    className="text-[12px] text-text-secondary hover:text-accent transition-colors duration-150"
                  >
                    Open in Calculator &rarr;
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-text-secondary text-center py-12">
          No compounds match your search.
        </p>
      )}
    </>
  );
}
