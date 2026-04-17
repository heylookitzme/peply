import type { Compound } from "@/types/content";

export const ghkcu: Compound = {
  id: "ghk-cu",
  slug: "ghk-cu",
  name: "GHK-Cu",
  aliases: ["Copper Peptide GHK", "Glycyl-L-histidyl-L-lysine"],
  category: "growth-recovery",
  approvalStatus: "research",
  summary:
    "Naturally occurring copper-binding tripeptide researched for wound healing, collagen synthesis, and tissue remodeling. Not FDA-approved for any indication.",
  mechanism:
    "Naturally occurring copper-binding tripeptide. Stimulates collagen synthesis, promotes wound healing, has anti-inflammatory and antioxidant properties. Activates tissue remodeling genes.",
  halfLife: "Estimated 1-2 hours",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 50, unit: "mg", label: "50 mg vial" },
    { amount: 100, unit: "mg", label: "100 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 1,
    max: 3,
    unit: "mg",
    frequency: "daily",
    frequencyLabel: "Once daily",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Dosing extrapolated from animal studies and community protocols. No large-scale human clinical trials.",
  titrationProtocols: [
    {
      name: "Research Protocol",
      source:
        "Pickart & Margolina, Oxidative Medicine and Cellular Longevity, 2012",
      sourceUrl: "https://doi.org/10.1155/2012/324832",
      steps: [
        {
          dose: 1,
          unit: "mg",
          durationWeeks: 0,
          notes: "Standard research dose",
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
      id: "ghkcu-review",
      label: "Pickart 2012",
      title:
        "The Human Tripeptide GHK-Cu in Prevention of Oxidative Stress and Degenerative Conditions of Aging: Implications for Cognitive Health",
      source:
        "Oxidative Medicine and Cellular Longevity, 2012, 324832",
      sourceUrl: "https://doi.org/10.1155/2012/324832",
      publishedAt: "2012-01-01",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
