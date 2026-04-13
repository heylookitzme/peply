import type { Stack } from "@/types/stack";

export const metabolicFatLoss: Stack = {
  id: "metabolic-fat-loss",
  slug: "metabolic-fat-loss",
  name: "Metabolic / Fat-Loss Stack",
  category: "metabolic",
  evidenceLevel: "community",
  summary:
    "GLP-1 agonist + 5-Amino-1MQ for appetite control combined with cellular fat oxidation. Optional AOD-9604.",
  rationale:
    "GLP-1 pathway (appetite/insulin control) + NNMT inhibition (cellular fat oxidation and NAD+ support). AOD-9604 optional for additional lipolysis without affecting GH/IGF-1.",
  compounds: [
    {
      compoundId: "semaglutide",
      role: "Appetite suppression & insulin control",
      dosing: "Follow Wegovy titration schedule",
    },
    {
      compoundId: "5-amino-1mq",
      role: "NNMT inhibition & fat oxidation",
      dosing: "50-150 mg oral daily (or 150-250 mcg SC)",
    },
    {
      compoundId: "aod-9604",
      role: "Additional lipolysis (optional)",
      dosing: "250-300 mcg daily SC",
    },
  ],
  protocol: {
    duration: "16+ weeks",
    cycling:
      "Follow GLP-1 titration; introduce 5-Amino-1MQ once stable on GLP-1 dose",
    notes:
      "GLP-1 is the primary compound; 5-Amino-1MQ adds metabolic support",
  },
  evidenceDisclaimer:
    "Community-derived protocol. No clinical trials exist for this combination. For research and educational purposes only.",
  citations: [
    {
      id: "mfl-sema",
      label: "Wilding 2021 (STEP 1)",
      title: "Semaglutide for Obesity",
      source: "NEJM, 384(11)",
      lastReviewedAt: "2026-04-12",
    },
    {
      id: "mfl-5a1mq",
      label: "Neelakantan 2018",
      title: "NNMT Inhibitors in Obesity",
      source: "Biochem Pharmacol, 147",
      lastReviewedAt: "2026-04-12",
    },
  ],
};
