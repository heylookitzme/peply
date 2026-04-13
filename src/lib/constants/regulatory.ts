/**
 * Regulatory timeline milestones and restricted-only compound data
 * for the /regulatory tracker page.
 */

export interface TimelineMilestone {
  date: string;
  label: string;
  description: string;
  status: "completed" | "pending";
}

export const TIMELINE_MILESTONES: readonly TimelineMilestone[] = [
  {
    date: "2023-09-29",
    label: "Category 2 Restriction",
    description: "19 peptides placed on FDA Category 2 restricted list",
    status: "completed",
  },
  {
    date: "2026-02-27",
    label: "HHS Announcement",
    description: "HHS announces ~14 peptides returning to Category 1",
    status: "completed",
  },
  {
    date: "TBD",
    label: "Formal FDA Publication",
    description: "Formal reclassification published in Federal Register",
    status: "pending",
  },
] as const;

export interface RestrictedOnlyCompound {
  name: string;
  reason: string;
}

/** Compounds expected to remain restricted — display-only, no detail pages. */
export const REMAINING_RESTRICTED: readonly RestrictedOnlyCompound[] = [
  { name: "Melanotan II", reason: "Cardiovascular and skin health concerns" },
  { name: "GHRP-2", reason: "Cortisol and prolactin elevation" },
  { name: "GHRP-6", reason: "Cortisol and prolactin elevation" },
  { name: "LL-37 (Cathelicidin)", reason: "Insufficient human safety data" },
  { name: "PEG-MGF", reason: "Insufficient human clinical data" },
] as const;
