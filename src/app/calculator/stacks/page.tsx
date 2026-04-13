"use client";

import { useState } from "react";
import Link from "next/link";
import { STACKS } from "@/lib/constants/stacks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StackCalculator } from "@/components/calculator/StackCalculator";

const selectClass =
  "rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150";

export default function StackCalculatorPage(): React.ReactElement {
  const [selectedSlug, setSelectedSlug] = useState("");
  const selectedStack = STACKS.find((s) => s.slug === selectedSlug) ?? null;

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <Link
        href="/calculator"
        className="text-[13px] text-text-secondary hover:text-text transition-colors duration-150 mb-6 inline-block"
      >
        &larr; Single Compound Calculator
      </Link>

      <SectionHeader
        label="Stack Calculator"
        title="Multi-Compound Calculator"
        emphasisWord="Calculator"
        subtitle="Calculate reconstitution for an entire stack at once."
      />

      <div className="mt-8 space-y-6">
        <div className="space-y-1.5">
          <label
            htmlFor="stack-select"
            className="block text-[13px] font-medium text-text-secondary"
          >
            Select a stack
          </label>
          <select
            id="stack-select"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className={`w-full ${selectClass}`}
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
            <StackCalculator
              key={selectedStack.slug}
              stack={selectedStack}
            />
          </>
        )}

        {!selectedStack && (
          <p className="text-[13px] text-text-secondary text-center py-8">
            Select a stack above to calculate reconstitution for all compounds.
          </p>
        )}
      </div>
    </div>
  );
}
