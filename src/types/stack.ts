export const STACK_CATEGORIES = [
  "recovery",
  "growth",
  "metabolic",
  "cognitive",
  "immune",
] as const;
export type StackCategory = (typeof STACK_CATEGORIES)[number];

export const STACK_EVIDENCE_LEVELS = [
  "clinical",
  "community",
  "theoretical",
] as const;
export type StackEvidenceLevel = (typeof STACK_EVIDENCE_LEVELS)[number];

export interface StackCompound {
  compoundId: string;
  role: string;
  dosing: string;
}

export interface StackProtocol {
  duration: string;
  cycling: string;
  timing?: string;
  notes?: string;
}

export interface Stack {
  id: string;
  slug: string;
  name: string;
  category: StackCategory;
  summary: string;
  rationale: string;
  compounds: StackCompound[];
  protocol: StackProtocol;
  evidenceLevel: StackEvidenceLevel;
  evidenceDisclaimer: string;
  citations: {
    id: string;
    label: string;
    title: string;
    source: string;
    sourceUrl?: string;
    publishedAt?: string;
    lastReviewedAt: string;
  }[];
}
