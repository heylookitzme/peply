import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Only allow relative, same-origin paths to prevent open redirects.
// Rejects: absolute URLs, protocol-relative (//host), backslash tricks (/\\host).
function safeNext(raw: string | null): string {
  if (!raw) return "/account";
  if (!raw.startsWith("/")) return "/account";
  if (raw.startsWith("//") || raw.startsWith("/\\")) return "/account";
  return raw;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(
    new URL("/auth/login?error=invalid_link", url.origin),
  );
}
