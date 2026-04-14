"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { STACKS } from "@/lib/constants/stacks";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompoundCombobox } from "@/components/ui/CompoundCombobox";
import { CostCalculator } from "@/components/calculator/CostCalculator";

const tabClass =
  "px-4 py-2 text-[13px] font-medium rounded-md transition-colors duration-150";
const activeTab = "bg-accent/10 text-accent";
const inactiveTab = "text-text-secondary hover:text-text";

const selectClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150";

export function CostCalculatorPageContent(): React.ReactElement {
  const searchParams = useSearchParams();
  const initialStack = searchParams.get("stack") ?? "";

  const [mode, setMode] = useState<"stack" | "single">(
    initialStack ? "stack" : "stack",
  );
  const [selectedStackSlug, setSelectedStackSlug] = useState(initialStack);
  const [selectedCompoundSlug, setSelectedCompoundSlug] = useState("");

  const selectedStack = useMemo(
    () => STACKS.find((s) => s.slug === selectedStackSlug) ?? null,
    [selectedStackSlug],
  );

  const selectedCompound = useMemo(
    () => COMPOUNDS.find((c) => c.slug === selectedCompoundSlug) ?? null,
    [selectedCompoundSlug],
  );

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <Link
        href="/calculator"
        className="text-[13px] text-text-secondary hover:text-text transition-colors duration-150 mb-6 inline-block"
      >
        &larr; Reconstitution Calculator
      </Link>

      <SectionHeader
        label="Cost Estimator"
        title="Protocol Cost Estimator"
        emphasisWord="Cost"
        subtitle="Estimate the cost of a full protocol based on your vial prices."
      />

      {/* Tabs */}
      <div className="flex gap-2 mt-6 mb-6">
        <button
          type="button"
          onClick={() => setMode("stack")}
          className={`${tabClass} ${mode === "stack" ? activeTab : inactiveTab}`}
        >
          Full Stack
        </button>
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`${tabClass} ${mode === "single" ? activeTab : inactiveTab}`}
        >
          Single Compound
        </button>
      </div>

      {mode === "stack" && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="stack-cost-select"
              className="block text-[13px] font-medium text-text-secondary"
            >
              Select a stack
            </label>
            <select
              id="stack-cost-select"
              value={selectedStackSlug}
              onChange={(e) => setSelectedStackSlug(e.target.value)}
              className={selectClass}
            >
              <option value="">Choose a stack protocol</option>
              {STACKS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} ({s.compounds.length} compounds)
                </option>
              ))}
            </select>
          </div>

          {selectedStack && (
            <>
              <p className="text-sm text-text-secondary">
                {selectedStack.summary}
              </p>
              <p className="text-[12px] text-warning/80 italic">
                {selectedStack.evidenceDisclaimer}
              </p>
              <CostCalculator key={selectedStack.slug} stack={selectedStack} />
            </>
          )}

          {!selectedStack && (
            <p className="text-[13px] text-text-secondary text-center py-8">
              Select a stack to estimate protocol costs.
            </p>
          )}
        </div>
      )}

      {mode === "single" && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-text-secondary">
              Select a compound
            </label>
            <CompoundCombobox
              compounds={COMPOUNDS}
              value={selectedCompoundSlug}
              onChange={setSelectedCompoundSlug}
              placeholder="Select a compound"
            />
          </div>

          {selectedCompound && (
            <CostCalculator
              key={selectedCompound.slug}
              compound={selectedCompound}
            />
          )}

          {!selectedCompound && (
            <p className="text-[13px] text-text-secondary text-center py-8">
              Select a compound to estimate costs.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
