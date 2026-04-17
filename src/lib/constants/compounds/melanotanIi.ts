import type { Compound } from "@/types/content";

export const melanotanIi: Compound = {
  id: "melanotan-ii",
  slug: "melanotan-ii",
  name: "Melanotan II",
  aliases: ["MT-II", "Melanotan 2"],
  category: "neuropeptide",
  approvalStatus: "research",
  summary:
    "Synthetic cyclic α-MSH analog and non-selective melanocortin receptor agonist investigated for melanogenesis and effects on appetite, libido, and inflammation. Not FDA-approved for any indication.",
  mechanism:
    "Synthetic cyclic peptide analog of α-melanocyte-stimulating hormone (α-MSH). Non-selective agonist of melanocortin receptors (MC1R, MC3R, MC4R, MC5R). Stimulates melanogenesis via MC1R, affects appetite, libido, and inflammation through other melanocortin pathways.",
  halfLife: "Approximately 1-2 hours",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 0.25,
    max: 1,
    unit: "mg",
    frequency: "daily",
    frequencyLabel: "Once daily (community-derived, highly variable)",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Community-derived dose range. Original Phase I human study (Dorr 1996) used 0.01-0.03 mg/kg single SC doses. No established chronic dosing schedule.",
  titrationProtocols: [
    {
      name: "Research Reference Range",
      source: "Dorr et al., Life Sciences, 1996 (Phase I pilot)",
      sourceUrl: "https://doi.org/10.1016/0024-3205(96)00160-9",
      steps: [
        {
          dose: 250,
          unit: "mcg",
          durationWeeks: 0,
          notes:
            "Representative low-end community starting dose. Highly variable in practice.",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "cat2",
    reclassificationStatus: "removed-from-cat2",
    fdaCategory:
      "Previously placed in Category 2 (Sept 2023). Removed from Category 2 following April 15, 2026 announcement. Scheduled for PCAC review before end of February 2027.",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    dateAnnouncedRemoval: "2026-04-15",
    lastUpdated: "2026-04-16",
    sourcingNote:
      "Not FDA-approved. Health authorities have historically warned against unregulated use due to side effects (nausea, flushing, mole darkening, priapism) and unknown long-term risks including potential for skin cancer promotion from melanocyte stimulation.",
  },
  citations: [
    {
      id: "mt2-dorr-1996",
      label: "Dorr 1996",
      title:
        "Evaluation of Melanotan-II, a Superpotent Cyclic Melanotropic Peptide in a Pilot Phase-I Clinical Study",
      source: "Life Sciences, 58(20), 1777-1784",
      sourceUrl: "https://doi.org/10.1016/0024-3205(96)00160-9",
      publishedAt: "1996-04-12",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
