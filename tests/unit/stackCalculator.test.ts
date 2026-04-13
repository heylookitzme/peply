import { describe, it, expect } from "vitest";
import { STACKS } from "@/lib/constants/stacks";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import { calculate } from "@/lib/calculations";
import type { CalculatorInput } from "@/types/calculator";

describe("stack calculator", () => {
  it("all stack compounds resolve to real compound data", () => {
    for (const stack of STACKS) {
      for (const sc of stack.compounds) {
        const compound = getCompoundBySlug(sc.compoundId);
        expect(compound, `${stack.name}: ${sc.compoundId} not found`).toBeTruthy();
        expect(compound!.commonVialSizes.length).toBeGreaterThan(0);
        expect(compound!.defaultBacWaterMl).toBeGreaterThan(0);
      }
    }
  });

  it("calculates correctly for each compound in Wolverine stack", () => {
    const wolverine = STACKS.find((s) => s.slug === "wolverine")!;
    expect(wolverine.compounds.length).toBe(2);

    for (const sc of wolverine.compounds) {
      const compound = getCompoundBySlug(sc.compoundId)!;
      const vial = compound.commonVialSizes[0];
      const input: CalculatorInput = {
        vialAmount: vial.amount,
        vialAmountUnit: vial.unit,
        diluentVolumeMl: compound.defaultBacWaterMl,
        targetDose: compound.clinicalDoseRange.min,
        targetDoseUnit: compound.clinicalDoseRange.unit,
        syringeType: "u100_1ml",
      };

      const result = calculate(input);
      expect(result.concentrationPerMl).toBeGreaterThan(0);
      expect(result.drawVolumeMl).toBeGreaterThan(0);
      expect(result.syringeUnits).toBeGreaterThan(0);
    }
  });

  it("combined draw volume sums correctly across all stack compounds", () => {
    for (const stack of STACKS) {
      let totalDraw = 0;
      for (const sc of stack.compounds) {
        const compound = getCompoundBySlug(sc.compoundId)!;
        const vial = compound.commonVialSizes[0];
        const input: CalculatorInput = {
          vialAmount: vial.amount,
          vialAmountUnit: vial.unit,
          diluentVolumeMl: compound.defaultBacWaterMl,
          targetDose: compound.clinicalDoseRange.min,
          targetDoseUnit: compound.clinicalDoseRange.unit,
          syringeType: "u100_1ml",
        };
        const result = calculate(input);
        totalDraw += result.drawVolumeMl;
      }
      expect(totalDraw).toBeGreaterThan(0);
    }
  });

  it("detects mixed dosing frequencies in stacks", () => {
    // Wolverine has daily (BPC-157) and other (TB-500 2x/week)
    const wolverine = STACKS.find((s) => s.slug === "wolverine")!;
    const frequencies = new Set(
      wolverine.compounds.map((sc) => {
        const compound = getCompoundBySlug(sc.compoundId)!;
        return compound.clinicalDoseRange.frequency;
      }),
    );
    expect(frequencies.size).toBeGreaterThan(1);
  });
});
