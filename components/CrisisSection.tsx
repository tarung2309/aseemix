"use client";
import { useReveal } from "@/hooks/useReveal";

const problems = [
  { icon: "⏱", title: "Delayed Clinical Decisions", desc: "Disconnected data prevents timely, informed interventions." },
  { icon: "🔄", title: "Inefficient Workflows", desc: "Manual processes and siloed systems waste clinical time." },
  { icon: "👁", title: "Lack of Real-time Insights", desc: "No unified view of patient data across departments." },
  { icon: "💰", title: "Rising Healthcare Costs", desc: "Operational inefficiency drives unsustainable expenditure." },
];

const fragNodes = [
  { icon: "🏥", label: "HIS / EMR" },
  { icon: "🧬", label: "Lab Systems" },
  { icon: "🩻", label: "Radiology" },
  { icon: "⚠️", label: "No Intelligence Layer", center: true },
  { icon: "💊", label: "Pharmacy" },
  { icon: "📡", label: "IoT Devices" },
  { icon: "📋", label: "Manual Workflows" },
  { icon: "📊", label: "Finance" },
  { icon: "👤", label: "Patient Portal" },
];

export default function CrisisSection() {
  const ref = useReveal();

  return (
    <section
      id="crisis"
      ref={ref}
      className="py-24 px-[5%]"
      style={{ background: "linear-gradient(180deg, var(--bg-page) 0%, var(--bg-page-alt) 100%)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
        {/* Left */}
        <div>
          <div className="section-label reveal">The Problem</div>
          <h2
            className="reveal font-extrabold leading-tight tracking-tight max-w-[560px] mt-4"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
          >
            Healthcare is Producing More Data Than Ever — But{" "}
            <em className="not-italic gradient-text-blue">Lacks Intelligence</em>
          </h2>
          <p className="reveal text-mid leading-relaxed max-w-[480px] mt-4 font-light">
            Hospitals today operate with fragmented digital systems that create dangerous silos, delayed decisions, and rising costs.
          </p>
          <ul className="mt-8 space-y-0 divide-y divide-white/5">
            {problems.map((p) => (
              <li key={p.title} className="reveal flex items-start gap-4 py-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)" }}
                >
                  {p.icon}
                </div>
                <div>
                  <p className="font-semibold text-[var(--tx-head)] text-sm">{p.title}</p>
                  <p className="text-mid text-[0.85rem] mt-0.5">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — fragmentation visual */}
        <div
          className="reveal rounded-2xl p-8"
          style={{ background: "var(--fcard-bg)", border: "1px solid var(--bd-soft)" }}
        >
          <p className="text-[0.7rem] text-mid uppercase tracking-widest mb-4">
            Current State — Disconnected Systems
          </p>
          <div className="grid grid-cols-3 gap-3">
            {fragNodes.map((node, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 text-center text-[0.76rem] cursor-default transition-all duration-300 hover:-translate-y-0.5 ${
                  node.center
                    ? "text-accent font-semibold"
                    : "text-mid hover:text-[var(--tx-head)]"
                }`}
                style={{
                  background: node.center ? "rgba(255,107,53,0.1)" : "rgba(61,82,160,0.1)",
                  border: node.center
                    ? "1px solid rgba(255,107,53,0.3)"
                    : "1px solid rgba(112,145,230,0.2)",
                }}
              >
                <span className="text-xl block mb-1">{node.icon}</span>
                {node.label}
              </div>
            ))}
          </div>
          <p
            className="text-center text-[0.75rem] text-mid mt-5 pt-4"
            style={{ borderTop: "1px dashed rgba(255,107,53,0.3)" }}
          >
            These disconnected systems create data silos, clinical risk, and operational waste
          </p>
        </div>
      </div>
    </section>
  );
}
