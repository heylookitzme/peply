"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { loginVendor, type LoginResult } from "./actions";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

export function LoginForm(): React.ReactElement {
  const [result, setResult] = useState<LoginResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const formData = new FormData(e.currentTarget);
    const res = await loginVendor(formData);
    // If login succeeds, redirect happens server-side — this only runs on error
    setResult(res);
    setSubmitting(false);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-[13px] font-medium text-text-secondary">
          Email
        </label>
        <input id="email" name="email" type="email" required placeholder="vendor@example.com" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-[13px] font-medium text-text-secondary">
          Password
        </label>
        <input id="password" name="password" type="password" required className={inputClass} />
      </div>

      {result?.error && (
        <div role="alert" className="rounded-lg border border-error/25 bg-error/[0.08] px-5 py-4 text-sm text-error">
          {result.error}
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={submitting}>
        {submitting ? "Logging in..." : "Log In"}
      </Button>

      <p className="text-[13px] text-text-secondary text-center">
        No account?{" "}
        <Link href="/vendor/register" className="text-accent hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
