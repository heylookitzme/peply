"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt(): React.ReactElement | null {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session or already installed
    if (
      typeof window === "undefined" ||
      window.matchMedia("(display-mode: standalone)").matches ||
      sessionStorage.getItem("pwa-dismissed")
    ) {
      return;
    }

    function handlePrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setDeferredPrompt(null);
    sessionStorage.setItem("pwa-dismissed", "1");
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[400px]">
      <div className="rounded-lg border border-border bg-surface px-4 py-3 shadow-lg flex items-center gap-3">
        <Download className="w-4 h-4 text-accent shrink-0" />
        <p className="text-[13px] text-text flex-1">
          Install Peply for offline access
        </p>
        <button
          onClick={handleInstall}
          className="rounded-md bg-accent text-white px-3 py-1.5 text-[12px] font-medium hover:bg-accent-hover transition-colors duration-150 shrink-0"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="p-1 text-text-secondary hover:text-text transition-colors duration-150 shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
