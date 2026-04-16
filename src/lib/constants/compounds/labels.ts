import type { CompoundCategory, ApprovalStatus } from "@/types/content";

export const CATEGORY_LABELS: Record<CompoundCategory, string> = {
  glp1: "GLP-1 Agonist",
  "dual-agonist": "Dual Agonist",
  "triple-agonist": "Triple Agonist",
  "growth-hormone": "Growth Hormone",
  "growth-recovery": "Growth & Recovery",
  "gh-secretagogue": "GH Secretagogue",
  neuropeptide: "Neuropeptide",
  "longevity-immune": "Longevity & Immune",
  metabolic: "Metabolic",
  other: "Other",
};

export const STATUS_LABELS: Record<ApprovalStatus, string> = {
  approved: "FDA Approved",
  "limited-indication": "FDA Approved (Vyleesi)",
  "previously-approved": "Previously Approved",
  investigational: "Investigational",
  research: "Research",
};
