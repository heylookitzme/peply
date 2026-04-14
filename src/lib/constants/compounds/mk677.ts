import type { Compound } from "@/types/content";

export const mk677: Compound = {
  id: "mk-677",
  slug: "mk-677",
  name: "MK-677",
  aliases: ["Ibutamoren", "MK-0677"],
  category: "gh-secretagogue",
  approvalStatus: "research",
  summary:
    "Non-peptide, orally active growth hormone secretagogue. Mimics ghrelin at the GHS-R1a receptor to stimulate endogenous GH release. Investigational — not FDA-approved for any indication. Administered orally, so reconstitution calculations do not apply.",
  mechanism:
    "Non-peptide ghrelin mimetic. Agonist at the growth hormone secretagogue receptor (GHS-R1a). Increases pulsatile GH release and downstream IGF-1 without raising cortisol in most studies.",
  halfLife: "Approximately 24 hours",
  manufacturer: "Research compound (historical: Merck MK-0677)",
  defaultRoute: "oral",
  commonVialSizes: [
    { amount: 10, unit: "mg", label: "10 mg capsule" },
    { amount: 25, unit: "mg", label: "25 mg capsule" },
  ],
  defaultBacWaterMl: 0,
  clinicalDoseRange: {
    min: 10,
    max: 25,
    unit: "mg",
    frequency: "daily",
    frequencyLabel: "Once daily, oral",
  },
  dosingEvidence: "limited-human",
  dosingEvidenceNote:
    "Dosing based on small human studies or early-phase trials. Not established by Phase 3 evidence.",
  titrationProtocols: [
    {
      name: "Published Human Dosing",
      source: "Nass et al., Journal of Clinical Endocrinology & Metabolism, 2008",
      sourceUrl: "https://doi.org/10.1210/jc.2007-2234",
      steps: [
        {
          dose: 25,
          unit: "mg",
          durationWeeks: 0,
          notes:
            "Oral, once daily. Dose used across multiple published human trials.",
        },
      ],
    },
  ],
  regulatoryStatus: {
    currentCategory: "investigational",
    reclassificationStatus: "stable",
    fdaCategory:
      "Research compound (investigational). Not FDA-approved. Oral small molecule — not subject to the FDA peptide Category 2 restrictions.",
    lastUpdated: "2026-04-14",
    sourcingNote:
      "Not FDA-approved for any indication. As a non-peptide oral small molecule, it is not on the FDA peptide Category 2 list. Oral administration — reconstitution does not apply.",
  },
  citations: [
    {
      id: "mk677-nass-2008",
      label: "Nass 2008",
      title:
        "Effects of an Oral Ghrelin Mimetic on Body Composition and Clinical Outcomes in Healthy Older Adults: A Randomized Trial",
      source: "Journal of Clinical Endocrinology & Metabolism, 149(9), 601-611",
      sourceUrl: "https://doi.org/10.1210/jc.2007-2234",
      publishedAt: "2008-11-04",
      lastReviewedAt: "2026-04-14",
    },
    {
      id: "mk677-murphy-1998",
      label: "Murphy 1998",
      title:
        "MK-677, an Orally Active Growth Hormone Secretagogue, Reverses Diet-Induced Catabolism",
      source: "Journal of Clinical Endocrinology & Metabolism, 83(2), 320-325",
      sourceUrl: "https://doi.org/10.1210/jcem.83.2.4551",
      publishedAt: "1998-02-01",
      lastReviewedAt: "2026-04-14",
    },
  ],
};
