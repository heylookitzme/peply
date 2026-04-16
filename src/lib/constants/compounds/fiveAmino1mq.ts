import type { Compound } from "@/types/content";

export const fiveAmino1mq: Compound = {
  id: "5-amino-1mq",
  slug: "5-amino-1mq",
  name: "5-Amino-1MQ",
  aliases: ["5-amino-1-methylquinolinium"],
  category: "metabolic",
  approvalStatus: "research",
  summary:
    "Small molecule NNMT inhibitor (not a peptide). Promotes fat oxidation, NAD+ synthesis, and mitochondrial biogenesis by selectively blocking nicotinamide N-methyltransferase.",
  mechanism:
    "Selectively inhibits nicotinamide N-methyltransferase (NNMT), preserving nicotinamide for NAD+ synthesis, activating SIRT1 pathways, promoting mitochondrial biogenesis, and enhancing fat oxidation. Note: This is a small molecule, not a peptide.",
  halfLife:
    "Estimated 4-7 hours (preclinical mouse PK data; ~5.7h reported in one study)",
  manufacturer: "Research compound (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 10, unit: "mg", label: "10 mg vial" },
    { amount: 50, unit: "mg", label: "50 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 150,
    max: 500,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily SC (oral: 50-150 mg/day)",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "Dosing extrapolated from animal studies and community protocols. No large-scale human clinical trials. Oral route (50-150 mg daily) is primary in community/clinic use; SC route shown here for calculator purposes.",
  titrationProtocols: [
    {
      name: "SC Research Protocol",
      source:
        "Community protocol based on Neelakantan et al., Biochemical Pharmacology, 2018",
      sourceUrl: "https://doi.org/10.1016/j.bcp.2018.07.007",
      steps: [
        {
          dose: 150,
          unit: "mcg",
          durationWeeks: 2,
          notes: "Starting SC dose",
        },
        {
          dose: 250,
          unit: "mcg",
          durationWeeks: 0,
          notes:
            "Standard SC dose. Typical cycles: 8-12 weeks on, 4 weeks off",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "cat1",
    reclassificationStatus: "stable",
    fdaCategory:
      "Research compound (small molecule, not on FDA peptide category lists)",
    lastUpdated: "2026-02-27",
    sourcingNote:
      "Not FDA-approved. Small molecule NNMT inhibitor, not classified as a peptide. Not subject to FDA Cat 1/Cat 2 peptide restrictions. Oral administration (50-150 mg daily) is the more common route in research settings.",
  },
  citations: [
    {
      id: "5a1mq-neelakantan",
      label: "Neelakantan 2018",
      title:
        "Selective and Membrane-Permeable Small Molecule Inhibitors of NNMT Reverse High-Fat-Diet-Induced Obesity in Mice",
      source: "Biochemical Pharmacology, 147, 141-152",
      sourceUrl: "https://doi.org/10.1016/j.bcp.2018.07.007",
      publishedAt: "2018-01-01",
      lastReviewedAt: "2026-04-12",
    },
    {
      id: "5a1mq-kraus",
      label: "Kraus 2014",
      title:
        "Nicotinamide N-methyltransferase Knockdown Protects Against Diet-Induced Obesity",
      source: "Nature Medicine, 20(6), 608-614",
      sourceUrl: "https://doi.org/10.1038/nm.3608",
      publishedAt: "2014-06-01",
      lastReviewedAt: "2026-04-12",
    },
  ],
};
