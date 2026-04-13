import type { Compound } from "@/types/content";

export const thymosinAlpha1: Compound = {
  id: "thymosin-alpha-1",
  slug: "thymosin-alpha-1",
  name: "Thymosin Alpha-1",
  aliases: ["Ta1", "Zadaxin"],
  category: "growth-recovery",
  approvalStatus: "research",
  summary:
    "Naturally occurring thymic peptide researched for immune modulation, T-cell enhancement, and dendritic cell activation. Approved as Zadaxin in over 30 countries but not FDA-approved in the US.",
  mechanism:
    "Naturally occurring thymic peptide. Enhances T-cell maturation and function, activates dendritic cells, augments antibody responses. Modulates cytokine production.",
  halfLife: "Approximately 2 hours",
  manufacturer:
    "Research peptide (Zadaxin by SciClone Pharmaceuticals in approved markets)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 3, unit: "mg", label: "3 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 1.6,
    max: 3.2,
    unit: "mg",
    frequency: "twice_weekly",
    frequencyLabel: "2x/week",
  },
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence.",
  titrationProtocols: [
    {
      name: "Zadaxin Label Protocol",
      source:
        "Garaci et al., International Immunopharmacology, 2012",
      sourceUrl: "https://doi.org/10.1016/j.intimp.2012.07.021",
      steps: [
        {
          dose: 1.6,
          unit: "mg",
          durationWeeks: 0,
          notes: "Standard dose 2x/week",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "cat2",
    reclassificationStatus: "pending",
    fdaCategory:
      "Research peptide in US (approved in 30+ countries as Zadaxin)",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    lastUpdated: "2026-02-27",
    sourcingNote:
      "Not FDA-approved in the US. Approved as Zadaxin in over 30 countries for hepatitis B/C and as immune adjuvant. Currently FDA Category 2 (restricted) in US.",
  },
  citations: [
    {
      id: "ta1-review",
      label: "Garaci 2012",
      title: "Thymosin Alpha-1: From Bench to Bedside",
      source: "International Immunopharmacology, 12(4), 555-562",
      sourceUrl: "https://doi.org/10.1016/j.intimp.2012.07.021",
      publishedAt: "2012-01-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
