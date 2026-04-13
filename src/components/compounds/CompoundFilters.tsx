"use client";

import { useState } from "react";
import Link from "next/link";
import type { Compound, CompoundCategory } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { CATEGORY_LABELS } from "@/lib/constants/compounds/labels";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import { formatDoseRange } from "@/lib/formatDoseRange";

const FILTER_OPTIONS: { value: CompoundCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "glp1", label: "GLP-1 Agonists" },
  { value: "dual-agonist", label: "Dual Agonists" },
  { value: "triple-agonist", label: "Triple Agonists" },
  { value: "growth-recovery", label: "Growth & Recovery" },
  { value: "gh-secretagogue", label: "GH Secretagogues" },
  { value: "neuropeptide", label: "Neuropeptides" },
  { value: "longevity-immune", label: "Longevity & Immune" },
  { value: "growth-hormone", label: "Growth Hormone" },
];

interface CompoundFiltersProps {
  compounds: readonly Compound[];
}

export function CompoundFilters({ compounds }: CompoundFiltersProps): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<CompoundCategory | "all">("all");

  const filtered = activeFilter === "all"
    ? compounds
    : compounds.filter((c) => c.category === activeFilter);

  const availableCategories = new Set(compounds.map((c) => c.category));

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-6 mb-8">
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

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((compound) => {
          const regBadge = getRegulatoryBadge(compound);
          return (
            <Link key={compound.id} href={`/compounds/${compound.slug}`}>
              <Card className="hover:border-accent/40 transition-colors duration-150 h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-serif text-xl">{compound.name}</h2>
                  <span
                    className={`inline-block shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide cursor-help ${regBadge.style}`}
                    title={regBadge.tooltip}
                  >
                    {regBadge.label}
                  </span>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-2">
                  {CATEGORY_LABELS[compound.category]}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {compound.summary}
                </p>
                <div className="flex items-center gap-4 text-[13px] text-text-secondary border-t border-border pt-3">
                  <span className="font-mono">
                    {formatDoseRange(compound.clinicalDoseRange)}
                  </span>
                  <span>{compound.clinicalDoseRange.frequencyLabel}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
