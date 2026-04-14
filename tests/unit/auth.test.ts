import { describe, it, expect, vi, beforeEach } from "vitest";

type AuthErr = { message: string } | null;
type UserPayload = { data: { user: { id: string } | null }; error: AuthErr };

const signInWithOtp = vi.fn<() => Promise<{ error: AuthErr }>>(() =>
  Promise.resolve({ error: null }),
);
const signInWithOAuth = vi.fn<() => Promise<{ error: AuthErr }>>(() =>
  Promise.resolve({ error: null }),
);
const signOutMock = vi.fn<() => Promise<{ error: AuthErr }>>(() =>
  Promise.resolve({ error: null }),
);
const getUserMock = vi.fn<() => Promise<UserPayload>>(() =>
  Promise.resolve({ data: { user: { id: "u1" } }, error: null }),
);

vi.mock("@/utils/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithOtp,
      signInWithOAuth,
      signOut: signOutMock,
      getUser: getUserMock,
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  }),
}));

beforeEach(() => {
  signInWithOtp.mockClear();
  signInWithOAuth.mockClear();
  signOutMock.mockClear();
  getUserMock.mockClear();
  // jsdom provides window; ensure origin is stable
  Object.defineProperty(window, "location", {
    value: new URL("https://example.test/auth/login"),
    writable: true,
  });
});

describe("auth utilities", () => {
  it("signInWithMagicLink calls signInWithOtp with callback redirect", async () => {
    const { signInWithMagicLink } = await import("@/utils/supabase/auth");
    await signInWithMagicLink("user@example.com");
    expect(signInWithOtp).toHaveBeenCalledWith({
      email: "user@example.com",
      options: {
        emailRedirectTo: "https://example.test/auth/callback",
        shouldCreateUser: true,
      },
    });
  });

  it("signInWithGoogle requests OAuth with callback redirect", async () => {
    const { signInWithGoogle } = await import("@/utils/supabase/auth");
    await signInWithGoogle();
    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "https://example.test/auth/callback" },
    });
  });

  it("signOut calls supabase signOut", async () => {
    const { signOut } = await import("@/utils/supabase/auth");
    await signOut();
    expect(signOutMock).toHaveBeenCalledOnce();
  });

  it("getUser returns the current user", async () => {
    const { getUser } = await import("@/utils/supabase/auth");
    const user = await getUser();
    expect(user).toEqual({ id: "u1" });
  });

  it("getUser returns null on error", async () => {
    getUserMock.mockResolvedValueOnce({
      data: { user: null },
      error: { message: "no session" },
    });
    const { getUser } = await import("@/utils/supabase/auth");
    const user = await getUser();
    expect(user).toBeNull();
  });

  it("signInWithMagicLink surfaces supabase errors", async () => {
    signInWithOtp.mockResolvedValueOnce({ error: { message: "rate limit" } });
    const { signInWithMagicLink } = await import("@/utils/supabase/auth");
    await expect(signInWithMagicLink("x@y.com")).rejects.toMatchObject({
      message: "rate limit",
    });
  });
});
