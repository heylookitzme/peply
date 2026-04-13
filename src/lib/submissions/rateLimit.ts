/**
 * Rate limiting and spam prevention utilities for anonymous submissions.
 */

const MAX_SUBMISSIONS_PER_HOUR = 10;

export { MAX_SUBMISSIONS_PER_HOUR };

export async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + "peply-salt-2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isHoneypotFilled(value: string | undefined | null): boolean {
  return !!value && value.trim().length > 0;
}
