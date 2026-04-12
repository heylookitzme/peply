import type { CalculatorInput, CalculatorResult } from "@/types/calculator";
import { calculatorInputSchema } from "@/lib/validation/calculatorSchema";
import { calculateConcentration } from "./calculateConcentration";
import { calculateDrawVolume } from "./calculateDrawVolume";
import { calculateSyringeUnits } from "./calculateSyringeUnits";
import { evaluateWarnings } from "./evaluateWarnings";

/**
 * Performs the full reconstitution calculation pipeline:
 * 1. Validates input
 * 2. Calculates concentration
 * 3. Calculates draw volume
 * 4. Converts to syringe units
 * 5. Evaluates warnings
 */
export function calculate(input: CalculatorInput): CalculatorResult {
  const parsed = calculatorInputSchema.parse(input);

  const concentration = calculateConcentration(
    parsed.vialAmount,
    parsed.vialAmountUnit,
    parsed.diluentVolumeMl,
  );

  const drawVolumeMl = calculateDrawVolume(
    parsed.targetDose,
    parsed.targetDoseUnit,
    concentration.concentrationPerMl,
    concentration.unit,
  );

  const syringeUnits = calculateSyringeUnits(drawVolumeMl, parsed.syringeType);

  const warnings = evaluateWarnings({
    drawVolumeMl,
    syringeUnits,
    syringeType: parsed.syringeType,
    concentrationPerMl: concentration.concentrationPerMl,
    diluentVolumeMl: parsed.diluentVolumeMl,
  });

  return {
    concentrationPerMl: concentration.concentrationPerMl,
    concentrationUnit: concentration.unit,
    drawVolumeMl,
    syringeUnits,
    warnings,
  };
}
