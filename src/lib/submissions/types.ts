export const EFFECT_OPTIONS = [
  { value: "desired_effects", label: "Desired effects observed" },
  { value: "gi_side_effects", label: "GI side effects (nausea, diarrhea, appetite loss)" },
  { value: "injection_site_reaction", label: "Injection site reaction" },
  { value: "headache", label: "Headache" },
  { value: "fatigue", label: "Fatigue / low energy" },
  { value: "mood_changes", label: "Mood changes" },
  { value: "sleep_changes", label: "Sleep changes" },
  { value: "no_notable_effects", label: "No notable effects" },
  { value: "other", label: "Other" },
] as const;

export const ROUTE_OPTIONS = [
  { value: "sc", label: "Subcutaneous" },
  { value: "im", label: "Intramuscular" },
  { value: "oral", label: "Oral" },
] as const;

export const SOURCE_TYPE_OPTIONS = [
  { value: "compounding_pharmacy", label: "Compounding pharmacy" },
  { value: "research_supplier", label: "Research supplier" },
  { value: "clinic", label: "Clinic" },
  { value: "other", label: "Other" },
] as const;

export const SUBMIT_AGAIN_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Unsure" },
] as const;

export const CONTAMINANT_OPTIONS = [
  { value: "heavy_metals", label: "Heavy metals" },
  { value: "endotoxins", label: "Endotoxins" },
  { value: "residual_solvents", label: "Residual solvents" },
  { value: "microbial", label: "Microbial" },
  { value: "other", label: "Other" },
] as const;

export interface UserSubmission {
  compound_slug: string;
  dose_amount: number;
  dose_unit: "mg" | "mcg";
  frequency: string;
  duration_weeks: number | null;
  route: string | null;
  source_type: string | null;
  effects: string[];
  effects_notes: string;
  bloodwork_changes: { marker: string; before: string; after: string }[];
  would_submit_again: string;
  ip_hash: string;
}

export interface VendorSubmission {
  vendor_id: string;
  compound_slug: string;
  batch_number: string;
  purity_percentage: number | null;
  contaminants_tested: string[];
  potency_verified: boolean;
  coa_file_url: string;
  notes: string;
}
