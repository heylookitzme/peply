"use server";

import { createClient } from "@/utils/supabase/server";

export interface RegisterResult {
  success: boolean;
  error?: string;
}

export async function registerVendor(formData: FormData): Promise<RegisterResult> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const businessName = (formData.get("business_name") as string)?.trim();
  const licenseNumber = (formData.get("license_number") as string)?.trim() || null;
  const contactEmail = (formData.get("contact_email") as string)?.trim();

  if (!email || !password || !businessName || !contactEmail) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    // Return generic error to avoid leaking account existence info
    return { success: false, error: "Registration failed. Please check your details and try again." };
  }

  if (!authData.user) {
    return { success: false, error: "Registration failed. Please try again." };
  }

  // Create vendor account
  const { error: vendorError } = await supabase.from("vendor_accounts").insert({
    id: authData.user.id,
    business_name: businessName,
    license_number: licenseNumber,
    contact_email: contactEmail,
  });

  if (vendorError) {
    return { success: false, error: "Account created but vendor profile failed. Contact support." };
  }

  return { success: true };
}
