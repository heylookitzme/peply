import { describe, it, expect } from "vitest";
import { hashIp, isHoneypotFilled, MAX_SUBMISSIONS_PER_HOUR } from "@/lib/submissions/rateLimit";
import { COMPOUNDS } from "@/lib/constants/compounds";
import {
  EFFECT_OPTIONS,
  ROUTE_OPTIONS,
  SOURCE_TYPE_OPTIONS,
  SUBMIT_AGAIN_OPTIONS,
  CONTAMINANT_OPTIONS,
} from "@/lib/submissions/types";

describe("rate limiting", () => {
  it("hashIp produces consistent hex output", async () => {
    const hash1 = await hashIp("192.168.1.1");
    const hash2 = await hashIp("192.168.1.1");
    expect(hash1).toBe(hash2);
    expect(hash1).toMatch(/^[0-9a-f]{64}$/);
  });

  it("hashIp produces different hashes for different IPs", async () => {
    const hash1 = await hashIp("192.168.1.1");
    const hash2 = await hashIp("192.168.1.2");
    expect(hash1).not.toBe(hash2);
  });

  it("hashIp does not return the raw IP", async () => {
    const ip = "192.168.1.1";
    const hash = await hashIp(ip);
    expect(hash).not.toContain(ip);
  });

  it("MAX_SUBMISSIONS_PER_HOUR is 10", () => {
    expect(MAX_SUBMISSIONS_PER_HOUR).toBe(10);
  });
});

describe("honeypot", () => {
  it("detects filled honeypot", () => {
    expect(isHoneypotFilled("spam")).toBe(true);
    expect(isHoneypotFilled("  spam  ")).toBe(true);
  });

  it("passes empty honeypot", () => {
    expect(isHoneypotFilled("")).toBe(false);
    expect(isHoneypotFilled(null)).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
    expect(isHoneypotFilled("   ")).toBe(false);
  });
});

describe("submission form options", () => {
  it("all effect options have value and label", () => {
    expect(EFFECT_OPTIONS.length).toBeGreaterThan(0);
    for (const opt of EFFECT_OPTIONS) {
      expect(opt.value).toBeTruthy();
      expect(opt.label).toBeTruthy();
    }
  });

  it("all route options are valid DB values", () => {
    const validRoutes = ["sc", "im", "oral"];
    for (const opt of ROUTE_OPTIONS) {
      expect(validRoutes).toContain(opt.value);
    }
  });

  it("all source type options are valid DB values", () => {
    const validSources = ["compounding_pharmacy", "research_supplier", "clinic", "other"];
    for (const opt of SOURCE_TYPE_OPTIONS) {
      expect(validSources).toContain(opt.value);
    }
  });

  it("submit again options match DB check constraint", () => {
    const validValues = ["yes", "no", "unsure"];
    for (const opt of SUBMIT_AGAIN_OPTIONS) {
      expect(validValues).toContain(opt.value);
    }
  });

  it("contaminant options have value and label", () => {
    expect(CONTAMINANT_OPTIONS.length).toBe(5);
    for (const opt of CONTAMINANT_OPTIONS) {
      expect(opt.value).toBeTruthy();
      expect(opt.label).toBeTruthy();
    }
  });
});

describe("compound validation", () => {
  it("all compound slugs are non-empty strings", () => {
    for (const c of COMPOUNDS) {
      expect(c.slug).toBeTruthy();
      expect(typeof c.slug).toBe("string");
    }
  });

  it("compound slugs are unique", () => {
    const slugs = COMPOUNDS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
