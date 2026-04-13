import type { Compound } from "@/types/content";

export const retatrutide: Compound = {
  id: "retatrutide",
  slug: "retatrutide",
  name: "Retatrutide",
  aliases: ["LY3437943"],
  category: "triple-agonist",
  approvalStatus: "investigational",
  summary:
    "Investigational triple-agonist targeting GIP, GLP-1, and glucagon receptors. In Phase 3 clinical trials (TRIUMPH program) by Eli Lilly for obesity and type 2 diabetes.",
  mechanism:
    "Activates three receptors simultaneously: GIP (enhances insulin), GLP-1 (suppresses appetite, slows gastric emptying), and glucagon (increases energy expenditure and hepatic fat oxidation). The glucagon component distinguishes it from dual agonists.",
  halfLife: "Approximately 6 days (144 hours)",
  manufacturer: "Eli Lilly",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 2,
    max: 12,
    unit: "mg",
    frequency: "weekly",
    frequencyLabel: "Once weekly",
  },
  titrationProtocols: [
    {
      name: "Phase 2 Trial Titration (12 mg arm)",
      source: "Jastreboff et al., NEJM 2023 — Triple-Hormone-Receptor Agonist Retatrutide for Obesity",
      sourceUrl: "https://doi.org/10.1056/NEJMoa2301972",
      steps: [
        { dose: 2, unit: "mg", durationWeeks: 4, notes: "Starting dose" },
        { dose: 4, unit: "mg", durationWeeks: 4, notes: "First escalation" },
        { dose: 6, unit: "mg", durationWeeks: 4, notes: "Second escalation" },
        { dose: 8, unit: "mg", durationWeeks: 4, notes: "Third escalation" },
        { dose: 10, unit: "mg", durationWeeks: 4, notes: "Fourth escalation" },
        { dose: 12, unit: "mg", durationWeeks: 0, notes: "Target dose" },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "investigational",
    reclassificationStatus: "stable",
    fdaCategory: "Investigational (Phase 3)",
    lastUpdated: "2024-06-01",
    sourcingNote:
      "Not FDA-approved. Available only through clinical trials or research supply. Phase 3 results expected 2025-2026.",
  },
  citations: [
    {
      id: "reta-phase2",
      label: "Phase 2 Trial",
      title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
      source: "New England Journal of Medicine, 389(6), 514-526",
      sourceUrl: "https://doi.org/10.1056/NEJMoa2301972",
      publishedAt: "2023-06-26",
      lastReviewedAt: "2024-06-01",
    },
    {
      id: "reta-triumph",
      label: "TRIUMPH Program",
      title: "A Study of Retatrutide (LY3437943) in Participants With Obesity (TRIUMPH-3)",
      source: "ClinicalTrials.gov NCT05929066",
      sourceUrl: "https://clinicaltrials.gov/study/NCT05929066",
      publishedAt: "2023-07-01",
      lastReviewedAt: "2024-06-01",
    },
  ],
};
