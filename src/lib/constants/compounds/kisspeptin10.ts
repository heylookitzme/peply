import type { Compound } from "@/types/content";

export const kisspeptin10: Compound = {
  id: "kisspeptin-10",
  slug: "kisspeptin-10",
  name: "Kisspeptin-10",
  aliases: ["KP-10", "Metastin 45-54"],
  category: "longevity-immune",
  approvalStatus: "research",
  summary:
    "Decapeptide fragment of kisspeptin researched for reproductive hormone axis regulation. Not FDA-approved for any indication.",
  mechanism:
    "Decapeptide fragment of kisspeptin that activates KISS1R (GPR54) in hypothalamic GnRH neurons. Potently stimulates LH and FSH secretion, serving as a key regulator of the reproductive hormone axis.",
  halfLife: "Approximately 4 minutes (IV), 27 minutes (SC)",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 1, unit: "mg", label: "1 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 75,
    max: 750,
    unit: "mcg",
    frequency: "other",
    frequencyLabel: "Single dose (weight-based: 1-10 mcg/kg)",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Weight-based dosing: 1-10 mcg/kg (typically 75-750 mcg total for adults). Extrapolated from early human studies and community protocols. No large-scale clinical trials.",
  titrationProtocols: [
    {
      name: "Research Protocol",
      source:
        "Dhillo et al., Journal of Clinical Endocrinology & Metabolism, 2005",
      sourceUrl: "https://doi.org/10.1210/jc.2005-1468",
      steps: [
        {
          dose: 1,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Single SC dose (research); dose varies by protocol",
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
      "Not FDA-approved. Investigational use in reproductive endocrinology. Currently FDA Category 2 (restricted). Pending return to Category 1.",
  },
  citations: [
    {
      id: "kiss10-reproductive",
      label: "Dhillo 2005",
      title:
        "Kisspeptin-54 Stimulates the Hypothalamic-Pituitary-Gonadal Axis in Human Males",
      source:
        "Journal of Clinical Endocrinology & Metabolism, 90(12), 6609-6615",
      sourceUrl: "https://doi.org/10.1210/jc.2005-1468",
      publishedAt: "2005-12-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
