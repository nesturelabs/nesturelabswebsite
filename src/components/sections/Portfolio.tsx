"use client";

import { useState } from "react";
import { portfolioFilters, projects, type PortfolioCategory } from "@/data/content";

export function Portfolio() {
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="nl-portfolio"
      data-screen-label="07 Portfolio"
      className="relative z-[2] mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] py-[100px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">SELECTED WORK</div>
          <h2 className="mt-4.5 max-w-[20ch] font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Built to carry weight.
          </h2>
        </div>
        <a href="#nl-cta" className="text-[14px] whitespace-nowrap text-brand transition-colors hover:text-brand-hover">
          View all work →
        </a>
      </div>

      <div className="mt-7.5 flex flex-wrap gap-2">
        {portfolioFilters.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`min-h-11 cursor-pointer rounded-full border px-4.5 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ${
                active
                  ? "border-brand bg-[rgba(229,9,20,0.12)] text-text"
                  : "border-border bg-transparent text-text-muted hover:text-text"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4.5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <article
            key={project.id}
            className="flex flex-col gap-3.5 rounded-[18px] border border-border bg-surface p-4 transition-[border-color,transform] duration-200 hover:-translate-y-1.5 hover:border-brand"
          >
            <div
              className="flex aspect-[16/10] items-end rounded-xl border border-border bg-bg-slot p-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(229,9,20,0.14) 0 10px, transparent 10px 20px)",
              }}
            >
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-text-muted">
                [{project.name.toUpperCase()} — SCREENSHOT]
              </span>
            </div>
            <div className="flex items-center justify-between gap-2.5">
              <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">{project.name}</h3>
              <span className="font-mono text-[9.5px] whitespace-nowrap text-text-muted">{project.sector}</span>
            </div>
            <p className="text-[13px] leading-[1.55] text-text-muted">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
