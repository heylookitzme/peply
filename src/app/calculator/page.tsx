import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export const metadata: Metadata = {
  title: "Reconstitution Calculator",
  description:
    "Peptide reconstitution calculator. Enter vial amount, diluent volume, and target dose for concentration, draw volume, and syringe unit outputs.",
};

export default function CalculatorPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Calculator"
        title="Reconstitution Calculator"
        emphasisWord="Calculator"
        subtitle="Enter your vial and dosing details to calculate concentration, draw volume, and syringe units."
      />
      <div className="mt-8">
        <CalculatorForm />
      </div>
    </div>
  );
}
