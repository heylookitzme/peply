import { z } from "zod/v4";
import {
  COMPOUND_CATEGORIES,
  APPROVAL_STATUSES,
  ROUTES,
  EVIDENCE_LEVELS,
} from "@/types/content";

export const compoundSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  aliases: z.array(z.string()),
  category: z.enum(COMPOUND_CATEGORIES),
  summary: z.string().min(1),
  mechanism: z.string().optional(),
  defaultRoute: z.enum(ROUTES).optional(),
  approvalStatus: z.enum(APPROVAL_STATUSES),
});

export const protocolSchema = z.object({
  id: z.string().min(1),
  compoundId: z.string().min(1),
  name: z.string().min(1),
  protocolType: z.enum(["label", "trial", "reference"]),
  route: z.enum(ROUTES),
  frequency: z.enum(["daily", "weekly", "twice_weekly", "other"]),
  frequencyLabel: z.string().min(1),
  targetPopulation: z.string().optional(),
  evidenceLevel: z.enum(EVIDENCE_LEVELS),
  citationIds: z.array(z.string().min(1)).min(1),
});

export const protocolStepSchema = z.object({
  id: z.string().min(1),
  protocolId: z.string().min(1),
  order: z.number().int().positive(),
  dose: z.number().positive(),
  unit: z.enum(["mg", "mcg"]),
  durationWeeks: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export const citationSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  title: z.string().min(1),
  source: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  publishedAt: z.string().optional(),
  lastReviewedAt: z.string().min(1),
});
