// Copy and structural data for the home page.
// Stats, client names, project details and testimonials are placeholders
// per CLAUDE.md content rules — do not replace with invented values.

export const navLinks = [
  { label: "Home", href: "#nl-hero" },
  { label: "About", href: "#nl-why" },
  { label: "Services", href: "#nl-services" },
  { label: "Portfolio", href: "#nl-portfolio" },
  { label: "Blog", href: "#nl-faq" },
  { label: "Contact", href: "#nl-cta" },
] as const;

export const heroPillars = [
  {
    title: "Web App Development",
    body: "Fast, accessible products that hold up under real traffic.",
  },
  {
    title: "Mobile App Development",
    body: "One codebase, two stores, releases that do not break.",
  },
  {
    title: "AI Solutions Development",
    body: "Agents that take the repetitive work off your team.",
  },
  {
    title: "Digital Marketing",
    body: "Campaigns measured in booked calls, not likes.",
  },
] as const;

export const services = [
  {
    number: "01",
    kicker: "Slow website →",
    title: "Web Development",
    body: "Sites and platforms engineered to load fast and rank on merit.",
    bullets: [
      "Next.js and Laravel builds",
      "Headless CMS integration",
      "Core Web Vitals tuning",
      "Accessibility to WCAG AA",
    ],
  },
  {
    number: "02",
    kicker: "No mobile app →",
    title: "Mobile Development",
    body: "Native-feeling apps from a single maintained codebase.",
    bullets: [
      "Flutter and React Native",
      "App Store and Play releases",
      "Offline-first data sync",
      "Push and in-app messaging",
    ],
  },
  {
    number: "03",
    kicker: "Manual work →",
    title: "AI & Automation",
    body: "Agents and pipelines that retire the repetitive work.",
    bullets: [
      "LLM agents and tool use",
      "RAG over your own data",
      "Document and intake automation",
      "Human-in-the-loop review",
    ],
  },
  {
    number: "04",
    kicker: "Confusing UX →",
    title: "UI/UX Design",
    body: "Interfaces that make complex data obvious on first use.",
    bullets: [
      "Flows and prototypes",
      "Design systems in code",
      "Usability testing rounds",
      "Accessibility review",
    ],
  },
  {
    number: "05",
    kicker: "Downtime →",
    title: "Cloud & DevOps",
    body: "Infrastructure sized to your traffic, with quiet failover.",
    bullets: [
      "AWS and Cloudflare",
      "Containers and orchestration",
      "CI/CD pipelines",
      "Monitoring and alerting",
    ],
  },
  {
    number: "06",
    kicker: "Breakages →",
    title: "Support & Maintenance",
    body: "Patching, upgrades and a channel that answers.",
    bullets: [
      "Defined response windows",
      "Dependency and security patching",
      "Backups and restore drills",
      "Quarterly health reports",
    ],
  },
  {
    number: "07",
    kicker: "No leads →",
    title: "Digital Marketing",
    body: "Search and paid social measured in booked calls.",
    bullets: [
      "Technical SEO and schema",
      "Content that earns the click",
      "Paid social and search",
      "Attribution you can audit",
    ],
  },
] as const;

export const trustedClients = [
  "[CLIENT A]",
  "[CLIENT B]",
  "[CLIENT C]",
  "[CLIENT D]",
  "[CLIENT E]",
  "[CLIENT F]",
  "[CLIENT G]",
] as const;

export const trustStats = [
  { label: "PROJECTS COMPLETED", value: "[X+]" },
  { label: "HAPPY CLIENTS", value: "[X+]" },
  { label: "SUCCESS RATE", value: "[X%]" },
  { label: "YEARS EXPERIENCE", value: "[X]" },
] as const;

export const whyCards = [
  {
    title: "Full-Stack Expertise",
    body: "Design, frontend, backend and infrastructure sit in one team. Nothing gets lost in a handover.",
  },
  {
    title: "Startup Friendly",
    body: "Scope sized to a runway. We build the version that proves the idea, then the one that scales.",
  },
  {
    title: "Agile Methodology",
    body: "Two-week increments you can open and click. Priorities can change between them, not inside them.",
  },
  {
    title: "AI-Driven Solutions",
    body: "Models used where they earn their keep, with evaluation and a human check on the path.",
  },
  {
    title: "24/7 Support",
    body: "One shared channel with the people who built it, and response windows written into the contract.",
  },
  {
    title: "Enterprise Security",
    body: "Least-privilege access, audited dependencies and secrets that never live in a repository.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "We map the business before the build: goals, constraints and what already works.",
  },
  {
    number: "02",
    title: "Design",
    body: "Flows and screens reviewed with you in the browser, not as flat pictures.",
  },
  {
    number: "03",
    title: "Develop",
    body: "Two-week increments you can open, click and comment on as they land.",
  },
  {
    number: "04",
    title: "Test",
    body: "Automated suites plus real-device passes, run before anything reaches your users.",
  },
  {
    number: "05",
    title: "Deploy",
    body: "Staged rollout behind flags, with a rollback path we have already rehearsed.",
  },
  {
    number: "06",
    title: "Support",
    body: "Monitoring, patching and iteration once real traffic starts arriving.",
  },
] as const;

export const resultTiles = [
  { label: "PROJECTS DELIVERED", value: "[X+]" },
  { label: "HAPPY CLIENTS", value: "[X+]" },
  { label: "YEARS EXPERIENCE", value: "[X]" },
  { label: "COUNTRIES SERVED", value: "[X]" },
] as const;

export type PortfolioCategory = "web" | "mobile" | "ai" | "cloud";

export const portfolioFilters: { label: string; value: "all" | PortfolioCategory }[] = [
  { label: "ALL", value: "all" },
  { label: "WEB", value: "web" },
  { label: "MOBILE", value: "mobile" },
  { label: "AI", value: "ai" },
  { label: "CLOUD", value: "cloud" },
];

export const projects: {
  id: string;
  name: string;
  category: PortfolioCategory;
  sector: string;
  description: string;
}[] = [
  { id: "a", name: "Project A", category: "web", sector: "[SECTOR]", description: "[One line on the problem and what shipped.]" },
  { id: "b", name: "Project B", category: "mobile", sector: "[SECTOR]", description: "[One line on the problem and what shipped.]" },
  { id: "c", name: "Project C", category: "ai", sector: "[SECTOR]", description: "[One line on the problem and what shipped.]" },
  { id: "d", name: "Project D", category: "web", sector: "[SECTOR]", description: "[One line on the problem and what shipped.]" },
  { id: "e", name: "Project E", category: "cloud", sector: "[SECTOR]", description: "[One line on the problem and what shipped.]" },
  { id: "f", name: "Project F", category: "ai", sector: "[SECTOR]", description: "[One line on the problem and what shipped.]" },
];

export const testimonials = [
  {
    quote:
      "[Testimonial quote placeholder — two or three sentences in the client's own words about the engagement and the result.]",
    name: "[Client name]",
    role: "[ROLE, COMPANY]",
  },
  {
    quote: "[Testimonial quote placeholder — what changed for the business after launch.]",
    name: "[Client name]",
    role: "[ROLE, COMPANY]",
  },
  {
    quote: "[Testimonial quote placeholder — how the team handled scope, comms and handover.]",
    name: "[Client name]",
    role: "[ROLE, COMPANY]",
  },
] as const;

export const stackChips = [
  { monogram: "Re", name: "React", category: "FRONTEND" },
  { monogram: "Nx", name: "Next.js", category: "FRONTEND" },
  { monogram: "No", name: "Node.js", category: "BACKEND" },
  { monogram: "Py", name: "Python", category: "BACKEND" },
  { monogram: "Fl", name: "Flutter", category: "MOBILE" },
  { monogram: "Tf", name: "TensorFlow", category: "AI" },
  { monogram: "Mg", name: "MongoDB", category: "DATABASE" },
  { monogram: "Pg", name: "PostgreSQL", category: "DATABASE" },
  { monogram: "Aw", name: "AWS", category: "CLOUD" },
  { monogram: "Dk", name: "Docker", category: "CLOUD" },
  { monogram: "K8", name: "Kubernetes", category: "CLOUD" },
  { monogram: "Fb", name: "Firebase", category: "BACKEND" },
] as const;

export const faqItems = [
  {
    question: "How do you price work?",
    answer:
      "Fixed price for defined scope, monthly retainer for ongoing product work. You get the estimate broken down by phase before anything starts.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A marketing site runs four to six weeks. A product build with accounts, payments and an admin panel is usually three to five months, split into two-week increments you review as they land.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Monitoring and patching continue on a support plan with defined response windows, and we keep iterating on what the analytics show once real users arrive.",
  },
  {
    question: "Who owns the code and the accounts?",
    answer:
      "You do, from day one. Repositories, cloud accounts and domains are in your name, and handover includes the documentation to run them without us.",
  },
  {
    question: "What does your process look like week to week?",
    answer:
      "A short written update on Monday, a working build to click on Friday, and one shared channel in between. Priorities can change between increments, not inside them.",
  },
  {
    question: "Can you work across our time zone?",
    answer:
      "We are based in Colombo and hold overlap hours that suit your working day, with written handoffs so progress never waits for a call.",
  },
] as const;

export const ctaBadges = ["FREE CONSULTATION", "NO OBLIGATION QUOTE", "24/7 SUPPORT"] as const;

export const contact = {
  email: "info@nesturelabs.com",
  whatsappDisplay: "WhatsApp [+94 XX XXX XXXX]",
  whatsappHref: "#nl-cta",
  location: "Colombo, Sri Lanka",
} as const;

export const footerColumns = [
  {
    heading: "SERVICES",
    links: [
      { label: "Web Development", href: "#nl-services" },
      { label: "Mobile Development", href: "#nl-services" },
      { label: "AI & Automation", href: "#nl-services" },
      { label: "Cloud & DevOps", href: "#nl-services" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: "#nl-why" },
      { label: "How we work", href: "#nl-process" },
      { label: "Portfolio", href: "#nl-portfolio" },
      { label: "Careers", href: "#nl-cta" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { label: "FAQ", href: "#nl-faq" },
      { label: "Tech stack", href: "#nl-stack" },
      { label: "Blog", href: "#nl-faq" },
    ],
    legal: {
      heading: "LEGAL",
      links: [
        { label: "Privacy", href: "#nl-faq" },
        { label: "Terms", href: "#nl-faq" },
      ],
    },
  },
] as const;

export const socialLinks = [
  { label: "LinkedIn", short: "in", href: "#nl-cta" },
  { label: "X", short: "X", href: "#nl-cta" },
  { label: "GitHub", short: "gh", href: "#nl-cta" },
  { label: "Instagram", short: "ig", href: "#nl-cta" },
] as const;
