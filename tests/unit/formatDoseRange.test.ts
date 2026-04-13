import { describe, it, expect } from "vitest";
import { formatDoseRange, formatDropdownLabel } from "@/lib/formatDoseRange";
import { COMPOUNDS } from "@/lib/constants/compounds";
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

describe("formatDropdownLabel", () => {
  function findCompound(slug: string) {
    const c = COMPOUNDS.find((c) => c.slug === slug);
    if (!c) throw new Error(`Compound ${slug} not found`);
    return c;
  }

  it("normalizes mcg dose ranges to mg", () => {
    expect(formatDropdownLabel(findCompound("bpc-157"))).toBe("BPC-157 (0.2-0.8 mg)");
    expect(formatDropdownLabel(findCompound("aod-9604"))).toBe("AOD-9604 (0.25-0.5 mg)");
    expect(formatDropdownLabel(findCompound("ipamorelin"))).toBe("Ipamorelin (0.1-0.3 mg)");
    expect(formatDropdownLabel(findCompound("igf1-lr3"))).toBe("IGF-1 LR3 (0.02-0.1 mg)");
  });

  it("shortens verbose compound names", () => {
    expect(formatDropdownLabel(findCompound("dsip"))).toBe("DSIP (0.1-0.3 mg)");
    expect(formatDropdownLabel(findCompound("mots-c"))).toBe("MOTS-C (5-10 mg)");
    expect(formatDropdownLabel(findCompound("cjc-1295-no-dac"))).toBe("CJC-1295 (no DAC) (0.1-0.3 mg)");
    expect(formatDropdownLabel(findCompound("kpv"))).toBe("KPV (0.2-0.5 mg)");
  });

  it("keeps Kisspeptin-10 in mcg (weight-based dosing)", () => {
    expect(formatDropdownLabel(findCompound("kisspeptin-10"))).toBe("Kisspeptin-10 (75-750 mcg)");
  });

  it("preserves mg compounds as-is", () => {
    expect(formatDropdownLabel(findCompound("semaglutide"))).toBe("Semaglutide (0.25-2.4 mg)");
    expect(formatDropdownLabel(findCompound("tesamorelin"))).toBe("Tesamorelin (2 mg)");
  });

  it("produces labels of roughly uniform length for scannability", () => {
    const labels = COMPOUNDS.map(formatDropdownLabel);
    const lengths = labels.map((l) => l.length);
    // No label should exceed 40 characters
    for (const label of labels) {
      expect(label.length).toBeLessThanOrEqual(40);
    }
  });
});
