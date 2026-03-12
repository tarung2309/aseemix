"use client";
import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    num: "01",
    title: "Clinical Intelligence",
    desc: "AI and clinical decision support that empowers every clinician with the insights needed to deliver safer, faster, better care.",
    glow: "rgba(112,145,230,0.1)",
  },
  {
    num: "02",
    title: "Operational Intelligence",
    desc: "Hospital operations optimized by AI — from bed management to discharge planning, supply chain to staffing.",
    glow: "rgba(255,107,53,0.08)",
  },
  {
    num: "03",
    title: "Patient Intelligence",
    desc: "Personalized patient care journeys powered by longitudinal data, AI coaching, and continuous remote monitoring.",
    glow: "rgba(34,197,94,0.06)",
  },
];

export default function VisionSection() {
  const ref = useReveal();

  return (
    <section
      id="vision"
      ref={ref}
      className="py-24 px-[5%] text-center bg-[var(--bg-page)]"
      /* style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(61,82,160,0.25) 0%, transparent 70%), var(--bg-page-deep)",
      }} */
    >
      <div className="section-label reveal justify-center">Our Vision</div>
      <h2
        className="reveal font-extrabold leading-tight tracking-tight mx-auto mt-4"
        style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
      >
        Building the Intelligence Infrastructure{" "}
        <em className="not-italic gradient-text-blue">for Healthcare</em>
      </h2>
      <p className="reveal text-mid mx-auto mt-4 max-w-xl font-light leading-relaxed">
        Our mission is to build the technology foundation that powers the next generation of smart hospitals — enabling data-driven clinical decisions and personalized patient care at scale.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="reveal rounded-2xl p-9 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bd-soft)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${p.glow} 0%, transparent 60%)`,
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ border: "1px solid rgba(112,145,230,0.3)" }}
            />
            <p
              className="relative font-extrabold leading-none mb-4"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "3rem",
                color: "var(--num-deco)",
              }}
            >
              {p.num}
            </p>
            <h3
              className="relative font-bold mb-2.5"
              style={{ fontFamily: "var(--font-syne)", fontSize: "1.1rem", color: "var(--tx-head)" }}
            >
              {p.title}
            </h3>
            <p className="relative text-[0.85rem] text-mid leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
