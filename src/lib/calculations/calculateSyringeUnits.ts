import type { SyringeType } from "@/types/calculator";
import { SYRINGE_TYPES } from "@/types/calculator";

/**
 * Converts a draw volume in mL to syringe units for a given syringe type.
 *
 * syringeUnits = drawVolumeMl * (totalUnits / totalMl)
 *
 * For insulin syringes, 1 mL = 100 units on a U-100 syringe.
 */
export function calculateSyringeUnits(
  drawVolumeMl: number,
  syringeType: SyringeType,
): number {
  if (drawVolumeMl < 0) {
    throw new Error("Draw volume cannot be negative");
  }

  const syringe = SYRINGE_TYPES[syringeType];
  const unitsPerMl = syringe.totalUnits / syringe.totalMl;

  return drawVolumeMl * unitsPerMl;
}
