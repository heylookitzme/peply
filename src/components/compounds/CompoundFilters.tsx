"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Compound, CompoundCategory } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { CATEGORY_LABELS } from "@/lib/constants/compounds/labels";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import { formatDoseRange } from "@/lib/formatDoseRange";

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

interface CompoundFiltersProps {
  compounds: readonly Compound[];
}

export function CompoundFilters({ compounds }: CompoundFiltersProps): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<CompoundCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = activeFilter === "all"
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

    return result;
  }, [compounds, activeFilter, search]);

  const availableCategories = new Set(compounds.map((c) => c.category));

  return (
    <>
      {/* Search bar */}
      <div className="mt-6 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, alias, or mechanism..."
          className="w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.filter(
          (opt) => opt.value === "all" || availableCategories.has(opt.value as CompoundCategory),
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
          return (
            <Link key={compound.id} href={`/compounds/${compound.slug}`}>
              <Card className="hover:border-accent/40 transition-colors duration-150 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-serif text-lg leading-tight">{compound.name}</h2>
                  <span
                    className={`inline-block shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide cursor-help ${regBadge.style}`}
                    title={regBadge.tooltip}
                  >
                    {regBadge.label}
                  </span>
                </div>

                {compound.aliases.length > 0 && (
                  <p className="text-[11px] text-text-secondary mb-1">
                    {compound.aliases.slice(0, 2).join(", ")}
                  </p>
                )}

                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-2">
                  {CATEGORY_LABELS[compound.category]}
                </p>

                <p className="text-[13px] text-text-secondary leading-relaxed flex-1 mb-3 line-clamp-2">
                  {compound.mechanism}
                </p>

                <div className="flex items-center gap-3 text-[12px] text-text-secondary border-t border-border pt-3 mt-auto">
                  <span className="font-mono">
                    {formatDoseRange(compound.clinicalDoseRange)}
                  </span>
                  <span className="text-border">|</span>
                  <span>{compound.clinicalDoseRange.frequencyLabel}</span>
                </div>

                <p className="text-[12px] text-accent mt-3">
                  View Details &rarr;
                </p>
              </Card>
            </Link>
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
