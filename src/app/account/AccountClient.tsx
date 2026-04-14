"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/utils/supabase/client";
import { setDisplayName } from "@/lib/preferences/queries";
import { signOut } from "@/utils/supabase/auth";

export function AccountClient({
  userId,
  email,
  initialDisplayName,
  favoritesCount,
  presetsCount,
  suggestionsCount,
}: {
  userId: string;
  email: string;
  initialDisplayName: string;
  favoritesCount: number;
  presetsCount: number;
  suggestionsCount: number;
}): React.ReactElement {
  const router = useRouter();
  const [displayName, setDisplayNameState] = useState(initialDisplayName);
  const [savingName, setSavingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<"idle" | "saved" | "error">(
    "idle",
  );
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveName(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setSavingName(true);
    setNameStatus("idle");
    try {
      await setDisplayName(userId, displayName);
      setNameStatus("saved");
    } catch {
      setNameStatus("error");
    } finally {
      setSavingName(false);
    }
  }

  async function handleExport(): Promise<void> {
    setExporting(true);
    setError(null);
    try {
      const supabase = createClient();
      const [{ data: profile }, { data: presets }] = await Promise.all([
        supabase
          .from("user_profiles")
          .select("display_name, favorite_compounds, favorite_stacks, created_at, updated_at")
          .eq("id", userId)
          .maybeSingle(),
        supabase
          .from("calculator_presets")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
      ]);

      const payload = {
        exported_at: new Date().toISOString(),
        email,
        profile: profile ?? null,
        presets: presets ?? [],
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `peply-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  async function handleDelete(): Promise<void> {
    setDeleting(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: rpcError } = await supabase.rpc("delete_me");
      if (rpcError) throw rpcError;
      await signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
              Email
            </dt>
            <dd className="text-[15px] mt-1 break-all">{email}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
              Favorites
            </dt>
            <dd className="font-mono text-[22px] mt-1">{favoritesCount}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
              Presets
            </dt>
            <dd className="font-mono text-[22px] mt-1">{presetsCount}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
              Suggestions
            </dt>
            <dd className="font-mono text-[22px] mt-1">{suggestionsCount}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="text-base font-semibold mb-4">Display name</h2>
        <form onSubmit={handleSaveName} className="space-y-3">
          <Input
            id="display-name"
            label="Shown only to you"
            maxLength={80}
            value={displayName}
            onChange={(e) => setDisplayNameState(e.target.value)}
            placeholder="Optional"
          />
          <div className="flex items-center gap-3">
            <Button type="submit" variant="ghost" disabled={savingName}>
              {savingName ? "Saving…" : "Save"}
            </Button>
            {nameStatus === "saved" && (
              <span className="text-[13px] text-text-secondary">Saved.</span>
            )}
            {nameStatus === "error" && (
              <span className="text-[13px] text-error">Could not save.</span>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-base font-semibold mb-2">Export data</h2>
        <p className="text-[13px] text-text-secondary mb-4">
          Download a JSON file containing your display name, favorites, and
          calculator presets.
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? "Preparing…" : "Export my data"}
        </Button>
      </Card>

      <Card>
        <h2 className="text-base font-semibold mb-2">Delete account</h2>
        <p className="text-[13px] text-text-secondary mb-4">
          Permanently removes your account and all saved preferences. This
          cannot be undone.
        </p>
        {confirmingDelete ? (
          <div className="space-y-3">
            <p className="text-[13px] text-error">
              This will delete your account and all favorites and presets.
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg text-[15px] font-medium px-8 py-3.5 bg-error text-white hover:bg-error/90 transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting…" : "Permanently delete"}
              </button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setConfirmingDelete(true)}
          >
            Delete account
          </Button>
        )}
      </Card>

      {error && (
        <p role="alert" className="text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}
