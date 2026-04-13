import type { CalculatorWarning, WarningSeverity } from "@/types/calculator";

interface WarningProps {
  warning: CalculatorWarning;
}

const severityStyles: Record<WarningSeverity, string> = {
  critical:
    "bg-error/[0.08] border-error/25 text-error",
  warning:
    "bg-warning/[0.08] border-warning/25 text-warning",
  info:
    "bg-info/[0.08] border-info/25 text-info",
};

const severityLabels: Record<WarningSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

export function Warning({ warning }: WarningProps): React.ReactElement {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-5 py-4 text-sm flex gap-3 ${severityStyles[warning.severity]}`}
    >
      <span className="font-semibold shrink-0">
        {severityLabels[warning.severity]}:
      </span>
      <div>
        <p>{warning.message}</p>
        {warning.recommendation && (
          <p className="mt-1 opacity-70">{warning.recommendation}</p>
        )}
      </div>
    </div>
  );
}
