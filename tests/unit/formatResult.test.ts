import { describe, it, expect } from "vitest";
import {
  formatMl,
  formatSyringeUnits,
  formatConcentration,
  formatDose,
} from "@/lib/calculations/formatResult";

describe("formatMl", () => {
  it("formats to 2 decimal places", () => {
    expect(formatMl(0.1)).toBe("0.10");
    expect(formatMl(0.123456)).toBe("0.12");
    expect(formatMl(1)).toBe("1.00");
  });
});

describe("formatSyringeUnits", () => {
  it("rounds to whole numbers", () => {
    expect(formatSyringeUnits(10)).toBe("10");
    expect(formatSyringeUnits(10.4)).toBe("10");
    expect(formatSyringeUnits(10.5)).toBe("11");
    expect(formatSyringeUnits(10.6)).toBe("11");
  });
});

describe("formatConcentration", () => {
  it("formats mg/mL", () => {
    expect(formatConcentration(2.5, "mg")).toBe("2.50 mg/mL");
  });

  it("formats mcg/mL", () => {
    expect(formatConcentration(2500, "mcg")).toBe("2500.00 mcg/mL");
  });
});

describe("formatDose", () => {
  it("formats mg dose", () => {
    expect(formatDose(0.25, "mg")).toBe("0.25 mg");
  });

  it("formats mcg dose", () => {
    expect(formatDose(250, "mcg")).toBe("250 mcg");
  });
});
