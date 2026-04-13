import type { Compound } from "@/types/content";

export const motsc: Compound = {
  id: "mots-c",
  slug: "mots-c",
  name: "MOTS-C (Mitochondrial ORF of the 12S rRNA Type-C)",
  aliases: ["Mitochondrial-Derived Peptide MOTS-c"],
  category: "longevity-immune",
  approvalStatus: "research",
  summary:
    "Mitochondrial-derived peptide researched for metabolic regulation and insulin sensitivity. Not FDA-approved for any indication.",
  mechanism:
    "Mitochondrial-derived peptide encoded within the 12S rRNA gene. Activates AMPK pathway, enhances glucose uptake, improves insulin sensitivity, and regulates cellular metabolism. Functions as a mitochondrial signaling molecule.",
  halfLife: "Estimated 2-4 hours",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 5,
    max: 10,
    unit: "mg",
    frequency: "other",
    frequencyLabel: "3-5x/week",
  },
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Lee et al., Cell Metabolism, 2015",
      sourceUrl: "https://doi.org/10.1016/j.cmet.2015.02.009",
      steps: [
        {
          dose: 5,
          unit: "mg",
          durationWeeks: 0,
          notes: "Standard research dose 3-5x/week",
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
      "Not FDA-approved. Early-stage research peptide. Currently FDA Category 2 (restricted). Pending return to Category 1.",
  },
  citations: [
    {
      id: "motsc-metabolism",
      label: "Lee 2015",
      title:
        "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance",
      source: "Cell Metabolism, 21(3), 443-454",
      publishedAt: "2015-03-03",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
