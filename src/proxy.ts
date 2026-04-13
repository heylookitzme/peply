import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/proxy";

export async function proxy(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch {
    // If Supabase is unreachable or misconfigured, pass through
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Only run proxy on auth-required routes
    "/submit/:path*",
    "/vendor/:path*",
  ],
};
