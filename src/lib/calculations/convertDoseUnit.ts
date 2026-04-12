import type { DoseUnit } from "@/types/calculator";

/**
 * Converts a dose value between mg and mcg.
 * 1 mg = 1000 mcg
 */
export function convertDoseUnit(
  value: number,
  fromUnit: DoseUnit,
  toUnit: DoseUnit,
): number {
  if (fromUnit === toUnit) return value;
  if (fromUnit === "mg" && toUnit === "mcg") return value * 1000;
  if (fromUnit === "mcg" && toUnit === "mg") return value / 1000;
  return value;
}

/**
 * Normalizes a dose value to mg for internal calculations.
 */
export function normalizeToMgInternal(value: number, unit: DoseUnit): number {
  return unit === "mcg" ? value / 1000 : value;
}

/**
 * Normalizes a dose value to mcg for internal calculations.
 */
export function normalizeToMcg(value: number, unit: DoseUnit): number {
  return unit === "mg" ? value * 1000 : value;
}
