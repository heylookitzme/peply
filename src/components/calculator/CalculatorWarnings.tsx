import type { CalculatorWarning } from "@/types/calculator";
import { Warning } from "@/components/ui/Warning";

interface CalculatorWarningsProps {
  warnings: CalculatorWarning[];
}

export function CalculatorWarnings({
  warnings,
}: CalculatorWarningsProps): React.ReactElement | null {
  if (warnings.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">Warnings</h2>
      {warnings.map((warning, index) => (
        <Warning key={`${warning.code}-${index}`} warning={warning} />
      ))}
    </div>
  );
}
