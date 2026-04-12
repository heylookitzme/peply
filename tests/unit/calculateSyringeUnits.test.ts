import { describe, it, expect } from "vitest";
import { calculateSyringeUnits } from "@/lib/calculations/calculateSyringeUnits";

describe("calculateSyringeUnits", () => {
  describe("U-100 1mL syringe", () => {
    it("converts 0.1 mL to 10 units", () => {
      expect(calculateSyringeUnits(0.1, "u100_1ml")).toBe(10);
    });

    it("converts 0.5 mL to 50 units", () => {
      expect(calculateSyringeUnits(0.5, "u100_1ml")).toBe(50);
    });

    it("converts 1 mL to 100 units", () => {
      expect(calculateSyringeUnits(1, "u100_1ml")).toBe(100);
    });

    it("converts 0.2 mL to 20 units", () => {
      expect(calculateSyringeUnits(0.2, "u100_1ml")).toBe(20);
    });
  });

  describe("U-50 0.5mL syringe", () => {
    it("converts 0.1 mL to 10 units", () => {
      expect(calculateSyringeUnits(0.1, "u50_0_5ml")).toBe(10);
    });

    it("converts 0.5 mL to 50 units", () => {
      expect(calculateSyringeUnits(0.5, "u50_0_5ml")).toBe(50);
    });

    it("converts 0.25 mL to 25 units", () => {
      expect(calculateSyringeUnits(0.25, "u50_0_5ml")).toBe(25);
    });
  });

  describe("U-30 0.3mL syringe", () => {
    it("converts 0.1 mL to 10 units", () => {
      expect(calculateSyringeUnits(0.1, "u30_0_3ml")).toBe(10);
    });

    it("converts 0.3 mL to 30 units", () => {
      expect(calculateSyringeUnits(0.3, "u30_0_3ml")).toBe(30);
    });

    it("converts 0.15 mL to 15 units", () => {
      expect(calculateSyringeUnits(0.15, "u30_0_3ml")).toBe(15);
    });
  });

  describe("edge cases", () => {
    it("handles zero draw volume", () => {
      expect(calculateSyringeUnits(0, "u100_1ml")).toBe(0);
    });

    it("throws on negative draw volume", () => {
      expect(() => calculateSyringeUnits(-0.1, "u100_1ml")).toThrow(
        "Draw volume cannot be negative",
      );
    });

    it("handles fractional unit results", () => {
      // 0.015 mL on U-100 = 1.5 units
      expect(calculateSyringeUnits(0.015, "u100_1ml")).toBeCloseTo(1.5, 5);
    });
  });
});
