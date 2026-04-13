import type { Compound } from "@/types/content";
import { semaglutide } from "./semaglutide";
import { tirzepatide } from "./tirzepatide";
import { retatrutide } from "./retatrutide";
import { tesamorelin } from "./tesamorelin";

export const COMPOUNDS: readonly Compound[] = [
  semaglutide,
  tirzepatide,
  retatrutide,
  tesamorelin,
] as const;

export function getCompoundBySlug(slug: string): Compound | undefined {
  return COMPOUNDS.find((c) => c.slug === slug);
}

export function getCompoundById(id: string): Compound | undefined {
  return COMPOUNDS.find((c) => c.id === id);
}

export { semaglutide, tirzepatide, retatrutide, tesamorelin };
