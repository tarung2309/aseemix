"use client";
import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const stages = [
  {
    id: "access",
    step: "01",
    label: "Patient Access",
    shortLabel: "Access",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    items: ["Appointment Scheduling", "Patient Registration", "Insurance Verification"],
    metric: { val: "3×", label: "Faster Scheduling" },
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    textColor: "#FCD34D",
  },
  {
    id: "clinical",
    step: "02",
    label: "Clinical Care",
    shortLabel: "Clinical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    items: ["AI Diagnosis Support", "Lab & Radiology", "Treatment Planning"],
    metric: { val: "94%", label: "AI Accuracy" },
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.3)",
    textColor: "#FCA185",
  },
  {
    id: "care",
    step: "03",
    label: "Care Management",
    shortLabel: "Care Mgmt",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    items: ["Medication Management", "Clinical Diet Planning", "Remote Monitoring"],
    metric: { val: "40%", label: "LOS Reduction" },
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    textColor: "#F9A8D4",
  },
  {
    id: "operations",
    step: "04",
    label: "Hospital Operations",
    shortLabel: "Operations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    items: ["Bed Management", "Staff Allocation", "Resource Optimization"],
    metric: { val: "22%", label: "Cost Savings" },
    color: "#7091E6",
    glow: "rgba(112,145,230,0.3)",
    textColor: "#A5B9F5",
  },
  {
    id: "engagement",
    step: "05",
    label: "Patient Engagement",
    shortLabel: "Engagement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    items: ["Patient Mobile Apps", "Health Education", "Lifestyle Coaching"],
    metric: { val: "4.8★", label: "Patient Score" },
    color: "#34d399",
    glow: "rgba(52,211,153,0.3)",
    textColor: "#6EE7B7",
  },
  {
    id: "population",
    step: "06",
    label: "Population Health",
    shortLabel: "Pop. Health",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    items: ["AI Risk Prediction", "Disease Management", "Preventive Care"],
    metric: { val: "2M+", label: "Lives Monitored" },
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.3)",
    textColor: "#7DD3FC",
  },
];

/* ─────────────────────────────────────────────────────────────
   CONNECTOR ARROW
───────────────────────────────────────────────────────────── */
function Connector({ fromColor, toColor, active }: { fromColor: string; toColor: string; active: boolean }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "32px", position: "relative" }}>
      {/* Line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          background: active
            ? `linear-gradient(90deg, ${fromColor}, ${toColor})`
            : "var(--bd-soft)",
          transition: "all 0.4s ease",
          boxShadow: active ? `0 0 8px ${toColor}60` : "none",
          overflow: "hidden",
        }}
      >
        {active && (
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "12px",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${toColor}, transparent)`,
              animation: "flowParticle 1.4s ease-in-out infinite",
            }}
          />
        )}
      </div>
      {/* Arrowhead */}
      <div
        style={{
          position: "absolute",
          right: "-1px",
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `7px solid ${active ? toColor : "var(--bd-soft)"}`,
          filter: active ? `drop-shadow(0 0 4px ${toColor})` : "none",
          transition: "all 0.4s ease",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAGE CARD
───────────────────────────────────────────────────────────── */
function StageCard({
  stage,
  isActive,
  isAdjacent,
  onClick,
  index,
  visible,
}: {
  stage: typeof stages[0];
  isActive: boolean;
  isAdjacent: boolean;
  onClick: () => void;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="flex-1 relative cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ${index * 0.08}s ease, transform 0.6s ${index * 0.08}s ease`,
        minWidth: 0,
      }}
      onClick={onClick}
    >
      <div
        style={{
          "--cg-glow": stage.glow,
          "--cg-border": stage.color + "40",
          background: isActive
            ? `linear-gradient(160deg, ${stage.color}18 0%, var(--bg-page-deep) 60%)`
            : "var(--bg-surface)",
          border: `1px solid ${isActive ? stage.color + "60" : isAdjacent ? stage.color + "25" : "var(--bd-soft)"}`,
          borderRadius: "14px",
          padding: "20px 16px",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          animation: isActive ? `cardGlow 2.5s ease-in-out infinite` : "none",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        } as React.CSSProperties}
      >
        {/* Background texture on active */}
        {isActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle at 80% 20%, ${stage.color}12 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Top: step number */}
        <div
          style={{
            fontSize: "0.55rem",
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            letterSpacing: "0.14em",
            color: isActive ? stage.textColor : "var(--tx-faint)",
            marginBottom: "10px",
            transition: "color 0.3s",
          }}
        >
          STEP {stage.step}
        </div>

        {/* Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: isActive ? `${stage.color}22` : "var(--bg-surface)",
            border: `1px solid ${isActive ? stage.color + "50" : "var(--bd-soft)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isActive ? stage.color : "var(--tx-muted)",
            marginBottom: "12px",
            transition: "all 0.3s ease",
            boxShadow: isActive ? `0 0 16px ${stage.glow}` : "none",
          }}
        >
          {stage.icon}
        </div>

        {/* Label */}
        <h3
          style={{
            fontSize: "0.82rem",
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            color: isActive ? "var(--tx-head)" : "var(--color-mid)",
            lineHeight: 1.2,
            marginBottom: "14px",
            letterSpacing: "-0.01em",
            transition: "color 0.3s",
          }}
        >
          {stage.label}
        </h3>

        {/* Items */}
        <div style={{ marginBottom: "16px" }}>
          {stage.items.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "5px",
                animation: isActive ? `itemSlide 0.3s ${i * 0.07}s ease both` : "none",
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: isActive ? stage.color : "var(--tx-muted)",
                  flexShrink: 0,
                  transition: "background 0.3s",
                }}
              />
              <span
                style={{
                  fontSize: "0.68rem",
                  color: isActive ? "var(--color-light)" : "var(--tx-faint)",
                  lineHeight: 1.4,
                  transition: "color 0.3s",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Metric chip */}
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "8px 10px",
            borderRadius: "8px",
            background: isActive ? `${stage.color}20` : "var(--bg-surface)",
            border: `1px solid ${isActive ? stage.color + "50" : "var(--bd-soft)"}`,
            transition: "all 0.4s ease",
            animation: isActive ? `metricPop 0.4s ease both` : "none",
          }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              color: isActive ? stage.textColor : "var(--tx-faint)",
              lineHeight: 1,
              transition: "color 0.3s",
            }}
          >
            {stage.metric.val}
          </span>
          <span
            style={{
              fontSize: "0.55rem",
              color: isActive ? "var(--tx-muted)" : "var(--tx-faint)",
              letterSpacing: "0.06em",
              marginTop: "2px",
              transition: "color 0.3s",
            }}
          >
            {stage.metric.label}
          </span>
        </div>

        {/* Active indicator bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: isActive ? `linear-gradient(90deg, transparent, ${stage.color}, transparent)` : "transparent",
            transition: "all 0.4s ease",
            borderRadius: "0 0 14px 14px",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PLATFORM LAYER (bottom bar)
───────────────────────────────────────────────────────────── */
function PlatformLayer({ visible }: { visible: boolean }) {
  const capabilities = [
    { icon: "🤖", label: "AI & ML Engine" },
    { icon: "🔷", label: "FHIR R4 Platform" },
    { icon: "📊", label: "Real-time Analytics" },
    { icon: "🔐", label: "HIPAA Compliant" },
    { icon: "🔗", label: "HIS/EMR Integration" },
    { icon: "📡", label: "IoT & Device Mesh" },
    { icon: "⚡", label: "Clinical Rules Engine" },
  ];
  return (
    <div
      style={{
        marginTop: "32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s 0.65s ease, transform 0.7s 0.65s ease",
      }}
    >
      {/* Label */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(112,145,230,0.25))" }} />
        <span
          style={{
            fontSize: "0.6rem",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.18em",
            color: "var(--color-bright)",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Smart Hospital Platform Layer
        </span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(112,145,230,0.25), transparent)" }} />
      </div>

      {/* Platform bar */}
      <div
        style={{
          background: "var(--bg-subtle)",
          border: "1px solid var(--bd-soft)",
          borderRadius: "12px",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {capabilities.map((cap) => (
          <div
            key={cap.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>{cap.icon}</span>
            <span style={{ fontSize: "0.68rem", color: "var(--color-bright)", whiteSpace: "nowrap" }}>
              {cap.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function HealthcareValueChain() {
  const [active, setActive] = useState<string>("clinical");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance through stages
  useEffect(() => {
    if (!visible) return;
    const order = stages.map((s) => s.id);
    const id = setInterval(() => {
      setActive((prev) => {
        const i = order.indexOf(prev);
        return order[(i + 1) % order.length];
      });
    }, 3200);
    return () => clearInterval(id);
  }, [visible]);

  const activeIndex = stages.findIndex((s) => s.id === active);
  const activeStage = stages[activeIndex];

  return (
    <section
      ref={ref}
      /* style={{
        padding: "80px 5% 100px",
        background: "var(--bg-page-deep)",
        position: "relative",
        overflow: "hidden",
      }} */
     className="py-24 px-[5%] bg-[var(--bg-page)]"
    >
      {/* Ambient background blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,82,160,0.12) 0%, transparent 70%)",
          animation: "bgDrift 14s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: `radial-gradient(circle, ${activeStage?.glow ?? "rgba(112,145,230,0.1)"} 0%, transparent 70%)`,
          transition: "background 1s ease",
          animation: "bgDrift 18s 3s ease-in-out infinite",
        }} />
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(112,145,230,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(112,145,230,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── HEADER ────────────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "52px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "100px",
              background: "rgba(255,107,53,0.1)",
              border: "1px solid rgba(255,107,53,0.25)",
              marginBottom: "18px",
            }}
          >
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B35",
              animation: "stepPulse 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            <span style={{
              fontSize: "0.65rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.14em",
              color: "#FF6B35",
              textTransform: "uppercase",
            }}>
              Strategic Value Chain
            </span>
          </div>

          {/* Main title */}
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)",
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "var(--tx-head)",
              marginBottom: "16px",
            }}
          >
            Powering the Entire{" "}
            <em className="not-italic gradient-text-blue">Healthcare Value Chain</em>
          </h2>

          <p style={{
            fontSize: "1rem",
            fontFamily: "var(--font-dm)",
            fontWeight: 300,
            color: "var(--tx-muted)",
            maxWidth: "560px",
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            From first patient contact to population-level outcomes — our platform orchestrates every stage of care with AI-driven intelligence.
          </p>
        </div>

        {/* ── PROGRESS TRACK ─────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            marginBottom: "28px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s 0.2s ease",
            overflowX: "auto",
            paddingBottom: "4px",
          }}
        >
          {stages.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
              {/* Step dot */}
              <button
                onClick={() => setActive(s.id)}
                style={{
                  width: s.id === active ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "100px",
                  background: s.id === active
                    ? s.color
                    : i < activeIndex
                    ? `${s.color}60`
                    : "var(--dash-track)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: s.id === active ? `0 0 12px ${s.glow}` : "none",
                  padding: 0,
                  flexShrink: 0,
                }}
              />
              {/* Track line between dots */}
              {i < stages.length - 1 && (
                <div style={{
                  width: "24px",
                  height: "2px",
                  background: i < activeIndex
                    ? `linear-gradient(90deg, ${s.color}60, ${stages[i+1].color}40)`
                    : "var(--bd-soft)",
                  transition: "all 0.6s ease",
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* ── STAGE LABEL ROW ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "4px",
            marginBottom: "24px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s 0.25s ease",
          }}
        >
          {stages.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <button
                onClick={() => setActive(s.id)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "0.6rem",
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: s.id === active ? s.textColor : "var(--tx-faint)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                  padding: "0 2px",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.shortLabel}
              </button>
              {i < stages.length - 1 && (
                <div style={{ width: "4px", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* ── MAIN STAGE CARDS ROW ────────────────────────────── */}
        <div style={{ overflowX: "auto", marginLeft: "-5%", marginRight: "-5%", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "12px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "stretch", minWidth: "720px" }}>
            {stages.map((stage, i) => (
              <div key={stage.id} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
                <StageCard
                  stage={stage}
                  isActive={active === stage.id}
                  isAdjacent={Math.abs(i - activeIndex) === 1}
                  onClick={() => setActive(stage.id)}
                  index={i}
                  visible={visible}
                />
                {i < stages.length - 1 && (
                  <Connector
                    fromColor={stage.color}
                    toColor={stages[i + 1].color}
                    active={active === stage.id || active === stages[i + 1].id}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── ACTIVE STAGE DETAIL PANEL ──────────────────────── */}
        <div
          key={active}
          style={{
            marginTop: "24px",
            padding: "20px 28px",
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${activeStage?.color ?? "#7091E6"}10, var(--bg-page-deep))`,
            border: `1px solid ${activeStage?.color ?? "#7091E6"}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s 0.4s ease, border-color 0.4s",
            animation: visible ? "metricPop 0.4s ease both" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: `${activeStage?.color}20`,
                border: `1px solid ${activeStage?.color}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: activeStage?.color,
                boxShadow: `0 0 20px ${activeStage?.glow}`,
              }}
            >
              {activeStage?.icon}
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", color: activeStage?.textColor, marginBottom: "3px" }}>
                STEP {activeStage?.step} — NOW ACTIVE
              </p>
              <p style={{ fontSize: "1rem", fontFamily: "var(--font-syne)", fontWeight: 800, color: "var(--tx-head)" }}>
                {activeStage?.label}
              </p>
            </div>
          </div>

          {/* Capability tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {activeStage?.items.map((item) => (
              <span
                key={item}
                style={{
                  padding: "5px 12px",
                  borderRadius: "100px",
                  background: `${activeStage.color}15`,
                  border: `1px solid ${activeStage.color}35`,
                  fontSize: "0.72rem",
                  color: activeStage.textColor,
                  fontFamily: "var(--font-dm)",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Metric */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: "2rem", fontFamily: "var(--font-syne)", fontWeight: 800, color: activeStage?.textColor, lineHeight: 1 }}>
              {activeStage?.metric.val}
            </div>
            <div style={{ fontSize: "0.65rem", color: "var(--tx-muted)", marginTop: "3px" }}>
              {activeStage?.metric.label}
            </div>
          </div>
        </div>

        {/* ── PLATFORM LAYER ─────────────────────────────────── */}
        <PlatformLayer visible={visible} />

        {/* ── BOTTOM STATS ROW ───────────────────────────────── */}
        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s 0.8s ease",
          }}
        >
          {/* {[
            { val: "6", unit: "Layers", label: "End-to-end coverage across the full care cycle" },
            { val: "50+", unit: "Hospitals", label: "Live deployments across Asia and Middle East" },
            { val: "2M+", unit: "Patients", label: "Active on the SmartHospital platform today" },
            { val: "99.9%", unit: "Uptime SLA", label: "Enterprise-grade reliability and security" },
          ].map((stat) => (
            <div
              key={stat.val}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "var(--bg-surface)",
                border: "1px solid var(--bd-soft)",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px", marginBottom: "4px" }}>
                <span style={{ fontSize: "1.7rem", fontFamily: "var(--font-syne)", fontWeight: 800, color: "var(--tx-head)", lineHeight: 1 }}>
                  {stat.val}
                </span>
                <span style={{ fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", color: "var(--tx-muted)", letterSpacing: "0.06em" }}>
                  {stat.unit}
                </span>
              </div>
              <p style={{ fontSize: "0.65rem", color: "var(--tx-muted)", lineHeight: 1.45 }}>{stat.label}</p>
            </div>
          ))} */}
        </div>

      </div>
    </section>
  );
}
