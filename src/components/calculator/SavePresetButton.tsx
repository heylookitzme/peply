"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/components/auth/AuthProvider";
import { createPreset, type PresetInput } from "@/lib/preferences/queries";

export function SavePresetButton({
  buildInput,
}: {
  buildInput: () => PresetInput | null;
}): React.ReactElement {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <div aria-hidden className="h-0" />;

  if (!user) {
    return (
      <p className="text-[13px] text-text-secondary text-center">
        <Link href="/auth/login" className="text-accent hover:underline">
          Sign in
        </Link>{" "}
        to save presets.
      </p>
    );
  }

  if (done) {
    return (
      <p className="text-[13px] text-text-secondary text-center">
        Preset saved.{" "}
        <Link href="/account/presets" className="text-accent hover:underline">
          View presets
        </Link>
      </p>
    );
  }

  if (!open) {
    return (
      <div className="flex justify-center">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            if (buildInput()) setOpen(true);
            else setError("Calculate a result before saving a preset.");
          }}
        >
          Save this preset
        </Button>
        {error && (
          <p role="alert" className="text-[13px] text-error ml-3 self-center">
            {error}
          </p>
        )}
      </div>
    );
  }

  async function handleSave(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!user) return;
    const input = buildInput();
    if (!input) {
      setError("Calculator inputs are incomplete.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await createPreset(user.id, { ...input, name: name.trim() || "Untitled preset" });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save preset");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="rounded-lg border border-border bg-surface p-5 space-y-4"
    >
      <Input
        id="preset-name"
        label="Name this preset"
        placeholder="e.g. My Semaglutide Setup"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        maxLength={80}
      />
      {error && (
        <p role="alert" className="text-[13px] text-error">
          {error}
        </p>
      )}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
