"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { hashIp, isHoneypotFilled, MAX_SUBMISSIONS_PER_HOUR } from "@/lib/submissions/rateLimit";
import { COMPOUNDS } from "@/lib/constants/compounds";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitAnonymous(formData: FormData): Promise<SubmitResult> {
  // Honeypot check
  const honeypot = formData.get("website") as string | null;
  if (isHoneypotFilled(honeypot)) {
    // Silently accept to avoid tipping off bots
    return { success: true };
  }

  // Validate required fields
  const compoundSlug = formData.get("compound_slug") as string;
  const doseAmount = parseFloat(formData.get("dose_amount") as string);
  const doseUnit = formData.get("dose_unit") as string;
  const frequency = formData.get("frequency") as string;

  if (!compoundSlug || isNaN(doseAmount) || !doseUnit || !frequency) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!["mg", "mcg"].includes(doseUnit)) {
    return { success: false, error: "Invalid dose unit." };
  }

  // Validate frequency
  const validFrequencies = ["daily", "twice_daily", "3x_week", "5x_week", "weekly", "biweekly", "other"];
  if (!validFrequencies.includes(frequency)) {
    return { success: false, error: "Invalid frequency selected." };
  }

  // Validate compound exists
  const compoundExists = COMPOUNDS.some((c) => c.slug === compoundSlug);
  if (!compoundExists) {
    return { success: false, error: "Invalid compound selected." };
  }

  // Validate effects_notes length
  const effectsNotes = (formData.get("effects_notes") as string) ?? "";
  if (effectsNotes.length > 200) {
    return { success: false, error: "Effects notes must be 200 characters or less." };
  }

  // Rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await hashIp(ip);

  const supabase = await createClient();

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("user_submissions")
    .select("id", { count: "exact", head: true })
    .gte("created_at", oneHourAgo)
    .eq("ip_hash", ipHash);

  if ((count ?? 0) >= MAX_SUBMISSIONS_PER_HOUR) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  // Validate dose_amount range
  if (doseAmount <= 0 || doseAmount > 10000) {
    return { success: false, error: "Dose amount must be between 0 and 10,000." };
  }

  // Parse and validate optional fields
  const durationWeeksRaw = formData.get("duration_weeks")
    ? parseInt(formData.get("duration_weeks") as string, 10)
    : null;
  const durationWeeks = durationWeeksRaw !== null && durationWeeksRaw >= 1 && durationWeeksRaw <= 260
    ? durationWeeksRaw
    : null;

  const routeRaw = (formData.get("route") as string) || null;
  const validRoutes = ["sc", "im", "oral"];
  const route = routeRaw && validRoutes.includes(routeRaw) ? routeRaw : null;

  const sourceRaw = (formData.get("source_type") as string) || null;
  const validSources = ["compounding_pharmacy", "research_supplier", "clinic", "other"];
  const sourceType = sourceRaw && validSources.includes(sourceRaw) ? sourceRaw : null;

  const submitAgainRaw = (formData.get("would_submit_again") as string) || "unsure";
  const validSubmitAgain = ["yes", "no", "unsure"];
  const wouldSubmitAgain = validSubmitAgain.includes(submitAgainRaw) ? submitAgainRaw : "unsure";

  // Parse and validate effects checkboxes
  const validEffects = [
    "desired_effects", "gi_side_effects", "injection_site_reaction",
    "headache", "fatigue", "mood_changes", "sleep_changes",
    "no_notable_effects", "other",
  ];
  const effects = (formData.getAll("effects") as string[]).filter((e) => validEffects.includes(e));

  // Parse and validate bloodwork changes
  const bloodworkJson = formData.get("bloodwork_changes") as string;
  let bloodworkChanges: { marker: string; before: string; after: string }[] = [];
  if (bloodworkJson) {
    try {
      const parsed: unknown = JSON.parse(bloodworkJson);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item: unknown) =>
            typeof item === "object" &&
            item !== null &&
            "marker" in item &&
            "before" in item &&
            "after" in item &&
            typeof (item as Record<string, unknown>).marker === "string" &&
            typeof (item as Record<string, unknown>).before === "string" &&
            typeof (item as Record<string, unknown>).after === "string",
        )
      ) {
        bloodworkChanges = (parsed as { marker: string; before: string; after: string }[])
          .slice(0, 20)
          .map((item) => ({
            marker: String(item.marker).slice(0, 100),
            before: String(item.before).slice(0, 100),
            after: String(item.after).slice(0, 100),
          }));
      }
    } catch {
      // Invalid JSON, skip bloodwork
    }
  }

  // Insert
  const { error } = await supabase.from("user_submissions").insert({
    compound_slug: compoundSlug,
    dose_amount: doseAmount,
    dose_unit: doseUnit,
    frequency,
    duration_weeks: durationWeeks,
    route,
    source_type: sourceType,
    effects,
    effects_notes: effectsNotes,
    bloodwork_changes: bloodworkChanges.length > 0 ? bloodworkChanges : null,
    would_submit_again: wouldSubmitAgain,
    ip_hash: ipHash,
  });

  if (error) {
    return { success: false, error: "Submission failed. Please try again." };
  }

  return { success: true };
}
