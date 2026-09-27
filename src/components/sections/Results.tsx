import { resultTiles } from "@/data/content";

export function Results() {
  return (
    <section
      id="nl-results"
      data-screen-label="06 Results"
      className="relative z-[2] border-y border-border bg-[rgba(14,14,15,0.4)] py-20"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 pl-[var(--lane-pl)] pr-[var(--lane-pr)] sm:grid-cols-2 lg:grid-cols-4">
        {resultTiles.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col gap-2.5 rounded-2xl border border-border bg-surface p-5 transition-colors duration-300"
          >
            <div className="font-mono text-[10px] tracking-[0.18em] text-text-muted">{tile.label}</div>
            <div className="font-heading text-[32px] font-bold tracking-[-0.03em]">{tile.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
