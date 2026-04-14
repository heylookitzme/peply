"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}): React.ReactElement {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable (insecure contexts); silent fail
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[13px] text-text-secondary hover:text-text hover:border-text-secondary transition-colors duration-150 cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[13px] text-text-secondary hover:text-text hover:border-text-secondary transition-colors duration-150"
      >
        <Share2 className="w-4 h-4" />
        <span>Share on X</span>
      </a>
    </div>
  );
}
