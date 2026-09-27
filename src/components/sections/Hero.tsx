import { heroPillars } from "@/data/content";

const pillarIcons = [
  // Web App Development
  <svg key="web" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="5" width="20" height="14" rx="2" />
    <path d="M3 9h20M7 13h5M7 16h8" />
  </svg>,
  // Mobile App Development
  <svg key="mobile" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="7" y="3" width="12" height="20" rx="2.5" />
    <path d="M11 6h4" />
    <circle cx="13" cy="19" r="1.2" fill="#FF2323" stroke="none" />
  </svg>,
  // AI Solutions Development
  <svg key="ai" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="8" y="8" width="10" height="10" rx="1.5" />
    <path d="M8 11H4M8 15H4M18 11h4M18 15h4M11 8V4M15 8V4M11 18v4M15 18v4" />
  </svg>,
  // Digital Marketing
  <svg key="marketing" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <path d="M4 18V11M9.5 18V7M15 18v-8M20.5 18V4" />
    <path d="M3 21h20" />
  </svg>,
];

export function Hero() {
  return (
    <section
      id="nl-hero"
      data-screen-label="01 Hero"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-[172px] pb-[90px]"
    >
      <div className="flex w-fit items-center gap-2.5 rounded-full border border-border bg-surface-nav px-4 py-2 font-mono text-[10.5px] tracking-[0.2em] whitespace-nowrap text-text-muted backdrop-blur-2xl">
        <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_#E50914]" />
        NESTURE LABS
      </div>

      <h1
        id="nl-h1"
        className="mt-6.5 max-w-[19ch] font-heading text-[clamp(46px,5.6vw,92px)] leading-[0.98] font-bold tracking-[-0.035em] text-balance"
      >
        Building Tomorrow&apos;s AI Systems that{" "}
        <span className="text-brand [text-shadow:0_0_38px_rgba(229,9,20,0.55)]">Scale.</span>
        <span
          aria-hidden="true"
          className="ml-1.5 inline-block h-[0.78em] w-[3px] bg-brand align-[-0.06em]"
          style={{ animation: "nlCaret 1s steps(1,end) infinite" }}
        />
      </h1>

      <p className="mt-6.5 max-w-[52ch] text-[17px] leading-[1.65] text-pretty text-text-muted">
        Ready to transform your ideas into reality? Let&apos;s discuss your project and create
        something amazing together.
      </p>

      <div className="mt-9 flex flex-wrap gap-3.5">
        <a
          href="#nl-cta"
          className="flex min-h-13 items-center gap-2.5 rounded-full bg-brand px-7 text-[14.5px] font-medium whitespace-nowrap text-white shadow-[0_0_34px_rgba(229,9,20,0.5)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_0_46px_rgba(255,35,35,0.66)]"
        >
          Start Your Project →
        </a>
        <a
          href="#nl-portfolio"
          className="flex min-h-13 items-center gap-2.5 rounded-full border border-border bg-surface px-6 text-[14.5px] font-medium whitespace-nowrap text-text backdrop-blur-2xl transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-brand"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#E50914" strokeWidth="1.4" aria-hidden="true">
            <circle cx="8" cy="8" r="6.4" />
            <path d="M6.4 5.2 10.8 8l-4.4 2.8Z" fill="#E50914" stroke="none" />
          </svg>
          Watch Our Demo
        </a>
      </div>

      <div className="mt-19 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {heroPillars.map((pillar, i) => (
          <article
            key={pillar.title}
            className="flex flex-col gap-3 rounded-[18px] border border-border bg-surface p-5 backdrop-blur-2xl transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-brand"
          >
            {pillarIcons[i]}
            <h3 className="font-heading text-[16.5px] font-semibold tracking-[-0.02em]">
              {pillar.title}
            </h3>
            <p className="text-[13px] leading-[1.55] text-text-muted">{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
