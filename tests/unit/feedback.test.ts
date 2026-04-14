import { describe, it, expect, vi, beforeEach } from "vitest";

type InsertCall = { table: string; values: Record<string, unknown> };
const insertCalls: InsertCall[] = [];
const deleteCalls: Array<{ table: string }> = [];

const existingVote = { current: null as { suggestion_id: string } | null };
const rateLimitOk = { current: true };
const authUser = { current: null as { id: string } | null };

function resetMocks(): void {
  insertCalls.length = 0;
  deleteCalls.length = 0;
  existingVote.current = null;
  rateLimitOk.current = true;
  authUser.current = null;
}

vi.mock("@/utils/supabase/server", () => ({
  createClient: async () => ({
    auth: {
      getUser: async () => ({
        data: { user: authUser.current },
        error: null,
      }),
    },
    rpc: async (fn: string) => {
      if (fn === "check_suggestion_rate_limit") {
        return { data: rateLimitOk.current, error: null };
      }
      return { data: null, error: null };
    },
    from: (table: string) => {
      const chain: Record<string, unknown> = {
        insert: (values: Record<string, unknown>) => {
          insertCalls.push({ table, values });
          return { error: null };
        },
        delete: () => {
          deleteCalls.push({ table });
          const filterable = {
            eq: () => filterable,
            then: (resolve: (v: { error: null }) => void) =>
              resolve({ error: null }),
          };
          return filterable;
        },
        select: () => chain,
        eq: () => chain,
        maybeSingle: async () => ({
          data: existingVote.current,
          error: null,
        }),
      };
      return chain;
    },
  }),
}));

vi.mock("@/lib/submissions/rateLimit", () => ({
  hashIp: async (ip: string) => `hash:${ip}`,
  isHoneypotFilled: (v: string | null | undefined) =>
    !!v && v.trim().length > 0,
}));

vi.mock("next/headers", () => ({
  headers: async () => ({
    get: (k: string) => (k === "x-forwarded-for" ? "1.2.3.4" : null),
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

beforeEach(() => resetMocks());

describe("submitSuggestion", () => {
  it("rejects invalid category", async () => {
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "nonsense");
    fd.set("title", "A valid title");
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/category/i);
  });

  it("rejects short title", async () => {
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "feature_request");
    fd.set("title", "ab");
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/Title/);
  });

  it("rejects description over 1000 chars", async () => {
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "feature_request");
    fd.set("title", "Good title");
    fd.set("description", "x".repeat(1001));
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/1000/);
  });

  it("silently accepts honeypot hits", async () => {
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("website", "bot-filled");
    fd.set("category", "feature_request");
    fd.set("title", "ab");
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(true);
    expect(insertCalls.length).toBe(0);
  });

  it("rejects when rate limit exceeded", async () => {
    rateLimitOk.current = false;
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "feature_request");
    fd.set("title", "A fine title");
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/recently/i);
  });

  it("inserts anonymously for signed-out users", async () => {
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "bug_report");
    fd.set("title", "Calculator misaligns on iPad");
    fd.set("description", "details");
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(true);
    expect(insertCalls).toHaveLength(1);
    const values = insertCalls[0].values;
    expect(values.user_id).toBeNull();
    expect(values.show_attribution).toBe(false);
    expect(values.category).toBe("bug_report");
  });

  it("forces show_attribution=false when user is signed in but did not opt in", async () => {
    authUser.current = { id: "user-1" };
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "feature_request");
    fd.set("title", "Nice suggestion title");
    const res = await submitSuggestion(fd);
    expect(res.success).toBe(true);
    expect(insertCalls[0].values.user_id).toBe("user-1");
    expect(insertCalls[0].values.show_attribution).toBe(false);
  });

  it("honors show_attribution when opted in", async () => {
    authUser.current = { id: "user-1" };
    const { submitSuggestion } = await import("@/app/feedback/actions");
    const fd = new FormData();
    fd.set("category", "feature_request");
    fd.set("title", "Another fine title");
    fd.set("show_attribution", "on");
    await submitSuggestion(fd);
    expect(insertCalls[0].values.show_attribution).toBe(true);
  });
});

