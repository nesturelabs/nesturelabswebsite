"use client";

import { useState } from "react";
import { faqItems } from "@/data/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="nl-faq"
      data-screen-label="10 FAQ"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-10 pb-[100px]"
    >
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">FAQ</div>
      <h2 className="mt-4.5 max-w-[22ch] font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        Answers before you ask.
      </h2>

      <div className="mt-10 ml-auto flex max-w-[900px] flex-col gap-2.5">
        {faqItems.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.question}
              className={`rounded-[14px] border bg-surface transition-colors duration-300 ${
                open ? "border-brand" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex min-h-15 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent px-5.5 py-3.5 text-left text-text"
              >
                <span className="font-heading text-[16.5px] font-semibold tracking-[-0.01em]">
                  {item.question}
                </span>
                <span
                  className={`h-2.5 w-2.5 flex-none rounded-sm border transition-[transform,border-color,background-color] duration-300 ${
                    open ? "rotate-45 border-brand bg-brand" : "border-text-muted"
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="text-pretty px-5.5 pb-5 text-[14px] leading-[1.7] text-text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
