import { z } from "zod/v4";
import { DOSE_UNITS, SYRINGE_TYPES } from "@/types/calculator";

const syringeTypes = Object.keys(SYRINGE_TYPES) as [string, ...string[]];

export const calculatorInputSchema = z.object({
  vialAmount: z.number().positive("Vial amount must be positive"),
  vialAmountUnit: z.enum(DOSE_UNITS),
  diluentVolumeMl: z.number().positive("Diluent volume must be positive"),
  targetDose: z.number().positive("Target dose must be positive"),
  targetDoseUnit: z.enum(DOSE_UNITS),
  syringeType: z.enum(syringeTypes as [string, ...string[]]).transform(
    (val) => val as keyof typeof SYRINGE_TYPES,
  ),
});

export type ValidatedCalculatorInput = z.infer<typeof calculatorInputSchema>;
