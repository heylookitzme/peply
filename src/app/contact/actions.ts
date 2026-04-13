"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { hashIp, isHoneypotFilled } from "@/lib/submissions/rateLimit";

const MAX_CONTACT_PER_HOUR = 5;

const VALID_CATEGORIES = [
  "general",
  "vendor_partnership",
  "data_request",
  "bug_report",
  "other",
] as const;

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  // Honeypot
  const honeypot = formData.get("website") as string | null;
  if (isHoneypotFilled(honeypot)) {
    return { success: true };
  }

  // Validate required fields
  const email = (formData.get("email") as string)?.trim();
  const category = formData.get("category") as string;
  const message = (formData.get("message") as string)?.trim();
  const nameRaw = (formData.get("name") as string)?.trim() || null;
  const name = nameRaw && nameRaw.length <= 200 ? nameRaw : nameRaw?.slice(0, 200) ?? null;

  if (!email || !category || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return { success: false, error: "Invalid category selected." };
  }

  if (message.length > 1000) {
    return { success: false, error: "Message must be 1,000 characters or less." };
  }

  // Rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await hashIp(ip);

  const supabase = await createClient();

  const { data: withinLimit } = await supabase.rpc("check_contact_rate_limit", {
    p_ip_hash: ipHash,
    p_max_per_hour: MAX_CONTACT_PER_HOUR,
  });

  if (withinLimit === false) {
    return { success: false, error: "Too many messages. Please try again later." };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    category,
    message,
    ip_hash: ipHash,
  });

  if (error) {
    return { success: false, error: "Message failed to send. Please try again." };
  }

  return { success: true };
}
