import type { Compound } from "@/types/content";

export const dihexaAcetate: Compound = {
  id: "dihexa-acetate",
  slug: "dihexa-acetate",
  name: "Dihexa Acetate",
  aliases: [
    "Dihexa",
    "Dihexa Acetate",
    "N-hexanoic-Tyr-Ile-(6)-amino hexanoic amide",
    "PNB-0408",
  ],
  category: "neuropeptide",
  approvalStatus: "research",
  summary:
    "Synthetic angiotensin IV-derived oligopeptide investigated as an HGF/c-Met activator with reported synaptogenic and procognitive activity in preclinical studies. Not FDA-approved for any indication.",
  mechanism:
    "Synthetic oligopeptide derived from angiotensin IV. Acts as a hepatocyte growth factor (HGF) mimetic and crosses the blood-brain barrier. Binds to and activates the c-Met receptor, promoting synaptogenesis, dendritic arborization, and neuronal repair. Reported to be more potent than BDNF in some in vitro synaptogenesis assays.",
  halfLife: "Limited human data — preclinical pharmacokinetic studies only",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "oral",
  commonVialSizes: [
    { amount: 10, unit: "mg", label: "10 mg vial" },
    { amount: 20, unit: "mg", label: "20 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 8,
    max: 45,
    unit: "mg",
    frequency: "daily",
    frequencyLabel: "Once daily (oral, community-derived)",
  },
  dosingEvidence: "preclinical",
  dosingEvidenceNote:
    "No established human clinical dose range. All human dosing is community-derived, extrapolated from rodent studies. Not validated by clinical trials.",
  titrationProtocols: [
    {
      name: "Research Reference Range",
      source:
        "Community-derived from preclinical work — McCoy et al., J Pharmacol Exp Ther, 2013",
      sourceUrl: "https://doi.org/10.1124/jpet.112.199497",
      steps: [
        {
          dose: 8,
          unit: "mg",
          durationWeeks: 0,
          notes:
            "Representative low-end community dose. No established human titration schedule.",
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
      "Not FDA-approved. Long-term safety, particularly regarding potential tumorigenic effects from c-Met activation, has not been established in humans. Human data is limited to anecdotal reports.",
  },
  citations: [
    {
      id: "dihexa-mccoy-2013",
      label: "McCoy 2013",
      title:
        "Evaluation of Metabolically Stabilized Angiotensin IV Analogs as Procognitive/Antidementia Agents",
      source:
        "Journal of Pharmacology and Experimental Therapeutics, 344(1), 141-154",
      sourceUrl: "https://doi.org/10.1124/jpet.112.199497",
      publishedAt: "2013-01-01",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
