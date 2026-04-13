import type { CompoundCategory, ApprovalStatus } from "@/types/content";

export const CATEGORY_LABELS: Record<CompoundCategory, string> = {
  glp1: "GLP-1 Agonist",
  "dual-agonist": "Dual Agonist",
  "triple-agonist": "Triple Agonist",
  "growth-hormone": "Growth Hormone",
  other: "Other",
};

export const STATUS_LABELS: Record<ApprovalStatus, string> = {
  approved: "FDA Approved",
  investigational: "Investigational",
  research: "Research",
};
