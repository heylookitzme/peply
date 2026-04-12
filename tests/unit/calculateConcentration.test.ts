import { describe, it, expect } from "vitest";
import { calculateConcentration } from "@/lib/calculations/calculateConcentration";

describe("calculateConcentration", () => {
  it("calculates basic concentration in mg/mL", () => {
    const result = calculateConcentration(10, "mg", 2);
    expect(result.concentrationPerMl).toBe(5);
    expect(result.unit).toBe("mg");
  });

  it("calculates concentration in mcg/mL", () => {
    const result = calculateConcentration(5000, "mcg", 2);
    expect(result.concentrationPerMl).toBe(2500);
    expect(result.unit).toBe("mcg");
  });

  it("handles common semaglutide reconstitution: 5mg in 2mL BAC water", () => {
    const result = calculateConcentration(5, "mg", 2);
    expect(result.concentrationPerMl).toBe(2.5);
  });

  it("handles common tesamorelin reconstitution: 2mg in 2mL", () => {
    const result = calculateConcentration(2, "mg", 2);
    expect(result.concentrationPerMl).toBe(1);
  });

  it("handles fractional diluent volumes", () => {
    const result = calculateConcentration(10, "mg", 1.5);
    expect(result.concentrationPerMl).toBeCloseTo(6.6667, 3);
  });

  it("throws on zero diluent volume", () => {
    expect(() => calculateConcentration(10, "mg", 0)).toThrow(
      "Diluent volume must be greater than zero",
    );
  });

  it("throws on negative diluent volume", () => {
    expect(() => calculateConcentration(10, "mg", -1)).toThrow(
      "Diluent volume must be greater than zero",
    );
  });

  it("throws on zero vial amount", () => {
    expect(() => calculateConcentration(0, "mg", 2)).toThrow(
      "Vial amount must be greater than zero",
    );
  });

  it("throws on negative vial amount", () => {
    expect(() => calculateConcentration(-5, "mg", 2)).toThrow(
      "Vial amount must be greater than zero",
    );
  });
});
