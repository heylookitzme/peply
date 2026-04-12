import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export const metadata: Metadata = {
  title: "Calculator - InjectWise",
  description:
    "Universal peptide reconstitution calculator. Enter vial amount, diluent volume, target dose, and syringe type to get accurate draw calculations.",
};

export default function CalculatorPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Reconstitution Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your vial and dosing details to calculate concentration, draw
          volume, and syringe units.
        </p>
      </div>
      <CalculatorForm />
    </div>
  );
}
