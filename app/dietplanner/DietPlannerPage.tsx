"use client";
import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

/* ════════════════════════════════════════════════════════════
   NAV — breadcrumb
════════════════════════════════════════════════════════════ */
function PlatNav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        background: "var(--nav-bg)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--bd-soft)",
        boxShadow: "0 1px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".72rem", color: "var(--tx-muted)" }}>
        <Link href="/" style={{ color: "var(--tx-muted)", textDecoration: "none" }}>Smart Hospital Platform</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <span>Use Cases</span>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: "var(--tx-head)", fontWeight: 500 }}>AI-rogyam</span>
      </div>
      <button
        style={{
          padding: "7px 18px",
          borderRadius: 100,
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: ".75rem",
          background: "linear-gradient(135deg,#FF6B35,#FF8C5A)",
          color: "#fff",
          boxShadow: "0 4px 18px rgba(255,107,53,0.3)",
        }}
      >
        Request Demo
      </button>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
function PlatHero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(ellipse at 70% 40%, rgba(61,82,160,0.18) 0%, transparent 60%), var(--bg-page-deep)",
        padding: "90px 5% 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(112,145,230,0.07) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      {/* Accent blob */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,107,53,0.08),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div style={{ animation: "fadeUp 0.75s ease both" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              padding: "4px 12px",
              borderRadius: 8,
              background: "var(--bg-subtle)",
              border: "1px solid var(--bd-soft)",
              fontSize: ".62rem",
              fontFamily: "var(--font-syne)",
              letterSpacing: ".1em",
              color: "var(--tx-muted)",
            }}
          >
            Smart Hospital Platform · Use Case Module
          </div>

          <div style={{ marginBottom: 20 }}>
            <h1
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(2.6rem,5vw,4rem)",
                letterSpacing: "-.03em",
                lineHeight: 1.05,
                color: "var(--tx-head)",
                margin: 0,
              }}
            >
              <span className="gradient-text">AI-rogyam</span>
            </h1>
            <p
              style={{
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
                color: "var(--tx-muted)",
                marginTop: 6,
              }}
            >
              Clinical Nutrition & Lifestyle Intelligence
            </p>
          </div>

          <p
            style={{
              fontSize: ".9rem",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "var(--tx-muted)",
              maxWidth: 520,
              marginBottom: 28,
            }}
          >
            AI-powered precision nutrition for hospitals. Personalized diet planning,
            intelligent dietician workflows, and patient lifestyle monitoring — seamlessly
            integrated into your clinical ecosystem.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            <Link href="/request-demo">
              <button
                style={{
                  padding: "11px 24px",
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: ".85rem",
                  background: "linear-gradient(135deg,#FF6B35,#FF8C5A)",
                  color: "#fff",
                  boxShadow: "0 4px 18px rgba(255,107,53,0.3)",
                }}
              >
                Request Demo →
              </button>
            </Link>
            <button
              style={{
                padding: "11px 24px",
                borderRadius: 100,
                background: "transparent",
                border: "1.5px solid var(--bd-soft)",
                color: "var(--tx-head)",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: ".85rem",
                cursor: "pointer",
              }}
            >
              Explore Modules
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              ["70%", "Less planning time"],
              ["94%", "AI accuracy"],
              ["40%", "Better outcomes"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: "1.8rem",
                    lineHeight: 1,
                    color: "var(--tx-head)",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".1em",
                    color: "var(--tx-muted)",
                    marginTop: 3,
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Intelligence Stack */}
        <div style={{ animation: "fadeUp 0.75s 0.2s ease both" }}>
          <IntelligenceStackMini />
        </div>
      </div>
    </section>
  );
}

/* ── Intelligence Stack visual ── */
function IntelligenceStackMini() {
  const layers = [
    { label: "Clinical Applications", items: ["Diet Planning CDSS", "Patient Monitoring", "Smart ICU"], color: "#FF6B35" },
    { label: "AI Nutrition Engine", items: ["Precision AI", "Clinical Rules", "Risk Models"], color: "#7091E6" },
    { label: "Healthcare Knowledge", items: ["Disease DB", "Drug-Food Graph", "Nutrition Science"], color: "#a78bfa" },
    { label: "Data Integration", items: ["HIS · EMR · LIS · FHIR"], color: "#34d399" },
  ];
  const [active, setActive] = useState(1);
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderRadius: 18,
        padding: 20,
        border: "1px solid var(--bd-soft)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: ".58rem",
          letterSpacing: ".12em",
          color: "var(--tx-faint)",
          marginBottom: 14,
          textTransform: "uppercase",
        }}
      >
        Clinical Intelligence Stack
      </div>
      {layers.map((l, i) => (
        <div
          key={l.label}
          onClick={() => setActive(i)}
          style={{
            marginBottom: 8,
            padding: "14px 16px",
            borderRadius: 12,
            cursor: "pointer",
            background: active === i ? `${l.color}12` : "var(--bg-subtle)",
            border: `1px solid ${active === i ? l.color + "45" : "var(--bd-soft)"}`,
            transition: "all .25s ease",
            boxShadow: active === i ? `0 4px 20px ${l.color}25` : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: active === i ? 8 : 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: ".78rem",
                color: active === i ? "var(--tx-head)" : "var(--tx-muted)",
                transition: "color .25s",
              }}
            >
              {l.label}
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: l.color,
                opacity: active === i ? 1 : 0.3,
                boxShadow: active === i ? `0 0 8px ${l.color}` : "none",
              }}
            />
          </div>
          {active === i && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {l.items.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: `${l.color}15`,
                    border: `1px solid ${l.color}30`,
                    fontSize: ".6rem",
                    color: l.color,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
      <div
        style={{
          marginTop: 14,
          padding: "10px 14px",
          borderRadius: 10,
          background: "rgba(255,107,53,0.07)",
          border: "1px solid rgba(255,107,53,0.18)",
        }}
      >
        <span style={{ fontSize: ".62rem", fontFamily: "monospace", color: "#FF6B35", letterSpacing: ".08em" }}>
          🔗 Connected to Smart Hospital Platform
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MODULE CARDS
════════════════════════════════════════════════════════════ */
function Modules() {
  const [selected, setSelected] = useState<number | null>(null);
  const modules = [
    {
      icon: "🏥",
      title: "IPD Clinical Nutrition",
      tag: "Hospital",
      tagColor: "#7091E6",
      short: "End-to-end inpatient diet management from admission to discharge.",
      features: ["Dietician smart dashboard", "AI-generated diet plans from EMR data", "Kitchen meal ticket automation", "Ward manager diet tracking", "Allergy & drug-food alerts", "Nutrition audit trail"],
    },
    {
      icon: "📱",
      title: "OPD Lifestyle Platform",
      tag: "Patient App",
      tagColor: "#FF6B35",
      short: "Personalized outpatient diet & fitness programs through mobile.",
      features: ["Patient mobile app (iOS/Android)", "AI lifestyle plan generation", "Fitness & yoga programs", "Doctor/dietician portal", "Daily compliance tracking", "Progress analytics"],
    },
    {
      icon: "🧠",
      title: "CDSS Nutrition Engine",
      tag: "Core AI",
      tagColor: "#a78bfa",
      short: "Clinical decision support specifically tuned for nutrition intelligence.",
      features: ["40+ disease-specific protocols", "Real-time drug-food interaction checks", "Macro/micro nutrient optimization", "One-click dietician approvals", "Confidence scoring", "Evidence-based recommendations"],
    },
    {
      icon: "📊",
      title: "Population Nutrition",
      tag: "Analytics",
      tagColor: "#34d399",
      short: "Hospital-wide and population-level nutrition analytics and outcomes.",
      features: ["Nutrition outcome dashboards", "Risk cohort identification", "Compliance rate monitoring", "Readmission risk tracking", "NABH-ready reports", "Trend analytics"],
    },
  ];

  return (
    <section style={{ padding: "80px 5%", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 40 }}>
          <div className="section-label">Platform Modules</div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem,3.2vw,2.6rem)",
              letterSpacing: "-.025em",
              lineHeight: 1.1,
              color: "var(--tx-head)",
              marginTop: 12,
            }}
          >
            Four Integrated <span className="gradient-text-blue">Modules</span>
          </h2>
          <p style={{ fontSize: ".9rem", fontWeight: 300, lineHeight: 1.7, color: "var(--tx-muted)", maxWidth: 560, marginTop: 10 }}>
            Each module is designed for a specific user and workflow, yet all share the same clinical intelligence core.
          </p>
        </div>
        <div
          className="reveal"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}
        >
          {modules.map((m, i) => (
            <div
              key={m.title}
              style={{
                background: selected === i ? `${m.tagColor}0d` : "var(--bg-surface)",
                border: `1px solid ${selected === i ? m.tagColor + "55" : "var(--bd-soft)"}`,
                borderRadius: 14,
                padding: 22,
                cursor: "pointer",
                transition: "all .28s ease",
              }}
              onMouseEnter={(e) => { if (selected !== i) (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { if (selected !== i) (e.currentTarget as HTMLElement).style.transform = ""; }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${m.tagColor}18`,
                    border: `1px solid ${m.tagColor}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}
                >
                  {m.icon}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontWeight: 700,
                        fontSize: ".92rem",
                        color: "var(--tx-head)",
                        margin: 0,
                      }}
                    >
                      {m.title}
                    </h3>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: `${m.tagColor}18`,
                        border: `1px solid ${m.tagColor}35`,
                        fontSize: ".58rem",
                        color: m.tagColor,
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: ".73rem", color: "var(--tx-muted)", margin: 0, lineHeight: 1.5 }}>
                    {m.short}
                  </p>
                </div>
              </div>
              {selected === i && (
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: `1px solid ${m.tagColor}25`,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4px 12px",
                  }}
                >
                  {m.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 5 }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: m.tagColor,
                          flexShrink: 0,
                          marginTop: 6,
                        }}
                      />
                      <span style={{ fontSize: ".68rem", color: "var(--tx-body)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
              <div
                style={{
                  marginTop: 12,
                  fontSize: ".6rem",
                  fontFamily: "monospace",
                  color: m.tagColor,
                  letterSpacing: ".08em",
                  opacity: 0.7,
                }}
              >
                {selected === i ? "▲ COLLAPSE" : "▼ SEE FEATURES"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   HOW IT WORKS
════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { icon: "📥", label: "Clinical Data Ingestion", sub: "Patient EMR, labs, allergies, medications pulled via FHIR" },
    { icon: "🧬", label: "AI Analysis", sub: "Precision Engine processes through 4 knowledge layers" },
    { icon: "📋", label: "Plan Generation", sub: "Personalized diet & fitness plan created in seconds" },
    { icon: "✅", label: "Dietician Review", sub: "One-click approval with CDSS alerts highlighted" },
    { icon: "📡", label: "Delivery & Monitoring", sub: "Kitchen/app receives plan; patient compliance tracked" },
  ];
  return (
    <section style={{ background: "var(--bg-page-alt)", padding: "80px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Clinical Workflow</div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem,3.2vw,2.6rem)",
              letterSpacing: "-.025em",
              lineHeight: 1.1,
              color: "var(--tx-head)",
              marginTop: 12,
            }}
          >
            From Clinical Data to <em className="not-italic gradient-text-blue">Personalized Nutrition</em>
          </h2>
          <p style={{ fontSize: ".9rem", fontWeight: 300, lineHeight: 1.7, color: "var(--tx-muted)", maxWidth: 560, margin: "10px auto 0" }}>
            AI-rogyam automates the entire nutrition planning workflow — in seconds, not hours.
          </p>
        </div>
        <div className="reveal" style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{ display: "flex", flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  padding: "20px 16px",
                  borderRadius: 14,
                  background: "var(--bg-surface)",
                  border: "1px solid var(--bd-soft)",
                  textAlign: "center",
                  transition: "all .3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#FF6B35";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    margin: "0 auto 12px",
                    background: `rgba(255,107,53,${0.08 + i * 0.04})`,
                    border: `1px solid rgba(255,107,53,${0.15 + i * 0.08})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ fontSize: ".55rem", letterSpacing: ".1em", color: "#FF6B35", marginBottom: 6, fontFamily: "monospace" }}>
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: ".78rem",
                    color: "var(--tx-head)",
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </h4>
                <p style={{ fontSize: ".65rem", color: "var(--tx-muted)", lineHeight: 1.5 }}>{s.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 4px" }}>
                  <div style={{ fontSize: "1rem", color: "rgba(255,107,53,0.5)" }}>›</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TECHNOLOGY
════════════════════════════════════════════════════════════ */
function Technology() {
  const specs = [
    { label: "AI Model Type", value: "Multi-modal Clinical ML", color: "#7091E6" },
    { label: "Knowledge Base", value: "12,000+ foods · 40+ conditions", color: "#FF6B35" },
    { label: "Integrations", value: "HIS · EMR · LIS · FHIR R4", color: "#34d399" },
    { label: "Compliance", value: "HIPAA · NABH · ISO 27001", color: "#a78bfa" },
    { label: "Deployment", value: "Cloud · On-Premise · Hybrid", color: "#38bdf8" },
    { label: "Response Time", value: "< 2 seconds per plan", color: "#F59E0B" },
  ];
  const bars = [
    { label: "Clinical AI Accuracy", val: 94, color: "#7091E6" },
    { label: "System Uptime SLA", val: 99.9, color: "#34d399" },
    { label: "Plan Generation Speed", val: 98, color: "#FF6B35" },
    { label: "Patient Compliance Rate", val: 82, color: "#a78bfa" },
  ];
  return (
    <section style={{ padding: "80px 5%", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Technology</div>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem,3.2vw,2.6rem)",
              letterSpacing: "-.025em",
              lineHeight: 1.1,
              color: "var(--tx-head)",
              marginTop: 12,
            }}
          >
            Built for <span className="gradient-text-blue">Enterprise Healthcare</span>
          </h2>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {specs.map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--bd-soft)",
                borderLeft: `3px solid ${s.color}`,
                borderRadius: 14,
                padding: 22,
                transition: "all .28s ease",
              }}
            >
              <div
                style={{
                  fontSize: ".6rem",
                  fontFamily: "monospace",
                  letterSpacing: ".1em",
                  color: s.color,
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: ".88rem", color: "var(--tx-head)" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {bars.map((b) => (
            <div key={b.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: ".72rem" }}>
                <span style={{ color: "var(--tx-muted)" }}>{b.label}</span>
                <span style={{ fontFamily: "monospace", color: b.color }}>{b.val}%</span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "var(--bg-subtle)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${b.val}%`,
                    borderRadius: 3,
                    background: `linear-gradient(90deg,${b.color},${b.color}BB)`,
                    boxShadow: `0 0 8px ${b.color}60`,
                    animation: "barAnim 1.5s ease both",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
════════════════════════════════════════════════════════════ */
function PlatCTA() {
  return (
    <section
      style={{
        padding: "80px 5%",
        background: "linear-gradient(135deg,#3D52A0,#5074d4,#3D52A0)",
      }}
    >
      <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontSize: ".62rem",
            fontFamily: "monospace",
            letterSpacing: ".16em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 14,
            textTransform: "uppercase",
          }}
        >
          Start Your Journey
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
            color: "#fff",
            letterSpacing: "-.025em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Transform Clinical Nutrition
          <br />
          with{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#FF8C5A,#FF6B35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI-rogyam
          </span>
        </h2>
        <p
          style={{
            fontSize: ".9rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 32,
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          Part of the Smart Hospital Platform. Ready to integrate with your existing hospital
          systems in days, not months.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/request-demo">
            <button
              style={{
                padding: "14px 32px",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: ".9rem",
                background: "linear-gradient(135deg,#FF6B35,#FF8C5A)",
                color: "#fff",
                boxShadow: "0 6px 24px rgba(255,107,53,0.4)",
              }}
            >
              Request Demo
            </button>
          </Link>
          <Link
            href="/"
            style={{
              padding: "14px 24px",
              border: "1.5px solid rgba(255,255,255,0.3)",
              borderRadius: 100,
              background: "transparent",
              color: "#fff",
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: ".82rem",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            ← Back to Platform
          </Link>
        </div>
      </div>
    </section>
  );
}

function TagHero({ children, color = "brand" }: { children: React.ReactNode; color?: string }) {
  return (
    <div className={`section-tag`} style={{ color: color === "accent" ? "var(--accent)" : undefined, background: color === "accent" ? "rgba(255,107,53,0.1)" : undefined, borderColor: color === "accent" ? "rgba(255,107,53,0.25)" : undefined }}>
      <span className="dot" style={{ background: color === "accent" ? "var(--accent)" : undefined }} />
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
function Hero({ dark }: { dark: boolean }) {
  return (
    
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(ellipse at 70% 40%, rgba(61,82,160,0.18) 0%, transparent 60%), var(--bg-page-deep)",
        padding: "90px 5% 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="hero-grid" />
      {/* ambient blobs */}
      <div style={{ position: "absolute", top: "15%", right: "8%", width: 500, height: 500, borderRadius: "50%", background: dark ? "radial-gradient(circle,rgba(61,82,160,0.15) 0%,transparent 70%)" : "radial-gradient(circle,rgba(112,145,230,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: dark ? "radial-gradient(circle,rgba(255,107,53,0.08) 0%,transparent 70%)" : "radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <TagHero color="accent">Clinical Nutrition Intelligence Platform</TagHero>
          <h1 className="section-title font-syne" style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)", marginTop: 8, marginBottom: 20, lineHeight: 1.06 }}>
            <span className="gt-full">AI-rogyam</span>
            <br />
            <span style={{ color: "var(--tx-head)" }}>Nutrition Intelligence</span>
            <br />
            <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "var(--tx-muted)" }}>
              for Smart Hospitals
            </span>
          </h1>
          <p className="section-sub">
            Deliver personalized diet and fitness programs using clinical data, AI-driven decision support, and hospital nutrition workflows — integrated directly into your Smart Hospital Platform.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/request-demo">
              <button className="btn-accent">Request Demo</button>
            </Link>
            <button className="btn-ghost">Explore Platform</button>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
            {[["50+", "Hospitals"], ["2M+", "Patients"], ["94%", "AI Accuracy"]].map(([n, l]) => (
              <div key={l}>
                <div className="stat-num">{n}</div>
                <div style={{ fontSize: ".65rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", color: "var(--tx-muted)", marginTop: 2 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Nutrition Dashboard Visual */}
        <div style={{ animation: "fadeUp 0.8s 0.2s ease both", position: "relative" }}>
          <NutritionDashboardVisual dark={dark} />
        </div>
      </div>
    </section>
  );
}

/* ── Mini Nutrition Dashboard Visual ── */
function NutritionDashboardVisual({ dark }: { dark: boolean }) {
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "#fff";
  const cardBd = dark ? "rgba(112,145,230,0.15)" : "rgba(61,82,160,0.1)";
  const shadow = dark ? "0 24px 80px rgba(0,0,0,0.5)" : "0 24px 80px rgba(61,82,160,0.15)";
  return (
    <div style={{ background: dark ? "rgba(13,17,33,0.9)" : "#F4F1FF", borderRadius: 20, padding: 20, border: `1px solid ${cardBd}`, boxShadow: shadow, fontFamily: "'DM Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: ".65rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", color: "var(--tx-muted)", textTransform: "uppercase" }}>Patient Nutrition Plan</div>
          <div style={{ fontSize: ".9rem", fontFamily: "'Syne',serif", fontWeight: 700, color: "var(--tx-head)" }}>Rahul Sharma · ICU Bed 3A</div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 100, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", fontSize: ".6rem", color: "#34d399", fontFamily: "'DM Mono',monospace" }}>● ACTIVE</div>
      </div>

      {/* Macro bars */}
      {[
        { label: "Protein", val: 78, target: 95, color: "#7091E6" },
        { label: "Calories", val: 1650, target: 2000, color: "#FF6B35" },
        { label: "Carbs", val: 180, target: 220, color: "#34d399" },
      ].map((m) => (
        <div key={m.label} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: ".68rem" }}>
            <span style={{ color: "var(--tx-muted)" }}>{m.label}</span>
            <span style={{ color: m.color, fontFamily: "'DM Mono',monospace" }}>{m.val} / {m.target}{m.label === "Calories" ? " kcal" : "g"}</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: dark ? "rgba(255,255,255,0.07)" : "rgba(61,82,160,0.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.round(m.val / m.target * 100)}%`, background: m.color, borderRadius: 3, boxShadow: `0 0 8px ${m.color}60`, transition: "width 1.2s ease" }} />
          </div>
        </div>
      ))}

      {/* AI Recommendation chip */}
      <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 12, background: dark ? "rgba(255,107,53,0.08)" : "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)" }}>
        <div style={{ fontSize: ".58rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", color: "var(--accent)", marginBottom: 4 }}>🤖 AI RECOMMENDATION</div>
        <div style={{ fontSize: ".73rem", color: "var(--tx-body)", lineHeight: 1.5 }}>Increase protein intake. Add paneer to lunch — compatible with Type 2 Diabetes protocol.</div>
      </div>

      {/* Meal plan chips */}
      <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["Breakfast ✓", "Lunch →", "Dinner ○", "Snack ○"].map((m, i) => (
          <div key={m} style={{ padding: "4px 10px", borderRadius: 8, fontSize: ".62rem", background: i === 0 ? "rgba(52,211,153,0.12)" : i === 1 ? "rgba(255,107,53,0.1)" : dark ? "rgba(255,255,255,0.05)" : "rgba(61,82,160,0.06)", border: `1px solid ${i === 0 ? "rgba(52,211,153,0.3)" : i === 1 ? "rgba(255,107,53,0.25)" : "rgba(61,82,160,0.1)"}`, color: i === 0 ? "#34d399" : i === 1 ? "var(--accent)" : "var(--tx-muted)" }}>{m}</div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ROOT
════════════════════════════════════════════════════════════ */
export default function DietPlannerPage() {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        color: "var(--tx-body)",
        fontFamily: "var(--font-dm)",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes barAnim {
          from { width: 0; }
        }
      `}</style>
      <PlatNav />
      <PlatHero />
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--bd-soft),transparent)" }} />
      <Modules />
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--bd-soft),transparent)" }} />
      <HowItWorks />
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--bd-soft),transparent)" }} />
      <Technology />
      <PlatCTA />
    </div>
  );
}
