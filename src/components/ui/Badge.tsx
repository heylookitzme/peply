import type { ApprovalStatus } from "@/types/content";

interface BadgeProps {
  status: ApprovalStatus;
  children: React.ReactNode;
}

const statusStyles: Record<ApprovalStatus, string> = {
  approved: "bg-success/15 text-success border-success/30",
  "limited-indication": "bg-warning/15 text-warning border-warning/30",
  "previously-approved": "bg-text-secondary/15 text-text-secondary border-text-secondary/30",
  investigational: "bg-info/15 text-info border-info/30",
  research: "bg-text-secondary/15 text-text-secondary border-text-secondary/30",
};

export function Badge({ status, children }: BadgeProps): React.ReactElement {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[status]}`}
    >
      {children}
    </span>
  );
}
