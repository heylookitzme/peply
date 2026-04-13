import type { Compound } from "@/types/content";

export const dsip: Compound = {
  id: "dsip",
  slug: "dsip",
  name: "DSIP (Delta Sleep-Inducing Peptide / Emideltide)",
  aliases: ["Delta Sleep-Inducing Peptide", "Emideltide"],
  category: "neuropeptide",
  approvalStatus: "research",
  summary:
    "Nonapeptide researched for sleep architecture modulation and stress-related cortisol regulation. Not FDA-approved for any indication.",
  mechanism:
    "Nonapeptide that modulates sleep architecture. Acts on multiple targets including GABA-A receptors, serotonergic pathways, and cortisol regulation. Promotes delta-wave sleep onset without causing sedation.",
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
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Kovalzon & Strekalova, Peptides, 2006",
      sourceUrl: "https://doi.org/10.1016/j.peptides.2005.10.020",
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
    reclassificationStatus: "pending",
    fdaCategory: "Research peptide (FDA Category 2)",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    lastUpdated: "2026-02-27",
    sourcingNote:
      "Not FDA-approved. Limited human clinical data. Currently FDA Category 2 (restricted). Pending return to Category 1.",
  },
  citations: [
    {
      id: "dsip-sleep",
      label: "Kovalzon 2006",
      title: "Delta Sleep-Inducing Peptide: An Update",
      source: "Peptides, 27(6), 1455-1461",
      publishedAt: "2006-06-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
