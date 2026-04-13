import type { Stack } from "@/types/stack";

export const glow: Stack = {
  id: "glow",
  slug: "glow",
  name: "Glow Stack",
  category: "recovery",
  evidenceLevel: "community",
  summary:
    "BPC-157 + TB-500 + GHK-Cu for tissue repair with enhanced collagen synthesis and skin healing.",
  rationale:
    "Wolverine base + GHK-Cu for enhanced collagen synthesis, extracellular matrix remodeling, and skin/wound healing benefits.",
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
    {
      compoundId: "ghk-cu",
      role: "Collagen synthesis & skin repair",
      dosing: "1-2 mg daily SC",
    },
  ],
  protocol: {
    duration: "8-12 weeks",
    cycling: "8-12 weeks on, 4-8 weeks off",
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
    {
      id: "glow-ghk",
      label: "Pickart 2012",
      title: "GHK-Cu Review",
      source: "Int J Mol Sci, 13(12)",
      lastReviewedAt: "2026-04-12",
    },
  ],
};
