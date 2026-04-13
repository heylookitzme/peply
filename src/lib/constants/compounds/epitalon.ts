import type { Compound } from "@/types/content";

export const epitalon: Compound = {
  id: "epitalon",
  slug: "epitalon",
  name: "Epitalon (Epithalon)",
  aliases: ["Epithalon", "Epithalone", "AEDG peptide"],
  category: "longevity-immune",
  approvalStatus: "research",
  summary:
    "Synthetic tetrapeptide researched for telomerase activation and pineal gland function. Not FDA-approved for any indication.",
  mechanism:
    "Synthetic tetrapeptide (Ala-Glu-Asp-Gly) analog of epithalamin. Activates telomerase, the enzyme responsible for maintaining telomere length. May promote pineal gland function and melatonin production.",
  halfLife: "Estimated 1-2 hours",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 10, unit: "mg", label: "10 mg vial" },
    { amount: 20, unit: "mg", label: "20 mg vial" },
    { amount: 50, unit: "mg", label: "50 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 5,
    max: 10,
    unit: "mg",
    frequency: "daily",
    frequencyLabel: "Daily in 10-day cycles",
  },
  titrationProtocols: [
    {
      name: "Research Cycling Protocol",
      source:
        "Khavinson et al., Bulletin of Experimental Biology and Medicine, 2003",
      sourceUrl: "https://doi.org/10.1023/A:1024626105532",
      steps: [
        {
          dose: 10,
          unit: "mg",
          durationWeeks: 2,
          notes: "10-day cycle, then break. Repeat 2-3x/year",
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
      "Not FDA-approved. Research on telomerase activation primarily from Russian institutes. Currently FDA Category 2 (restricted). Pending return to Category 1.",
  },
  citations: [
    {
      id: "epitalon-telomerase",
      label: "Khavinson 2003",
      title:
        "Epithalon Peptide Induces Telomerase Activity and Telomere Elongation in Human Somatic Cells",
      source:
        "Bulletin of Experimental Biology and Medicine, 135(6), 590-592",
      publishedAt: "2003-06-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
