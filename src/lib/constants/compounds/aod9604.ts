import type { Compound } from "@/types/content";

export const aod9604: Compound = {
  id: "aod-9604",
  slug: "aod-9604",
  name: "AOD-9604",
  aliases: ["Anti-Obesity Drug 9604", "hGH Fragment 176-191"],
  category: "growth-recovery",
  approvalStatus: "research",
  summary:
    "Modified fragment of human growth hormone (amino acids 176-191) researched for lipolysis stimulation without affecting IGF-1 or insulin sensitivity. Not FDA-approved for any indication.",
  mechanism:
    "Modified fragment of human growth hormone (amino acids 176-191). Stimulates lipolysis and inhibits lipogenesis without affecting IGF-1 levels or insulin sensitivity.",
  halfLife: "Estimated 30-60 minutes",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 250,
    max: 500,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Dosing extrapolated from animal studies and community protocols. No large-scale human clinical trials.",
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Heffernan et al., Obesity Research, 2001",
      sourceUrl: "https://doi.org/10.1038/oby.2001.120",
      steps: [
        {
          dose: 300,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Standard research dose, no titration",
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
      "Not FDA-approved for any indication. Currently FDA Category 2 (restricted). Pending return to Category 1 availability.",
  },
  citations: [
    {
      id: "aod-obesity",
      label: "Heffernan 2001 (Mouse Study)",
      title:
        "Effects of a Modified Fragment of Growth Hormone on Body Composition (mouse study; human SC dosing is community-derived)",
      source: "Obesity Research, 9(S4), A51",
      sourceUrl: "https://doi.org/10.1038/oby.2001.120",
      publishedAt: "2001-01-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
