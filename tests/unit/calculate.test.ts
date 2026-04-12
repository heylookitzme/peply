import { describe, it, expect } from "vitest";
import { calculate } from "@/lib/calculations/calculate";
import type { CalculatorInput } from "@/types/calculator";

describe("calculate (integration)", () => {
  const semaglutideInput: CalculatorInput = {
    vialAmount: 5,
    vialAmountUnit: "mg",
    diluentVolumeMl: 2,
    targetDose: 0.25,
    targetDoseUnit: "mg",
    syringeType: "u100_1ml",
  };

  it("calculates semaglutide 0.25mg from 5mg vial in 2mL", () => {
    const result = calculate(semaglutideInput);
    expect(result.concentrationPerMl).toBe(2.5);
    expect(result.concentrationUnit).toBe("mg");
    expect(result.drawVolumeMl).toBeCloseTo(0.1, 5);
    expect(result.syringeUnits).toBeCloseTo(10, 5);
  });

  it("calculates semaglutide 0.5mg from 5mg vial in 2mL", () => {
    const result = calculate({
      ...semaglutideInput,
      targetDose: 0.5,
    });
    expect(result.drawVolumeMl).toBeCloseTo(0.2, 5);
    expect(result.syringeUnits).toBeCloseTo(20, 5);
  });

  it("calculates semaglutide 1mg from 5mg vial in 2mL", () => {
    const result = calculate({
      ...semaglutideInput,
      targetDose: 1,
    });
    expect(result.drawVolumeMl).toBeCloseTo(0.4, 5);
    expect(result.syringeUnits).toBeCloseTo(40, 5);
  });

  it("handles cross-unit calculation: mcg target with mg vial", () => {
    const result = calculate({
      ...semaglutideInput,
      targetDose: 250,
      targetDoseUnit: "mcg",
    });
    expect(result.drawVolumeMl).toBeCloseTo(0.1, 5);
    expect(result.syringeUnits).toBeCloseTo(10, 5);
  });

  it("generates overflow warning for large dose on small syringe", () => {
    const result = calculate({
      ...semaglutideInput,
      targetDose: 4,
      syringeType: "u30_0_3ml",
    });
    expect(result.warnings.some((w) => w.code === "SYRINGE_OVERFLOW")).toBe(true);
  });

  it("generates low volume warning for tiny dose", () => {
    const result = calculate({
      vialAmount: 10,
      vialAmountUnit: "mg",
      diluentVolumeMl: 3,
      targetDose: 0.01,
      targetDoseUnit: "mg",
      syringeType: "u100_1ml",
    });
    expect(result.warnings.some((w) => w.code === "LOW_DRAW_VOLUME")).toBe(true);
  });

  it("throws on invalid input (zero vial amount)", () => {
    expect(() =>
      calculate({
        ...semaglutideInput,
        vialAmount: 0,
      }),
    ).toThrow();
  });

  it("throws on invalid input (negative diluent)", () => {
    expect(() =>
      calculate({
        ...semaglutideInput,
        diluentVolumeMl: -1,
      }),
    ).toThrow();
  });
});
