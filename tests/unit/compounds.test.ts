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
  it("exports 24 compounds in the COMPOUNDS array", () => {
    expect(COMPOUNDS).toHaveLength(24);
  });

  it("all compounds have unique ids", () => {
    const ids = COMPOUNDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all compounds have unique slugs", () => {
    const slugs = COMPOUNDS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(COMPOUNDS.map((c) => [c.name, c]))(
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

  it.each(COMPOUNDS.map((c) => [c.name, c]))(
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

  it.each(COMPOUNDS.map((c) => [c.name, c]))(
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

  it.each(COMPOUNDS.map((c) => [c.name, c]))(
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

  it.each(COMPOUNDS.map((c) => [c.name, c]))(
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

  it.each(COMPOUNDS.map((c) => [c.name, c]))(
    "%s has valid regulatory status",
    (_name, compound) => {
      const c = compound as Compound;
      expect(c.regulatoryStatus.fdaCategory).toBeTruthy();
      expect(c.regulatoryStatus.lastUpdated).toBeTruthy();
      expect(["cat1", "cat2", "approved", "investigational"]).toContain(
        c.regulatoryStatus.currentCategory,
      );
      expect(["stable", "pending", "announced"]).toContain(
        c.regulatoryStatus.reclassificationStatus,
      );
    },
  );
});

describe("getCompoundBySlug", () => {
  it("returns semaglutide for slug 'semaglutide'", () => {
    const result = getCompoundBySlug("semaglutide");
    expect(result).toBeDefined();
    expect(result!.name).toBe("Semaglutide");
  });

  it("returns bpc-157 for slug 'bpc-157'", () => {
    const result = getCompoundBySlug("bpc-157");
    expect(result).toBeDefined();
    expect(result!.name).toBe("BPC-157");
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
    expect(semaglutide.regulatoryStatus.currentCategory).toBe("approved");
  });

  it("tirzepatide: FDA approved, 2.5-15mg weekly", () => {
    expect(tirzepatide.approvalStatus).toBe("approved");
    expect(tirzepatide.clinicalDoseRange.min).toBe(2.5);
    expect(tirzepatide.clinicalDoseRange.max).toBe(15);
    expect(tirzepatide.clinicalDoseRange.frequency).toBe("weekly");
  });

  it("retatrutide: investigational, 2-12mg weekly", () => {
    expect(retatrutide.approvalStatus).toBe("investigational");
    expect(retatrutide.clinicalDoseRange.min).toBe(2);
    expect(retatrutide.clinicalDoseRange.max).toBe(12);
    expect(retatrutide.regulatoryStatus.currentCategory).toBe("investigational");
  });

  it("tesamorelin: FDA approved, 2mg daily", () => {
    expect(tesamorelin.approvalStatus).toBe("approved");
    expect(tesamorelin.clinicalDoseRange.min).toBe(2);
    expect(tesamorelin.clinicalDoseRange.max).toBe(2);
    expect(tesamorelin.clinicalDoseRange.frequency).toBe("daily");
  });
});

describe("category distribution", () => {
  it("has compounds in all expected categories", () => {
    const categories = new Set(COMPOUNDS.map((c) => c.category));
    expect(categories.has("glp1")).toBe(true);
    expect(categories.has("growth-recovery")).toBe(true);
    expect(categories.has("gh-secretagogue")).toBe(true);
    expect(categories.has("neuropeptide")).toBe(true);
    expect(categories.has("longevity-immune")).toBe(true);
  });
});

describe("regulatory status consistency", () => {
  it("all cat2 compounds have dateRestricted 2023-09-29", () => {
    const cat2 = COMPOUNDS.filter(
      (c) => c.regulatoryStatus.currentCategory === "cat2",
    );
    expect(cat2.length).toBeGreaterThan(0);
    for (const c of cat2) {
      expect(c.regulatoryStatus.dateRestricted).toBe("2023-09-29");
    }
  });

  it("all pending reclassification compounds have dateAnnouncedReturn 2026-02-27", () => {
    const pending = COMPOUNDS.filter(
      (c) => c.regulatoryStatus.reclassificationStatus === "pending",
    );
    expect(pending.length).toBeGreaterThan(0);
    for (const c of pending) {
      expect(c.regulatoryStatus.dateAnnouncedReturn).toBe("2026-02-27");
    }
  });

  it("approved compounds have stable reclassification", () => {
    const approved = COMPOUNDS.filter(
      (c) => c.regulatoryStatus.currentCategory === "approved",
    );
    for (const c of approved) {
      expect(c.regulatoryStatus.reclassificationStatus).toBe("stable");
    }
  });
});

describe("data corrections (audit-verified)", () => {
  it("BPC-157 half-life is 15-30 minutes, not 4 hours", () => {
    const bpc = getCompoundBySlug("bpc-157");
    expect(bpc!.halfLife).toContain("15-30 minutes");
  });

  it("Kisspeptin-10 dose range is weight-based (75-750 mcg for ~75kg)", () => {
    const kiss = getCompoundBySlug("kisspeptin-10");
    expect(kiss!.clinicalDoseRange.min).toBe(75);
    expect(kiss!.clinicalDoseRange.max).toBe(750);
    expect(kiss!.clinicalDoseRange.frequencyLabel).toContain("mcg/kg");
  });

  it("Retatrutide has Phase 3 TRIUMPH protocol with 9mg step", () => {
    const reta = getCompoundBySlug("retatrutide");
    const triumph = reta!.titrationProtocols.find((p) =>
      p.name.includes("TRIUMPH"),
    );
    expect(triumph).toBeDefined();
    expect(triumph!.steps.some((s) => s.dose === 9)).toBe(true);
  });

  it("GHK-Cu default BAC water is 4mL for 50mg vials", () => {
    const ghk = getCompoundBySlug("ghk-cu");
    expect(ghk!.defaultBacWaterMl).toBe(4);
  });
});

describe("dosing evidence disclaimers", () => {
  it("all research compounds have dosingEvidence field", () => {
    const research = COMPOUNDS.filter((c) => c.approvalStatus === "research");
    expect(research.length).toBe(19);
    for (const c of research) {
      expect(c.dosingEvidence).toBeDefined();
      expect(["preclinical", "limited-human"]).toContain(c.dosingEvidence);
      expect(c.dosingEvidenceNote).toBeTruthy();
    }
  });

  it("preclinical compounds have correct disclaimer text", () => {
    const preclinical = COMPOUNDS.filter(
      (c) => c.dosingEvidence === "preclinical",
    );
    expect(preclinical.length).toBe(10);
    for (const c of preclinical) {
      expect(c.dosingEvidenceNote).toContain("animal studies");
    }
  });

  it("limited-human compounds have correct disclaimer text", () => {
    const limited = COMPOUNDS.filter(
      (c) => c.dosingEvidence === "limited-human",
    );
    expect(limited.length).toBe(9);
    for (const c of limited) {
      expect(c.dosingEvidenceNote).toContain("small human studies");
    }
  });

  it("approved compounds do not have dosingEvidence", () => {
    const approved = COMPOUNDS.filter(
      (c) => c.approvalStatus === "approved",
    );
    for (const c of approved) {
      expect(c.dosingEvidence).toBeUndefined();
    }
  });

  it("all citation objects have sourceUrl", () => {
    for (const c of COMPOUNDS) {
      for (const citation of c.citations) {
        expect(citation.sourceUrl).toBeTruthy();
      }
    }
  });
});
