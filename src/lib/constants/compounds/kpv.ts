import type { Compound } from "@/types/content";

export const kpv: Compound = {
  id: "kpv",
  slug: "kpv",
  name: "KPV (Lys-Pro-Val)",
  aliases: ["Lysine-Proline-Valine", "Alpha-MSH Fragment"],
  category: "longevity-immune",
  approvalStatus: "research",
  summary:
    "Anti-inflammatory tripeptide fragment of alpha-MSH researched for gut and mucosal immune modulation. Not FDA-approved for any indication.",
  mechanism:
    "C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone (alpha-MSH). Potent anti-inflammatory activity via NF-kB inhibition and PGE2 reduction. Modulates gut inflammation and mucosal immune response.",
  halfLife: "Estimated 30-60 minutes",
  manufacturer: "Research peptide (multiple suppliers)",
  defaultRoute: "subcutaneous",
  commonVialSizes: [
    { amount: 5, unit: "mg", label: "5 mg vial" },
    { amount: 10, unit: "mg", label: "10 mg vial" },
  ],
  defaultBacWaterMl: 2,
  clinicalDoseRange: {
    min: 200,
    max: 500,
    unit: "mcg",
    frequency: "daily",
    frequencyLabel: "Once daily",
  },
  titrationProtocols: [
    {
      name: "Research Protocol",
      source: "Brzoska et al., Endocrine Reviews, 2008",
      sourceUrl: "https://doi.org/10.1210/er.2007-0029",
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
    fdaCategory: "Research peptide (FDA Category 2)",
    dateRestricted: "2023-09-29",
    dateAnnouncedReturn: "2026-02-27",
    lastUpdated: "2026-02-27",
    sourcingNote:
      "Not FDA-approved. Research focus on inflammatory bowel conditions. Currently FDA Category 2 (restricted). Pending return to Category 1.",
  },
  citations: [
    {
      id: "kpv-inflammation",
      label: "Brzoska 2008",
      title:
        "Alpha-MSH and Related Tripeptides: Biochemistry, Anti-Inflammatory and Protective Effects",
      source: "Endocrine Reviews, 29(5), 581-602",
      publishedAt: "2008-08-01",
      lastReviewedAt: "2026-02-27",
    },
  ],
};
