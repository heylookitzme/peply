import { describe, it, expect } from "vitest";
import {
  convertDoseUnit,
  normalizeToMgInternal,
  normalizeToMcg,
} from "@/lib/calculations/convertDoseUnit";

describe("convertDoseUnit", () => {
  it("returns same value when units match", () => {
    expect(convertDoseUnit(5, "mg", "mg")).toBe(5);
    expect(convertDoseUnit(500, "mcg", "mcg")).toBe(500);
  });

  it("converts mg to mcg", () => {
    expect(convertDoseUnit(1, "mg", "mcg")).toBe(1000);
    expect(convertDoseUnit(0.25, "mg", "mcg")).toBe(250);
    expect(convertDoseUnit(5, "mg", "mcg")).toBe(5000);
  });

  it("converts mcg to mg", () => {
    expect(convertDoseUnit(1000, "mcg", "mg")).toBe(1);
    expect(convertDoseUnit(250, "mcg", "mg")).toBe(0.25);
    expect(convertDoseUnit(500, "mcg", "mg")).toBe(0.5);
  });

  it("handles zero", () => {
    expect(convertDoseUnit(0, "mg", "mcg")).toBe(0);
    expect(convertDoseUnit(0, "mcg", "mg")).toBe(0);
  });

  it("handles very small values", () => {
    expect(convertDoseUnit(0.001, "mg", "mcg")).toBe(1);
    expect(convertDoseUnit(1, "mcg", "mg")).toBe(0.001);
  });
});

describe("normalizeToMgInternal", () => {
  it("passes mg through unchanged", () => {
    expect(normalizeToMgInternal(5, "mg")).toBe(5);
  });

  it("converts mcg to mg", () => {
    expect(normalizeToMgInternal(1000, "mcg")).toBe(1);
  });
});

describe("normalizeToMcg", () => {
  it("passes mcg through unchanged", () => {
    expect(normalizeToMcg(500, "mcg")).toBe(500);
  });

  it("converts mg to mcg", () => {
    expect(normalizeToMcg(1, "mg")).toBe(1000);
  });
});
