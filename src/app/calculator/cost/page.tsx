import type { Metadata } from "next";
import { Suspense } from "react";
import { CostCalculatorPageContent } from "./CostCalculatorPage";

export const metadata: Metadata = {
  title: "Cost Estimator",
  description:
    "Estimate the cost of a peptide protocol. Enter vial prices to calculate total cost, cost per week, and cost per month for any stack or compound.",
};

export default function CostPage(): React.ReactElement {
  return (
    <Suspense>
      <CostCalculatorPageContent />
    </Suspense>
  );
}
