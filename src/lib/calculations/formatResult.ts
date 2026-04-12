import type { DoseUnit } from "@/types/calculator";

/** Display precision for mL values */
const ML_DISPLAY_DECIMALS = 2;

/** Display precision for concentration values */
const CONCENTRATION_DISPLAY_DECIMALS = 2;

/**
 * Formats a mL value for display (2 decimal places).
 */
export function formatMl(value: number): string {
  return value.toFixed(ML_DISPLAY_DECIMALS);
}

/**
 * Formats syringe units for display (whole numbers).
 */
export function formatSyringeUnits(value: number): string {
  return Math.round(value).toString();
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
