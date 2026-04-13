import type { Compound, DoseRange } from "@/types/content";

export function formatDoseRange(range: DoseRange): string {
  const value =
    range.min === range.max
      ? `${range.min}`
      : `${range.min}-${range.max}`;
  return `${value} ${range.unit}`;
}

/** Short name overrides for the calculator dropdown. Full names stay on detail pages. */
const DROPDOWN_NAMES: Record<string, string> = {
  "dsip": "DSIP",
  "mots-c": "MOTS-C",
  "cjc-1295-no-dac": "CJC-1295 (no DAC)",
  "kpv": "KPV",
};

/**
 * Formats a dose range normalized to mg for dropdown display.
 * Kisspeptin-10 is excluded (weight-based mcg dosing).
 */
function formatDoseRangeMg(range: DoseRange, slug: string): string {
  let min = range.min;
  let max = range.max;
  let unit = range.unit;

  if (unit === "mcg" && slug !== "kisspeptin-10") {
    min = min / 1000;
    max = max / 1000;
    unit = "mg";
  }

  const value = min === max ? `${min}` : `${min}-${max}`;
  return `${value} ${unit}`;
}

/** Builds a compact, scannable label for the compound selector dropdown. */
export function formatDropdownLabel(compound: Compound): string {
  const name = DROPDOWN_NAMES[compound.slug] ?? compound.name;
  return `${name} (${formatDoseRangeMg(compound.clinicalDoseRange, compound.slug)})`;
}
