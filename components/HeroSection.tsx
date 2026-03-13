import Link from "next/link";
import CommandCenter from "./CommandCenter";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-32 pb-20 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,82,160,0.5) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(112,145,230,0.12) 0%, transparent 60%), var(--bg-page)",
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(112,145,230,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(112,145,230,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 80%)",
        }}
      />

      {/* Badge */}
      <div className="fade-up-1 relative z-10 inline-flex items-center gap-2 border border-[rgba(112,145,230,0.3)] bg-[rgba(112,145,230,0.12)] px-4 py-1.5 rounded-full text-[0.78rem] font-semibold text-bright uppercase tracking-widest mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
        AI-Powered Healthcare Intelligence
      </div>

      {/* Headline */}
      <h1
        className="fade-up-2 relative z-10 font-syne font-extrabold leading-[1.05] tracking-tight max-w-[900px]"
        style={{
          fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
          fontFamily: "var(--font-syne)",
          color: "var(--tx-head)",
        }}
      >
        The Intelligence Platform
        <br />
        Powering the Future of
        <br />
        <em className="not-italic gradient-text">Smart Hospitals</em>
      </h1>

      {/* Subheadline */}
      <p className="fade-up-3 relative z-10 text-[1.1rem] font-light text-mid max-w-[620px] leading-relaxed mt-6">
        Transform hospital operations and clinical care with our AI-powered
        Smart Hospital Platform that integrates hospital systems, clinical
        intelligence, and real-time analytics into one unified ecosystem.
      </p>

      {/* CTAs */}
      <div className="fade-up-4 relative z-10 flex flex-wrap gap-4 mt-10 justify-center">
        <Link
          href="/request-demo"
          className="bg-accent text-white px-8 py-3.5 rounded-lg font-semibold text-[0.9rem] no-underline transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: "0 0 30px rgba(255,107,53,0.4)" }}
        >
          Request Demo
        </Link>
        <a
          href="#platform-intro"
          className="bg-transparent text-light px-8 py-3.5 rounded-lg border border-[rgba(173,187,218,0.3)] font-medium text-[0.9rem] no-underline transition-all duration-200 hover:border-bright hover:text-[var(--tx-head)] hover:bg-[rgba(112,145,230,0.08)]"
        >
          Explore Platform →
        </a>
      </div>

      {/* Command Center */}
      <div className="fade-up-5 relative z-10 w-full max-w-[1100px] mt-16">
        <CommandCenter />
      </div>
    </section>
  );
}
