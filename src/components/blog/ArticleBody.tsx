"use client";

import React from "react";

interface ArticleBodyProps {
  content: string;
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered-list"; items: string[] };

function parseContent(content: string): Block[] {
  return content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return { type: "h3" as const, text: trimmed.slice(4) };
      }
      if (trimmed.startsWith("## ")) {
        return { type: "h2" as const, text: trimmed.slice(3) };
      }
      if (trimmed.startsWith("\u2022 ") || trimmed.includes("\n\u2022 ")) {
        return {
          type: "list" as const,
          items: trimmed
            .split("\n")
            .map((l) => l.replace(/^\u2022\s*/, ""))
            .filter(Boolean),
        };
      }
      if (/^\d+[.)]/.test(trimmed)) {
        return {
          type: "ordered-list" as const,
          items: trimmed
            .split("\n")
            .map((l) => l.replace(/^\d+[.)]\s*/, ""))
            .filter(Boolean),
        };
      }
      return { type: "paragraph" as const, text: trimmed };
    })
    .filter((block): block is Block => block !== null);
}

/**
 * Render inline formatting: **bold** and emoji
 */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Bold text
    parts.push(
      <strong key={match.index} className="text-text-primary font-semibold">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  const blocks = parseContent(content);

  return (
    <div className="container-narrow section-padding">
      <div className="max-w-[800px] mx-auto">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "h2":
              return (
                <h2
                  key={i}
                  className="text-display-2 font-serif text-text-primary mt-12 mb-6"
                >
                  {renderInline(block.text)}
                </h2>
              );

            case "h3":
              return (
                <h3
                  key={i}
                  className="text-heading-3 font-serif text-text-primary mt-8 mb-4"
                >
                  {renderInline(block.text)}
                </h3>
              );

            case "paragraph":
              return (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-text-secondary mb-6"
                >
                  {renderInline(block.text)}
                </p>
              );

            case "list":
              return (
                <ul key={i} className="space-y-3 mb-6 pl-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-oppr-secondary shrink-0" />
                      <span className="text-lg leading-relaxed text-text-secondary">
                        {renderInline(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              );

            case "ordered-list":
              return (
                <ol key={i} className="space-y-3 mb-6 pl-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-oppr-secondary/10 text-oppr-secondary text-xs font-bold flex items-center justify-center shrink-0">
                        {j + 1}
                      </span>
                      <span className="text-lg leading-relaxed text-text-secondary">
                        {renderInline(item)}
                      </span>
                    </li>
                  ))}
                </ol>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
