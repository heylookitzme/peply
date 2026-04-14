import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeedbackForm } from "./FeedbackForm";
import { SuggestionsFeed } from "./SuggestionsFeed";
import type {
  Suggestion,
  SuggestionCategory,
  SuggestionWithVote,
} from "@/lib/feedback/types";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Submit feature requests, compound requests, and bug reports for Peply. See what the community is asking for and upvote.",
  alternates: { canonical: "/feedback" },
};

interface FeedbackPageProps {
  searchParams: Promise<{ sort?: string; category?: string }>;
}

export default async function FeedbackPage({
  searchParams,
}: FeedbackPageProps): Promise<React.ReactElement> {
  const params = await searchParams;
  const sort = params.sort === "recent" ? "recent" : "popular";
  const category = params.category ?? null;

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const viewerId = authData.user?.id ?? null;

  let query = supabase
    .from("suggestions")
    .select(
      "id, user_id, show_attribution, category, title, description, upvotes, created_at",
    )
    .eq("hidden", false);

  if (category) {
    query = query.eq("category", category);
  }

  query =
    sort === "recent"
      ? query.order("created_at", { ascending: false })
      : query
          .order("upvotes", { ascending: false })
          .order("created_at", { ascending: false });

  const { data: suggestionsRaw } = await query.limit(100);
  const suggestions = (suggestionsRaw ?? []) as Suggestion[];

  let viewerVotes = new Set<string>();
  const attributionById = new Map<string, string>();

  if (viewerId) {
    const ids = suggestions.map((s) => s.id);
    if (ids.length > 0) {
      const { data: votes } = await supabase
        .from("suggestion_votes")
        .select("suggestion_id")
        .eq("user_id", viewerId)
        .in("suggestion_id", ids);
      viewerVotes = new Set(
        (votes ?? []).map((v) => (v as { suggestion_id: string }).suggestion_id),
      );
    }
  }

  const attributedUserIds = Array.from(
    new Set(
      suggestions
        .filter((s) => s.show_attribution && s.user_id)
        .map((s) => s.user_id as string),
    ),
  );
  if (attributedUserIds.length > 0) {
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("id, display_name")
      .in("id", attributedUserIds);
    for (const row of (profiles ?? []) as { id: string; display_name: string | null }[]) {
      if (row.display_name) attributionById.set(row.id, row.display_name);
    }
  }

  const feedItems: SuggestionWithVote[] = suggestions.map((s) => ({
    ...s,
    viewerUpvoted: viewerVotes.has(s.id),
    attributionName:
      s.show_attribution && s.user_id
        ? attributionById.get(s.user_id) ?? "Peply user"
        : null,
  }));

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Feedback"
        title="Help shape Peply"
        emphasisWord="Peply"
        subtitle="Suggest features, request compounds, report bugs. Upvote what matters."
      />

      <div className="mt-8 space-y-10">
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
            Submit a suggestion
          </h2>
          <FeedbackForm isSignedIn={Boolean(viewerId)} />
        </section>

        <hr className="border-border" />

        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
            Community suggestions
          </h2>
          <SuggestionsFeed
            items={feedItems}
            sort={sort}
            category={category as SuggestionCategory | null}
            isSignedIn={Boolean(viewerId)}
          />
        </section>
      </div>
    </div>
  );
}
