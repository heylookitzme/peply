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
    description:
      "FDA places multiple peptides in Category 2 (Bulk Drug Substances that Raise Significant Safety Risks)",
    status: "completed",
  },
  {
    date: "2026-02-27",
    label: "HHS Review Intent",
    description:
      "HHS announces intent to review Category 2 peptide classifications",
    status: "completed",
  },
  {
    date: "2026-04-15",
    label: "12 Peptides Removed",
    description:
      "HHS Secretary Kennedy announces removal of 12 peptides from Category 2. PCAC evaluation begins July 2026.",
    status: "completed",
  },
  {
    date: "July 2026",
    label: "PCAC Evaluation",
    description:
      "Pharmacy Compounding Advisory Committee begins formal review of removed compounds",
    status: "pending",
  },
] as const;

export interface RestrictedOnlyCompound {
  name: string;
  reason: string;
  dateRestricted: string;
}

/** Compounds expected to remain restricted — display-only, no detail pages. */
export const REMAINING_RESTRICTED: readonly RestrictedOnlyCompound[] = [
  { name: "GHRP-2", reason: "Cortisol and prolactin elevation", dateRestricted: "2023-09-29" },
  { name: "GHRP-6", reason: "Cortisol and prolactin elevation", dateRestricted: "2023-09-29" },
  { name: "PEG-MGF", reason: "Insufficient human clinical data", dateRestricted: "2023-09-29" },
] as const;

/** Compounds in the April 15 removal announcement that are not in the Peply database. */
export const REMOVED_NOT_IN_DATABASE: readonly string[] = [] as const;
