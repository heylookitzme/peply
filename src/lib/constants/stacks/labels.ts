import type { StackCategory, StackEvidenceLevel } from "@/types/stack";

export const STACK_CATEGORY_LABELS: Record<StackCategory, string> = {
  recovery: "Recovery",
  growth: "Growth",
  metabolic: "Metabolic",
  cognitive: "Cognitive",
  immune: "Immune",
};

export const EVIDENCE_STYLES: Record<StackEvidenceLevel, string> = {
  clinical: "bg-success/15 text-success border-success/30",
  community: "bg-warning/15 text-warning border-warning/30",
  theoretical: "bg-info/15 text-info border-info/30",
};
