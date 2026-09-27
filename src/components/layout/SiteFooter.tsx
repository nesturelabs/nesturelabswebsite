import { LogoMark } from "@/components/icons/LogoMark";
import { contact, footerColumns, socialLinks } from "@/data/content";

export function SiteFooter() {
  return (
    <footer id="nl-footer" className="relative z-[2] border-t border-border bg-[rgba(10,10,11,0.8)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[repeat(auto-fit,minmax(196px,1fr))] gap-x-10 gap-y-9 px-[clamp(20px,5.5vw,80px)] pt-16 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <LogoMark size={34} />
            <span className="h-7 w-px flex-none bg-border" />
            <span className="flex flex-col gap-0.5">
              <span className="whitespace-nowrap font-heading text-[14px] leading-none font-bold tracking-[0.24em]">
                NESTURE
              </span>
              <span className="whitespace-nowrap font-mono text-[10.5px] leading-none font-medium tracking-[0.42em] text-brand-soft">
                LABS
              </span>
            </span>
          </div>
          <p className="max-w-[34ch] text-[13.5px] leading-[1.6] text-text-muted">
            Web, mobile and AI solutions that scale with you. Built in Colombo, shipped worldwide.
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-border font-mono text-[11px] text-text-muted transition-colors hover:border-brand hover:text-text"
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <div className="font-mono text-[9.5px] tracking-[0.18em] text-text-muted">{col.heading}</div>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13.5px] text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            ))}
            {"legal" in col && col.legal && (
              <>
                <div className="mt-2.5 font-mono text-[9.5px] tracking-[0.18em] text-text-muted">
                  {col.legal.heading}
                </div>
                {col.legal.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13.5px] text-text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-3.5">
          <div className="font-mono text-[9.5px] tracking-[0.18em] text-text-muted">CONTACT</div>
          <a href={`mailto:${contact.email}`} className="text-[13.5px] text-text-muted transition-colors hover:text-text">
            {contact.email}
          </a>
          <a href={contact.whatsappHref} className="text-[13.5px] text-text-muted transition-colors hover:text-text">
            {contact.whatsappDisplay}
          </a>
          <div className="text-[13.5px] text-text-muted">{contact.location}</div>
          <div className="mt-1.5 flex gap-2">
            <input
              type="email"
              aria-label="Email address"
              placeholder="you@company.com"
              className="min-h-11 min-w-0 flex-1 rounded-[10px] border border-border bg-[rgba(23,23,26,0.8)] px-3.5 font-body text-[13px] text-text placeholder:text-text-muted"
            />
            <button
              type="button"
              className="min-h-11 cursor-pointer rounded-[10px] border-0 bg-brand px-4.5 text-[13px] font-medium whitespace-nowrap text-white transition-colors hover:bg-brand-hover"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-5 border-t border-rule px-[clamp(20px,5.5vw,80px)] pt-5 pb-8.5">
        <div className="font-mono text-[10px] tracking-[0.14em] text-text-muted">
          © 2026 NESTURE LABS — ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.14em] text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#E50914]" />
          END OF THREAD — CLICK THE SPIDER TO CLIMB BACK UP
        </div>
      </div>
    </footer>
  );
}
