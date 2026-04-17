import type { Compound } from "@/types/content";

export const ll37: Compound = {
  id: "ll-37",
  slug: "ll-37",
  name: "LL-37",
  aliases: ["Cathelicidin", "hCAP-18", "LL-37 Cathelicidin"],
  category: "longevity-immune",
  approvalStatus: "research",
  summary:
    "Sole human cathelicidin antimicrobial peptide investigated for broad-spectrum antimicrobial activity, immune modulation, and wound healing. Not FDA-approved as a drug.",
  mechanism:
    "The only known human cathelicidin antimicrobial peptide. 37-amino-acid peptide naturally produced by neutrophils, epithelial cells, and other immune cells. Exhibits broad-spectrum antimicrobial activity by disrupting microbial membranes. Functions as an \"alarmin,\" modulating immune responses, promoting wound healing, angiogenesis, and chemotaxis of immune cells.",
  halfLife: "Short — proteolytic instability limits in vivo half-life",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 100,
    max: 500,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily (community-derived, highly variable)",
  },
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence. Topical formulations have stronger clinical evidence (wound healing) than systemic injection.",
  titrationProtocols: [
    {
      name: "Research Reference Range",
      source: "Vandamme et al., Cellular Immunology, 2012 (review)",
      sourceUrl: "https://doi.org/10.1016/j.cellimm.2012.11.009",
      steps: [
        {
          dose: 100,
          unit: "mcg",
          durationWeeks: 0,
          notes:
            "Representative low-end community starting dose. Topical use is better characterized than systemic use.",
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
      "Not FDA-approved as a drug. Cited concerns include cytotoxicity at high concentrations, immunogenicity, and possible protumorigenic effects in certain contexts. Topical formulations appear better tolerated than systemic use in available data.",
  },
  citations: [
    {
      id: "ll37-vandamme-2012",
      label: "Vandamme 2012",
      title:
        "A Comprehensive Summary of LL-37, the Factotum Human Cathelicidin Peptide",
      source: "Cellular Immunology, 280(1), 22-35",
      sourceUrl: "https://doi.org/10.1016/j.cellimm.2012.11.009",
      publishedAt: "2012-11-01",
      lastReviewedAt: "2026-04-16",
    },
  ],
};
