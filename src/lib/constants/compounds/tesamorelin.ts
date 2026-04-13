import type { Compound } from "@/types/content";

export const tesamorelin: Compound = {
  id: "tesamorelin",
  slug: "tesamorelin",
  name: "Tesamorelin",
  aliases: ["Egrifta", "Egrifta SV"],
  category: "growth-hormone",
  approvalStatus: "approved",
  summary:
    "Growth hormone-releasing factor (GRF) analog approved for reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. Also used off-label as a growth hormone secretagogue.",
  mechanism:
    "Synthetic analog of human growth hormone-releasing factor (GRF 1-44). Binds to GRF receptors in the pituitary to stimulate endogenous growth hormone synthesis and release, preserving the pulsatile secretion pattern.",
  halfLife: "Approximately 26 minutes (terminal half-life of the peptide itself; GH effects last longer)",
  manufacturer: "Theratechnologies",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 2, unit: "mg", label: "2 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 2,
    max: 2,
    unit: "mg",
    frequency: "daily",
    frequencyLabel: "Once daily",
  },
  titrationProtocols: [
    {
      name: "Egrifta SV Label Dosing",
      source: "Egrifta SV (tesamorelin) prescribing information, Theratechnologies, 2019",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/022505s010lbl.pdf",
      steps: [
        { dose: 2, unit: "mg", durationWeeks: 0, notes: "Fixed daily dose, no titration required" },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "approved",
    reclassificationStatus: "stable",
    fdaCategory: "FDA-approved (NDA 022505)",
    lastUpdated: "2024-01-01",
    sourcingNote:
      "FDA-approved for HIV-associated lipodystrophy. Off-label use for GH optimization is not covered by the FDA indication.",
  },
  citations: [
    {
      id: "tesa-egrifta-label",
      label: "Egrifta SV PI",
      title: "Egrifta SV (tesamorelin for injection) - Prescribing Information",
      source: "FDA / Theratechnologies",
      sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/022505s010lbl.pdf",
      publishedAt: "2019-11-01",
      lastReviewedAt: "2024-01-01",
    },
    {
      id: "tesa-visceral-fat",
      label: "LIPO-010 Trial",
      title: "Effects of Tesamorelin on Visceral Fat in HIV-Infected Patients (LIPO-010)",
      source: "Journal of Clinical Endocrinology & Metabolism, 95(9), 4291-4304",
      sourceUrl: "https://doi.org/10.1210/jc.2010-0285",
      publishedAt: "2010-09-01",
      lastReviewedAt: "2024-01-01",
    },
  ],
};
