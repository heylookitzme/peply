export const DOSE_UNITS = ["mg", "mcg"] as const;
export type DoseUnit = (typeof DOSE_UNITS)[number];

export const VOLUME_UNITS = ["mL"] as const;
export type VolumeUnit = (typeof VOLUME_UNITS)[number];

export const SYRINGE_TYPES = {
  u100_1ml: { label: "1 mL (100 units)", totalUnits: 100, totalMl: 1 },
  u50_0_5ml: { label: "0.5 mL (50 units)", totalUnits: 50, totalMl: 0.5 },
  u30_0_3ml: { label: "0.3 mL (30 units)", totalUnits: 30, totalMl: 0.3 },
} as const;

export type SyringeType = keyof typeof SYRINGE_TYPES;

export interface CalculatorInput {
  vialAmount: number;
  vialAmountUnit: DoseUnit;
  diluentVolumeMl: number;
  targetDose: number;
  targetDoseUnit: DoseUnit;
  syringeType: SyringeType;
}

export interface CalculatorResult {
  concentrationPerMl: number;
  concentrationUnit: DoseUnit;
  drawVolumeMl: number;
  syringeUnits: number;
  warnings: CalculatorWarning[];
}

export const WARNING_CODES = [
  "LOW_DRAW_VOLUME",
  "SYRINGE_OVERFLOW",
  "ROUNDING_RISK",
  "DILUTION_AWKWARD",
] as const;

export type WarningCode = (typeof WARNING_CODES)[number];

export const WARNING_SEVERITIES = ["info", "warning", "critical"] as const;
export type WarningSeverity = (typeof WARNING_SEVERITIES)[number];

export interface CalculatorWarning {
  code: WarningCode;
  severity: WarningSeverity;
  message: string;
  recommendation?: string;
}
