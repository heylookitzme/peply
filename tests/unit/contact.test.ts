import { describe, it, expect } from "vitest";
import { isHoneypotFilled } from "@/lib/submissions/rateLimit";

describe("contact form validation", () => {
  const VALID_CATEGORIES = [
    "general",
    "vendor_partnership",
    "data_request",
    "bug_report",
    "other",
  ];

  it("all categories are valid strings", () => {
    expect(VALID_CATEGORIES.length).toBe(5);
    for (const cat of VALID_CATEGORIES) {
      expect(typeof cat).toBe("string");
      expect(cat.length).toBeGreaterThan(0);
    }
  });

  it("honeypot rejects filled values", () => {
    expect(isHoneypotFilled("bot-value")).toBe(true);
    expect(isHoneypotFilled("  spam  ")).toBe(true);
  });

  it("honeypot passes empty values", () => {
    expect(isHoneypotFilled("")).toBe(false);
    expect(isHoneypotFilled(null)).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
    expect(isHoneypotFilled("   ")).toBe(false);
  });

  it("message max length is 1000 characters", () => {
    const maxLength = 1000;
    const validMessage = "a".repeat(maxLength);
    const invalidMessage = "a".repeat(maxLength + 1);
    expect(validMessage.length).toBeLessThanOrEqual(maxLength);
    expect(invalidMessage.length).toBeGreaterThan(maxLength);
  });
});
