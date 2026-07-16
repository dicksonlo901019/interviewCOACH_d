import type { JSX, ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${match.index}-strong`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={`${match.index}-code`}>{token.slice(1, -1)}</code>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const external = !link[2].startsWith("#");
        nodes.push(<a key={`${match.index}-link`} href={link[2]} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{link[1]}</a>);
      }
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

const isBoundary = (lines: string[], index: number) => {
  const line = lines[index] ?? "";
  const next = lines[index + 1] ?? "";
  return !line.trim() || /^#{1,4}\s/.test(line) || /^>/.test(line) || /^---+$/.test(line) || /^[-*]\s/.test(line) || /^\d+\.\s/.test(line) || (line.trim().startsWith("|") && /^\|?[\s:|-]+\|?$/.test(next.trim()));
};

export function MarkdownContent({ source }: { source: string }) {
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const Tag = `h${Math.min(level, 4)}` as keyof JSX.IntrinsicElements;
      blocks.push(<Tag key={`h-${i}`}>{inline(heading[2])}</Tag>);
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push(<hr key={`hr-${i}`} />);
      i += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      const paragraphs = quote.join("\n").split(/\n\s*\n/);
      blocks.push(<blockquote key={`q-${i}`}>{paragraphs.map((p, index) => <p key={index}>{inline(p.replace(/\n/g, " "))}</p>)}</blockquote>);
      continue;
    }

    if (line.trim().startsWith("|") && /^\|?[\s:|-]+\|?$/.test((lines[i + 1] ?? "").trim())) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
        i += 1;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div className="markdown-table-wrap" key={`table-${i}`}>
          <table><thead><tr>{head.map((cell, index) => <th key={index}>{inline(cell)}</th>)}</tr></thead>
          <tbody>{body.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table>
        </div>
      );
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      const items: string[] = [];
      while (i < lines.length) {
        const item = lines[i].match(/^[-*]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]); i += 1;
      }
      blocks.push(<ul key={`ul-${i}`}>{items.map((item, index) => <li key={index}>{inline(item)}</li>)}</ul>);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      const items: string[] = [];
      while (i < lines.length) {
        const item = lines[i].match(/^\d+\.\s+(.+)$/);
        if (!item) break;
        items.push(item[1]); i += 1;
      }
      blocks.push(<ol key={`ol-${i}`}>{items.map((item, index) => <li key={index}>{inline(item)}</li>)}</ol>);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    i += 1;
    while (i < lines.length && !isBoundary(lines, i)) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push(<p key={`p-${i}`}>{inline(paragraph.join(" "))}</p>);
  }

  return <div className="markdown-content">{blocks}</div>;
}
