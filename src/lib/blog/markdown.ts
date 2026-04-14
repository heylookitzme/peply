/**
 * Minimal markdown parser for Peply blog posts. Produces a tree of blocks
 * the React renderer can walk. Supports:
 *   ## / ### headings, paragraphs, - / 1. lists, > blockquotes,
 *   **bold**, *italic*, `code`, [text](url).
 *
 * Posts are author-controlled static strings, so the output tree never
 * contains raw HTML: no injection surface.
 */

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "bold"; children: InlineNode[] }
  | { type: "italic"; children: InlineNode[] }
  | { type: "code"; value: string }
  | { type: "link"; href: string; children: InlineNode[] };

export type Block =
  | { type: "h2"; children: InlineNode[] }
  | { type: "h3"; children: InlineNode[] }
  | { type: "p"; children: InlineNode[] }
  | { type: "ul"; items: InlineNode[][] }
  | { type: "ol"; items: InlineNode[][] }
  | { type: "blockquote"; children: InlineNode[] };

export function parseMarkdown(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", children: parseInline(line.slice(4).trim()) });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", children: parseInline(line.slice(3).trim()) });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      blocks.push({
        type: "blockquote",
        children: parseInline(buf.join(" ")),
      });
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*-\s+/, "")));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: InlineNode[][] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // paragraph: collect until blank line or block boundary
    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("> ") &&
      !/^\s*-\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", children: parseInline(para.join(" ")) });
  }

  return blocks;
}

/**
 * Inline parser. Handles `code`, **bold**, *italic*, [link](href).
 * Code spans are tokenised first so their contents aren't re-parsed.
 */
export function parseInline(src: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let i = 0;

  while (i < src.length) {
    const ch = src[i];

    if (ch === "`") {
      const end = src.indexOf("`", i + 1);
      if (end !== -1) {
        nodes.push({ type: "code", value: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (ch === "*" && src[i + 1] === "*") {
      const end = src.indexOf("**", i + 2);
      if (end !== -1) {
        nodes.push({
          type: "bold",
          children: parseInline(src.slice(i + 2, end)),
        });
        i = end + 2;
        continue;
      }
    }

    if (ch === "*") {
      const end = src.indexOf("*", i + 1);
      if (end !== -1) {
        nodes.push({
          type: "italic",
          children: parseInline(src.slice(i + 1, end)),
        });
        i = end + 1;
        continue;
      }
    }

    if (ch === "[") {
      const closeText = src.indexOf("]", i + 1);
      if (closeText !== -1 && src[closeText + 1] === "(") {
        const closeHref = src.indexOf(")", closeText + 2);
        if (closeHref !== -1) {
          const text = src.slice(i + 1, closeText);
          const href = src.slice(closeText + 2, closeHref);
          nodes.push({
            type: "link",
            href,
            children: parseInline(text),
          });
          i = closeHref + 1;
          continue;
        }
      }
    }

    // plain text — consume until the next potential marker
    let j = i + 1;
    while (j < src.length && !"`*[".includes(src[j])) j++;
    nodes.push({ type: "text", value: src.slice(i, j) });
    i = j;
  }

  return nodes;
}

export function stripMarkdown(src: string): string {
  return src
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^\s*-\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();
}
