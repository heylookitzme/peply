import { describe, it, expect } from "vitest";
import {
  calculateCompoundCost,
  calculateStackCost,
  normalizeDoseToMg,
  frequencyToDosesPerWeek,
} from "@/lib/calculations/costCalculator";

describe("normalizeDoseToMg", () => {
  it("returns mg as-is", () => {
    expect(normalizeDoseToMg(5, "mg")).toBe(5);
  });

  it("converts mcg to mg", () => {
    expect(normalizeDoseToMg(500, "mcg")).toBe(0.5);
    expect(normalizeDoseToMg(250, "mcg")).toBe(0.25);
  });
});

describe("frequencyToDosesPerWeek", () => {
  it("maps known frequencies", () => {
    expect(frequencyToDosesPerWeek("daily")).toBe(7);
    expect(frequencyToDosesPerWeek("twice_daily")).toBe(14);
    expect(frequencyToDosesPerWeek("3x_week")).toBe(3);
    expect(frequencyToDosesPerWeek("weekly")).toBe(1);
    expect(frequencyToDosesPerWeek("twice_weekly")).toBe(2);
  });

  it("defaults to 7 for unknown", () => {
    expect(frequencyToDosesPerWeek("other")).toBe(7);
  });
});

describe("calculateCompoundCost", () => {
  it("calculates basic single-compound cost", () => {
    const result = calculateCompoundCost({
      compoundName: "BPC-157",
      vialAmountMg: 5,
      pricePerVial: 40,
      targetDoseMg: 0.25, // 250 mcg
      dosesPerWeek: 7,
      durationWeeks: 8,
    });

    // 0.25 mg * 7 doses * 8 weeks = 14 mg total
    expect(result.totalMgNeeded).toBe(14);
    // 14 mg / 5 mg per vial = 2.8, ceil = 3 vials
    expect(result.vialsNeeded).toBe(3);
    // 3 * $40 = $120
    expect(result.totalCost).toBe(120);
    expect(result.costPerWeek).toBe(15);
  });

  it("rounds up fractional vials", () => {
    const result = calculateCompoundCost({
      compoundName: "Test",
      vialAmountMg: 10,
      pricePerVial: 50,
      targetDoseMg: 1,
      dosesPerWeek: 1,
      durationWeeks: 4,
    });

    // 1 mg * 1 * 4 = 4 mg, needs 1 vial (10mg vial)
    expect(result.vialsNeeded).toBe(1);
    expect(result.totalCost).toBe(50);
  });

  it("handles zero duration", () => {
    const result = calculateCompoundCost({
      compoundName: "Test",
      vialAmountMg: 5,
      pricePerVial: 40,
      targetDoseMg: 0.25,
      dosesPerWeek: 7,
      durationWeeks: 0,
    });

    expect(result.totalMgNeeded).toBe(0);
    expect(result.vialsNeeded).toBe(0);
    expect(result.totalCost).toBe(0);
    expect(result.costPerWeek).toBe(0);
  });
});

describe("calculateStackCost", () => {
  it("sums costs across multiple compounds", () => {
    const result = calculateStackCost(
      [
        {
          compoundName: "BPC-157",
          vialAmountMg: 5,
          pricePerVial: 40,
          targetDoseMg: 0.25,
          dosesPerWeek: 7,
          durationWeeks: 8,
        },
        {
          compoundName: "TB-500",
          vialAmountMg: 5,
          pricePerVial: 55,
          targetDoseMg: 2,
          dosesPerWeek: 2,
          durationWeeks: 8,
        },
      ],
      8,
    );

    expect(result.compounds.length).toBe(2);
    // BPC: 14mg needed, 3 vials, $120
    expect(result.compounds[0].totalCost).toBe(120);
    // TB-500: 32mg needed, 7 vials, $385
    expect(result.compounds[1].totalCost).toBe(385);
    // Total: $505
    expect(result.grandTotal).toBe(505);
    expect(result.totalPerWeek).toBeCloseTo(63.125);
    expect(result.totalPerMonth).toBeCloseTo(63.125 * (52 / 12));
    expect(result.durationWeeks).toBe(8);
  });
});
