import type { Metadata } from "next";
import Link from "next/link";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/constants/compounds/labels";
import { formatDoseRange } from "@/lib/formatDoseRange";

export const metadata: Metadata = {
  title: "Compounds - Peply",
  description:
    "Curated compound reference for peptides and injectable medications. Clinical dose ranges, titration protocols, and regulatory status.",
};

export default function CompoundsPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <SectionHeader
        label="Compounds"
        title="Supported Compounds"
        emphasisWord="Compounds"
        subtitle="Curated clinical data, titration protocols, and regulatory status for supported peptides and injectables."
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {COMPOUNDS.map((compound) => (
          <Link key={compound.id} href={`/compounds/${compound.slug}`}>
            <Card className="hover:border-accent/40 transition-colors duration-150 h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-serif text-xl">{compound.name}</h2>
                <Badge status={compound.approvalStatus}>
                  {STATUS_LABELS[compound.approvalStatus]}
                </Badge>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-2">
                {CATEGORY_LABELS[compound.category]}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
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
        ))}
      </div>
    </div>
  );
}
