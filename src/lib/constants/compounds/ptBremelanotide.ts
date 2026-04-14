import type { Compound } from "@/types/content";

export const ptBremelanotide: Compound = {
  id: "pt-141",
  slug: "pt-141",
  name: "PT-141",
  aliases: ["Bremelanotide", "Vyleesi"],
  category: "neuropeptide",
  approvalStatus: "approved",
  summary:
    "Melanocortin-4 receptor agonist approved by the FDA in 2019 as Vyleesi for hypoactive sexual desire disorder (HSDD) in premenopausal women. Acts centrally on nervous system pathways rather than on the vascular system.",
  mechanism:
    "Synthetic cyclic heptapeptide, non-selective melanocortin receptor agonist with preferential activity at MC4R. Activates central nervous system pathways involved in sexual arousal. Does not act on PDE5 or the vasculature.",
  halfLife: "~2.7 hours (Vyleesi label)",
  manufacturer: "Palatin Technologies (Vyleesi)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 1.75,
    max: 1.75,
    unit: "mg",
    frequency: "other",
    frequencyLabel: "As needed, max 1 dose per 24 h",
  },
  dosingEvidenceNote:
    "FDA-approved dose: 1.75 mg SC as needed, at least 45 minutes before anticipated sexual activity. Maximum one dose per 24 hours, not more than 8 doses per month (Vyleesi label).",
  titrationProtocols: [
    {
      name: "Vyleesi Label (HSDD, premenopausal women)",
      source: "Vyleesi (bremelanotide) Prescribing Information, FDA 2019",
      sourceUrl:
        "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf",
      steps: [
        {
          dose: 1.75,
          unit: "mg",
          durationWeeks: 0,
          notes:
            "SC as needed, ≥45 min before activity. Max 1 dose / 24 h, max 8 doses / month.",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "approved",
    reclassificationStatus: "stable",
    fdaCategory: "FDA-approved (Vyleesi, 2019) — HSDD in premenopausal women",
    lastUpdated: "2026-04-14",
    sourcingNote:
      "Approved product (Vyleesi) available by prescription. Not on FDA Category 2 list.",
  },
  citations: [
    {
      id: "pt141-vyleesi-label",
      label: "Vyleesi Prescribing Information",
      title: "Vyleesi (bremelanotide injection) — Prescribing Information",
      source: "FDA / Palatin Technologies",
      sourceUrl:
        "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf",
      publishedAt: "2019-06-21",
      lastReviewedAt: "2026-04-14",
    },
    {
      id: "pt141-kingsberg-2019",
      label: "Kingsberg 2019 (RECONNECT)",
      title:
        "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials",
      source: "Obstetrics & Gynecology, 134(5), 899-908",
      sourceUrl: "https://doi.org/10.1097/AOG.0000000000003500",
      publishedAt: "2019-11-01",
      lastReviewedAt: "2026-04-14",
    },
  ],
};
