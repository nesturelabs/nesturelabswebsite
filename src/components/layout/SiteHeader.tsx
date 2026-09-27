"use client";

import { useState } from "react";
import { LogoMark } from "@/components/icons/LogoMark";
import { navLinks } from "@/data/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-[18px] z-20 flex justify-center">
        <nav className="pointer-events-auto flex items-center gap-7 rounded-full border border-border bg-surface-nav py-2.5 pr-2.5 pl-4.5 backdrop-blur-2xl">
          <a href="#nl-hero" className="flex items-center gap-2.5 text-text">
            <LogoMark size={30} />
            <span className="h-6.5 w-px flex-none bg-border" />
            <span className="flex flex-col gap-0.5">
              <span className="whitespace-nowrap font-heading text-[13.5px] leading-none font-bold tracking-[0.24em]">
                NESTURE
              </span>
              <span className="whitespace-nowrap font-mono text-[10px] leading-none font-medium tracking-[0.42em] text-brand-soft">
                LABS
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-0.5 min-[900px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[13px] whitespace-nowrap text-text-muted transition-colors hover:bg-white/5 hover:text-text"
              >
                {link.label === "Home" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#E50914]" />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-brand min-[900px]:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2 5h14M2 9h14M2 13h14" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="#nl-cta"
              aria-label="WhatsApp"
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-brand hover:text-text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5Z" />
                <path
                  d="M8.6 9.2c0 3.2 2.6 5.8 5.8 5.8l1.3-1.6-2-1-1 .9c-1-.5-1.9-1.4-2.4-2.4l.9-1-1-2Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href="#nl-cta"
              className="flex min-h-11 items-center rounded-full bg-brand px-5 text-[13px] font-medium whitespace-nowrap text-white shadow-[0_0_22px_rgba(229,9,20,0.45)] transition-colors hover:bg-brand-hover"
            >
              Get a Quote
            </a>
          </div>
        </nav>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-1.5 bg-[rgba(5,5,5,0.96)] backdrop-blur-2xl min-[900px]:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-border text-text"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2 2l12 12M14 2 2 14" />
            </svg>
          </button>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex min-h-13 items-center font-heading text-[22px] text-text-muted transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
