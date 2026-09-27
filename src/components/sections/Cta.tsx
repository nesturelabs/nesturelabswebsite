import { ctaBadges } from "@/data/content";

export function Cta() {
  return (
    <section
      id="nl-cta"
      data-screen-label="11 Final CTA"
      className="relative z-[2] overflow-hidden pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-[110px] pb-[150px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 45%, rgba(139,0,0,0.34), rgba(5,5,5,0) 72%), linear-gradient(180deg, rgba(229,9,20,0.10), rgba(5,5,5,0) 60%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1440px] justify-center">
        <div className="flex max-w-[680px] flex-col items-center gap-5.5 rounded-3xl border border-border bg-surface-strong p-10 text-center backdrop-blur-2xl">
          <h2 className="max-w-[22ch] text-balance font-heading text-[clamp(34px,3.4vw,54px)] leading-[1.03] font-bold tracking-[-0.03em]">
            Let&apos;s Build the Future Together
          </h2>
          <p className="max-w-[48ch] text-pretty text-[16px] leading-[1.7] text-text-muted">
            Ready to transform your ideas into reality? Let&apos;s discuss your project and create
            something amazing together.
          </p>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            <a
              href="#nl-cta"
              className="flex min-h-13 items-center gap-2.5 rounded-full bg-brand px-7 text-[14.5px] font-medium whitespace-nowrap text-white shadow-[0_0_34px_rgba(229,9,20,0.5)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_0_46px_rgba(255,35,35,0.66)]"
            >
              Book a Free Consultation →
            </a>
            <a
              href="#nl-portfolio"
              className="flex min-h-13 items-center gap-2.5 rounded-full border border-border bg-surface px-6.5 text-[14.5px] font-medium whitespace-nowrap text-text transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-brand"
            >
              View Our Work
            </a>
          </div>
          <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
            {ctaBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
