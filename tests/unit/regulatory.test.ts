import { describe, it, expect } from "vitest";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import {
  TIMELINE_MILESTONES,
  REMAINING_RESTRICTED,
  REMOVED_NOT_IN_DATABASE,
} from "@/lib/constants/regulatory";

describe("regulatory tracker data", () => {
  const regulatedCompounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "cat2" ||
      c.regulatoryStatus.currentCategory === "cat1",
  );

  const removedCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.reclassificationStatus === "removed-from-cat2",
  );

  const approvedCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.currentCategory === "approved",
  );

  const investigationalCompounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "investigational" &&
      c.regulatoryStatus.reclassificationStatus !== "removed-from-cat2",
  );

  it("all regulated compounds resolve to real compound data", () => {
    expect(regulatedCompounds.length).toBeGreaterThan(0);
    for (const c of regulatedCompounds) {
      expect(c.slug).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.regulatoryStatus.lastUpdated).toBeTruthy();
    }
  });

  it("removed-from-cat2 compounds have dateAnnouncedRemoval", () => {
    expect(removedCompounds.length).toBe(12);
    for (const c of removedCompounds) {
      expect(c.regulatoryStatus.dateAnnouncedRemoval).toBe("2026-04-15");
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

  it("cat2 compounds have dateRestricted", () => {
    const cat2 = COMPOUNDS.filter(
      (c) => c.regulatoryStatus.currentCategory === "cat2",
    );
    expect(cat2.length).toBeGreaterThan(0);
    for (const c of cat2) {
      expect(c.regulatoryStatus.dateRestricted).toBe("2023-09-29");
    }
  });

  it("remaining restricted compounds all have names, reasons, and dates", () => {
    expect(REMAINING_RESTRICTED.length).toBe(3);
    for (const c of REMAINING_RESTRICTED) {
      expect(c.name).toBeTruthy();
      expect(c.reason).toBeTruthy();
      expect(c.dateRestricted).toBe("2023-09-29");
    }
  });

  it("remaining restricted compounds are the expected set", () => {
    const names = REMAINING_RESTRICTED.map((c) => c.name);
    expect(names).toContain("GHRP-2");
    expect(names).toContain("GHRP-6");
    expect(names).toContain("PEG-MGF");
  });

  it("all April-15 removal-list compounds now have detail pages", () => {
    expect(REMOVED_NOT_IN_DATABASE).toHaveLength(0);
  });

  it("timeline has 4 milestones in chronological order", () => {
    expect(TIMELINE_MILESTONES.length).toBe(4);
    expect(TIMELINE_MILESTONES[0].date).toBe("2023-09-29");
    expect(TIMELINE_MILESTONES[0].status).toBe("completed");
    expect(TIMELINE_MILESTONES[1].date).toBe("2026-02-27");
    expect(TIMELINE_MILESTONES[1].status).toBe("completed");
    expect(TIMELINE_MILESTONES[2].date).toBe("2026-04-15");
    expect(TIMELINE_MILESTONES[2].status).toBe("completed");
    expect(TIMELINE_MILESTONES[3].status).toBe("pending");
  });

  it("status badges render correctly for each regulatory type", () => {
    // Approved
    const approved = approvedCompounds[0];
    const approvedBadge = getRegulatoryBadge(approved);
    expect(approvedBadge.label).toBe("FDA Approved");
    expect(approvedBadge.style).toContain("success");

    // Removed from Cat 2
    const removed = removedCompounds[0];
    const removedBadge = getRegulatoryBadge(removed);
    expect(removedBadge.label).toBe("Removed from Cat 2");
    expect(removedBadge.style).toContain("2dd4bf");

    // Investigational
    const inv = investigationalCompounds[0];
    const invBadge = getRegulatoryBadge(inv);
    expect(invBadge.label).toBe("Investigational");
    expect(invBadge.style).toContain("info");

    // Previously approved (Sermorelin — cat1 stable, but previously-approved takes priority)
    const prevApproved = COMPOUNDS.find(
      (c) => c.approvalStatus === "previously-approved",
    );
    if (prevApproved) {
      const prevBadge = getRegulatoryBadge(prevApproved);
      expect(prevBadge.label).toBe("Previously Approved");
      expect(prevBadge.style).toContain("text-secondary");
    }

    // Limited indication (PT-141 — approved category, but limited-indication takes priority)
    const limited = COMPOUNDS.find(
      (c) => c.approvalStatus === "limited-indication",
    );
    if (limited) {
      const limitedBadge = getRegulatoryBadge(limited);
      expect(limitedBadge.label).toBe("FDA Approved (Vyleesi)");
      expect(limitedBadge.style).toContain("warning");
    }
  });

  it("remaining restricted compounds do not overlap with COMPOUNDS", () => {
    const compoundNames = COMPOUNDS.map((c) => c.name.toLowerCase());
    for (const rc of REMAINING_RESTRICTED) {
      expect(compoundNames).not.toContain(rc.name.toLowerCase());
    }
  });
});
