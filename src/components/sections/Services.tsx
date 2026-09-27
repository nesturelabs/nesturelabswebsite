import { services } from "@/data/content";
import { ServicesBeat } from "@/components/thread/ServicesBeat";

const serviceIcons = [
  <svg key="01" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="5" width="20" height="14" rx="2" />
    <path d="M3 9h20M7 13h5" />
  </svg>,
  <svg key="02" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="7" y="3" width="12" height="20" rx="2.5" />
    <path d="M11 6h4" />
  </svg>,
  <svg key="03" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="8" y="8" width="10" height="10" rx="1.5" />
    <path d="M8 11H4M18 15h4M11 8V4M15 18v4" />
  </svg>,
  <svg key="04" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <rect x="4" y="4" width="18" height="18" rx="2" />
    <path d="M4 10h18M10 10v12" />
  </svg>,
  <svg key="05" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <path d="M7 17a4 4 0 0 1 .4-8 5.5 5.5 0 0 1 10.6 1.4A3.6 3.6 0 0 1 18 17Z" />
  </svg>,
  <svg key="06" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <circle cx="13" cy="13" r="4" />
    <path d="M13 3v4M13 19v4M3 13h4M19 13h4M6 6l3 3M17 17l3 3M20 6l-3 3M9 17l-3 3" />
  </svg>,
  <svg key="07" width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#FF2323" strokeWidth="1.4" aria-hidden="true">
    <path d="M4 18V11M9.5 18V7M15 18v-8M20.5 18V4M3 21h20" />
  </svg>,
];

export function Services() {
  return (
    <section id="nl-services" data-screen-label="02 Services" className="relative z-[2]">
      <ServicesBeat serviceCount={services.length}>
        <div className="mx-auto max-w-[1440px] pl-[var(--lane-pl)] pr-[var(--lane-pr)] pt-10 pb-[100px]">
          <div className="w-fit max-w-[34ch] py-3.5">
            <div className="font-mono text-[10.5px] tracking-[0.22em] text-brand">OUR SERVICES</div>
            <h2 className="mt-4.5 max-w-[26ch] text-balance font-heading text-[clamp(34px,3.2vw,50px)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Our Services Tailored for Your Success
            </h2>
            <p className="mt-4.5 max-w-[56ch] text-pretty text-[16px] leading-[1.7] text-text-muted">
              Comprehensive technology solutions designed to accelerate your digital transformation.
            </p>
            <div className="mt-5.5 flex w-fit items-center gap-4 rounded-[14px] border border-brand bg-[rgba(14,14,15,0.92)] px-5 py-3.5 shadow-[0_0_30px_rgba(229,9,20,0.28)]">
              <span className="font-mono text-[10px] tracking-[0.18em] text-text">PROBLEMS CAUGHT</span>
              <span className="font-mono text-[22px] text-white">
                <span id="nl-svc-counter" className="text-brand-soft">
                  0
                </span>{" "}
                <span className="text-text-muted">/ {services.length}</span>
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <article
                key={service.number}
                id={`nl-svc-card-${i}`}
                style={{ opacity: 0, transform: "translateY(22px)" }}
                className="flex flex-col gap-2.5 rounded-[18px] border border-border bg-surface p-5 backdrop-blur-2xl transition-colors duration-200 hover:border-brand"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-text-muted">{service.number}</span>
                  {serviceIcons[i]}
                </div>
                <div className="font-mono text-[10px] text-text-muted">{service.kicker}</div>
                <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">{service.title}</h3>
                <p className="text-[13px] leading-[1.55] text-text-muted">{service.body}</p>
                <ul className="flex flex-col gap-1.5 pl-4 text-[12.5px] leading-[1.5] text-text-muted [list-style-type:disc]">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a href="#nl-cta" className="mt-auto text-[12.5px] text-brand transition-colors hover:text-brand-hover">
                  Learn more →
                </a>
              </article>
            ))}
            <article className="flex flex-col justify-center gap-3.5 rounded-[18px] border border-dashed border-border-strong bg-[rgba(14,14,15,0.5)] p-5">
              <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em]">Not sure which you need?</h3>
              <p className="text-[13px] leading-[1.55] text-text-muted">
                Tell us the problem and we will tell you the shortest route to fixing it.
              </p>
              <a
                href="#nl-cta"
                className="flex min-h-11.5 items-center justify-center rounded-full bg-brand px-5 text-[13.5px] font-medium whitespace-nowrap text-white shadow-[0_0_24px_rgba(229,9,20,0.45)] transition-colors hover:bg-brand-hover"
              >
                Get Started Today
              </a>
            </article>
          </div>
        </div>
      </ServicesBeat>
    </section>
  );
}
