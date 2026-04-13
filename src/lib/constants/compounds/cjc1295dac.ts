import type { Compound } from "@/types/content";

export const cjc1295dac: Compound = {
  id: "cjc-1295-dac",
  slug: "cjc-1295-dac",
  name: "CJC-1295 (with DAC)",
  aliases: ["CJC-1295 DAC", "Drug Affinity Complex CJC-1295"],
  category: "gh-secretagogue",
  approvalStatus: "research",
  summary:
    "GHRH analog with a Drug Affinity Complex (DAC) that extends its half-life by binding to albumin, producing sustained elevated GH and IGF-1 levels.",
  mechanism:
    "GHRH analog with a Drug Affinity Complex (DAC) that extends its half-life by binding to albumin. Produces sustained, elevated GH and IGF-1 levels rather than pulsatile release.",
  halfLife: "Approximately 8 days (due to DAC albumin binding)",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 2, unit: "mg", label: "2 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 1,
    max: 2,
    unit: "mg",
    frequency: "weekly",
    frequencyLabel: "Once weekly",
  },
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Teichman et al., Journal of Clinical Endocrinology & Metabolism, 2006",
      sourceUrl: "https://doi.org/10.1210/jc.2005-2664",
      steps: [
        {
          dose: 2,
          unit: "mg",
          durationWeeks: 0,
          notes: "Standard weekly dose",
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
      "Not FDA-approved. Currently Category 2 (restricted). Pending return to Category 1. The DAC variant produces sustained (non-pulsatile) GH elevation.",
  },
  citations: [
    {
      id: "cjc-dac-pk",
      label: "Teichman 2006",
      title:
        "Prolonged Stimulation of Growth Hormone and IGF-I After Single Subcutaneous Administration of CJC-1295",
      source: "Journal of Clinical Endocrinology & Metabolism, 91(3), 799-805",
      sourceUrl: "https://doi.org/10.1210/jc.2005-2664",
      publishedAt: "2006-03-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
