import type { Compound } from "@/types/content";

export const tirzepatide: Compound = {
  id: "tirzepatide",
  slug: "tirzepatide",
  name: "Tirzepatide",
  aliases: ["Mounjaro", "Zepbound"],
  category: "dual-agonist",
  approvalStatus: "approved",
  summary:
    "Dual GIP/GLP-1 receptor agonist for type 2 diabetes and chronic weight management. Marketed as Mounjaro (diabetes) and Zepbound (obesity).",
  mechanism:
    "Activates both GIP and GLP-1 receptors, enhancing insulin secretion, suppressing glucagon, slowing gastric emptying, and reducing appetite through complementary incretin pathways.",
  halfLife: "Approximately 5 days (120 hours)",
  manufacturer: "Eli Lilly",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
    { amount: 15, unit: "mg", label: "15 mg vial" },
    { amount: 30, unit: "mg", label: "30 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 2.5,
    max: 15,
    unit: "mg",
    frequency: "weekly",
    frequencyLabel: "Once weekly",
  },
  titrationProtocols: [
    {
      name: "Mounjaro Label Titration",
      source: "Mounjaro (tirzepatide) prescribing information, Eli Lilly, 2022",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf",
      steps: [
        { dose: 2.5, unit: "mg", durationWeeks: 4, notes: "Starting dose" },
        { dose: 5, unit: "mg", durationWeeks: 4, notes: "First escalation" },
        { dose: 7.5, unit: "mg", durationWeeks: 4, notes: "Second escalation" },
        { dose: 10, unit: "mg", durationWeeks: 4, notes: "Third escalation" },
        { dose: 12.5, unit: "mg", durationWeeks: 4, notes: "Fourth escalation" },
        { dose: 15, unit: "mg", durationWeeks: 0, notes: "Maximum dose" },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "approved",
    reclassificationStatus: "stable",
    fdaCategory: "FDA-approved (NDA 215866)",
    lastUpdated: "2024-01-01",
  },
  citations: [
    {
      id: "tirz-mounjaro-label",
      label: "Mounjaro PI",
      title: "Mounjaro (tirzepatide) injection, for subcutaneous use - Prescribing Information",
      source: "FDA / Eli Lilly",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf",
      publishedAt: "2022-05-13",
      lastReviewedAt: "2024-01-01",
    },
    {
      id: "tirz-surmount1",
      label: "SURMOUNT-1 Trial",
      title: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
      source: "New England Journal of Medicine, 387(3), 205-216",
      sourceUrl: "https://doi.org/10.1056/NEJMoa2206038",
      publishedAt: "2022-06-04",
      lastReviewedAt: "2024-01-01",
    },
  ],
};
