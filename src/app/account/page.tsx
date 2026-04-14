import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Card } from "@/components/ui/Card";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import { getStackBySlug } from "@/lib/constants/stacks";
import { AccountClient } from "./AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Your Peply account. Manage display name, favorites, and calculator presets.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false },
};

type PresetRow = { id: string; name: string; compound_slug: string | null };

export default async function AccountPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    redirect("/auth/login?next=/account");
  }

  const [
    { data: profile },
    { data: presetRowsRaw, count: presetCount },
    { count: suggestionCount },
  ] = await Promise.all([
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
      .select("id, name, compound_slug", { count: "exact" })
      .eq("user_id", authData.user.id)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("suggestions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", authData.user.id)
      .eq("hidden", false),
  ]);

  const favoriteCompoundSlugs = profile?.favorite_compounds ?? [];
  const favoriteStackSlugs = profile?.favorite_stacks ?? [];
  const favoritesCount =
    favoriteCompoundSlugs.length + favoriteStackSlugs.length;

  const favoritePreviews: { label: string; href: string; kind: string }[] = [
    ...favoriteCompoundSlugs
      .map((slug) => {
        const c = getCompoundBySlug(slug);
        return c
          ? { label: c.name, href: `/compounds/${c.slug}`, kind: "Compound" }
          : null;
      })
      .filter((x): x is { label: string; href: string; kind: string } => !!x),
    ...favoriteStackSlugs
      .map((slug) => {
        const s = getStackBySlug(slug);
        return s
          ? { label: s.name, href: `/stacks/${s.slug}`, kind: "Stack" }
          : null;
      })
      .filter((x): x is { label: string; href: string; kind: string } => !!x),
  ].slice(0, 3);

  const presetRows = (presetRowsRaw ?? []) as PresetRow[];
  const presetsCountNum = presetCount ?? 0;
  const suggestionsCountNum = suggestionCount ?? 0;

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
        presetsCount={presetsCountNum}
        suggestionsCount={suggestionsCountNum}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Your favorites"
          count={favoritesCount}
          countLabel={favoritesCount === 1 ? "saved item" : "saved items"}
          href="/favorites"
          linkLabel="View all"
        >
          {favoritePreviews.length === 0 ? (
            <p className="text-[13px] text-text-secondary">
              No favorites yet. Tap the heart on any compound or stack.
            </p>
          ) : (
            <ul className="space-y-1.5 text-[13px]">
              {favoritePreviews.map((f) => (
                <li key={f.href} className="flex items-baseline gap-2">
                  <span className="text-[10px] uppercase tracking-[0.08em] text-text-secondary shrink-0">
                    {f.kind}
                  </span>
                  <span className="text-text truncate">{f.label}</span>
                </li>
              ))}
            </ul>
          )}
        </SummaryCard>

        <SummaryCard
          title="Calculator presets"
          count={presetsCountNum}
          countLabel={presetsCountNum === 1 ? "saved preset" : "saved presets"}
          href="/account/presets"
          linkLabel="View all"
        >
          {presetRows.length === 0 ? (
            <p className="text-[13px] text-text-secondary">
              No presets yet. Save one from the calculator results.
            </p>
          ) : (
            <ul className="space-y-1.5 text-[13px]">
              {presetRows.map((p) => (
                <li key={p.id} className="truncate">
                  <span className="text-text">{p.name}</span>
                  {p.compound_slug && (
                    <span className="text-text-secondary">
                      {" · "}
                      {getCompoundBySlug(p.compound_slug)?.name ?? p.compound_slug}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </SummaryCard>

        <SummaryCard
          title="Your suggestions"
          count={suggestionsCountNum}
          countLabel={
            suggestionsCountNum === 1
              ? "suggestion submitted"
              : "suggestions submitted"
          }
          href="/feedback"
          linkLabel="Submit feedback"
        >
          <p className="text-[13px] text-text-secondary">
            Share feature ideas, compound requests, and bug reports. We review
            every submission.
          </p>
        </SummaryCard>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  count,
  countLabel,
  href,
  linkLabel,
  children,
}: {
  title: string;
  count: number;
  countLabel: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <Card className="flex flex-col h-full">
      <h3 className="text-base font-semibold mb-3">{title}</h3>
      <p className="flex items-baseline gap-1.5 mb-4">
        <span className="font-mono text-[28px] leading-none text-text">
          {count}
        </span>
        <span className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
          {countLabel}
        </span>
      </p>
      <div className="flex-1 mb-4">{children}</div>
      <Link
        href={href}
        className="text-[13px] text-accent hover:underline self-start"
      >
        {linkLabel} &rarr;
      </Link>
    </Card>
  );
}
