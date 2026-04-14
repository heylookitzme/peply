"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { hashIp, isHoneypotFilled } from "@/lib/submissions/rateLimit";

export interface FeedbackResult {
  success: boolean;
  error?: string;
}

const VALID_CATEGORIES = [
  "feature_request",
  "compound_request",
  "bug_report",
  "general_feedback",
] as const;

type Category = (typeof VALID_CATEGORIES)[number];

const MAX_SUGGESTIONS_PER_HOUR = 5;

export async function submitSuggestion(
  formData: FormData,
): Promise<FeedbackResult> {
  const honeypot = formData.get("website") as string | null;
  if (isHoneypotFilled(honeypot)) {
    return { success: true };
  }

  const category = formData.get("category") as string;
  const title = ((formData.get("title") as string) ?? "").trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const showAttribution = formData.get("show_attribution") === "on";

  if (!VALID_CATEGORIES.includes(category as Category)) {
    return { success: false, error: "Pick a category." };
  }
  if (title.length < 3 || title.length > 200) {
    return { success: false, error: "Title must be 3–200 characters." };
  }
  if (description.length > 1000) {
    return { success: false, error: "Description must be 1000 characters or less." };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await hashIp(ip);

  const supabase = await createClient();

  const { data: withinLimit } = await supabase.rpc(
    "check_suggestion_rate_limit",
    { p_ip_hash: ipHash, p_max_per_hour: MAX_SUGGESTIONS_PER_HOUR },
  );
  if (withinLimit === false) {
    return {
      success: false,
      error: "You've submitted several suggestions recently. Please try again in an hour.",
    };
  }

  const { data: authData } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;

  const { error } = await supabase.from("suggestions").insert({
    user_id: userId,
    show_attribution: Boolean(userId) && showAttribution,
    category,
    title,
    description: description || null,
    ip_hash: ipHash,
  });

  if (error) {
    return { success: false, error: "Could not submit. Please try again." };
  }

  revalidatePath("/feedback");
  return { success: true };
}

