"use client";

import { useState, useCallback } from "react";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { formatDropdownLabel } from "@/lib/formatDoseRange";
import { Button } from "@/components/ui/Button";
import { CONTAMINANT_OPTIONS } from "@/lib/submissions/types";
import { submitVendorData, type VendorSubmitResult } from "./actions";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

const selectClass =
  "rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150";

export function VendorSubmitForm(): React.ReactElement {
  const [result, setResult] = useState<VendorSubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const formData = new FormData(e.currentTarget);
    const res = await submitVendorData(formData);
    setResult(res);
    setSubmitting(false);
    if (res.success) {
      (e.target as HTMLFormElement).reset();
      setNotes("");
    }
  }, []);

  if (result?.success) {
    return (
      <div className="rounded-lg border border-success/25 bg-success/[0.08] px-5 py-6 text-center">
        <p className="text-sm font-medium text-success mb-1">
          Submission recorded. Thank you.
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-4 text-[13px] text-accent hover:underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="compound_slug" className="block text-[13px] font-medium text-text-secondary">
          Compound <span className="text-error">*</span>
        </label>
        <select id="compound_slug" name="compound_slug" required className={`w-full ${selectClass}`}>
          <option value="">Select a compound</option>
          {COMPOUNDS.map((c) => (
            <option key={c.slug} value={c.slug}>
              {formatDropdownLabel(c)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="batch_number" className="block text-[13px] font-medium text-text-secondary">
          Batch number
        </label>
        <input id="batch_number" name="batch_number" type="text" placeholder="e.g. BPC-2026-0412" className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="purity_percentage" className="block text-[13px] font-medium text-text-secondary">
          Purity percentage
        </label>
        <input id="purity_percentage" name="purity_percentage" type="number" inputMode="decimal" step="0.01" min="0" max="100" placeholder="e.g. 98.5" className={inputClass} />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-[13px] font-medium text-text-secondary mb-2">
          Contaminants tested
        </legend>
        {CONTAMINANT_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" name="contaminants_tested" value={opt.value} className="rounded border-border text-accent focus:ring-accent" />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <div className="space-y-1.5">
        <label htmlFor="potency_verified" className="block text-[13px] font-medium text-text-secondary">
          Potency verified
        </label>
        <select id="potency_verified" name="potency_verified" className={`w-full ${selectClass}`}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="coa_file" className="block text-[13px] font-medium text-text-secondary">
          Certificate of Analysis
        </label>
        <input
          id="coa_file"
          name="coa_file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-[13px] file:font-medium file:text-accent hover:file:bg-accent/20`}
        />
        <p className="text-[11px] text-text-secondary">
          PDF, JPEG, or PNG. Max 10 MB.
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="notes" className="block text-[13px] font-medium text-text-secondary">
          Notes (max 500 characters)
        </label>
        <textarea
          id="notes"
          name="notes"
          maxLength={500}
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes"
          className={inputClass}
        />
        <p className="text-[11px] text-text-secondary">{notes.length}/500</p>
      </div>

      <p className="text-[12px] text-text-secondary">
        Submitted data is reviewed privately and may be used in aggregate to
        improve compound quality information. Individual submissions and vendor
        identities are never published.
      </p>

      {result?.error && (
        <div role="alert" className="rounded-lg border border-error/25 bg-error/[0.08] px-5 py-4 text-sm text-error">
          {result.error}
        </div>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Quality Data"}
      </Button>
    </form>
  );
}
