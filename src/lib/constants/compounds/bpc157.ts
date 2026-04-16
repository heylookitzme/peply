import type { Compound } from "@/types/content";

export const bpc157: Compound = {
  id: "bpc-157",
  slug: "bpc-157",
  name: "BPC-157",
  aliases: ["Body Protection Compound-157"],
  category: "growth-recovery",
  approvalStatus: "research",
  summary:
    "Gastric pentadecapeptide researched for tissue repair, angiogenesis, and anti-inflammatory effects. Not FDA-approved for any indication.",
  mechanism:
    "Gastric pentadecapeptide. Promotes angiogenesis, tendon/ligament healing, and nitric oxide signaling. Modulates growth factor expression.",
  halfLife: "Estimated 15-30 minutes (rapid clearance per He 2022 PK data)",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 200,
    max: 800,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "1-2x daily",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Dosing extrapolated from animal studies and community protocols. No large-scale human clinical trials.",
  titrationProtocols: [
    {
      name: "Research Dosing Protocol",
      source: "Sikiric et al., Current Pharmaceutical Design, 2018",
      sourceUrl: "https://doi.org/10.2174/1381612824666180713101408",
      steps: [
        {
          dose: 250,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Typical research dose, no titration",
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
      id: "bpc157-review",
      label: "Sikiric 2018 Review",
      title: "Stable Gastric Pentadecapeptide BPC 157: Novel Therapy",
      source: "Current Pharmaceutical Design, 24(18), 2012-2032",
      sourceUrl: "https://doi.org/10.2174/1381612824666180713101408",
      publishedAt: "2018-01-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
