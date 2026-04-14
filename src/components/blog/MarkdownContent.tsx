import {
  parseMarkdown,
  type Block,
  type InlineNode,
} from "@/lib/blog/markdown";

export function MarkdownContent({
  source,
}: {
  source: string;
}): React.ReactElement {
  const blocks = parseMarkdown(source);
  return (
    <div className="space-y-6 text-[15px] leading-relaxed text-text">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }): React.ReactElement {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-serif text-[26px] leading-tight text-text mt-10 mb-2">
          <Inline nodes={block.children} />
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-[18px] font-semibold text-text mt-8 mb-2">
          <Inline nodes={block.children} />
        </h3>
      );
    case "p":
      return (
        <p className="text-text leading-relaxed">
          <Inline nodes={block.children} />
        </p>
      );
    case "ul":
      return (
        <ul className="list-disc pl-5 space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline nodes={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-5 space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline nodes={item} />
            </li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-2 border-accent/40 pl-4 text-text-secondary italic">
          <Inline nodes={block.children} />
        </blockquote>
      );
  }
}

function Inline({ nodes }: { nodes: InlineNode[] }): React.ReactElement {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case "text":
            return <span key={i}>{node.value}</span>;
          case "bold":
            return (
              <strong key={i} className="font-semibold text-text">
                <Inline nodes={node.children} />
              </strong>
            );
          case "italic":
            return (
              <em key={i} className="italic">
                <Inline nodes={node.children} />
              </em>
            );
          case "code":
            return (
              <code
                key={i}
                className="font-mono text-[13px] rounded bg-surface-alt px-1.5 py-0.5 text-text"
              >
                {node.value}
              </code>
            );
          case "link": {
            const external = /^https?:\/\//.test(node.href);
            return (
              <a
                key={i}
                href={node.href}
                className="text-accent hover:underline"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Inline nodes={node.children} />
              </a>
            );
          }
        }
      })}
    </>
  );
}
