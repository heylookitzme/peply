import type { DoseUnit } from "@/types/calculator";

export interface ConcentrationResult {
  concentrationPerMl: number;
  unit: DoseUnit;
}

/**
 * Calculates concentration given a vial amount and diluent volume.
 *
 * concentration = vialAmount / diluentVolumeMl
 *
 * Returns concentration in the same unit as the vial amount (mg/mL or mcg/mL).
 */
export function calculateConcentration(
  vialAmount: number,
  vialAmountUnit: DoseUnit,
  diluentVolumeMl: number,
): ConcentrationResult {
  if (diluentVolumeMl <= 0) {
    throw new Error("Diluent volume must be greater than zero");
  }
  if (vialAmount <= 0) {
    throw new Error("Vial amount must be greater than zero");
  }

  return {
    concentrationPerMl: vialAmount / diluentVolumeMl,
    unit: vialAmountUnit,
  };
}
