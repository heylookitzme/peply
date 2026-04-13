import type { Stack } from "@/types/stack";

export const wolverine: Stack = {
  id: "wolverine",
  slug: "wolverine",
  name: "Wolverine Stack",
  category: "recovery",
  evidenceLevel: "community",
  summary: "BPC-157 + TB-500 for accelerated tissue repair and recovery.",
  rationale:
    "Complementary tissue repair — BPC-157 drives local angiogenesis and growth factor modulation; TB-500 supports systemic actin-mediated cell migration and differentiation.",
  compounds: [
    {
      compoundId: "bpc-157",
      role: "Local tissue repair",
      dosing: "250-500 mcg daily SC (near injury site)",
    },
    {
      compoundId: "tb-500",
      role: "Systemic tissue repair",
      dosing: "2-5 mg 2x/week SC (loading), 1x/week (maintenance)",
    },
  ],
  protocol: {
    duration: "8-12 weeks",
    cycling: "8-12 weeks on, 4-8 weeks off",
    timing: "BPC-157 daily near injury; TB-500 spaced 2x/week",
  },
  evidenceDisclaimer:
    "Community-derived protocol. No clinical trials exist for this combination. For research and educational purposes only.",
  citations: [
    {
      id: "wolverine-bpc",
      label: "Sikiric 2018",
      title: "BPC 157 Review",
      source: "Current Pharmaceutical Design, 24(18)",
      lastReviewedAt: "2026-04-12",
    },
    {
      id: "wolverine-tb4",
      label: "Goldstein 2012",
      title: "Thymosin Beta-4 Review",
      source: "Expert Opinion on Biological Therapy, 12(1)",
      lastReviewedAt: "2026-04-12",
    },
  ],
};
