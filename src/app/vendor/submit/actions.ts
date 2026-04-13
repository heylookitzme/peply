"use server";

import { createClient } from "@/utils/supabase/server";
import { COMPOUNDS } from "@/lib/constants/compounds";

export interface VendorSubmitResult {
  success: boolean;
  error?: string;
}

export async function submitVendorData(formData: FormData): Promise<VendorSubmitResult> {
  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "You must be logged in." };
  }

  // Check vendor is verified
  const { data: vendor } = await supabase
    .from("vendor_accounts")
    .select("verified")
    .eq("id", user.id)
    .single();

  if (!vendor?.verified) {
    return { success: false, error: "Your vendor account is pending verification." };
  }

  // Validate
  const compoundSlug = formData.get("compound_slug") as string;
  if (!compoundSlug || !COMPOUNDS.some((c) => c.slug === compoundSlug)) {
    return { success: false, error: "Invalid compound selected." };
  }

  const notes = (formData.get("notes") as string) ?? "";
  if (notes.length > 500) {
    return { success: false, error: "Notes must be 500 characters or less." };
  }

  const purityStr = formData.get("purity_percentage") as string;
  const purityPercentage = purityStr ? parseFloat(purityStr) : null;

  const contaminants = formData.getAll("contaminants_tested") as string[];
  const potencyVerified = formData.get("potency_verified") === "yes";
  const coaFileUrl = (formData.get("coa_file_url") as string) || "";

  const { error } = await supabase.from("vendor_submissions").insert({
    vendor_id: user.id,
    compound_slug: compoundSlug,
    batch_number: (formData.get("batch_number") as string) || null,
    purity_percentage: purityPercentage,
    contaminants_tested: contaminants.length > 0 ? contaminants : null,
    potency_verified: potencyVerified,
    coa_file_url: coaFileUrl || null,
    notes: notes || null,
  });

  if (error) {
    return { success: false, error: "Submission failed. Please try again." };
  }

  return { success: true };
}
