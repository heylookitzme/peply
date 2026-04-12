import type { CalculatorWarning, WarningSeverity } from "@/types/calculator";

interface CalculatorWarningsProps {
  warnings: CalculatorWarning[];
}

const SEVERITY_STYLES: Record<WarningSeverity, string> = {
  critical:
    "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300",
  warning:
    "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
  info: "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
};

const SEVERITY_LABELS: Record<WarningSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

export function CalculatorWarnings({
  warnings,
}: CalculatorWarningsProps): React.ReactElement | null {
  if (warnings.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Warnings</h2>
      {warnings.map((warning, index) => (
        <div
          key={`${warning.code}-${index}`}
          role="alert"
          className={`rounded-md border px-4 py-3 text-sm ${SEVERITY_STYLES[warning.severity]}`}
        >
          <div className="flex items-start gap-2">
            <span className="font-semibold shrink-0">
              {SEVERITY_LABELS[warning.severity]}:
            </span>
            <div>
              <p>{warning.message}</p>
              {warning.recommendation && (
                <p className="mt-1 opacity-80">{warning.recommendation}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
