export const COMPOUND_CATEGORIES = [
  "glp1",
  "dual-agonist",
  "triple-agonist",
  "growth-hormone",
  "growth-recovery",
  "gh-secretagogue",
  "neuropeptide",
  "longevity-immune",
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

export interface DoseRange {
  min: number;
  max: number;
  unit: "mg" | "mcg";
  frequency: "daily" | "weekly" | "twice_weekly" | "other";
  frequencyLabel: string;
}

export interface VialSize {
  amount: number;
  unit: "mg" | "mcg";
  label: string;
}

export interface TitrationStep {
  dose: number;
  unit: "mg" | "mcg";
  durationWeeks: number;
  notes?: string;
}

export interface TitrationProtocol {
  name: string;
  source: string;
  sourceUrl?: string;
  steps: TitrationStep[];
}

export const REGULATORY_CATEGORIES = [
  "cat1",
  "cat2",
  "approved",
  "investigational",
] as const;
export type RegulatoryCategory = (typeof REGULATORY_CATEGORIES)[number];

export const RECLASSIFICATION_STATUSES = [
  "stable",
  "pending",
  "announced",
] as const;
export type ReclassificationStatus = (typeof RECLASSIFICATION_STATUSES)[number];

export interface RegulatoryStatus {
  currentCategory: RegulatoryCategory;
  reclassificationStatus: ReclassificationStatus;
  fdaCategory: string;
  dateRestricted?: string;
  dateAnnouncedReturn?: string;
  lastUpdated: string;
  sourcingNote?: string;
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

export const DOSING_EVIDENCE_LEVELS = [
  "label",
  "phase3",
  "limited-human",
  "preclinical",
] as const;
export type DosingEvidence = (typeof DOSING_EVIDENCE_LEVELS)[number];

export interface Compound {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: CompoundCategory;
  approvalStatus: ApprovalStatus;
  summary: string;
  mechanism: string;
  halfLife: string;
  manufacturer: string;
  defaultRoute: Route;
  commonVialSizes: VialSize[];
  defaultBacWaterMl: number;
  clinicalDoseRange: DoseRange;
  dosingEvidence?: DosingEvidence;
  dosingEvidenceNote?: string;
  titrationProtocols: TitrationProtocol[];
  regulatoryStatus: RegulatoryStatus;
  citations: Citation[];
}

// Legacy types kept for validation schema compatibility
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
