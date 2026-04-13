"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { registerVendor, type RegisterResult } from "./actions";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

export function RegisterForm(): React.ReactElement {
  const [result, setResult] = useState<RegisterResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const formData = new FormData(e.currentTarget);
    const res = await registerVendor(formData);
    setResult(res);
    setSubmitting(false);
  }, []);

  if (result?.success) {
    return (
      <div className="rounded-lg border border-success/25 bg-success/[0.08] px-5 py-6 text-center">
        <p className="text-sm font-medium text-success mb-2">
          Your account is pending verification.
        </p>
        <p className="text-[13px] text-text-secondary">
          You will receive access once verified. Check your email to confirm
          your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-[13px] font-medium text-text-secondary">
          Email <span className="text-error">*</span>
        </label>
        <input id="email" name="email" type="email" required placeholder="vendor@example.com" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-[13px] font-medium text-text-secondary">
          Password <span className="text-error">*</span>
        </label>
        <input id="password" name="password" type="password" required minLength={8} placeholder="Minimum 8 characters" className={inputClass} />
        <p className="text-[11px] text-text-secondary">
          At least 8 characters. Must include uppercase, lowercase, and a number.
        </p>
      </div>

      <hr className="border-border" />

      <div className="space-y-1.5">
        <label htmlFor="business_name" className="block text-[13px] font-medium text-text-secondary">
          Business name <span className="text-error">*</span>
        </label>
        <input id="business_name" name="business_name" type="text" required placeholder="Company name" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="license_number" className="block text-[13px] font-medium text-text-secondary">
          License number
        </label>
        <input id="license_number" name="license_number" type="text" placeholder="Optional" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact_email" className="block text-[13px] font-medium text-text-secondary">
          Contact email <span className="text-error">*</span>
        </label>
        <input id="contact_email" name="contact_email" type="email" required placeholder="contact@example.com" className={inputClass} />
      </div>

      {result?.error && (
        <div role="alert" className="rounded-lg border border-error/25 bg-error/[0.08] px-5 py-4 text-sm text-error">
          {result.error}
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={submitting}>
        {submitting ? "Registering..." : "Register"}
      </Button>

      <p className="text-[13px] text-text-secondary text-center">
        Already registered?{" "}
        <Link href="/vendor/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
