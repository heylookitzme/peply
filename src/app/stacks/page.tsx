import type { Metadata } from "next";
import Link from "next/link";
import { STACKS } from "@/lib/constants/stacks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import {
  STACK_CATEGORY_LABELS,
  EVIDENCE_STYLES,
} from "@/lib/constants/stacks/labels";
import { CompoundCardFavorite } from "@/components/compounds/CompoundCardFavorite";

export const metadata: Metadata = {
  title: "Stack Protocols",
  description:
    "Wolverine, Glow, Klow, GH/Muscle, and Metabolic stack protocols. Community-derived multi-compound combinations with documented dosing.",
};

export default function StacksPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <SectionHeader
        label="Stacks"
        title="Combination Protocols"
        emphasisWord="Protocols"
        subtitle="Community-derived multi-compound stacks with documented dosing, timing protocols, and evidence context."
      />

      <p className="mt-4 text-[12px] text-warning/80 italic max-w-[600px]">
        All stacks are community-derived protocols. No clinical trials exist for
        these specific combinations. For research and educational purposes only.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {STACKS.map((stack) => (
          <Card
            key={stack.id}
            className="hover:border-accent/40 transition-colors duration-150 h-full flex flex-col"
          >
            {/* Row 1: Name + heart */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link href={`/stacks/${stack.slug}`}>
                <h2 className="font-serif text-xl hover:text-accent transition-colors duration-150">
                  {stack.name}
                </h2>
              </Link>
              <CompoundCardFavorite slug={stack.slug} kind="stack" />
            </div>

            {/* Row 2: Category + evidence badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                {STACK_CATEGORY_LABELS[stack.category]} &middot;{" "}
                {stack.compounds.length} compounds
              </p>
              <span
                className={`shrink-0 rounded-full border px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${EVIDENCE_STYLES[stack.evidenceLevel]}`}
              >
                {stack.evidenceLevel}
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2 flex-1">
              {stack.summary}
            </p>

            <div className="flex flex-wrap gap-2 border-t border-border pt-3 mt-auto">
              {stack.compounds.map((c) => (
                <span
                  key={c.compoundId}
                  className="text-[11px] text-text-secondary bg-surface-alt rounded-md px-2 py-0.5"
                >
                  {c.compoundId}
                </span>
              ))}
            </div>

            <Link
              href={`/stacks/${stack.slug}`}
              className="text-[12px] text-accent hover:underline mt-3"
            >
              View Protocol &rarr;
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
