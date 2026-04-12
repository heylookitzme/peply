import { describe, it, expect } from "vitest";
import { calculateDrawVolume } from "@/lib/calculations/calculateDrawVolume";

describe("calculateDrawVolume", () => {
  it("calculates basic draw volume when units match", () => {
    // 2.5 mg/mL concentration, target 0.25 mg -> 0.1 mL
    expect(calculateDrawVolume(0.25, "mg", 2.5, "mg")).toBeCloseTo(0.1, 5);
  });

  it("calculates draw for semaglutide 0.5mg from 2.5mg/mL", () => {
    expect(calculateDrawVolume(0.5, "mg", 2.5, "mg")).toBeCloseTo(0.2, 5);
  });

  it("calculates draw for semaglutide 1mg from 2.5mg/mL", () => {
    expect(calculateDrawVolume(1, "mg", 2.5, "mg")).toBeCloseTo(0.4, 5);
  });

  it("converts mcg target to mg concentration automatically", () => {
    // target 250 mcg, concentration 2.5 mg/mL
    // 250 mcg = 0.25 mg, 0.25 / 2.5 = 0.1 mL
    expect(calculateDrawVolume(250, "mcg", 2.5, "mg")).toBeCloseTo(0.1, 5);
  });

  it("converts mg target to mcg concentration automatically", () => {
    // target 0.25 mg = 250 mcg, concentration 2500 mcg/mL
    // 250 / 2500 = 0.1 mL
    expect(calculateDrawVolume(0.25, "mg", 2500, "mcg")).toBeCloseTo(0.1, 5);
  });

  it("throws on zero concentration", () => {
    expect(() => calculateDrawVolume(1, "mg", 0, "mg")).toThrow(
      "Concentration must be greater than zero",
    );
  });

  it("throws on negative concentration", () => {
    expect(() => calculateDrawVolume(1, "mg", -1, "mg")).toThrow(
      "Concentration must be greater than zero",
    );
  });

  it("throws on zero target dose", () => {
    expect(() => calculateDrawVolume(0, "mg", 2.5, "mg")).toThrow(
      "Target dose must be greater than zero",
    );
  });

  it("throws on negative target dose", () => {
    expect(() => calculateDrawVolume(-1, "mg", 2.5, "mg")).toThrow(
      "Target dose must be greater than zero",
    );
  });

  it("handles very large dose requiring large draw", () => {
    // 5 mg target, 2.5 mg/mL -> 2 mL draw
    expect(calculateDrawVolume(5, "mg", 2.5, "mg")).toBeCloseTo(2.0, 5);
  });

  it("handles very small dose requiring tiny draw", () => {
    // 0.01 mg target, 2.5 mg/mL -> 0.004 mL
    expect(calculateDrawVolume(0.01, "mg", 2.5, "mg")).toBeCloseTo(0.004, 5);
  });
});
