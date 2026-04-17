import type { Compound } from "@/types/content";

export const dsip: Compound = {
  id: "dsip",
  slug: "dsip",
  name: "DSIP (Emideltide)",
  aliases: ["Delta Sleep-Inducing Peptide", "Emideltide"],
  category: "neuropeptide",
  approvalStatus: "research",
  summary:
    "Nonapeptide researched for sleep architecture modulation and stress-related cortisol regulation. Not FDA-approved for any indication.",
  mechanism:
    "Nonapeptide known for modulating sleep architecture and promoting delta-wave sleep. Acts on multiple targets including GABA-A receptors, serotonergic pathways, and cortisol regulation without causing sedation.",
  halfLife: "Approximately 15-25 minutes",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 2, unit: "mg", label: "2 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 100,
    max: 300,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily (before sleep)",
  },
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence.",
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Kovalzon & Strekalova, Journal of Neurochemistry, 2006",
      sourceUrl: "https://doi.org/10.1111/j.1471-4159.2006.03693.x",
      steps: [
        {
          dose: 100,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Standard research dose before sleep",
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
      id: "dsip-sleep",
      label: "Kovalzon 2006",
      title:
        "Delta Sleep-Inducing Peptide (DSIP): A Still Unresolved Riddle",
      source: "Journal of Neurochemistry, 97(2), 303-309",
      sourceUrl: "https://doi.org/10.1111/j.1471-4159.2006.03693.x",
      publishedAt: "2006-04-01",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
