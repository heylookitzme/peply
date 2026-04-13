import type { ApprovalStatus } from "@/types/content";

interface BadgeProps {
  status: ApprovalStatus;
  children: React.ReactNode;
}

const statusStyles = {
  approved:
    "bg-success/15 text-success border-success/30",
  investigational:
    "bg-warning/15 text-warning border-warning/30",
  research:
    "bg-info/15 text-info border-info/30",
} as const;

export function Badge({ status, children }: BadgeProps): React.ReactElement {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[status]}`}
    >
      {children}
    </span>
  );
}
