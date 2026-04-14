import type { Compound } from "@/types/content";

// GLP-1 / Incretin Agonists
import { semaglutide } from "./semaglutide";
import { tirzepatide } from "./tirzepatide";
import { retatrutide } from "./retatrutide";

// Growth Hormone
import { tesamorelin } from "./tesamorelin";

// Growth & Recovery
import { bpc157 } from "./bpc157";
import { tb500 } from "./tb500";
import { ghkcu } from "./ghkcu";
import { aod9604 } from "./aod9604";
import { thymosinAlpha1 } from "./thymosinAlpha1";

// GH Secretagogues
import { ipamorelin } from "./ipamorelin";
import { cjc1295nodac } from "./cjc1295nodac";
import { cjc1295dac } from "./cjc1295dac";
import { sermorelin } from "./sermorelin";
import { mk677 } from "./mk677";

// Neuropeptides
import { semax } from "./semax";
import { selank } from "./selank";
import { dsip } from "./dsip";
import { ptBremelanotide } from "./ptBremelanotide";

// Longevity & Immune
import { epitalon } from "./epitalon";
import { motsc } from "./motsc";
import { kpv } from "./kpv";
import { kisspeptin10 } from "./kisspeptin10";

// Metabolic
import { fiveAmino1mq } from "./fiveAmino1mq";

// Additional Growth & Recovery
import { igf1lr3 } from "./igf1lr3";

export const COMPOUNDS: readonly Compound[] = [
  semaglutide,
  tirzepatide,
  retatrutide,
  tesamorelin,
  bpc157,
  tb500,
  ghkcu,
  aod9604,
  thymosinAlpha1,
  ipamorelin,
  cjc1295nodac,
  cjc1295dac,
  sermorelin,
  mk677,
  semax,
  selank,
  dsip,
  ptBremelanotide,
  epitalon,
  motsc,
  kpv,
  kisspeptin10,
  // Metabolic
  fiveAmino1mq,
  // Additional Growth & Recovery
  igf1lr3,
] as const;

export function getCompoundBySlug(slug: string): Compound | undefined {
  return COMPOUNDS.find((c) => c.slug === slug);
}

export function getCompoundById(id: string): Compound | undefined {
  return COMPOUNDS.find((c) => c.id === id);
}

export {
  semaglutide,
  tirzepatide,
  retatrutide,
  tesamorelin,
  bpc157,
  tb500,
  ghkcu,
  aod9604,
  thymosinAlpha1,
  ipamorelin,
  cjc1295nodac,
  cjc1295dac,
  sermorelin,
  mk677,
  semax,
  selank,
  dsip,
  ptBremelanotide,
  epitalon,
  motsc,
  kpv,
  kisspeptin10,
  fiveAmino1mq,
  igf1lr3,
};
