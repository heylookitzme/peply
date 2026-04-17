import type { Compound } from "@/types/content";

export const semax: Compound = {
  id: "semax",
  slug: "semax",
  name: "Semax",
  aliases: ["ACTH 4-10 analog"],
  category: "neuropeptide",
  approvalStatus: "research",
  summary:
    "Synthetic analog of ACTH (4-10) fragment researched for neuroprotective and cognitive-enhancing effects. Approved in Russia; not FDA-approved in the US.",
  mechanism:
    "Synthetic analog of ACTH (4-10) fragment. Enhances BDNF expression, modulates dopaminergic and serotonergic systems, provides neuroprotective effects. Does not affect adrenal cortex function despite ACTH origin.",
  halfLife:
    "Approximately 3-5 minutes (intranasal bioavailability extends effective duration)",
  manufacturer: "Research peptide (approved in Russia as Semax)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 3, unit: "mg", label: "3 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 200,
    max: 600,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily (intranasal or SC)",
  },
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence.",
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Dolotov et al., Brain Research, 2006",
      sourceUrl: "https://doi.org/10.1016/j.brainres.2006.07.108",
      steps: [
        {
          dose: 300,
          unit: "mcg",
          durationWeeks: 0,
          notes: "Standard research dose",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "cat2",
    reclassificationStatus: "removed-from-cat2",
    fdaCategory: "Research peptide in US (removed from FDA Category 2; approved in Russia)",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    dateAnnouncedRemoval: "2026-04-15",
    lastUpdated: "2026-04-15",
    sourcingNote:
      "Removed from Category 2 by FDA (April 15, 2026). Will be evaluated by PCAC beginning July 2026. Not yet Category 1 — awaiting formal PCAC review.",
  },
  citations: [
    {
      id: "semax-bdnf",
      label: "Dolotov 2006",
      title:
        "Semax, an Analog of ACTH(4-10) with Cognitive Effects, Regulates BDNF and trkB Expression in the Rat Hippocampus",
      source: "Brain Research, 1170, 35-42",
      sourceUrl: "https://doi.org/10.1016/j.brainres.2006.07.108",
      publishedAt: "2006-09-01",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
