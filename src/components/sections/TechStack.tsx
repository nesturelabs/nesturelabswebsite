import { stackChips } from "@/data/content";

export function TechStack() {
  return (
    <section
      id="nl-stack"
      data-screen-label="09 Tech stack"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-10 pb-[100px]"
    >
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">OUR TECH STACK</div>
      <h2 className="mt-4.5 max-w-[20ch] font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        Chips we solder on.
      </h2>

      <div className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {stackChips.map((chip) => (
          <div
            key={chip.name}
            className="flex flex-col items-start gap-2.5 rounded-[14px] border border-border bg-surface p-4.5 transition-[border-color,transform] duration-[350ms]"
          >
            <div className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-border-strong font-mono text-[11px] text-brand-hover">
              {chip.monogram}
            </div>
            <div className="font-heading text-[13.5px] font-semibold">{chip.name}</div>
            <div className="font-mono text-[9px] tracking-[0.14em] text-text-muted">{chip.category}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
