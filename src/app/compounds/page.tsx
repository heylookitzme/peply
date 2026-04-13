import type { Metadata } from "next";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompoundFilters } from "@/components/compounds/CompoundFilters";

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
      <CompoundFilters compounds={COMPOUNDS} />
    </div>
  );
}
