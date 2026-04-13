"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { submitContact, type ContactResult } from "./actions";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

const selectClass =
  "rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150";

const CATEGORY_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "vendor_partnership", label: "Vendor Partnership" },
  { value: "data_request", label: "Data Request" },
  { value: "bug_report", label: "Bug Report" },
  { value: "other", label: "Other" },
] as const;

export function ContactForm(): React.ReactElement {
  const [result, setResult] = useState<ContactResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitContact(formData);
    setResult(res);
    setSubmitting(false);
    if (res.success) {
      (e.target as HTMLFormElement).reset();
      setMessage("");
    }
  }, []);

  if (result?.success) {
    return (
      <div className="rounded-lg border border-success/25 bg-success/[0.08] px-5 py-6 text-center">
        <p className="text-sm font-medium text-success mb-1">
          Your message has been sent.
        </p>
        <p className="text-[12px] text-text-secondary">
          We will respond within 48 hours.
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-4 text-[13px] text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact_website">Website</label>
        <input type="text" id="contact_website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-[13px] font-medium text-text-secondary">
          Name
        </label>
        <input id="name" name="name" type="text" placeholder="Optional" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-[13px] font-medium text-text-secondary">
          Email <span className="text-error">*</span>
        </label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="category" className="block text-[13px] font-medium text-text-secondary">
          Category <span className="text-error">*</span>
        </label>
        <select id="category" name="category" required className={`w-full ${selectClass}`}>
          <option value="">Select a category</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-[13px] font-medium text-text-secondary">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={1000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          className={inputClass}
        />
        <p className="text-[11px] text-text-secondary">{message.length}/1000</p>
      </div>

      {result?.error && (
        <div role="alert" className="rounded-lg border border-error/25 bg-error/[0.08] px-5 py-4 text-sm text-error">
          {result.error}
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
