import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import { getStackBySlug } from "@/lib/constants/stacks";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved compounds and stacks.",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: false },
};

export default async function FavoritesPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    redirect("/auth/login?next=/favorites");
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("favorite_compounds, favorite_stacks")
    .eq("id", authData.user.id)
    .maybeSingle<{ favorite_compounds: string[]; favorite_stacks: string[] }>();

  type CompoundEntry = NonNullable<ReturnType<typeof getCompoundBySlug>>;
  type StackEntry = NonNullable<ReturnType<typeof getStackBySlug>>;

  const favoriteCompounds: CompoundEntry[] = (profile?.favorite_compounds ?? [])
    .map((slug) => getCompoundBySlug(slug))
    .filter((c): c is CompoundEntry => Boolean(c));

  const favoriteStacks: StackEntry[] = (profile?.favorite_stacks ?? [])
    .map((slug) => getStackBySlug(slug))
    .filter((s): s is StackEntry => Boolean(s));

  const isEmpty = favoriteCompounds.length === 0 && favoriteStacks.length === 0;

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-3">
        Account
      </p>
      <h1 className="font-serif text-[32px] leading-tight tracking-tight mb-3">
        Your <em className="italic">Favorites</em>
      </h1>
      <p className="text-[15px] text-text-secondary mb-8">
        Saved compounds and stacks. Sync across devices as long as you&apos;re
        signed in.
      </p>

      {isEmpty ? (
        <Card>
          <p className="text-[15px] mb-2">You haven&apos;t saved anything yet.</p>
          <p className="text-[13px] text-text-secondary">
            Browse{" "}
            <Link href="/compounds" className="text-accent hover:underline">
              compounds
            </Link>{" "}
            or{" "}
            <Link href="/stacks" className="text-accent hover:underline">
              stacks
            </Link>{" "}
            and tap the save button to bookmark them here.
          </p>
        </Card>
      ) : (
        <div className="space-y-10">
          {favoriteCompounds.length > 0 && (
            <section>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
                Compounds
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteCompounds.map((c: CompoundEntry) => (
                  <Link key={c.slug} href={`/compounds/${c.slug}`}>
                    <Card className="h-full hover:border-text-secondary transition-colors duration-150">
                      <h3 className="font-serif text-[20px] leading-tight mb-1">
                        {c.name}
                      </h3>
                      <p className="text-[12px] text-text-secondary line-clamp-3">
                        {c.summary}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {favoriteStacks.length > 0 && (
            <section>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
                Stacks
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteStacks.map((s: StackEntry) => (
                  <Link key={s.slug} href={`/stacks/${s.slug}`}>
                    <Card className="h-full hover:border-text-secondary transition-colors duration-150">
                      <h3 className="font-serif text-[20px] leading-tight mb-1">
                        {s.name}
                      </h3>
                      <p className="text-[12px] text-text-secondary line-clamp-3">
                        {s.summary}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
