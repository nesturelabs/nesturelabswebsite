"use client";

import { useState } from "react";
import { testimonials } from "@/data/content";

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#E50914" aria-hidden="true">
      <path d="M7 1l1.8 3.9 4.2.5-3.1 2.9.8 4.2L7 10.4 3.3 12.5l.8-4.2L1 5.4l4.2-.5Z" />
    </svg>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="nl-testi"
      data-screen-label="08 Testimonials"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-10 pb-[100px]"
    >
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">WHAT OUR CLIENTS SAY</div>
      <h2 className="mt-4.5 max-w-[22ch] font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        Reviewed by the people we shipped for.
      </h2>

      <div className="mt-20 grid grid-cols-1 gap-4.5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={t.name + i}
            className={`m-0 flex flex-col gap-4 rounded-[18px] border bg-surface p-5.5 transition-[border-color,transform] duration-300 ${
              active === i ? "border-brand" : "border-border"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex gap-0.5" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} />
                ))}
              </div>
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-muted">GOOGLE REVIEW</span>
            </div>
            <blockquote className="m-0 text-pretty text-[15px] leading-[1.65] text-text">
              {t.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <div
                className="h-9.5 w-9.5 flex-none rounded-full border border-border bg-bg-slot"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(229,9,20,0.14) 0 6px, transparent 6px 12px)",
                }}
              />
              <div>
                <div className="text-[13.5px] font-medium">{t.name}</div>
                <div className="font-mono text-[9.5px] tracking-[0.14em] text-text-muted">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7.5 flex justify-center gap-2.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Review ${i + 1}`}
            onClick={() => setActive(i)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent"
          >
            <span
              className={`h-0.5 w-6.5 rounded-full transition-colors duration-300 ${
                active === i ? "bg-brand" : "bg-border-strong"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
