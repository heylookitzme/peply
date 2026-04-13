import type { Metadata } from "next";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompoundFilters } from "@/components/compounds/CompoundFilters";

export const metadata: Metadata = {
  title: "Compounds - Peply",
  description:
    "Compound reference for peptides and injectable medications. Published clinical dose ranges, titration protocols, and regulatory status.",
};

export default function CompoundsPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <SectionHeader
        label="Compounds"
        title="Compound Reference"
        emphasisWord="Reference"
        subtitle="Published clinical data, titration protocols, and regulatory status for referenced peptides and injectables."
      />
      <CompoundFilters compounds={COMPOUNDS} />
    </div>
  );
}
