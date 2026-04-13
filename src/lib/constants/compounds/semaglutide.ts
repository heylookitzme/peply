import type { Compound } from "@/types/content";

export const semaglutide: Compound = {
  id: "semaglutide",
  slug: "semaglutide",
  name: "Semaglutide",
  aliases: ["Ozempic", "Wegovy", "Rybelsus"],
  category: "glp1",
  approvalStatus: "approved",
  summary:
    "GLP-1 receptor agonist for type 2 diabetes and chronic weight management. Originally marketed as Ozempic (diabetes) and Wegovy (obesity).",
  mechanism:
    "Mimics GLP-1 to enhance insulin secretion, suppress glucagon, slow gastric emptying, and reduce appetite via hypothalamic signaling.",
  halfLife: "Approximately 1 week (168 hours)",
  manufacturer: "Novo Nordisk",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 0.25,
    max: 2.4,
    unit: "mg",
    frequency: "weekly",
    frequencyLabel: "Once weekly",
  },
  titrationProtocols: [
    {
      name: "Wegovy Label Titration",
      source: "Wegovy (semaglutide) prescribing information, Novo Nordisk, 2021",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
      steps: [
        { dose: 0.25, unit: "mg", durationWeeks: 4, notes: "Starting dose" },
        { dose: 0.5, unit: "mg", durationWeeks: 4, notes: "First escalation" },
        { dose: 1.0, unit: "mg", durationWeeks: 4, notes: "Second escalation" },
        { dose: 1.7, unit: "mg", durationWeeks: 4, notes: "Third escalation" },
        { dose: 2.4, unit: "mg", durationWeeks: 0, notes: "Maintenance dose" },
      ],
    },
    {
      name: "Ozempic Label Titration",
      source: "Ozempic (semaglutide) prescribing information, Novo Nordisk, 2017",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/209637lbl.pdf",
      steps: [
        { dose: 0.25, unit: "mg", durationWeeks: 4, notes: "Starting dose" },
        { dose: 0.5, unit: "mg", durationWeeks: 4, notes: "First escalation" },
        { dose: 1.0, unit: "mg", durationWeeks: 0, notes: "Maintenance (may increase to 2 mg)" },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "approved",
    reclassificationStatus: "stable",
    fdaCategory: "FDA-approved (BLA 215256 / NDA 209637)",
    lastUpdated: "2024-01-01",
  },
  citations: [
    {
      id: "sema-wegovy-label",
      label: "Wegovy PI",
      title: "Wegovy (semaglutide) injection, for subcutaneous use - Prescribing Information",
      source: "FDA / Novo Nordisk",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
      publishedAt: "2021-06-04",
      lastReviewedAt: "2024-01-01",
    },
    {
      id: "sema-step1",
      label: "STEP 1 Trial",
      title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
      source: "New England Journal of Medicine, 384(11), 989-1002",
      sourceUrl: "https://doi.org/10.1056/NEJMoa2032183",
      publishedAt: "2021-02-10",
      lastReviewedAt: "2024-01-01",
    },
  ],
};
