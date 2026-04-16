import { describe, it, expect } from "vitest";
import {
  getCompoundBySlug,
  sermorelin,
  ptBremelanotide,
  mk677,
  COMPOUNDS,
} from "@/lib/constants/compounds";

describe("Sermorelin", () => {
  it("is registered in COMPOUNDS and reachable by slug", () => {
    expect(COMPOUNDS).toContain(sermorelin);
    expect(getCompoundBySlug("sermorelin")).toBe(sermorelin);
  });

  it("has GH-secretagogue category and SC route", () => {
    expect(sermorelin.category).toBe("gh-secretagogue");
    expect(sermorelin.defaultRoute).toBe("subcutaneous");
  });

  it("exposes 2/5/9/15 mg vials and 2 mL default diluent", () => {
    const amounts = sermorelin.commonVialSizes.map((v) => v.amount);
    expect(amounts).toEqual([2, 5, 9, 15]);
    expect(sermorelin.defaultBacWaterMl).toBe(2);
  });

  it("dose range is 200-500 mcg daily", () => {
    expect(sermorelin.clinicalDoseRange.min).toBe(200);
    expect(sermorelin.clinicalDoseRange.max).toBe(500);
    expect(sermorelin.clinicalDoseRange.unit).toBe("mcg");
  });

  it("carries at least one cited source with lastReviewedAt", () => {
    expect(sermorelin.citations.length).toBeGreaterThan(0);
    for (const c of sermorelin.citations) {
      expect(c.lastReviewedAt).toBeTruthy();
    }
  });
});

describe("PT-141 (Bremelanotide)", () => {
  it("is registered and reachable by slug", () => {
    expect(COMPOUNDS).toContain(ptBremelanotide);
    expect(getCompoundBySlug("pt-141")).toBe(ptBremelanotide);
  });

  it("is limited-indication (Vyleesi only)", () => {
    expect(ptBremelanotide.approvalStatus).toBe("limited-indication");
    expect(ptBremelanotide.regulatoryStatus.currentCategory).toBe("approved");
  });

  it("labels the approved 1.75 mg dose", () => {
    expect(ptBremelanotide.clinicalDoseRange.min).toBe(1.75);
    expect(ptBremelanotide.clinicalDoseRange.max).toBe(1.75);
    expect(ptBremelanotide.clinicalDoseRange.unit).toBe("mg");
  });

  it("exposes 1/2/5 mg vial sizes", () => {
    const amounts = ptBremelanotide.commonVialSizes.map((v) => v.amount);
    expect(amounts).toEqual([1, 2, 5]);
  });

  it("half-life is approximately 2.5 hours", () => {
    expect(ptBremelanotide.halfLife.toLowerCase()).toContain("2.5");
  });

  it("carries the Vyleesi label citation", () => {
    expect(
      ptBremelanotide.citations.some((c) =>
        c.title.toLowerCase().includes("vyleesi"),
      ),
    ).toBe(true);
  });
});

describe("MK-677 (Ibutamoren)", () => {
  it("is registered and reachable by slug", () => {
    expect(COMPOUNDS).toContain(mk677);
    expect(getCompoundBySlug("mk-677")).toBe(mk677);
  });

  it("is an oral compound", () => {
    expect(mk677.defaultRoute).toBe("oral");
  });

  it("has default BAC water set to 0 (not applicable)", () => {
    expect(mk677.defaultBacWaterMl).toBe(0);
  });

  it("dose range is 10-25 mg daily", () => {
    expect(mk677.clinicalDoseRange.min).toBe(10);
    expect(mk677.clinicalDoseRange.max).toBe(25);
    expect(mk677.clinicalDoseRange.unit).toBe("mg");
  });

  it("is investigational (oral small molecule, not peptide Cat 2)", () => {
    expect(mk677.regulatoryStatus.currentCategory).toBe("investigational");
    expect(mk677.regulatoryStatus.dateRestricted).toBeUndefined();
  });

  it("half-life reflects the ~24h GH/IGF-1 elevation", () => {
    expect(mk677.halfLife.toLowerCase()).toContain("24");
  });

  it("notes removal from Category 2 in the sourcingNote", () => {
    expect(mk677.regulatoryStatus.sourcingNote?.toLowerCase()).toContain(
      "removed from category 2",
    );
  });
});

describe("oral route support", () => {
  it("at least one compound uses the new 'oral' route", () => {
    const oral = COMPOUNDS.filter((c) => c.defaultRoute === "oral");
    expect(oral.length).toBeGreaterThan(0);
    expect(oral.map((c) => c.slug)).toContain("mk-677");
  });
});
