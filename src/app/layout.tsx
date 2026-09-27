import type { Metadata } from "next";
import { poppins, inter, jetbrainsMono } from "@/lib/fonts";
import { LaneCssVars } from "@/components/thread/LaneCssVars";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nesture Labs — Building Tomorrow's AI Systems that Scale",
  description:
    "Nesture Labs builds web, mobile and AI systems for teams in Colombo and beyond. Web development, mobile apps, AI & automation, cloud and DevOps.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/brand/icon-dark-1024.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-body text-text" style={{ overflowX: "clip" }}>
        <LaneCssVars />
        {children}
      </body>
    </html>
  );
}
