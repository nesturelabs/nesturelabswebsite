import { trustStats, trustedClients } from "@/data/content";

export function Trusted() {
  return (
    <section
      id="nl-trusted"
      data-screen-label="03 Trusted"
      className="relative z-[2] border-y border-border bg-[rgba(14,14,15,0.4)] py-20"
    >
      <div className="mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)]">
        <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">
          TRUSTED IN THE GLOBAL SECTOR
        </div>
        <h2 className="mt-4 max-w-[24ch] font-heading text-[clamp(30px,2.6vw,40px)] leading-[1.08] font-semibold tracking-[-0.03em]">
          Teams in Colombo and beyond ship on our stack.
        </h2>
      </div>

      <div className="mt-10 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] overflow-x-auto pl-[var(--lane-pl)] pr-[var(--lane-pr)]">
        <div className="flex w-max gap-4.5">
          {trustedClients.map((client) => (
            <div
              key={client}
              className="flex h-[66px] w-[172px] items-center justify-center whitespace-nowrap rounded-xl border border-border bg-surface font-mono text-[11px] tracking-[0.14em] text-text-muted"
            >
              {client}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1440px] grid-cols-1 gap-4 pl-[var(--lane-pl)] pr-[var(--lane-pr)] sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors duration-300"
          >
            <div className="font-mono text-[10px] tracking-[0.18em] text-text-muted">{stat.label}</div>
            <div className="font-heading text-[34px] font-bold tracking-[-0.03em]">{stat.value}</div>
            <div className="h-0.5 overflow-hidden rounded-full bg-border" />
          </div>
        ))}
      </div>
    </section>
  );
}
