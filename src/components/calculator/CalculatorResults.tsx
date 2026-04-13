import type { CalculatorResult } from "@/types/calculator";
import { Card } from "@/components/ui/Card";
import { DataDisplay } from "@/components/ui/DataDisplay";
import {
  formatConcentration,
  formatMl,
  formatSyringeUnits,
} from "@/lib/calculations";

interface CalculatorResultsProps {
  result: CalculatorResult;
}

export function CalculatorResults({
  result,
}: CalculatorResultsProps): React.ReactElement {
  const concParts = formatConcentration(
    result.concentrationPerMl,
    result.concentrationUnit,
  ).split(" ");

  return (
    <Card padding="lg">
      <h2 className="text-base font-semibold mb-6">Results</h2>
      <DataDisplay
        items={[
          {
            label: "Concentration",
            value: concParts[0],
            unit: concParts[1],
          },
          {
            label: "Draw Volume",
            value: formatMl(result.drawVolumeMl),
            unit: "mL",
          },
          {
            label: "Syringe Units",
            value: formatSyringeUnits(result.syringeUnits),
            unit: "units",
          },
        ]}
      />
      <details className="mt-4 pt-4 border-t border-border text-[13px] text-text-secondary">
        <summary className="cursor-pointer hover:text-text transition-colors duration-150">
          Show exact values
        </summary>
        <div className="mt-2 space-y-1 font-mono text-[13px]">
          <p>Exact draw: {result.drawVolumeMl.toPrecision(6)} mL</p>
          <p>Exact units: {result.syringeUnits.toPrecision(6)}</p>
        </div>
      </details>
    </Card>
  );
}
