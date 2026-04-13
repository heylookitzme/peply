import { describe, it, expect } from "vitest";
import { calculateSyringeUnits, convertDoseUnit } from "@/lib/calculations";

/**
 * Tests for the titration table draw calculation logic used in
 * compound detail pages ([slug]/page.tsx).
 *
 * The formula mirrors what the detail page computes:
 *   normalizedDose = convertDoseUnit(stepDose, stepUnit, vialUnit) if units differ
 *   drawMl = normalizedDose / (vialAmount / bacWaterMl)
 *   units = calculateSyringeUnits(drawMl, "u100_1ml")
 */
function computeTitrationDraw(
  stepDose: number,
  stepUnit: "mg" | "mcg",
  vialAmount: number,
  vialUnit: "mg" | "mcg",
  bacWaterMl: number,
): { drawMl: number; units: number } {
  const normalizedDose =
    stepUnit !== vialUnit
      ? convertDoseUnit(stepDose, stepUnit, vialUnit)
      : stepDose;
  const concentration = vialAmount / bacWaterMl;
  const drawMl = normalizedDose / concentration;
  const units = calculateSyringeUnits(drawMl, "u100_1ml");
  return { drawMl, units };
}

describe("titration table draw calculations", () => {
  it("semaglutide 0.25mg from 5mg/2mL = 0.1mL (10 units)", () => {
    const { drawMl, units } = computeTitrationDraw(0.25, "mg", 5, "mg", 2);
    expect(drawMl).toBeCloseTo(0.1, 5);
    expect(units).toBeCloseTo(10, 5);
  });

  it("semaglutide 2.4mg from 5mg/2mL = 0.96mL (96 units)", () => {
    const { drawMl, units } = computeTitrationDraw(2.4, "mg", 5, "mg", 2);
    expect(drawMl).toBeCloseTo(0.96, 5);
    expect(units).toBeCloseTo(96, 5);
  });

  it("BPC-157 250mcg from 5mg/2mL = 0.1mL (10 units)", () => {
    const { drawMl, units } = computeTitrationDraw(250, "mcg", 5, "mg", 2);
    expect(drawMl).toBeCloseTo(0.1, 5);
    expect(units).toBeCloseTo(10, 5);
  });

  it("BPC-157 500mcg from 5mg/2mL = 0.2mL (20 units)", () => {
    const { drawMl, units } = computeTitrationDraw(500, "mcg", 5, "mg", 2);
    expect(drawMl).toBeCloseTo(0.2, 5);
    expect(units).toBeCloseTo(20, 5);
  });

  it("ipamorelin 200mcg from 2mg/2mL = 0.2mL (20 units)", () => {
    const { drawMl, units } = computeTitrationDraw(200, "mcg", 2, "mg", 2);
    expect(drawMl).toBeCloseTo(0.2, 5);
    expect(units).toBeCloseTo(20, 5);
  });

  it("tirzepatide 15mg from 30mg/2mL = 1.0mL (100 units)", () => {
    const { drawMl, units } = computeTitrationDraw(15, "mg", 30, "mg", 2);
    expect(drawMl).toBeCloseTo(1.0, 5);
    expect(units).toBeCloseTo(100, 5);
  });

  it("retatrutide 12mg from 5mg/2mL = 4.8mL (480 units) — exceeds syringe", () => {
    const { drawMl, units } = computeTitrationDraw(12, "mg", 5, "mg", 2);
    expect(drawMl).toBeCloseTo(4.8, 5);
    expect(units).toBeCloseTo(480, 5);
  });

  it("kisspeptin-10 1mcg from 1mg/2mL = 0.002mL (0.2 units)", () => {
    const { drawMl, units } = computeTitrationDraw(1, "mcg", 1, "mg", 2);
    expect(drawMl).toBeCloseTo(0.002, 5);
    expect(units).toBeCloseTo(0.2, 5);
  });
});
