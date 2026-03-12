"use client";
import { useReveal } from "@/hooks/useReveal";

const differentiators = [
  {
    icon: "🤖",
    title: "AI-First Architecture",
    desc: "Built for healthcare intelligence and clinical AI — not retrofitted with AI as an afterthought.",
  },
  {
    icon: "🔗",
    title: "Interoperability Ready",
    desc: "Native support for FHIR, CDS Hooks, and HL7 — seamlessly connecting with existing hospital infrastructure.",
  },
  {
    icon: "🧩",
    title: "Modular and Scalable",
    desc: "Deploy individual modules or the full platform. Scale at your own pace without disrupting operations.",
  },
  {
    icon: "🏢",
    title: "Enterprise Ready",
    desc: "Designed for large hospitals and healthcare networks with enterprise-grade security and compliance.",
  },
];

const stats = [
  { val: "94%", label: "Clinical Decision Accuracy" },
  { val: "3.2×", label: "Faster Clinical Decisions" },
  { val: "40%", label: "Reduction in LOS" },
  { val: "99.9%", label: "Platform Uptime SLA" },
];

const badges = ["FHIR R4", "HL7 v2/v3", "CDS Hooks", "HIPAA", "ISO 27001", "SNOMED CT", "ICD-10"];

export default function WhyUsSection() {
  const ref = useReveal();

  return (
    <section id="why-us" ref={ref} className="py-24 px-[5%] bg-[var(--bg-page)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
        {/* Left */}
        <div>
          <div className="section-label reveal">Why Choose Us</div>
          <h2
            className="reveal font-extrabold leading-tight tracking-tight max-w-[520px] mt-4"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
          >
            Why Hospitals Choose{" "}
            <em className="not-italic gradient-text-blue">Our Platform</em>
          </h2>
          <p className="reveal text-mid leading-relaxed max-w-[480px] mt-4 font-light">
            Built from the ground up for healthcare — not adapted from generic enterprise software.
          </p>
          <div className="mt-8 flex flex-col gap-5">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="reveal flex gap-5 items-start p-6 rounded-xl transition-all duration-300 hover:bg-[rgba(112,145,230,0.05)]"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--bd-soft)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: "rgba(61,82,160,0.2)",
                    border: "1px solid rgba(112,145,230,0.2)",
                  }}
                >
                  {d.icon}
                </div>
                <div>
                  <p className="font-bold text-[var(--tx-head)] mb-1.5" style={{ fontFamily: "var(--font-syne)", fontSize: "0.95rem" }}>
                    {d.title}
                  </p>
                  <p className="text-[0.82rem] text-mid leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="reveal">
          <div
            className="rounded-2xl p-9 grid grid-cols-2 gap-8"
            style={{
              background: "var(--fcard-bg)",
              border: "1px solid var(--bd-soft)",
            }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-extrabold gradient-text-blue leading-none"
                  style={{ fontFamily: "var(--font-syne)", fontSize: "2.8rem" }}
                >
                  {s.val}
                </p>
                <p className="text-[0.8rem] text-mid mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-[0.72rem] text-mid mb-3">Standards & Compliance</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-[0.72rem] font-medium text-light px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(112,145,230,0.1)",
                    border: "1px solid rgba(112,145,230,0.2)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
