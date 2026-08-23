export function ArticleContent({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return <div className="prose prose-lg max-w-none">{blocks.map((block, index) => block.startsWith("## ") ? <h2 key={index}>{block.slice(3)}</h2> : <p key={index}>{block}</p>)}</div>;
}
