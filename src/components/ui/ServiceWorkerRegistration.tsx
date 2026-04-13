"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration(): null {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed — silent, non-blocking
      });
    }
  }, []);

  return null;
}
