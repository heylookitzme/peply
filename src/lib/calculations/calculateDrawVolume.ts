import type { DoseUnit } from "@/types/calculator";
import { convertDoseUnit } from "./convertDoseUnit";

/**
 * Calculates the volume of reconstituted solution to draw for a target dose.
 *
 * drawVolumeMl = targetDose / concentrationPerMl
 *
 * If target dose unit differs from concentration unit, converts first.
 */
export function calculateDrawVolume(
  targetDose: number,
  targetDoseUnit: DoseUnit,
  concentrationPerMl: number,
  concentrationUnit: DoseUnit,
): number {
  if (concentrationPerMl <= 0) {
    throw new Error("Concentration must be greater than zero");
  }
  if (targetDose <= 0) {
    throw new Error("Target dose must be greater than zero");
  }

  const normalizedDose = convertDoseUnit(
    targetDose,
    targetDoseUnit,
    concentrationUnit,
  );

  return normalizedDose / concentrationPerMl;
}
