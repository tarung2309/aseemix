"use client";
import { useReveal } from "@/hooks/useReveal";

export default function CTASection() {
  const ref = useReveal();

  return (
    <section
      id="cta"
      ref={ref}
      className="py-24 px-[5%] text-center"
     style={{ padding: "90px 5% 100px", background: "var(--bg-page-deep)" }}
    >
      <div className="section-label reveal justify-center">Get Started</div>
      <h2
        className="reveal font-extrabold leading-tight tracking-tight mx-auto mt-4"
        style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
      >
        Ready to{" "}
        <em className="not-italic gradient-text-blue">Transform</em> Your Hospital?
      </h2>
      <p className="reveal text-mid mx-auto mt-4 max-w-lg font-light leading-relaxed">
        Join leading healthcare organizations using the Smart Hospital Platform to deliver better clinical outcomes, improved efficiency, and personalized patient care.
      </p>
      <div className="reveal flex flex-wrap gap-4 justify-center mt-10">
        <a
          href="/request-demo"
          className="bg-accent text-white px-9 py-3.5 rounded-lg font-semibold text-[0.9rem] no-underline transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: "0 0 30px rgba(255,107,53,0.4)" }}
        >
          Request Platform Demo
        </a>
        <a
          href="#"
          className="bg-transparent text-light px-9 py-3.5 rounded-lg border border-[rgba(173,187,218,0.3)] font-medium text-[0.9rem] no-underline transition-all duration-200 hover:border-bright hover:text-[var(--tx-head)] hover:bg-[rgba(112,145,230,0.08)]"
        >
          Talk to Our Experts
        </a>
      </div>
    </section>
  );
}
