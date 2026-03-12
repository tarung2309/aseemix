"use client";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

const useCases = [
  {
    num: "01",
    title: "Smart ICU Monitoring",
    desc: "Continuous AI-powered monitoring of critical care patients with real-time alerts and predictive deterioration detection.",
  },
  {
    num: "02",
    title: "AI-Assisted Diagnosis",
    desc: "Machine learning models analyze clinical data, imaging, and labs to surface diagnostic recommendations for clinicians.",
  },
  {
    num: "03",
    title: "Chronic Disease Management",
    desc: "Longitudinal patient programs for diabetes, hypertension, and COPD with automated monitoring and care escalation.",
  },
  {
    num: "04",
    title: "Smart Diet Planning",
    desc: "Clinical nutrition workflows powered by AI — creating personalized meal plans based on diagnosis, labs, and patient preferences.",
  },
  {
    num: "05",
    title: "Preventive Healthcare",
    desc: "Population-level risk identification and preventive care programs to reduce disease burden before it becomes acute.",
  },
  {
    num: "06",
    title: "Hospital Operations Intelligence",
    desc: "AI-optimized bed management, discharge planning, staffing, and supply chain intelligence across the hospital network.",
  },
];

export default function UseCasesSection() {
  const ref = useReveal();

  return (
    <section
      id="use-cases"
      ref={ref}
      className="py-24 px-[5%]"
      /* style={{ background: "linear-gradient(180deg, var(--bg-page), var(--bg-page-deep))" }} */
      style={{ background: "var(--bg-page-deep)" }}
    >
      <div className="text-center mb-16">
        <div className="section-label reveal justify-center">Use Cases</div>
        <h2
          className="reveal font-extrabold leading-tight tracking-tight mt-4"
          style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
        >
          Transforming Healthcare with{" "}
          <em className="not-italic gradient-text-blue">Intelligent Use Cases</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {useCases.map((uc) => {
          const card = (
            <div
              key={uc.num}
              className="reveal rounded-xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--bd-soft)",
                cursor: uc.num === "04" ? "pointer" : "default",
              }}
            >
              <p
                className="font-extrabold leading-none mb-3"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "2.5rem",
                  color: "var(--num-deco)",
                }}
              >
                {uc.num}
              </p>
              <h3
                className="font-bold mb-2"
                style={{ fontSize: "0.95rem", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
              >
                {uc.title}
              </h3>
              <p className="text-[0.8rem] text-mid leading-relaxed">{uc.desc}</p>
              {uc.num === "04" && (
                <div
                  style={{
                    marginTop: 14,
                    fontSize: ".68rem",
                    fontFamily: "monospace",
                    letterSpacing: ".08em",
                    color: "#FF6B35",
                    opacity: 0.8,
                  }}
                >
                  Explore AI-rogyam →
                </div>
              )}
            </div>
          );

          return uc.num === "04" ? (
            <Link key={uc.num} href="/dietplanner" style={{ textDecoration: "none" }}>
              {card}
            </Link>
          ) : (
            card
          );
        })}
      </div>
    </section>
  );
}
