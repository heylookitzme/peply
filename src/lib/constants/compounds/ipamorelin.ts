import type { Compound } from "@/types/content";

export const ipamorelin: Compound = {
  id: "ipamorelin",
  slug: "ipamorelin",
  name: "Ipamorelin",
  aliases: [],
  category: "gh-secretagogue",
  approvalStatus: "research",
  summary:
    "Selective growth hormone secretagogue peptide that stimulates GH release via ghrelin/GHS receptors without significantly affecting cortisol, prolactin, or ACTH levels.",
  mechanism:
    "Selective growth hormone secretagogue peptide. Binds ghrelin/GHS receptors in the pituitary to stimulate GH release without significantly affecting cortisol, prolactin, or ACTH levels.",
  halfLife: "Approximately 2 hours",
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
    frequency: "other",
    frequencyLabel: "2-3x daily",
  },
  titrationProtocols: [
    {
      name: "Research Dosing Protocol",
      source: "Raun et al., European Journal of Endocrinology, 1998",
      sourceUrl: "https://doi.org/10.1530/eje.0.1390552",
      steps: [
        {
          dose: 200,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Standard dose 2-3x/day, often combined with CJC-1295",
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
      "Not FDA-approved. Currently Category 2 (restricted). Pending return to Category 1. Often paired with CJC-1295 (no DAC).",
  },
  citations: [
    {
      id: "ipa-raun",
      label: "Raun 1998",
      title:
        "Ipamorelin, the First Selective Growth Hormone Secretagogue",
      source: "European Journal of Endocrinology, 139(5), 552-561",
      sourceUrl: "https://doi.org/10.1530/eje.0.1390552",
      publishedAt: "1998-11-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
