"use client";

import { createClient } from "@/utils/supabase/client";
import type { DoseUnit, SyringeType } from "@/types/calculator";

export type FavoriteKind = "compound" | "stack";

export type UserProfile = {
  id: string;
  display_name: string | null;
  favorite_compounds: string[];
  favorite_stacks: string[];
  created_at: string;
  updated_at: string;
};

export type CalculatorPreset = {
  id: string;
  user_id: string;
  name: string;
  compound_slug: string | null;
  vial_strength: number;
  vial_unit: DoseUnit | "iu";
  diluent_volume: number;
  target_dose: number;
  dose_unit: DoseUnit | "iu";
  syringe_type: SyringeType | null;
  created_at: string;
};

export type PresetInput = {
  name: string;
  compound_slug: string | null;
  vial_strength: number;
  vial_unit: DoseUnit | "iu";
  diluent_volume: number;
  target_dose: number;
  dose_unit: DoseUnit | "iu";
  syringe_type: SyringeType | null;
};

async function ensureProfile(userId: string): Promise<UserProfile> {
  const supabase = createClient();
  const existing = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (existing.data) return existing.data as UserProfile;

  const inserted = await supabase
    .from("user_profiles")
    .insert({ id: userId })
    .select("*")
    .single();
  if (inserted.error) throw inserted.error;
  return inserted.data as UserProfile;
}

export async function getProfile(userId: string): Promise<UserProfile> {
  return ensureProfile(userId);
}

export async function setDisplayName(
  userId: string,
  displayName: string,
): Promise<void> {
  const supabase = createClient();
  const value = displayName.trim() || null;
  const { error } = await supabase
    .from("user_profiles")
    .update({ display_name: value })
    .eq("id", userId);
  if (error) throw error;
}

export async function toggleFavorite(
  userId: string,
  kind: FavoriteKind,
  slug: string,
): Promise<string[]> {
  const supabase = createClient();
  const profile = await ensureProfile(userId);
  const column = kind === "compound" ? "favorite_compounds" : "favorite_stacks";
  const current =
    kind === "compound" ? profile.favorite_compounds : profile.favorite_stacks;
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  const { error } = await supabase
    .from("user_profiles")
    .update({ [column]: next })
    .eq("id", userId);
  if (error) throw error;
  return next;
}

export async function listPresets(userId: string): Promise<CalculatorPreset[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("calculator_presets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CalculatorPreset[];
}

export async function createPreset(
  userId: string,
  input: PresetInput,
): Promise<CalculatorPreset> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("calculator_presets")
    .insert({ user_id: userId, ...input })
    .select("*")
    .single();
  if (error) throw error;
  return data as CalculatorPreset;
}

export async function deletePreset(presetId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("calculator_presets")
    .delete()
    .eq("id", presetId);
  if (error) throw error;
}
