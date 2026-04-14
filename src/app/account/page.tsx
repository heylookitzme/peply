import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Your Peply account. Manage display name, favorites, and calculator presets.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false },
};

export default async function AccountPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    redirect("/auth/login?next=/account");
  }

  const [{ data: profile }, { count: presetCount }] = await Promise.all([
    supabase
      .from("user_profiles")
      .select("display_name, favorite_compounds, favorite_stacks")
      .eq("id", authData.user.id)
      .maybeSingle<{
        display_name: string | null;
        favorite_compounds: string[];
        favorite_stacks: string[];
      }>(),
    supabase
      .from("calculator_presets")
      .select("id", { count: "exact", head: true })
      .eq("user_id", authData.user.id),
  ]);

  const favoritesCount =
    (profile?.favorite_compounds?.length ?? 0) +
    (profile?.favorite_stacks?.length ?? 0);

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-3">
        Account
      </p>
      <h1 className="font-serif text-[32px] leading-tight tracking-tight mb-3">
        Your <em className="italic">Account</em>
      </h1>
      <p className="text-[12px] text-text-secondary mb-10 leading-relaxed">
        Your account contains saved preferences only. Peply does not store
        health data, dosing history, or personal medical information.
      </p>

      <AccountClient
        userId={authData.user.id}
        email={authData.user.email ?? ""}
        initialDisplayName={profile?.display_name ?? ""}
        favoritesCount={favoritesCount}
        presetsCount={presetCount ?? 0}
      />

      <div className="mt-10 flex flex-wrap gap-6 text-[13px]">
        <Link href="/favorites" className="text-accent hover:underline">
          View favorites &rarr;
        </Link>
        <Link href="/account/presets" className="text-accent hover:underline">
          View presets &rarr;
        </Link>
      </div>
    </div>
  );
}
