import { describe, it, expect } from "vitest";
import {
  COMPOUNDS,
  getCompoundBySlug,
  getCompoundById,
  semaglutide,
  tirzepatide,
  retatrutide,
  tesamorelin,
} from "@/lib/constants/compounds";
import type { Compound } from "@/types/content";

describe("compound data integrity", () => {
  const allCompounds: Compound[] = [semaglutide, tirzepatide, retatrutide, tesamorelin];

  it("exports 4 compounds in the COMPOUNDS array", () => {
    expect(COMPOUNDS).toHaveLength(4);
  });

  it("all compounds have unique ids", () => {
    const ids = COMPOUNDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all compounds have unique slugs", () => {
    const slugs = COMPOUNDS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(allCompounds.map((c) => [c.name, c]))(
    "%s has required fields",
    (_name, compound) => {
      const c = compound as Compound;
      expect(c.id).toBeTruthy();
      expect(c.slug).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.summary).toBeTruthy();
      expect(c.mechanism).toBeTruthy();
      expect(c.halfLife).toBeTruthy();
      expect(c.manufacturer).toBeTruthy();
      expect(c.defaultRoute).toBeTruthy();
    },
  );

  it.each(allCompounds.map((c) => [c.name, c]))(
    "%s has valid dose range with proper units",
    (_name, compound) => {
      const c = compound as Compound;
      const range = c.clinicalDoseRange;
      expect(range.min).toBeGreaterThan(0);
      expect(range.max).toBeGreaterThanOrEqual(range.min);
      expect(["mg", "mcg"]).toContain(range.unit);
      expect(range.frequency).toBeTruthy();
      expect(range.frequencyLabel).toBeTruthy();
    },
  );

  it.each(allCompounds.map((c) => [c.name, c]))(
    "%s has at least one titration protocol with steps",
    (_name, compound) => {
      const c = compound as Compound;
      expect(c.titrationProtocols.length).toBeGreaterThanOrEqual(1);
      for (const protocol of c.titrationProtocols) {
        expect(protocol.name).toBeTruthy();
        expect(protocol.source).toBeTruthy();
        expect(protocol.steps.length).toBeGreaterThanOrEqual(1);
        for (const step of protocol.steps) {
          expect(step.dose).toBeGreaterThan(0);
          expect(["mg", "mcg"]).toContain(step.unit);
          expect(step.durationWeeks).toBeGreaterThanOrEqual(0);
        }
      }
    },
  );

  it.each(allCompounds.map((c) => [c.name, c]))(
    "%s has at least one citation with lastReviewedAt",
    (_name, compound) => {
      const c = compound as Compound;
      expect(c.citations.length).toBeGreaterThanOrEqual(1);
      for (const citation of c.citations) {
        expect(citation.id).toBeTruthy();
        expect(citation.title).toBeTruthy();
        expect(citation.source).toBeTruthy();
        expect(citation.lastReviewedAt).toBeTruthy();
      }
    },
  );

  it.each(allCompounds.map((c) => [c.name, c]))(
    "%s has at least one vial size",
    (_name, compound) => {
      const c = compound as Compound;
      expect(c.commonVialSizes.length).toBeGreaterThanOrEqual(1);
      for (const vial of c.commonVialSizes) {
        expect(vial.amount).toBeGreaterThan(0);
        expect(["mg", "mcg"]).toContain(vial.unit);
      }
    },
  );

  it.each(allCompounds.map((c) => [c.name, c]))(
    "%s has valid regulatory status",
    (_name, compound) => {
      const c = compound as Compound;
      expect(c.regulatoryStatus.fdaCategory).toBeTruthy();
      expect(c.regulatoryStatus.lastUpdated).toBeTruthy();
    },
  );
});

describe("getCompoundBySlug", () => {
  it("returns semaglutide for slug 'semaglutide'", () => {
    const result = getCompoundBySlug("semaglutide");
    expect(result).toBeDefined();
    expect(result!.name).toBe("Semaglutide");
  });

  it("returns tirzepatide for slug 'tirzepatide'", () => {
    const result = getCompoundBySlug("tirzepatide");
    expect(result).toBeDefined();
    expect(result!.name).toBe("Tirzepatide");
  });

  it("returns undefined for unknown slug", () => {
    expect(getCompoundBySlug("not-a-real-compound")).toBeUndefined();
  });
});

describe("getCompoundById", () => {
  it("returns compound by id", () => {
    const result = getCompoundById("retatrutide");
    expect(result).toBeDefined();
    expect(result!.name).toBe("Retatrutide");
  });

  it("returns undefined for unknown id", () => {
    expect(getCompoundById("xyz")).toBeUndefined();
  });
});

describe("specific compound data accuracy", () => {
  it("semaglutide: FDA approved, 0.25-2.4mg weekly", () => {
    expect(semaglutide.approvalStatus).toBe("approved");
    expect(semaglutide.clinicalDoseRange.min).toBe(0.25);
    expect(semaglutide.clinicalDoseRange.max).toBe(2.4);
    expect(semaglutide.clinicalDoseRange.frequency).toBe("weekly");
    expect(semaglutide.manufacturer).toBe("Novo Nordisk");
  });

  it("tirzepatide: FDA approved, 2.5-15mg weekly", () => {
    expect(tirzepatide.approvalStatus).toBe("approved");
    expect(tirzepatide.clinicalDoseRange.min).toBe(2.5);
    expect(tirzepatide.clinicalDoseRange.max).toBe(15);
    expect(tirzepatide.clinicalDoseRange.frequency).toBe("weekly");
    expect(tirzepatide.manufacturer).toBe("Eli Lilly");
  });

  it("retatrutide: investigational, 2-12mg weekly", () => {
    expect(retatrutide.approvalStatus).toBe("investigational");
    expect(retatrutide.clinicalDoseRange.min).toBe(2);
    expect(retatrutide.clinicalDoseRange.max).toBe(12);
    expect(retatrutide.clinicalDoseRange.frequency).toBe("weekly");
    expect(retatrutide.manufacturer).toBe("Eli Lilly");
  });

  it("tesamorelin: FDA approved, 2mg daily", () => {
    expect(tesamorelin.approvalStatus).toBe("approved");
    expect(tesamorelin.clinicalDoseRange.min).toBe(2);
    expect(tesamorelin.clinicalDoseRange.max).toBe(2);
    expect(tesamorelin.clinicalDoseRange.frequency).toBe("daily");
    expect(tesamorelin.manufacturer).toBe("Theratechnologies");
  });
});
