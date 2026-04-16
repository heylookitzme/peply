import type { Compound } from "@/types/content";

export const tb500: Compound = {
  id: "tb-500",
  slug: "tb-500",
  name: "TB-500",
  aliases: ["Thymosin Beta-4", "TB4"],
  category: "growth-recovery",
  approvalStatus: "research",
  summary:
    "Synthetic fragment of Thymosin Beta-4 researched for tissue repair, cell migration, and anti-inflammatory effects. Not FDA-approved for any indication.",
  mechanism:
    "Synthetic fragment of Thymosin Beta-4. Upregulates actin, promotes cell migration and differentiation, reduces inflammation, and supports tissue repair.",
  halfLife: "Estimated 2-3 hours",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 2, unit: "mg", label: "2 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 2,
    max: 5,
    unit: "mg",
    frequency: "twice_weekly",
    frequencyLabel: "2x/week (loading), 1x/week (maintenance)",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Dosing extrapolated from animal studies and community protocols. No large-scale human clinical trials.",
  titrationProtocols: [
    {
      name: "Loading/Maintenance Protocol",
      source: "Community protocol (loading/maintenance). Goldstein et al., 2012 is a review of Thymosin Beta-4 biology, not a clinical dosing study.",
      sourceUrl: "https://doi.org/10.1517/14712598.2012.697527",
      steps: [
        {
          dose: 4,
          unit: "mg",
          durationWeeks: 4,
          notes: "Loading phase 2x/week",
        },
        {
          dose: 2.5,
          unit: "mg",
          durationWeeks: 0,
          notes: "Maintenance 1x/week",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "cat2",
    reclassificationStatus: "removed-from-cat2",
    fdaCategory: "Research peptide (removed from FDA Category 2)",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    dateAnnouncedRemoval: "2026-04-15",
    lastUpdated: "2026-04-15",
    sourcingNote:
      "Removed from Category 2 by FDA (April 15, 2026). Will be evaluated by PCAC beginning July 2026. Not yet Category 1 — awaiting formal PCAC review.",
  },
  citations: [
    {
      id: "tb4-review",
      label: "Goldstein 2012 (Biology Review)",
      title: "Thymosin Beta-4: A Multi-Functional Regenerative Peptide (biology review, not a dosing study)",
      source: "Expert Opinion on Biological Therapy, 12(1), 37-51",
      sourceUrl: "https://doi.org/10.1517/14712598.2012.697527",
      publishedAt: "2012-01-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
