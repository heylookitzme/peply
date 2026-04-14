export const SUGGESTION_CATEGORIES = [
  { value: "feature_request", label: "Feature Request" },
  { value: "compound_request", label: "New Compound Request" },
  { value: "bug_report", label: "Bug Report" },
  { value: "general_feedback", label: "General Feedback" },
] as const;

export type SuggestionCategory =
  (typeof SUGGESTION_CATEGORIES)[number]["value"];

export const SUGGESTION_CATEGORY_LABELS: Record<SuggestionCategory, string> =
  Object.fromEntries(SUGGESTION_CATEGORIES.map((c) => [c.value, c.label])) as Record<
    SuggestionCategory,
    string
  >;

export type Suggestion = {
  id: string;
  user_id: string | null;
  show_attribution: boolean;
  category: SuggestionCategory;
  title: string;
  description: string | null;
  upvotes: number;
  created_at: string;
};
