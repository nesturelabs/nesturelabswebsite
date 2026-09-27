import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Trusted } from "@/components/sections/Trusted";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechStack } from "@/components/sections/TechStack";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { ThreadOverlay } from "@/components/thread/ThreadOverlay";

export default function Home() {
  return (
    <div className="relative bg-bg text-text">
      <ThreadOverlay />
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Trusted />
        <WhyUs />
        <Process />
        <Results />
        <Portfolio />
        <Testimonials />
        <TechStack />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
