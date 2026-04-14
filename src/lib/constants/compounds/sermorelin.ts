import type { Compound } from "@/types/content";

export const sermorelin: Compound = {
  id: "sermorelin",
  slug: "sermorelin",
  name: "Sermorelin",
  aliases: ["GRF 1-29", "Geref"],
  category: "gh-secretagogue",
  approvalStatus: "research",
  summary:
    "Synthetic analog of the first 29 amino acids of growth hormone releasing hormone (GHRH). Previously FDA-approved as Geref; withdrawn from the US market in 2008 for commercial reasons, not safety. Currently available via compounding pharmacies.",
  mechanism:
    "GHRH analog (GRF 1-29). Binds pituitary GHRH receptors to stimulate endogenous growth hormone release in a pulsatile, physiological pattern. Preserves the GH-IGF-1 negative feedback loop.",
  halfLife: "~10-20 minutes (GHRH analog, rapid clearance)",
  manufacturer: "Compounded (historical innovator: Serono — Geref)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 2, unit: "mg", label: "2 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 9, unit: "mg", label: "9 mg vial" },
    { amount: 15, unit: "mg", label: "15 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 200,
    max: 500,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Daily before bed",
  },
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence.",
  titrationProtocols: [
    {
      name: "Community Titration",
      source: "Geref prescribing information (historical); Walker 2006 review",
      sourceUrl: "https://doi.org/10.1111/j.1365-2265.2006.02531.x",
      steps: [
        {
          dose: 200,
          unit: "mcg",
          durationWeeks: 2,
          notes: "Initial dose at bedtime, subcutaneous",
        },
        {
          dose: 300,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Typical maintenance range (200-500 mcg nightly)",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "investigational",
    reclassificationStatus: "stable",
    fdaCategory: "Previously FDA-approved (Geref, withdrawn 2008). Not on FDA Category 2 list.",
    lastUpdated: "2026-04-14",
    sourcingNote:
      "Geref (Serono) was withdrawn from the US market in 2008 for commercial reasons. Not currently an FDA-approved product; available via compounding pharmacies.",
  },
  citations: [
    {
      id: "sermorelin-walker-2006",
      label: "Walker 2006 Review",
      title:
        "Sermorelin: a better approach to management of adult-onset growth hormone insufficiency?",
      source: "Clinical Endocrinology, 65(4), 413-423",
      sourceUrl: "https://doi.org/10.1111/j.1365-2265.2006.02531.x",
      publishedAt: "2006-10-01",
      lastReviewedAt: "2026-04-14",
    },
  ],
};
