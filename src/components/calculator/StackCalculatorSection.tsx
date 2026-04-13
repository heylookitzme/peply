"use client";

import { useState } from "react";
import type { Stack } from "@/types/stack";
import { StackCalculator } from "./StackCalculator";

interface StackCalculatorSectionProps {
  stack: Stack;
}

export function StackCalculatorSection({
  stack,
}: StackCalculatorSectionProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Stack Calculator</h2>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-[13px] text-accent hover:underline"
        >
          {expanded ? "Collapse" : "Calculate This Stack"}
        </button>
      </div>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full rounded-lg border border-dashed border-accent/30 py-4 text-[14px] text-accent hover:bg-accent/5 transition-colors duration-150"
        >
          Calculate reconstitution for all {stack.compounds.length} compounds at once
        </button>
      )}

      {expanded && <StackCalculator stack={stack} />}
    </section>
  );
}
