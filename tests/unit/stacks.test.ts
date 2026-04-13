import { describe, it, expect } from "vitest";
import { STACKS, getStackBySlug } from "@/lib/constants/stacks";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import type { Stack } from "@/types/stack";

describe("stack data integrity", () => {
  it("exports 5 stacks", () => {
    expect(STACKS).toHaveLength(5);
  });

  it("all stacks have unique ids", () => {
    const ids = STACKS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all stacks have unique slugs", () => {
    const slugs = STACKS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(STACKS.map((s) => [s.name, s]))(
    "%s has required fields",
    (_name, stack) => {
      const s = stack as Stack;
      expect(s.id).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.summary).toBeTruthy();
      expect(s.rationale).toBeTruthy();
      expect(s.evidenceDisclaimer).toBeTruthy();
      expect(s.compounds.length).toBeGreaterThanOrEqual(2);
      expect(s.protocol.duration).toBeTruthy();
      expect(s.protocol.cycling).toBeTruthy();
      expect(s.citations.length).toBeGreaterThanOrEqual(1);
    },
  );

  it.each(STACKS.map((s) => [s.name, s]))(
    "%s references only existing compounds",
    (_name, stack) => {
      const s = stack as Stack;
      for (const sc of s.compounds) {
        const compound = getCompoundBySlug(sc.compoundId);
        expect(compound).toBeDefined();
      }
    },
  );

  it.each(STACKS.map((s) => [s.name, s]))(
    "%s has valid category and evidence level",
    (_name, stack) => {
      const s = stack as Stack;
      expect(["recovery", "growth", "metabolic", "cognitive", "immune"]).toContain(s.category);
      expect(["clinical", "community", "theoretical"]).toContain(s.evidenceLevel);
    },
  );
});

describe("getStackBySlug", () => {
  it("returns wolverine stack", () => {
    const stack = getStackBySlug("wolverine");
    expect(stack).toBeDefined();
    expect(stack!.name).toBe("Wolverine Stack");
    expect(stack!.compounds).toHaveLength(2);
  });

  it("returns metabolic fat-loss stack", () => {
    const stack = getStackBySlug("metabolic-fat-loss");
    expect(stack).toBeDefined();
    expect(stack!.compounds).toHaveLength(3);
  });

  it("returns undefined for unknown slug", () => {
    expect(getStackBySlug("not-real")).toBeUndefined();
  });
});

describe("specific stack compound counts", () => {
  it("wolverine has 2 compounds (BPC-157, TB-500)", () => {
    const s = getStackBySlug("wolverine")!;
    const ids = s.compounds.map((c) => c.compoundId);
    expect(ids).toContain("bpc-157");
    expect(ids).toContain("tb-500");
  });

  it("glow has 3 compounds (wolverine + GHK-Cu)", () => {
    const s = getStackBySlug("glow")!;
    expect(s.compounds).toHaveLength(3);
    expect(s.compounds.map((c) => c.compoundId)).toContain("ghk-cu");
  });

  it("klow has 4 compounds (glow + KPV)", () => {
    const s = getStackBySlug("klow")!;
    expect(s.compounds).toHaveLength(4);
    expect(s.compounds.map((c) => c.compoundId)).toContain("kpv");
  });

  it("gh-muscle has 3 compounds including optional tesamorelin", () => {
    const s = getStackBySlug("gh-muscle")!;
    expect(s.compounds).toHaveLength(3);
    expect(s.compounds.map((c) => c.compoundId)).toContain("ipamorelin");
    expect(s.compounds.map((c) => c.compoundId)).toContain("cjc-1295-no-dac");
  });
});
