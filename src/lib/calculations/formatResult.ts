import type { DoseUnit } from "@/types/calculator";

/** Display precision for mL values */
const ML_DISPLAY_DECIMALS = 2;

/** Display precision for concentration values */
const CONCENTRATION_DISPLAY_DECIMALS = 2;

/**
 * Formats a mL value for display (2 decimal places).
 */
export function formatMl(value: number): string {
  const formatted = value.toFixed(ML_DISPLAY_DECIMALS);
  if (formatted === "0.00" && value > 0) {
    return "< 0.01";
  }
  return formatted;
}

/**
 * Formats syringe units for display (whole numbers).
 */
export function formatSyringeUnits(value: number): string {
  const rounded = Math.round(value);
  if (rounded === 0 && value > 0) {
    return "< 1";
  }
  return rounded.toString();
}

/**
 * Formats a concentration value for display.
 */
export function formatConcentration(value: number, unit: DoseUnit): string {
  return `${value.toFixed(CONCENTRATION_DISPLAY_DECIMALS)} ${unit}/mL`;
}

/**
 * Formats a dose value with its unit.
 */
export function formatDose(value: number, unit: DoseUnit): string {
  if (unit === "mcg") {
    return `${value} mcg`;
  }
  return `${value} mg`;
}
