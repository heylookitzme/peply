export const COMPOUND_CATEGORIES = [
  "glp1",
  "dual-agonist",
  "triple-agonist",
  "growth-hormone",
  "other",
] as const;
export type CompoundCategory = (typeof COMPOUND_CATEGORIES)[number];

export const APPROVAL_STATUSES = [
  "approved",
  "investigational",
  "research",
] as const;
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export const ROUTES = [
  "subcutaneous",
  "intramuscular",
  "intranasal",
  "other",
] as const;
export type Route = (typeof ROUTES)[number];

export const EVIDENCE_LEVELS = [
  "label",
  "phase3",
  "phase2",
  "phase1",
  "reference_only",
] as const;
export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];

export interface Compound {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: CompoundCategory;
  summary: string;
  mechanism?: string;
  defaultRoute?: Route;
  approvalStatus: ApprovalStatus;
}

export interface Protocol {
  id: string;
  compoundId: string;
  name: string;
  protocolType: "label" | "trial" | "reference";
  route: Route;
  frequency: "daily" | "weekly" | "twice_weekly" | "other";
  frequencyLabel: string;
  targetPopulation?: string;
  evidenceLevel: EvidenceLevel;
  citationIds: string[];
}

export interface ProtocolStep {
  id: string;
  protocolId: string;
  order: number;
  dose: number;
  unit: "mg" | "mcg";
  durationWeeks?: number;
  notes?: string;
}

export interface Citation {
  id: string;
  label: string;
  title: string;
  source: string;
  sourceUrl?: string;
  publishedAt?: string;
  lastReviewedAt: string;
}
