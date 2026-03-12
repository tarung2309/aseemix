"use client";
import { useReveal } from "@/hooks/useReveal";

const solutions = [
  {
    icon: "🧠",
    title: "Clinical Decision Support System",
    desc: "AI-driven clinical support system helping doctors make faster and more accurate decisions at the point of care.",
    features: [
      "Clinical risk prediction & stratification",
      "Intelligent treatment recommendations",
      "Drug interaction alerts & contraindications",
      "Chronic disease management pathways",
    ],
    iconBg: "rgba(112,145,230,0.12)",
    iconBorder: "rgba(112,145,230,0.25)",
    glow: "rgba(112,145,230,0.1)",
  },
  {
    icon: "🥗",
    title: "Intelligent Diet Planning Platform",
    desc: "Clinical diet planning platform designed for hospitals — bridging nutrition science with digital healthcare delivery.",
    features: [
      "Disease-specific diet protocols",
      "Nutritional analytics & tracking",
      "Personalized patient meal planning",
      "Dietician workflow management tools",
    ],
    iconBg: "rgba(34,197,94,0.1)",
    iconBorder: "rgba(34,197,94,0.25)",
    glow: "rgba(34,197,94,0.06)",
  },
  {
    icon: "❤️",
    title: "Patient Engagement Platform",
    desc: "Digital tools to improve patient participation in care — driving adherence, remote monitoring, and lifestyle improvement.",
    features: [
      "Medication reminders & adherence tracking",
      "Connected health monitoring",
      "AI-guided lifestyle coaching",
      "Remote patient care management",
    ],
    iconBg: "rgba(255,107,53,0.1)",
    iconBorder: "rgba(255,107,53,0.25)",
    glow: "rgba(255,107,53,0.06)",
  },
  {
    icon: "🌍",
    title: "Population Health Intelligence",
    desc: "Advanced analytics for healthcare organizations to understand and proactively manage the health of entire populations.",
    features: [
      "Disease trend analysis & surveillance",
      "Risk stratification at population scale",
      "Preventive care program management",
      "Population health dashboards",
    ],
    iconBg: "rgba(167,139,250,0.1)",
    iconBorder: "rgba(167,139,250,0.25)",
    glow: "rgba(167,139,250,0.06)",
  },
];

export default function SolutionsSection() {
  const ref = useReveal();

  return (
    <section id="solutions" ref={ref} className="py-24 px-[5%] bg-[var(--bg-page)]">
      <div className="text-center mb-16">
        <div className="section-label reveal justify-center">Solutions</div>
        <h2
          className="reveal font-extrabold leading-tight tracking-tight mt-4"
          style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
        >
          Intelligent Healthcare Solutions{" "}
          <em className="not-italic gradient-text-blue">Powered by the Platform</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {solutions.map((sol) => (
          <div
            key={sol.title}
            className="reveal rounded-2xl p-9 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bd-soft)",
            }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 80% 20%, ${sol.glow} 0%, transparent 60%)`,
              }}
            />
            {/* Hover border glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ border: "1px solid rgba(112,145,230,0.35)" }}
            />
            <div
              className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
              style={{ background: sol.iconBg, border: `1px solid ${sol.iconBorder}` }}
            >
              {sol.icon}
            </div>
            <h3
              className="relative font-bold mb-2.5"
              style={{ fontSize: "1.1rem", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
            >
              {sol.title}
            </h3>
            <p className="relative text-[0.88rem] text-mid leading-relaxed mb-5">{sol.desc}</p>
            <ul className="relative space-y-1.5">
              {sol.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[0.8rem] text-mid">
                  <span className="text-accent text-[0.75rem]">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
