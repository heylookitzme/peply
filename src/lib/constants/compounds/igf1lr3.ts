import type { Compound } from "@/types/content";

export const igf1lr3: Compound = {
  id: "igf1-lr3",
  slug: "igf1-lr3",
  name: "IGF-1 LR3",
  aliases: ["Long R3 IGF-1", "Long Arginine 3-IGF-1"],
  category: "growth-recovery",
  approvalStatus: "research",
  summary:
    "Long-acting analog of IGF-1 with reduced IGFBP binding. Promotes muscle hyperplasia, protein synthesis, and glucose uptake. Monitor blood glucose closely due to insulin-like effects.",
  mechanism:
    "Long-acting analog of IGF-1 with an extended N-terminal peptide (arginine substitution at position 3 + 13-amino-acid extension). Reduced binding to IGF binding proteins (IGFBPs) results in longer half-life and greater bioavailability. Promotes muscle hyperplasia, protein synthesis, and glucose uptake in muscle tissue.",
  halfLife: "Approximately 20-30 hours (vs. 10-15 minutes for native IGF-1)",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 0.1, unit: "mg", label: "100 mcg vial" },
    { amount: 1, unit: "mg", label: "1 mg vial" },
  ],
  defaultBacWaterMl: 1,
  clinicalDoseRange: {
    min: 20,
    max: 100,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily (often post-workout)",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Dosing extrapolated from animal studies and community protocols. No large-scale human clinical trials. Monitor blood glucose closely — can cause hypoglycemia.",
  titrationProtocols: [
    {
      name: "Research Dosing Protocol",
      source:
        "Community protocol based on Francis et al., Journal of Molecular Endocrinology, 1992",
      sourceUrl: "https://doi.org/10.1677/jme.0.0080029",
      steps: [
        {
          dose: 20,
          unit: "mcg",
          durationWeeks: 1,
          notes: "Starting dose to assess tolerance",
        },
        {
          dose: 50,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Standard dose. Cycles: 4-8 weeks on, 4+ weeks off",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "cat1",
    reclassificationStatus: "stable",
    fdaCategory: "Research peptide (not on FDA Category 2 list)",
    lastUpdated: "2026-04-12",
    sourcingNote:
      "Not FDA-approved. Not currently subject to Cat 2 restrictions.",
  },
  citations: [
    {
      id: "igf1lr3-francis",
      label: "Francis 1992",
      title:
        "Insulin-Like Growth Factor 1 with an Arg→Glu Substitution at Position 3 (Long R3 IGF-1) — Characterization",
      source: "Journal of Molecular Endocrinology, 8(1), 29-38",
      sourceUrl: "https://doi.org/10.1677/jme.0.0080029",
      publishedAt: "1992-02-01",
      lastReviewedAt: "2026-04-12",
    },
    {
      id: "igf1lr3-tomas",
      label: "Tomas 1998",
      title:
        "Anabolic Effects of IGF-1 and Long R3 IGF-1 in Animal Models",
      source: "Growth Hormone & IGF Research, 8(S2), 123-127",
      sourceUrl: "https://doi.org/10.1016/S1096-6374(98)80038-X",
      publishedAt: "1998-04-01",
      lastReviewedAt: "2026-04-12",
    },
  ],
};
