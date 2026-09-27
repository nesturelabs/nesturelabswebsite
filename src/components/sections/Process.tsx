import type { ReactNode } from "react";
import { processSteps } from "@/data/content";

function StepNode({ number }: { number: string }) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-border bg-bg-raised font-mono text-[12px] text-text-muted">
      {number}
    </span>
  );
}

function StepCard({
  title,
  body,
  align,
}: {
  title: string;
  body: string;
  align?: "right";
}) {
  return (
    <article
      className={`flex flex-col gap-2.5 rounded-[18px] border border-border bg-surface p-5 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="text-[13.5px] leading-[1.6] text-text-muted">{body}</p>
    </article>
  );
}

export function Process() {
  return (
    <section
      id="nl-process"
      data-screen-label="05 How we work"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-10 pb-[100px]"
    >
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">HOW WE WORK</div>
      <h2 className="mt-4.5 max-w-[22ch] font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        Six steps, no surprises.
      </h2>

      <div className="mt-14 flex flex-col gap-8.5">
        {processSteps.map((step, i) => {
          const leftCard = i % 2 === 0;
          const card: ReactNode = (
            <StepCard title={step.title} body={step.body} align={leftCard ? "right" : undefined} />
          );
          return (
            <div key={step.number} className="md:grid md:grid-cols-[1fr_96px_1fr] md:items-center">
              <div className="flex items-center gap-4 md:hidden">
                <StepNode number={step.number} />
                <div className="flex-1">
                  <StepCard title={step.title} body={step.body} />
                </div>
              </div>

              <div className="hidden md:block">{leftCard ? card : null}</div>
              <div className="hidden md:flex md:justify-center">
                <StepNode number={step.number} />
              </div>
              <div className="hidden md:block">{!leftCard ? card : null}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
