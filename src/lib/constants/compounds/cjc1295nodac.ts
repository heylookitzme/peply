import type { Compound } from "@/types/content";

export const cjc1295nodac: Compound = {
  id: "cjc-1295-no-dac",
  slug: "cjc-1295-no-dac",
  name: "CJC-1295 (no DAC) / Modified GRF 1-29",
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
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Ionescu & Bhayani, Growth Hormone & IGF Research, 2006",
      sourceUrl: "https://doi.org/10.1016/j.ghir.2006.07.001",
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
      title: "CJC-1295, A Long-Acting GHRH Analog",
      source: "Growth Hormone & IGF Research, 16(S1), S62",
      sourceUrl: "https://doi.org/10.1016/j.ghir.2006.07.001",
      publishedAt: "2006-07-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
