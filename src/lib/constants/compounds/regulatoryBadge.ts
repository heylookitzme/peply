import type { Compound } from "@/types/content";
import { STATUS_LABELS } from "./labels";

export interface RegulatoryBadgeInfo {
  label: string;
  style: string;
  tooltip: string;
}

const REG_BADGE_STYLES: Record<string, string> = {
  approved: "bg-success/15 text-success border-success/30",
  "limited-indication": "bg-warning/15 text-warning border-warning/30",
  "previously-approved": "bg-text-secondary/15 text-text-secondary border-text-secondary/30",
  cat1: "bg-success/15 text-success border-success/30",
  "removed-from-cat2": "bg-[#2dd4bf]/15 text-[#2dd4bf] border-[#2dd4bf]/30",
  pending: "bg-warning/15 text-warning border-warning/30",
  cat2: "bg-error/15 text-error border-error/30",
  investigational: "bg-info/15 text-info border-info/30",
  research: "bg-text-secondary/15 text-text-secondary border-text-secondary/30",
};

export function getRegulatoryBadge(compound: Compound): RegulatoryBadgeInfo {
  if (compound.approvalStatus === "limited-indication") {
    return {
      label: STATUS_LABELS["limited-indication"],
      style: REG_BADGE_STYLES["limited-indication"],
      tooltip:
        "Only the branded product (Vyleesi) is FDA-approved, for a single indication. Other formulations and uses are research or compounded only.",
    };
  }
  if (compound.approvalStatus === "previously-approved") {
    return {
      label: STATUS_LABELS["previously-approved"],
      style: REG_BADGE_STYLES["previously-approved"],
      tooltip:
        "Was FDA-approved but the branded product has been discontinued. Available via compounding pharmacies only.",
    };
  }
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
      tooltip:
        "May be legally compounded by licensed 503A/503B pharmacies under a physician prescription.",
    };
  }
  if (
    compound.regulatoryStatus.reclassificationStatus === "removed-from-cat2"
  ) {
    return {
      label: "Removed from Cat 2",
      style: REG_BADGE_STYLES["removed-from-cat2"],
      tooltip:
        "Removed from Category 2 by FDA (April 15, 2026). Will be evaluated by PCAC beginning July 2026. Not yet Category 1 — awaiting formal PCAC review.",
    };
  }
  if (compound.regulatoryStatus.reclassificationStatus === "pending") {
    return {
      label: "Cat 2 \u2192 Pending Cat 1",
      style: REG_BADGE_STYLES.pending,
      tooltip:
        "Restricted from compounding pharmacies since Sept 2023. Announced to return to legal compounding availability (Feb 2026).",
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
    style: REG_BADGE_STYLES.research,
    tooltip: "",
  };
}
