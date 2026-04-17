import type { Compound } from "@/types/content";

export const cjc1295nodac: Compound = {
  id: "cjc-1295-no-dac",
  slug: "cjc-1295-no-dac",
  name: "CJC-1295 (no DAC)",
  aliases: ["Modified GRF 1-29", "Mod GRF 1-29", "CJC-1295 without DAC"],
  category: "gh-secretagogue",
  approvalStatus: "research",
  summary:
    "Synthetic GHRH analog that stimulates pulsatile GH release. The no-DAC variant preserves natural GH pulsatility with a shorter duration of action.",
  mechanism:
    "Synthetic analog of growth hormone-releasing hormone (GHRH). Stimulates pulsatile GH release from the pituitary. The \"no DAC\" variant has a shorter duration and preserves natural GH pulsatility.",
  halfLife: "Approximately 30 minutes",
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
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence.",
  titrationProtocols: [
    {
      name: "Research Protocol",
      source:
        "Ionescu & Frohman, Journal of Clinical Endocrinology & Metabolism, 2006",
      sourceUrl: "https://doi.org/10.1210/jc.2006-1702",
      steps: [
        {
          dose: 100,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Standard dose 2-3x/day, often combined with Ipamorelin",
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
      "Not FDA-approved. Currently Category 2 (restricted). Pending return to Category 1. Often paired with Ipamorelin for synergistic GH release.",
  },
  citations: [
    {
      id: "cjc-nodac-study",
      label: "Ionescu 2006",
      title:
        "Pulsatile Secretion of Growth Hormone (GH) Persists during Continuous Stimulation by CJC-1295, a Long-Acting GH-Releasing Hormone Analog",
      source:
        "Journal of Clinical Endocrinology & Metabolism, 91(12), 4792-4797",
      sourceUrl: "https://doi.org/10.1210/jc.2006-1702",
      publishedAt: "2006-12-01",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
