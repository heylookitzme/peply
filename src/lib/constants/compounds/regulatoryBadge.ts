import type { Compound } from "@/types/content";
import { STATUS_LABELS } from "./labels";

export interface RegulatoryBadgeInfo {
  label: string;
  style: string;
  tooltip: string;
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
    return {
      label: STATUS_LABELS[compound.approvalStatus],
      style: REG_BADGE_STYLES.approved,
      tooltip: "FDA-approved medication available through licensed pharmacies.",
    };
  }
  if (compound.regulatoryStatus.currentCategory === "investigational") {
    return {
      label: "Investigational",
      style: REG_BADGE_STYLES.investigational,
      tooltip: "Currently in clinical trials. Not yet FDA-approved.",
    };
  }
  if (
    compound.regulatoryStatus.currentCategory === "cat1" &&
    compound.regulatoryStatus.reclassificationStatus === "stable"
  ) {
    return {
      label: "Category 1",
      style: REG_BADGE_STYLES.cat1,
      tooltip: "May be legally compounded by licensed 503A/503B pharmacies under a physician prescription.",
    };
  }
  if (compound.regulatoryStatus.reclassificationStatus === "pending") {
    return {
      label: "Cat 2 \u2192 Pending Cat 1",
      style: REG_BADGE_STYLES.pending,
      tooltip: "Restricted from compounding pharmacies since Sept 2023. Announced to return to legal compounding availability (Feb 2026).",
    };
  }
  if (compound.regulatoryStatus.currentCategory === "cat2") {
    return {
      label: "Category 2",
      style: REG_BADGE_STYLES.cat2,
      tooltip: "Currently restricted from compounding pharmacies by FDA.",
    };
  }
  return {
    label: STATUS_LABELS[compound.approvalStatus],
    style: REG_BADGE_STYLES.approved,
    tooltip: "",
  };
}
