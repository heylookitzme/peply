"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginVendor(formData: FormData): Promise<LoginResult> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Please fill in all fields." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: "Invalid email or password." };
  }

  redirect("/vendor/submit");
}
