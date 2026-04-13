import { describe, it, expect } from "vitest";
import { formatDoseRange } from "@/lib/formatDoseRange";
import type { DoseRange } from "@/types/content";

describe("formatDoseRange", () => {
  it("shows range when min differs from max", () => {
    const range: DoseRange = {
      min: 0.25,
      max: 2.4,
      unit: "mg",
      frequency: "weekly",
      frequencyLabel: "Once weekly",
    };
    expect(formatDoseRange(range)).toBe("0.25-2.4 mg");
  });

  it("shows single value when min equals max", () => {
    const range: DoseRange = {
      min: 2,
      max: 2,
      unit: "mg",
      frequency: "daily",
      frequencyLabel: "Once daily",
    };
    expect(formatDoseRange(range)).toBe("2 mg");
  });

  it("works with mcg units", () => {
    const range: DoseRange = {
      min: 100,
      max: 500,
      unit: "mcg",
      frequency: "weekly",
      frequencyLabel: "Once weekly",
    };
    expect(formatDoseRange(range)).toBe("100-500 mcg");
  });
});
