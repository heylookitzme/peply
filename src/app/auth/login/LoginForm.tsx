"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signInWithGoogle, signInWithMagicLink } from "@/utils/supabase/auth";

type Status = "idle" | "sending" | "sent" | "error";

export function LoginForm(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [googleBusy, setGoogleBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setError(null);
    try {
      await signInWithMagicLink(email.trim());
      setStatus("sent");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to send link";
      setError(message);
      setStatus("error");
    }
  }

  async function handleGoogle(): Promise<void> {
    setGoogleBusy(true);
    setError(null);
    try {
      await signInWithGoogle();
      // Supabase redirects the browser; no further action needed here.
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-in failed";
      setError(message);
      setGoogleBusy(false);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-[15px] text-text mb-2">Check your email.</p>
        <p className="text-[13px] text-text-secondary leading-relaxed">
          We sent a sign-in link to{" "}
          <span className="font-medium text-text">{email}</span>. Open it on
          this device to finish signing in. No password needed.
        </p>
      </div>
    );
  }

  const busy = status === "sending" || googleBusy;

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
        />

        {error && (
          <p role="alert" className="text-[13px] text-[color:var(--color-error,#C43D3D)]">
            {error}
          </p>
        )}

        <Button type="submit" fullWidth disabled={busy}>
          {status === "sending" ? "Sending…" : "Send magic link"}
        </Button>
      </form>

      <div
        className="flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-text-secondary"
        role="separator"
        aria-label="or"
      >
        <span className="flex-1 border-t border-border" />
        <span>or</span>
        <span className="flex-1 border-t border-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-border bg-transparent text-text text-[15px] font-medium px-8 py-3.5 hover:border-text-secondary transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon />
        {googleBusy ? "Redirecting…" : "Sign in with Google"}
      </button>

      <p className="text-[12px] text-text-secondary">
        Check your email for a sign-in link, or continue with Google. No
        password needed.
      </p>
    </div>
  );
}

function GoogleIcon(): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.257h2.908c1.702-1.567 2.684-3.874 2.684-6.614Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.257c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.708A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.708V4.96H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.04l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}
