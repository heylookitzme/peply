import type {
  SyringeType,
  CalculatorWarning,
} from "@/types/calculator";
import { SYRINGE_TYPES } from "@/types/calculator";
import { formatMl } from "./formatResult";

/** Minimum draw volume (mL) below which measurement accuracy is unreliable */
const LOW_DRAW_VOLUME_THRESHOLD_ML = 0.05;

/** Syringe units below which measurement is unreliable on most syringes */
const LOW_SYRINGE_UNITS_THRESHOLD = 5;

/** Maximum fractional rounding loss before we warn */
const ROUNDING_LOSS_THRESHOLD = 0.1;

/**
 * Evaluates all applicable warnings for a given calculation result.
 * Warnings are deterministic and code-driven.
 */
export function evaluateWarnings(params: {
  drawVolumeMl: number;
  syringeUnits: number;
  syringeType: SyringeType;
  concentrationPerMl: number;
  diluentVolumeMl: number;
}): CalculatorWarning[] {
  const warnings: CalculatorWarning[] = [];
  const syringe = SYRINGE_TYPES[params.syringeType];

  // LOW_DRAW_VOLUME: draw volume is too small for accurate measurement
  if (params.drawVolumeMl < LOW_DRAW_VOLUME_THRESHOLD_ML) {
    warnings.push({
      code: "LOW_DRAW_VOLUME",
      severity: "warning",
      message: `Draw volume (${formatMl(params.drawVolumeMl)} mL) is very small. Measurement accuracy may be limited.`,
      recommendation:
        "Consider using less diluent to increase concentration, or use a smaller syringe for better precision.",
    });
  } else if (params.syringeUnits < LOW_SYRINGE_UNITS_THRESHOLD) {
    warnings.push({
      code: "LOW_DRAW_VOLUME",
      severity: "info",
      message: `Draw is only ${Math.round(params.syringeUnits)} units on this syringe. A smaller syringe may improve precision.`,
      recommendation: "Consider a smaller syringe for more readable markings.",
    });
  }

  // SYRINGE_OVERFLOW: draw exceeds syringe capacity
  if (params.drawVolumeMl > syringe.totalMl) {
    warnings.push({
      code: "SYRINGE_OVERFLOW",
      severity: "critical",
      message: `Draw volume (${formatMl(params.drawVolumeMl)} mL) exceeds ${syringe.label} syringe capacity (${syringe.totalMl} mL).`,
      recommendation:
        "Use a larger syringe, add more diluent to reduce concentration, or split into multiple draws.",
    });
  }

  // ROUNDING_RISK: rounding to whole syringe units loses significant precision
  const roundedUnits = Math.round(params.syringeUnits);
  if (roundedUnits > 0) {
    const roundingLoss = Math.abs(params.syringeUnits - roundedUnits) / roundedUnits;
    if (roundingLoss > ROUNDING_LOSS_THRESHOLD) {
      warnings.push({
        code: "ROUNDING_RISK",
        severity: "warning",
        message: `Rounding to ${roundedUnits} units loses ${(roundingLoss * 100).toFixed(1)}% accuracy from the exact ${params.syringeUnits.toFixed(1)} units.`,
        recommendation:
          "Adjust diluent volume for a cleaner dilution ratio, or use a syringe with finer markings.",
      });
    }
  }

  // DILUTION_AWKWARD: very high or very low concentration
  if (params.diluentVolumeMl < 0.5 && params.concentrationPerMl > 0) {
    warnings.push({
      code: "DILUTION_AWKWARD",
      severity: "info",
      message: "Very low diluent volume may make accurate reconstitution difficult.",
      recommendation:
        "Most reconstitution uses 1–3 mL of bacteriostatic water. Consider increasing diluent volume.",
    });
  }

  return warnings;
}
