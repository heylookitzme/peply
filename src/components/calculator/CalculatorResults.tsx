import type { CalculatorResult } from "@/types/calculator";
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
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-4">
      <h2 className="text-lg font-semibold">Results</h2>
      <dl className="grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Concentration
          </dt>
          <dd className="mt-1 text-2xl font-semibold font-mono">
            {formatConcentration(
              result.concentrationPerMl,
              result.concentrationUnit,
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Draw Volume
          </dt>
          <dd className="mt-1 text-2xl font-semibold font-mono">
            {formatMl(result.drawVolumeMl)} mL
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Syringe Units
          </dt>
          <dd className="mt-1 text-2xl font-semibold font-mono">
            {formatSyringeUnits(result.syringeUnits)} units
          </dd>
        </div>
      </dl>

      <details className="text-xs text-gray-500 dark:text-gray-400">
        <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
          Show exact values
        </summary>
        <div className="mt-2 space-y-1 font-mono">
          <p>
            Exact draw: {result.drawVolumeMl.toPrecision(6)} mL
          </p>
          <p>
            Exact units: {result.syringeUnits.toPrecision(6)}
          </p>
        </div>
      </details>
    </div>
  );
}
