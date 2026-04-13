"use client";

import { useState, useCallback } from "react";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { formatDropdownLabel } from "@/lib/formatDoseRange";
import { Button } from "@/components/ui/Button";
import {
  EFFECT_OPTIONS,
  ROUTE_OPTIONS,
  SOURCE_TYPE_OPTIONS,
  SUBMIT_AGAIN_OPTIONS,
} from "@/lib/submissions/types";
import { submitAnonymous, type SubmitResult } from "./actions";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

const selectClass =
  "rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150";

export function SubmitForm(): React.ReactElement {
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [effectsNotes, setEffectsNotes] = useState("");
  const [bloodworkRows, setBloodworkRows] = useState<
    { marker: string; before: string; after: string }[]
  >([]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      setResult(null);

      const formData = new FormData(e.currentTarget);

      // Attach bloodwork as JSON
      if (bloodworkRows.length > 0) {
        const validRows = bloodworkRows.filter((r) => r.marker.trim());
        if (validRows.length > 0) {
          formData.set("bloodwork_changes", JSON.stringify(validRows));
        }
      }

      const res = await submitAnonymous(formData);
      setResult(res);
      setSubmitting(false);

      if (res.success) {
        (e.target as HTMLFormElement).reset();
        setEffectsNotes("");
        setBloodworkRows([]);
      }
    },
    [bloodworkRows],
  );

  const addBloodworkRow = useCallback(() => {
    setBloodworkRows((prev) => [...prev, { marker: "", before: "", after: "" }]);
  }, []);

  const updateBloodworkRow = useCallback(
    (index: number, field: "marker" | "before" | "after", value: string) => {
      setBloodworkRows((prev) =>
        prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
      );
    },
    [],
  );

  const removeBloodworkRow = useCallback((index: number) => {
    setBloodworkRows((prev) => prev.filter((_, i) => i !== index));
  }, []);

  if (result?.success) {
    return (
      <div className="rounded-lg border border-success/25 bg-success/[0.08] px-5 py-6 text-center">
        <p className="text-sm font-medium text-success mb-1">
          Thank you. Your anonymous submission has been recorded for review.
        </p>
        <p className="text-[12px] text-text-secondary">
          Submissions are anonymous and reviewed privately.
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from users, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Compound selector */}
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

      {/* Dose + Unit */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="dose_amount" className="block text-[13px] font-medium text-text-secondary">
            Dose amount <span className="text-error">*</span>
          </label>
          <input
            id="dose_amount"
            name="dose_amount"
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            required
            placeholder="e.g. 0.25"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="dose_unit" className="block text-[13px] font-medium text-text-secondary">
            Unit <span className="text-error">*</span>
          </label>
          <select id="dose_unit" name="dose_unit" required className={`w-full ${selectClass}`}>
            <option value="mg">mg</option>
            <option value="mcg">mcg</option>
          </select>
        </div>
      </div>

      {/* Frequency + Duration */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="frequency" className="block text-[13px] font-medium text-text-secondary">
            Frequency <span className="text-error">*</span>
          </label>
          <select id="frequency" name="frequency" required className={`w-full ${selectClass}`}>
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="twice_daily">Twice daily</option>
            <option value="3x_week">3x per week</option>
            <option value="5x_week">5x per week</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Every 2 weeks</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="duration_weeks" className="block text-[13px] font-medium text-text-secondary">
            Duration (weeks)
          </label>
          <input
            id="duration_weeks"
            name="duration_weeks"
            type="number"
            inputMode="numeric"
            min="1"
            placeholder="e.g. 8"
            className={inputClass}
          />
        </div>
      </div>

      {/* Route + Source */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="route" className="block text-[13px] font-medium text-text-secondary">
            Route
          </label>
          <select id="route" name="route" className={`w-full ${selectClass}`}>
            <option value="">Select route</option>
            {ROUTE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="source_type" className="block text-[13px] font-medium text-text-secondary">
            Source
          </label>
          <select id="source_type" name="source_type" className={`w-full ${selectClass}`}>
            <option value="">Select source</option>
            {SOURCE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="border-border" />

      {/* Effects checkboxes */}
      <fieldset className="space-y-2">
        <legend className="text-[13px] font-medium text-text-secondary mb-2">
          Reported effects
        </legend>
        {EFFECT_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="effects"
              value={opt.value}
              className="rounded border-border text-accent focus:ring-accent"
            />
            {opt.label}
          </label>
        ))}
        <div className="mt-2">
          <label htmlFor="effects_notes" className="block text-[12px] text-text-secondary mb-1">
            Additional notes (max 200 characters)
          </label>
          <input
            id="effects_notes"
            name="effects_notes"
            type="text"
            maxLength={200}
            value={effectsNotes}
            onChange={(e) => setEffectsNotes(e.target.value)}
            placeholder="Optional details"
            className={inputClass}
          />
          <p className="text-[11px] text-text-secondary mt-0.5">{effectsNotes.length}/200</p>
        </div>
      </fieldset>

      <hr className="border-border" />

      {/* Bloodwork changes (optional) */}
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-text-secondary">
          Bloodwork changes (optional)
        </p>
        {bloodworkRows.map((row, i) => (
          <div key={i} className="grid gap-2 grid-cols-[1fr_1fr_1fr_auto] items-end">
            <input
              type="text"
              placeholder="Marker (e.g. IGF-1)"
              value={row.marker}
              onChange={(e) => updateBloodworkRow(i, "marker", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Before"
              value={row.before}
              onChange={(e) => updateBloodworkRow(i, "before", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="After"
              value={row.after}
              onChange={(e) => updateBloodworkRow(i, "after", e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => removeBloodworkRow(i)}
              className="px-2 py-3 text-text-secondary hover:text-error text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addBloodworkRow}
          className="text-[13px] text-accent hover:underline"
        >
          + Add bloodwork entry
        </button>
      </div>

      <hr className="border-border" />

      {/* Would submit again */}
      <div className="space-y-1.5">
        <label htmlFor="would_submit_again" className="block text-[13px] font-medium text-text-secondary">
          Would you use this compound again?
        </label>
        <select id="would_submit_again" name="would_submit_again" className={`w-full ${selectClass}`}>
          {SUBMIT_AGAIN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Disclaimer */}
      <p className="text-[12px] text-text-secondary">
        Submissions are anonymous and reviewed privately. Data may be used to
        improve compound reference information. No individual submissions are
        published.
      </p>

      {/* Error */}
      {result?.error && (
        <div
          role="alert"
          className="rounded-lg border border-error/25 bg-error/[0.08] px-5 py-4 text-sm text-error"
        >
          {result.error}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" variant="primary" fullWidth disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Anonymously"}
      </Button>
    </form>
  );
}
