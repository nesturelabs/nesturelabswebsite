import { whyCards } from "@/data/content";

export function WhyUs() {
  return (
    <section
      id="nl-why"
      data-screen-label="04 Why choose"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] py-[100px]"
    >
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">
        WHY CHOOSE NESTURE LABS
      </div>
      <h2 className="mt-4.5 max-w-[24ch] font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        One team wired into every layer.
      </h2>

      <div className="mt-[130px] grid grid-cols-1 gap-4.5 md:grid-cols-2 lg:grid-cols-3">
        {whyCards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col gap-3 rounded-r-[18px] border border-l-2 border-border border-l-border-strong bg-surface py-6 pr-5.5 pl-6.5 transition-[border-color,transform] duration-[400ms]"
          >
            <h3 className="font-heading text-[17px] font-semibold tracking-[-0.02em]">{card.title}</h3>
            <p className="text-[13.5px] leading-[1.6] text-text-muted">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
