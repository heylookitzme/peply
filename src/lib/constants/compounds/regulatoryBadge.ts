import type { Compound } from "@/types/content";
import { STATUS_LABELS } from "./labels";

export interface RegulatoryBadgeInfo {
  label: string;
  style: string;
}

const REG_BADGE_STYLES: Record<string, string> = {
  approved: "bg-success/15 text-success border-success/30",
  cat1: "bg-success/15 text-success border-success/30",
  pending: "bg-warning/15 text-warning border-warning/30",
  cat2: "bg-error/15 text-error border-error/30",
  investigational: "bg-info/15 text-info border-info/30",
};

export function getRegulatoryBadge(compound: Compound): RegulatoryBadgeInfo {
  if (compound.regulatoryStatus.currentCategory === "approved") {
    return { label: STATUS_LABELS[compound.approvalStatus], style: REG_BADGE_STYLES.approved };
  }
  if (compound.regulatoryStatus.currentCategory === "investigational") {
    return { label: "Investigational", style: REG_BADGE_STYLES.investigational };
  }
  if (compound.regulatoryStatus.reclassificationStatus === "pending") {
    return { label: "Cat 2 → Pending Cat 1", style: REG_BADGE_STYLES.pending };
  }
  if (compound.regulatoryStatus.currentCategory === "cat2") {
    return { label: "Category 2", style: REG_BADGE_STYLES.cat2 };
  }
  return { label: STATUS_LABELS[compound.approvalStatus], style: REG_BADGE_STYLES.approved };
}
