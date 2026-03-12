"use client";
import { useReveal } from "@/hooks/useReveal";

const stackLayers = [
  {
    icon: "🏥",
    name: "Hospital Command Center",
    desc: "Operational dashboards · Clinical insights · Population analytics",
    tag: "Applications",
    accentColor: "#FF6B35",
    bg: "rgba(255,107,53,0.08)",
    tagBorder: "rgba(255,107,53,0.3)",
  },
  {
    icon: "🤖",
    name: "Clinical Intelligence Engine",
    desc: "AI/ML models · Decision support rules · Predictive analytics",
    tag: "AI Layer",
    accentColor: "#7091E6",
    bg: "rgba(112,145,230,0.08)",
    tagBorder: "rgba(112,145,230,0.3)",
  },
  {
    icon: "📚",
    name: "Healthcare Knowledge Base",
    desc: "Clinical guidelines · Drug interactions · Disease protocols",
    tag: "Knowledge",
    accentColor: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    tagBorder: "rgba(167,139,250,0.3)",
  },
  {
    icon: "🗄",
    name: "Clinical Data Platform",
    desc: "Unified patient model · FHIR compatible · Longitudinal records",
    tag: "Data",
    accentColor: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    tagBorder: "rgba(34,197,94,0.3)",
  },
  {
    icon: "🔌",
    name: "Healthcare Data Integration Layer",
    desc: "HIS/EMR · Medical devices · IoT health data",
    tag: "Integration",
    accentColor: "#3D52A0",
    bg: "rgba(61,82,160,0.12)",
    tagBorder: "rgba(173,187,218,0.3)",
  },
];

const badges = [
  "Clinical Data Integration",
  "AI Decision Support",
  "Personalized Patient Care",
  "Operational Intelligence",
  "Population Health",
];

export default function PlatformIntroSection() {
  const ref = useReveal();

  return (
    <section
      id="platform-intro"
      ref={ref}
      className="py-24 px-[5%]"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(61,82,160,0.15) 0%, transparent 70%), var(--bg-page)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
        {/* Left */}
        <div>
          <div className="section-label reveal">The Solution</div>
          <h2
            className="reveal font-extrabold leading-tight tracking-tight max-w-[540px] mt-4"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
          >
            Introducing the{" "}
            <em className="not-italic gradient-text-blue">Smart Hospital Platform</em>
          </h2>
          <p className="reveal text-mid leading-relaxed max-w-[500px] mt-4 font-light">
            Our Smart Hospital Platform acts as the intelligence layer on top of hospital systems — integrating data, clinical knowledge, and AI to power intelligent healthcare applications.
          </p>
          <div className="reveal flex flex-wrap gap-2.5 mt-8">
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

        {/* Right — Intelligence Stack */}
        <div className="reveal flex flex-col gap-0">
          <p className="text-[0.68rem] text-mid uppercase tracking-widest mb-4 text-center">
            Healthcare Intelligence Stack
          </p>
          {stackLayers.map((layer, i) => (
            <div key={layer.name}>
              <div
                className="stack-block flex items-center gap-4 p-4 rounded-xl relative overflow-hidden"
                style={{
                  background: layer.bg,
                  border: `1px solid rgba(112,145,230,0.15)`,
                  margin: "2px 0",
                }}
              >
                {/* Left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                  style={{ background: layer.accentColor }}
                />
                <span className="text-xl ml-1">{layer.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-[0.85rem]"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
                  >
                    {layer.name}
                  </p>
                  <p className="text-[0.72rem] text-mid mt-0.5">{layer.desc}</p>
                </div>
                <span
                  className="text-[0.62rem] px-2.5 py-1 rounded-full border whitespace-nowrap flex-shrink-0"
                  style={{ color: layer.accentColor, borderColor: layer.tagBorder }}
                >
                  {layer.tag}
                </span>
              </div>
              {i < stackLayers.length - 1 && (
                <p className="text-center text-[rgba(112,145,230,0.4)] text-sm py-0.5">↕</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
