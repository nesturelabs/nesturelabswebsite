"use client";

import { useEffect, useState } from "react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5.5 bottom-5.5 z-20 flex flex-col gap-2.5">
      <a
        href="#nl-cta"
        aria-label="Chat on WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5Z" />
          <path
            d="M8.6 9.2c0 3.2 2.6 5.8 5.8 5.8l1.3-1.6-2-1-1 .9c-1-.5-1.9-1.4-2.4-2.4l.9-1-1-2Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </a>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-border bg-surface-nav text-text-muted backdrop-blur-md transition-[opacity,border-color,color] duration-200 hover:border-brand hover:text-text ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M9 14V4M4.5 8.5 9 4l4.5 4.5" />
        </svg>
      </button>
    </div>
  );
}
