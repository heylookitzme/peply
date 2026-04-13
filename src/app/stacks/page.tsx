import type { Metadata } from "next";
import Link from "next/link";
import { STACKS } from "@/lib/constants/stacks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { STACK_CATEGORY_LABELS, EVIDENCE_STYLES } from "@/lib/constants/stacks/labels";

export const metadata: Metadata = {
  title: "Stacks - Peply",
  description:
    "Curated peptide stacks and combination protocols. Recovery, growth, and metabolic stacks with dosing guidelines and evidence levels.",
};

export default function StacksPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <SectionHeader
        label="Stacks"
        title="Combination Protocols"
        emphasisWord="Protocols"
        subtitle="Curated multi-compound stacks with dosing guidelines, timing protocols, and evidence context."
      />

      <p className="mt-4 text-[12px] text-warning/80 italic max-w-[600px]">
        All stacks are community-derived protocols. No clinical trials exist for
        these specific combinations. For research and educational purposes only.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {STACKS.map((stack) => (
          <Link key={stack.id} href={`/stacks/${stack.slug}`}>
            <Card className="hover:border-accent/40 transition-colors duration-150 h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-serif text-xl">{stack.name}</h2>
                <span
                  className={`inline-block shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${EVIDENCE_STYLES[stack.evidenceLevel]}`}
                >
                  {stack.evidenceLevel}
                </span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-2">
                {STACK_CATEGORY_LABELS[stack.category]} &middot;{" "}
                {stack.compounds.length} compounds
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                {stack.summary}
              </p>
              <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                {stack.compounds.map((c) => (
                  <span
                    key={c.compoundId}
                    className="text-[11px] text-text-secondary bg-surface-alt rounded-md px-2 py-0.5"
                  >
                    {c.compoundId}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
