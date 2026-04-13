import type { Stack } from "@/types/stack";

export const ghMuscle: Stack = {
  id: "gh-muscle",
  slug: "gh-muscle",
  name: "GH / Muscle Growth Stack",
  category: "growth",
  evidenceLevel: "community",
  summary:
    "CJC-1295 (no DAC) + Ipamorelin for synergistic pulsatile GH release. Optional Tesamorelin.",
  rationale:
    "Synergistic pulsatile GH release. CJC-1295 (no DAC) extends pulse duration while Ipamorelin provides selective GH secretion without elevating cortisol/prolactin. Tesamorelin optional as additional GHRH analog.",
  compounds: [
    {
      compoundId: "cjc-1295-no-dac",
      role: "GHRH pulse extension",
      dosing: "100 mcg SC before bed",
    },
    {
      compoundId: "ipamorelin",
      role: "Selective GH release",
      dosing: "100-200 mcg SC before bed (same syringe)",
    },
    {
      compoundId: "tesamorelin",
      role: "Additional GHRH (optional)",
      dosing: "2 mg daily SC (if adding)",
    },
  ],
  protocol: {
    duration: "12-16 weeks",
    cycling: "12-16 weeks on, 4-8 weeks off",
    timing: "Inject CJC + Ipamorelin together SC ~30 min before bed",
  },
  evidenceDisclaimer:
    "Community-derived protocol. No clinical trials exist for this combination. For research and educational purposes only.",
  citations: [
    {
      id: "ghm-ipa",
      label: "Raun 1998",
      title: "Ipamorelin Characterization",
      source: "Eur J Endocrinol, 139(5)",
      lastReviewedAt: "2026-04-12",
    },
    {
      id: "ghm-cjc",
      label: "Ionescu 2006",
      title: "CJC-1295 GHRH Analog",
      source: "Growth Hormone & IGF Research, 16(S1)",
      lastReviewedAt: "2026-04-12",
    },
  ],
};
