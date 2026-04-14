"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
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
      <div className="rounded-lg border border-border bg-surface px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Bookmark
            className="w-4 h-4 text-text-secondary shrink-0"
            strokeWidth={1.75}
          />
          <p className="text-[13px] text-text-secondary">
            <Link href="/auth/login" className="text-accent hover:underline">
              Sign in
            </Link>{" "}
            to save this preset and recall it later.
          </p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent/[0.08] px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[13px] text-text">Preset saved.</p>
        <Link
          href="/account/presets"
          className="text-[13px] text-accent hover:underline"
        >
          View all presets &rarr;
        </Link>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/[0.06] px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Bookmark
            className="w-5 h-5 text-accent shrink-0"
            strokeWidth={1.75}
          />
          <div className="min-w-0">
            <p className="text-[14px] font-medium text-text">
              Save this preset
            </p>
            <p className="text-[12px] text-text-secondary">
              Recall these inputs with one click later.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (buildInput()) {
              setError(null);
              setOpen(true);
            } else {
              setError("Calculator inputs are incomplete.");
            }
          }}
          className="rounded-lg bg-accent text-white text-[14px] font-medium px-5 py-2.5 hover:bg-accent-hover transition-colors duration-150 cursor-pointer"
        >
          Save preset
        </button>
        {error && (
          <p role="alert" className="text-[13px] text-error basis-full">
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
      await createPreset(user.id, {
        ...input,
        name: name.trim() || "Untitled preset",
      });
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
      className="rounded-lg border border-accent/40 bg-accent/[0.06] p-5 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Bookmark className="w-4 h-4 text-accent" strokeWidth={1.75} />
        <p className="text-[13px] font-medium text-text">Name this preset</p>
      </div>
      <Input
        id="preset-name"
        label="Shown only to you"
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
          {busy ? "Saving…" : "Save preset"}
        </Button>
      </div>
    </form>
  );
}
