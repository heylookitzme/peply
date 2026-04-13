import type { Compound } from "@/types/content";

export const selank: Compound = {
  id: "selank",
  slug: "selank",
  name: "Selank",
  aliases: ["TP-7"],
  category: "neuropeptide",
  approvalStatus: "research",
  summary:
    "Synthetic analog of tuftsin researched for anxiolytic and immunomodulatory effects. Approved in Russia; not FDA-approved in the US.",
  mechanism:
    "Synthetic analog of the immunomodulatory peptide tuftsin with a stabilizing Pro-Gly-Pro sequence. Modulates GABA-A receptor expression, enhances enkephalin levels, and provides anxiolytic effects without sedation or dependence.",
  halfLife:
    "Approximately 3-5 minutes (intranasal delivery extends effective duration)",
  manufacturer: "Research peptide (approved in Russia)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 3, unit: "mg", label: "3 mg vial" },
    { amount: 5, unit: "mg", label: "5 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 200,
    max: 400,
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
      source:
        "Zozulya et al., Bulletin of Experimental Biology and Medicine, 2008",
      sourceUrl: "https://doi.org/10.1007/s10517-008-0006-0",
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
    reclassificationStatus: "pending",
    fdaCategory: "Research peptide in US (approved in Russia)",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    lastUpdated: "2026-02-27",
    sourcingNote:
      "Not FDA-approved. Approved in Russia for anxiety and cognitive function. Currently FDA Category 2 (restricted) in US. Pending return to Category 1.",
  },
  citations: [
    {
      id: "selank-gaba",
      label: "Zozulya 2008",
      title: "Selank: A Novel Anxiolytic Peptide",
      source:
        "Bulletin of Experimental Biology and Medicine, 145(2), 225-227",
      sourceUrl: "https://doi.org/10.1007/s10517-008-0006-0",
      publishedAt: "2008-02-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
