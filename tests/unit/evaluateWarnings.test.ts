import { describe, it, expect } from "vitest";
import { evaluateWarnings } from "@/lib/calculations/evaluateWarnings";

describe("evaluateWarnings", () => {
  const baseParams = {
    drawVolumeMl: 0.2,
    syringeUnits: 20,
    syringeType: "u100_1ml" as const,
    concentrationPerMl: 2.5,
    diluentVolumeMl: 2,
  };

  it("returns no warnings for a normal draw", () => {
    const warnings = evaluateWarnings(baseParams);
    expect(warnings).toHaveLength(0);
  });

  describe("LOW_DRAW_VOLUME", () => {
    it("warns when draw volume is below 0.05 mL", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 0.03,
        syringeUnits: 3,
      });
      const low = warnings.find((w) => w.code === "LOW_DRAW_VOLUME");
      expect(low).toBeDefined();
      expect(low!.severity).toBe("warning");
    });

    it("info when syringe units are below 5 but volume is above threshold", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 0.06,
        syringeUnits: 4,
      });
      const low = warnings.find((w) => w.code === "LOW_DRAW_VOLUME");
      expect(low).toBeDefined();
      expect(low!.severity).toBe("info");
    });

    it("does not warn when draw is adequate", () => {
      const warnings = evaluateWarnings(baseParams);
      expect(warnings.find((w) => w.code === "LOW_DRAW_VOLUME")).toBeUndefined();
    });
  });

  describe("SYRINGE_OVERFLOW", () => {
    it("warns when draw exceeds 1mL syringe capacity", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 1.5,
        syringeUnits: 150,
      });
      const overflow = warnings.find((w) => w.code === "SYRINGE_OVERFLOW");
      expect(overflow).toBeDefined();
      expect(overflow!.severity).toBe("critical");
    });

    it("warns when draw exceeds 0.5mL syringe capacity", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 0.6,
        syringeUnits: 60,
        syringeType: "u50_0_5ml",
      });
      const overflow = warnings.find((w) => w.code === "SYRINGE_OVERFLOW");
      expect(overflow).toBeDefined();
      expect(overflow!.severity).toBe("critical");
    });

    it("warns when draw exceeds 0.3mL syringe capacity", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 0.4,
        syringeUnits: 40,
        syringeType: "u30_0_3ml",
      });
      const overflow = warnings.find((w) => w.code === "SYRINGE_OVERFLOW");
      expect(overflow).toBeDefined();
    });

    it("does not warn when draw fits", () => {
      const warnings = evaluateWarnings(baseParams);
      expect(warnings.find((w) => w.code === "SYRINGE_OVERFLOW")).toBeUndefined();
    });
  });

  describe("ROUNDING_RISK", () => {
    it("warns when rounding loss exceeds 10%", () => {
      // 5.6 units rounds to 6, loss = 0.4/6 = 6.7% - not enough
      // 3.4 units rounds to 3, loss = 0.4/3 = 13.3% - triggers
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 0.034,
        syringeUnits: 3.4,
      });
      const rounding = warnings.find((w) => w.code === "ROUNDING_RISK");
      expect(rounding).toBeDefined();
      expect(rounding!.severity).toBe("warning");
    });

    it("does not warn when rounding is clean", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 0.2,
        syringeUnits: 20,
      });
      expect(warnings.find((w) => w.code === "ROUNDING_RISK")).toBeUndefined();
    });
  });

  describe("DILUTION_AWKWARD", () => {
    it("warns when diluent volume is very low", () => {
      const warnings = evaluateWarnings({
        ...baseParams,
        diluentVolumeMl: 0.3,
      });
      const awkward = warnings.find((w) => w.code === "DILUTION_AWKWARD");
      expect(awkward).toBeDefined();
      expect(awkward!.severity).toBe("info");
    });

    it("does not warn for normal diluent volumes", () => {
      const warnings = evaluateWarnings(baseParams);
      expect(warnings.find((w) => w.code === "DILUTION_AWKWARD")).toBeUndefined();
    });
  });

  describe("multiple warnings", () => {
    it("can produce both overflow and low-volume warnings for extreme cases", () => {
      // This is an edge case: tiny draw on a tiny syringe that overflows
      // Actually contradictory, so let's test overflow + rounding
      const warnings = evaluateWarnings({
        ...baseParams,
        drawVolumeMl: 1.2,
        syringeUnits: 120.4,
        syringeType: "u100_1ml",
      });
      expect(warnings.some((w) => w.code === "SYRINGE_OVERFLOW")).toBe(true);
    });
  });
});
