import { describe, it, expect } from "vitest";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import {
  TIMELINE_MILESTONES,
  REMAINING_RESTRICTED,
} from "@/lib/constants/regulatory";

describe("regulatory tracker data", () => {
  const regulatedCompounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "cat2" ||
      c.regulatoryStatus.currentCategory === "cat1",
  );

  const approvedCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.currentCategory === "approved",
  );

  const investigationalCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.currentCategory === "investigational",
  );

  it("all regulated compounds resolve to real compound data", () => {
    expect(regulatedCompounds.length).toBeGreaterThan(0);
    for (const c of regulatedCompounds) {
      expect(c.slug).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.regulatoryStatus.lastUpdated).toBeTruthy();
    }
  });

  it("all approved compounds resolve to real compound data", () => {
    expect(approvedCompounds.length).toBeGreaterThan(0);
    for (const c of approvedCompounds) {
      expect(c.slug).toBeTruthy();
      expect(c.regulatoryStatus.currentCategory).toBe("approved");
    }
  });

  it("investigational compounds resolve to real compound data", () => {
    expect(investigationalCompounds.length).toBeGreaterThan(0);
    for (const c of investigationalCompounds) {
      expect(c.slug).toBeTruthy();
      expect(c.regulatoryStatus.currentCategory).toBe("investigational");
    }
  });

  it("cat2 compounds have dateRestricted and dateAnnouncedReturn", () => {
    const cat2 = COMPOUNDS.filter(
      (c) => c.regulatoryStatus.currentCategory === "cat2",
    );
    expect(cat2.length).toBeGreaterThan(0);
    for (const c of cat2) {
      expect(c.regulatoryStatus.dateRestricted).toBe("2023-09-29");
      // Compounds returning to Cat 1 carry an announced return date.
      // Compounds that stay restricted (reclassificationStatus "stable") do not.
      if (c.regulatoryStatus.reclassificationStatus !== "stable") {
        expect(c.regulatoryStatus.dateAnnouncedReturn).toBe("2026-02-27");
      } else {
        expect(c.regulatoryStatus.dateAnnouncedReturn).toBeUndefined();
      }
    }
  });

  it("remaining restricted compounds all have names, reasons, and dates", () => {
    expect(REMAINING_RESTRICTED.length).toBe(5);
    for (const c of REMAINING_RESTRICTED) {
      expect(c.name).toBeTruthy();
      expect(c.reason).toBeTruthy();
      expect(c.dateRestricted).toBe("2023-09-29");
    }
  });

  it("remaining restricted compounds are the expected set", () => {
    const names = REMAINING_RESTRICTED.map((c) => c.name);
    expect(names).toContain("Melanotan II");
    expect(names).toContain("GHRP-2");
    expect(names).toContain("GHRP-6");
    expect(names).toContain("LL-37 (Cathelicidin)");
    expect(names).toContain("PEG-MGF");
  });

  it("timeline has 3 milestones in chronological order", () => {
    expect(TIMELINE_MILESTONES.length).toBe(3);
    expect(TIMELINE_MILESTONES[0].date).toBe("2023-09-29");
    expect(TIMELINE_MILESTONES[0].status).toBe("completed");
    expect(TIMELINE_MILESTONES[1].date).toBe("2026-02-27");
    expect(TIMELINE_MILESTONES[1].status).toBe("completed");
    expect(TIMELINE_MILESTONES[2].date).toBe("TBD");
    expect(TIMELINE_MILESTONES[2].status).toBe("pending");
  });

  it("status badges render correctly for each regulatory type", () => {
    // Approved
    const approved = approvedCompounds[0];
    const approvedBadge = getRegulatoryBadge(approved);
    expect(approvedBadge.label).toBe("FDA Approved");
    expect(approvedBadge.style).toContain("success");

    // Cat 2 pending
    const cat2Pending = COMPOUNDS.find(
      (c) =>
        c.regulatoryStatus.currentCategory === "cat2" &&
        c.regulatoryStatus.reclassificationStatus === "pending",
    )!;
    const pendingBadge = getRegulatoryBadge(cat2Pending);
    expect(pendingBadge.label).toContain("Pending");
    expect(pendingBadge.style).toContain("warning");

    // Investigational
    const inv = investigationalCompounds[0];
    const invBadge = getRegulatoryBadge(inv);
    expect(invBadge.label).toBe("Investigational");
    expect(invBadge.style).toContain("info");

    // Cat 1 stable
    const cat1Stable = COMPOUNDS.find(
      (c) =>
        c.regulatoryStatus.currentCategory === "cat1" &&
        c.regulatoryStatus.reclassificationStatus === "stable",
    );
    if (cat1Stable) {
      const cat1Badge = getRegulatoryBadge(cat1Stable);
      expect(cat1Badge.label).toBe("Category 1");
      expect(cat1Badge.style).toContain("success");
    }
  });

  it("remaining restricted compounds do not overlap with COMPOUNDS", () => {
    const compoundNames = COMPOUNDS.map((c) => c.name.toLowerCase());
    for (const rc of REMAINING_RESTRICTED) {
      expect(compoundNames).not.toContain(rc.name.toLowerCase());
    }
  });
});
