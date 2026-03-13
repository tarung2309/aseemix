"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../app/styles/transformation-roadmap.css"

/* ─────────────────────────────────────────────────────────────
   STAGE DATA
───────────────────────────────────────────────────────────── */
const stages = [
  {
    id: "traditional",
    number: "01",
    label: "Traditional Hospital",
    tagline: "Where most hospitals begin",
    status: "Legacy",
    statusNote: "~40% of global hospitals",
    color: "#6B7280",
    accentColor: "#9CA3AF",
    glowColor: "rgba(107,114,128,0.2)",
    borderColor: "rgba(107,114,128,0.3)",
    bgFrom: "rgba(107,114,128,0.06)",
    textDim: "rgba(156,163,175,0.7)",
    energyLevel: 1,
    characteristics: [
      "Paper-based workflows",
      "Disconnected systems",
      "Manual clinical decisions",
      "Low data utilization",
    ],
    tech: ["Paper Records", "Standalone HIS", "Manual Reporting", "Limited Analytics"],
    impact: ["Slow clinical workflows", "Poor data accessibility", "High operational inefficiency"],
    impactLabel: "Operational Impact",
    impactColor: "#EF4444",
    chipLabel: "Technology Environment",
  },
  {
    id: "digital",
    number: "02",
    label: "Digital Hospital",
    tagline: "Core systems digitized",
    status: "Current",
    statusNote: "~45% of global hospitals",
    color: "#3D52A0",
    accentColor: "#7091E6",
    glowColor: "rgba(112,145,230,0.25)",
    borderColor: "rgba(112,145,230,0.35)",
    bgFrom: "rgba(61,82,160,0.08)",
    textDim: "rgba(173,187,218,0.75)",
    energyLevel: 2,
    characteristics: [
      "Electronic Medical Records",
      "Hospital Information Systems",
      "Digital imaging (PACS)",
      "Basic dashboards",
    ],
    tech: ["HIS", "EMR", "LIS", "RIS", "PACS"],
    impact: ["Systems remain siloed", "Data underutilized", "Limited clinical intelligence"],
    impactLabel: "Key Limitations",
    impactColor: "#F59E0B",
    chipLabel: "Core Systems",
  },
  {
    id: "smart",
    number: "03",
    label: "Smart Hospital",
    tagline: "Our platform operates here",
    status: "Active",
    statusNote: "SmartHospital Platform",
    color: "#FF6B35",
    accentColor: "#FCA185",
    glowColor: "rgba(255,107,53,0.35)",
    borderColor: "rgba(255,107,53,0.5)",
    bgFrom: "rgba(255,107,53,0.1)",
    textDim: "rgba(252,161,133,0.8)",
    energyLevel: 3,
    characteristics: [
      "Integrated hospital systems",
      "AI-powered clinical intelligence",
      "Real-time patient monitoring",
      "Data-driven hospital operations",
    ],
    tech: ["Healthcare Intelligence Platform", "AI / ML Models", "Clinical Knowledge Graph", "Unified Patient Data"],
    impact: [
      "Clinical Decision Support",
      "Predictive Analytics",
      "Smart ICU Monitoring",
      "Population Health Analytics",
    ],
    impactLabel: "Capabilities Unlocked",
    impactColor: "#34d399",
    chipLabel: "Core Technology",
    isHighlighted: true,
  },
  {
    id: "autonomous",
    number: "04",
    label: "Autonomous Hospital",
    tagline: "The future of healthcare",
    status: "Vision",
    statusNote: "Next frontier",
    color: "#38bdf8",
    accentColor: "#7DD3FC",
    glowColor: "rgba(56,189,248,0.35)",
    borderColor: "rgba(56,189,248,0.5)",
    bgFrom: "rgba(56,189,248,0.08)",
    textDim: "rgba(125,211,252,0.8)",
    energyLevel: 4,
    characteristics: [
      "AI-assisted medical decisions",
      "Autonomous clinical workflows",
      "Predictive patient care",
      "Automated hospital operations",
    ],
    tech: ["Hospital Command Center", "Autonomous Triage AI", "Predictive ICU Systems", "Self-optimizing Ops"],
    impact: [
      "AI-assisted diagnosis",
      "Autonomous triage",
      "Predictive ICU monitoring",
      "Robotic care assistance",
    ],
    impactLabel: "Future Capabilities",
    impactColor: "#a78bfa",
    chipLabel: "Emerging Technology",
  },
];

const transitions = [
  { label: "Digital Transformation", sublabel: "Digitize core operations", icon: "⟶" },
  { label: "Intelligence Layer", sublabel: "Integrate AI & data platforms", icon: "⟶" },
  { label: "Autonomous Care", sublabel: "Enable self-optimizing systems", icon: "⟶" },
];

/* ─────────────────────────────────────────────────────────────
   ENERGY SPINE (animated vertical connector)
───────────────────────────────────────────────────────────── */
function EnergySpine({ visible }: { activeIndex: number; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "2px",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Base track */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(107,114,128,0.15), rgba(61,82,160,0.3), rgba(255,107,53,0.5), rgba(56,189,248,0.5))",
      }} />
      {/* Animated glow overlay */}
      {visible && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,107,53,0.6) 55%, rgba(56,189,248,0.6) 100%)",
          backgroundSize: "100% 200px",
          animation: "spineFlow 3s linear infinite",
          opacity: 0.7,
        }} />
      )}
      {/* Traveling particles */}
      {visible && [0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: "absolute",
          left: "-2px",
          width: "6px",
          height: "16px",
          borderRadius: "3px",
          background: "linear-gradient(to bottom, transparent, #FF6B35, #38bdf8, transparent)",
          animation: `spineParticle ${3.5 + i * 0.8}s ${i * 0.9}s ease-in-out infinite`,
          filter: "blur(1px)",
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAGE ROW CARD
───────────────────────────────────────────────────────────── */
function StageRow({
  stage,
  index,
  isActive,
  visible,
  onClick,
  isMobile,
}: {
  stage: typeof stages[0];
  index: number;
  isActive: boolean;
  visible: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const isLeft = index % 2 === 0;

  if (isMobile) {
    return (
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: `opacity 0.7s ${index * 0.1}s ease, transform 0.7s ${index * 0.1}s ease`,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            background: isActive ? `linear-gradient(135deg, ${stage.bgFrom}, var(--bg-page-deep))` : "var(--bg-surface)",
            border: `1px solid ${isActive ? stage.borderColor : "var(--bd-soft)"}`,
            borderRadius: "16px",
            padding: "20px 24px",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* "Our Platform" badge */}
          {stage.isHighlighted && (
            <div style={{
              position: "absolute", top: "16px", right: "16px",
              padding: "4px 10px", borderRadius: "100px",
              background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.4)",
              fontSize: "0.58rem", fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.12em", color: "#FF6B35", textTransform: "uppercase",
            }}>◈ Our Platform</div>
          )}
          {/* Stage number + label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
              background: isActive ? `radial-gradient(circle, ${stage.color}40, ${stage.color}15)` : "var(--bg-surface)",
              border: `2px solid ${isActive ? stage.color : "var(--bd-soft)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isActive ? `0 0 16px ${stage.glowColor}` : "none",
              transition: "all 0.4s",
            }}>
              <span style={{ fontSize: "0.82rem", fontFamily: "var(--font-syne)", fontWeight: 800, color: isActive ? stage.color : "var(--tx-faint)" }}>
                {stage.number}
              </span>
            </div>
            <div>
              <span style={{ fontSize: "0.58rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", color: stage.textDim, display: "block", marginBottom: "2px" }}>STAGE {stage.number}</span>
              <h3 style={{ fontSize: "1.1rem", fontFamily: "var(--font-syne)", fontWeight: 800, color: isActive ? "var(--tx-head)" : "var(--color-mid)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0, transition: "color 0.3s" }}>
                {stage.label}
              </h3>
            </div>
          </div>
          {/* Characteristics */}
          <div style={{ marginBottom: "14px" }}>
            {stage.characteristics.map((c) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", opacity: isActive ? 1 : 0.5 }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: isActive ? stage.color : "var(--tx-faint)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: isActive ? "var(--color-light)" : "var(--tx-faint)" }}>{c}</span>
              </div>
            ))}
          </div>
          {/* Active indicator */}
          <div style={{
            position: "absolute", left: 0, top: "20%", bottom: "20%", width: "3px", borderRadius: "3px",
            background: isActive ? `linear-gradient(to bottom, transparent, ${stage.color}, transparent)` : "transparent",
            transition: "all 0.4s",
          }} />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 80px 1fr",
        gap: "0",
        alignItems: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateX(${isLeft ? "-30px" : "30px"})`,
        transition: `opacity 0.7s ${index * 0.15}s ease, transform 0.7s ${index * 0.15}s ease`,
        zIndex: 1,
      }}
      onClick={onClick}
    >

      {/* Left content area */}
      <div style={{ gridColumn: isLeft ? "1" : "3", gridRow: "1" }}>
        <div
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${stage.bgFrom}, var(--bg-page-deep))`
              : "var(--bg-surface)",
            border: `1px solid ${isActive ? stage.borderColor : "var(--bd-soft)"}`,
            borderRadius: "16px",
            padding: "28px 32px",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            animation: isActive ? `cardBreath 3s ease-in-out infinite` : "none",
            position: "relative",
            overflow: "hidden",
            marginLeft: isLeft ? "0" : "auto",
            marginRight: isLeft ? "auto" : "0",
          }}
        >
          {/* Highlighted stage banner */}
          {stage.isHighlighted && (
            <div style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              padding: "4px 10px",
              borderRadius: "100px",
              background: "rgba(255,107,53,0.15)",
              border: "1px solid rgba(255,107,53,0.4)",
              fontSize: "0.58rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.12em",
              color: "#FF6B35",
              textTransform: "uppercase",
            }}>
              ◈ Our Platform
            </div>
          )}

          {/* Stage number + label */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{
              fontSize: "0.58rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.16em",
              color: stage.textDim,
              display: "block",
              marginBottom: "6px",
            }}>
              STAGE {stage.number}
            </span>
            <h3 style={{
              fontSize: "1.35rem",
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              color: isActive ? "var(--tx-head)" : "var(--color-mid)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
              transition: "color 0.3s",
            }}>
              {stage.label}
            </h3>
            <p style={{
              fontSize: "0.72rem",
              color: isActive ? stage.textDim : "var(--tx-faint)",
              marginTop: "5px",
              fontStyle: "italic",
              transition: "color 0.3s",
            }}>
              {stage.tagline}
            </p>
          </div>

          {/* Characteristics */}
          <div style={{ marginBottom: "18px" }}>
            {stage.characteristics.map((c, i) => (
              <div key={c} style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
                opacity: isActive ? 1 : 0.4,
                animation: isActive ? `chipFade 0.3s ${i * 0.05}s ease both` : "none",
              }}>
                <div style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: isActive ? stage.color : "var(--tx-faint)",
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 6px ${stage.glowColor}` : "none",
                  transition: "all 0.3s",
                }} />
                <span style={{
                  fontSize: "0.75rem",
                  color: isActive ? "var(--color-light)" : "var(--tx-faint)",
                  transition: "color 0.3s",
                }}>
                  {c}
                </span>
              </div>
            ))}
          </div>

          {/* Two-column bottom: tech + impact */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {/* Tech chips */}
            <div>
              <p style={{
                fontSize: "0.55rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.12em",
                color: stage.textDim,
                marginBottom: "8px",
                opacity: isActive ? 0.8 : 0.35,
              }}>
                {stage.chipLabel}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {stage.tech.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.62rem",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: isActive ? `${stage.color}18` : "var(--bg-surface)",
                    border: `1px solid ${isActive ? stage.borderColor : "var(--bd-soft)"}`,
                    color: isActive ? stage.accentColor : "var(--tx-faint)",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div>
              <p style={{
                fontSize: "0.55rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.12em",
                color: stage.textDim,
                marginBottom: "8px",
                opacity: isActive ? 0.8 : 0.35,
              }}>
                {stage.impactLabel}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {stage.impact.slice(0, 3).map((item) => (
                  <div key={item} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    opacity: isActive ? 1 : 0.3,
                  }}>
                    <div style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "1px",
                      background: isActive ? stage.impactColor : "var(--tx-faint)",
                      flexShrink: 0,
                      transition: "background 0.3s",
                    }} />
                    <span style={{
                      fontSize: "0.65rem",
                      color: isActive ? "var(--color-light)" : "var(--tx-faint)",
                      lineHeight: 1.4,
                      transition: "color 0.3s",
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active indicator line */}
          <div style={{
            position: "absolute",
            [isLeft ? "right" : "left"]: 0,
            top: "20%",
            bottom: "20%",
            width: "3px",
            borderRadius: "3px",
            background: isActive ? `linear-gradient(to bottom, transparent, ${stage.color}, transparent)` : "transparent",
            transition: "all 0.4s ease",
            boxShadow: isActive ? `0 0 12px ${stage.glowColor}` : "none",
          }} />
        </div>
      </div>

      {/* Center node (spine connection point) */}
      <div style={{
        gridColumn: "2",
        gridRow: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <div
          style={{
            width: isActive ? "52px" : "38px",
            height: isActive ? "52px" : "38px",
            borderRadius: "50%",
            background: isActive
              ? `radial-gradient(circle, ${stage.color}40, ${stage.color}15)`
              : "var(--bg-surface)",
            border: `2px solid ${isActive ? stage.color : "var(--bd-soft)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: isActive ? `0 0 24px ${stage.glowColor}, 0 0 0 6px ${stage.color}18` : "none",
            animation: isActive ? "numberPop 0.4s ease both" : "none",
          }}
        >
          <span style={{
            fontSize: "0.85rem",
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            color: isActive ? stage.color : "var(--tx-faint)",
            transition: "color 0.3s",
          }}>
            {stage.number}
          </span>
        </div>

        {/* Outer ring pulse on active */}
        {isActive && (
          <div style={{
            position: "absolute",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: `1px solid ${stage.color}40`,
            animation: "outerRing 2s ease-out infinite",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* Right empty column */}
      {isLeft && <div style={{ gridColumn: "3" }} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRANSITION ARROW
───────────────────────────────────────────────────────────── */
function TransitionArrow({ t, index, activeIndex, visible, isMobile }: {
  t: typeof transitions[0];
  index: number;
  activeIndex: number;
  visible: boolean;
  isMobile: boolean;
}) {
  const isPast = index < activeIndex;
  const isCurrent = index === activeIndex;

  if (isMobile) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 0", opacity: visible ? 1 : 0 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 0, height: 0,
              borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
              borderTop: `6px solid ${isPast || isCurrent ? "rgba(255,107,53,0.6)" : "var(--bd-soft)"}`,
              opacity: 1 - i * 0.25,
            }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 80px 1fr",
      alignItems: "center",
      padding: "8px 0",
      opacity: visible ? 1 : 0,
      transition: `opacity 0.5s ${index * 0.15 + 0.15}s ease`,
      zIndex: 1,
      position: "relative",
    }}>
      {/* Left side: label on even indices */}
      {index % 2 === 0 ? (
        <div style={{ textAlign: "right", paddingRight: "24px" }}>
          <div style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: "6px 14px",
            borderRadius: "8px",
            background: isPast || isCurrent ? "rgba(255,107,53,0.08)" : "var(--bg-surface)",
            border: `1px solid ${isPast || isCurrent ? "rgba(255,107,53,0.25)" : "var(--bd-soft)"}`,
            transition: "all 0.4s",
          }}>
            <span style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              color: isPast || isCurrent ? "#FF6B35" : "var(--tx-faint)",
              letterSpacing: "-0.01em",
            }}>
              {t.label}
            </span>
            <span style={{
              fontSize: "0.58rem",
              color: isPast || isCurrent ? "rgba(255,107,53,0.6)" : "var(--tx-faint)",
              marginTop: "1px",
            }}>
              {t.sublabel}
            </span>
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* Center: down arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: `6px solid ${isPast || isCurrent ? "rgba(255,107,53,0.6)" : "var(--bd-soft)"}`,
            opacity: 1 - i * 0.25,
            transition: "border-top-color 0.4s",
          }} />
        ))}
      </div>

      {/* Right side: label on odd indices */}
      {index % 2 === 1 ? (
        <div style={{ paddingLeft: "24px" }}>
          <div style={{
            display: "inline-flex",
            flexDirection: "column",
            padding: "6px 14px",
            borderRadius: "8px",
            background: isPast || isCurrent ? "rgba(255,107,53,0.08)" : "var(--bg-surface)",
            border: `1px solid ${isPast || isCurrent ? "rgba(255,107,53,0.25)" : "var(--bd-soft)"}`,
            transition: "all 0.4s",
          }}>
            <span style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              color: isPast || isCurrent ? "#FF6B35" : "var(--tx-faint)",
            }}>
              {t.label}
            </span>
            <span style={{
              fontSize: "0.58rem",
              color: isPast || isCurrent ? "rgba(255,107,53,0.6)" : "var(--tx-faint)",
              marginTop: "1px",
            }}>
              {t.sublabel}
            </span>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTELLIGENCE METER (right sidebar)
───────────────────────────────────────────────────────────── */
function IntelligenceMeter({ activeIndex, visible }: { activeIndex: number; visible: boolean }) {
  const bars = [
    { label: "Data Utilization", values: [8, 40, 85, 98] },
    { label: "AI Integration", values: [0, 5, 80, 99] },
    { label: "Workflow Automation", values: [5, 25, 75, 97] },
    { label: "Clinical Intelligence", values: [0, 10, 88, 99] },
    { label: "Patient Outcomes", values: [30, 50, 82, 96] },
  ];

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateX(20px)",
      transition: "opacity 0.8s 0.5s ease, transform 0.8s 0.5s ease",
      padding: "24px",
      background: "var(--bg-surface)",
      border: "1px solid var(--bd-soft)",
      borderRadius: "16px",
    }}>
      <p style={{
        fontSize: "0.58rem",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.14em",
        color: "var(--color-bright)",
        textTransform: "uppercase",
        marginBottom: "18px",
        opacity: 0.7,
      }}>
        Intelligence Metrics
      </p>

      {bars.map((bar) => {
        const val = bar.values[activeIndex];
        return (
          <div key={bar.label} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontSize: "0.65rem", color: "var(--tx-muted)" }}>{bar.label}</span>
              <span style={{ fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", color: activeIndex >= 2 ? "#34d399" : "var(--color-bright)" }}>
                {val}%
              </span>
            </div>
            <div style={{
              height: "5px",
              borderRadius: "3px",
              background: "var(--dash-track)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${val}%`,
                borderRadius: "3px",
                background: activeIndex === 0
                  ? "rgba(107,114,128,0.6)"
                  : activeIndex === 1
                  ? "linear-gradient(90deg, #3D52A0, #7091E6)"
                  : activeIndex === 2
                  ? "linear-gradient(90deg, #FF6B35, #FCA185)"
                  : "linear-gradient(90deg, #38bdf8, #a78bfa)",
                transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                boxShadow: val > 70 ? "0 0 8px rgba(255,107,53,0.4)" : "none",
              }} />
            </div>
          </div>
        );
      })}

      {/* Overall score */}
      <div style={{
        marginTop: "20px",
        paddingTop: "16px",
        borderTop: "1px solid var(--bd-soft)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.55rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", color: "var(--tx-faint)", marginBottom: "8px" }}>
          INTELLIGENCE SCORE
        </p>
        <div style={{
          fontSize: "2.4rem",
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          color: stages[activeIndex].color,
          lineHeight: 1,
          transition: "color 0.5s, filter 0.5s",
          filter: activeIndex >= 2 ? `drop-shadow(0 0 12px ${stages[activeIndex].glowColor})` : "none",
        }}>
          {["12", "38", "87", "99"][activeIndex]}
          <span style={{ fontSize: "1rem", color: "var(--tx-muted)" }}>/100</span>
        </div>
        <p style={{
          fontSize: "0.62rem",
          color: "var(--tx-muted)",
          marginTop: "6px",
        }}>
          {["Legacy State", "Digitized State", "Intelligent State", "Autonomous State"][activeIndex]}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function TransformationRoadmap() {
  const [activeStage, setActiveStage] = useState(2); // Default: Smart Hospital
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const current = stages[activeStage];

  return (
    <section
      ref={ref}
      style={{ padding: "90px 5% 100px", background: "var(--bg-page-deep)" }}
    >

      {/* Background atmosphere */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Top left blob */}
        <div style={{
          position: "absolute", top: "-15%", left: "5%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,82,160,0.1) 0%, transparent 70%)",
        }} />
        {/* Bottom right blob — shifts with active stage */}
        <div style={{
          position: "absolute", bottom: "-10%", right: "5%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 65%)`,
          transition: "background 1s ease",
        }} />
        {/* Center glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "300px", height: "800px",
          background: `radial-gradient(ellipse, rgba(255,107,53,0.04) 0%, transparent 70%)`,
          animation: "gradientPulse 4s ease infinite",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(112,145,230,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
      </div>

      <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto" }}>

        {/* ── HEADER ──────────────────────────────────────────── */}
        <div style={{
          textAlign: "center",
          marginBottom: "60px",
          opacity: visible ? 1 : 0,
          animation: visible ? "titleReveal 0.7s ease both" : "none",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 16px",
            borderRadius: "100px",
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.2)",
            marginBottom: "20px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#38bdf8",
              display: "inline-block",
              animation: "gradientPulse 2s ease infinite",
            }} />
            <span style={{
              fontSize: "0.62rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.14em",
              color: "#38bdf8",
              textTransform: "uppercase",
            }}>
              Strategic Transformation Framework
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3.4rem)",
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.06,
            color: "var(--tx-head)",
            marginBottom: "18px",
          }}>
            The Roadmap to the{" "}
            <br />
            <em className="not-italic gradient-text-blue">Future of Smart Hospitals</em>

          </h2>

          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            color: "var(--tx-muted)",
            maxWidth: "580px",
            margin: "0 auto 28px",
            lineHeight: 1.7,
          }}>
            Hospitals worldwide are evolving from fragmented digital systems to intelligent healthcare platforms powered by AI and real-time data. Our Smart Hospital Platform enables this transformation.
          </p>

          {/* Stage selector pills */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {stages.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStage(i)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "100px",
                  background: activeStage === i ? `${s.color}20` : "var(--bg-surface)",
                  border: `1px solid ${activeStage === i ? s.color + "60" : "var(--bd-soft)"}`,
                  color: activeStage === i ? s.accentColor : "var(--tx-muted)",
                  fontSize: "0.72rem",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: activeStage === i ? `0 0 16px ${s.glowColor}` : "none",
                }}
              >
                {s.number}. {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN LAYOUT: Roadmap + Sidebar ──────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 260px", gap: "32px", alignItems: "start" }}>

          {/* Roadmap column */}
          <div style={{ position: "relative" }}>
            {/* Energy spine — hide on mobile */}
            {!isMobile && <EnergySpine activeIndex={activeStage} visible={visible} />}

            {/* Stages + transitions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {stages.map((stage, i) => (
                <div key={stage.id}>
                  <StageRow
                    stage={stage}
                    index={i}
                    isActive={activeStage === i}
                    visible={visible}
                    onClick={() => setActiveStage(i)}
                    isMobile={isMobile}
                  />
                  {i < stages.length - 1 && (
                    <TransitionArrow
                      t={transitions[i]}
                      index={i}
                      activeIndex={activeStage}
                      visible={visible}
                      isMobile={isMobile}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{
            position: isMobile ? "static" : "sticky",
            top: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Status badge */}
            <div style={{
              opacity: visible ? 1 : 0,
              padding: "20px",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${current.bgFrom}, var(--bg-page-deep))`,
              border: `1px solid ${current.borderColor}`,
              transition: "opacity 0.7s 0.3s ease, background 0.5s ease, border 0.5s ease",
            }}>
              <div style={{ marginBottom: "12px" }}>
                <span style={{
                  fontSize: "0.55rem",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.14em",
                  color: current.textDim,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "5px",
                }}>
                  Current Focus
                </span>
                <p style={{
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  color: "var(--tx-head)",
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  {current.label}
                </p>
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "100px",
                background: `${current.color}18`,
                border: `1px solid ${current.color}40`,
              }}>
                <div style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: current.color,
                  boxShadow: `0 0 6px ${current.glowColor}`,
                }} />
                <span style={{ fontSize: "0.6rem", color: current.accentColor, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
                  {current.status} · {current.statusNote}
                </span>
              </div>
            </div>

            {/* Intelligence meter */}
            <IntelligenceMeter activeIndex={activeStage} visible={visible} />

            {/* Journey progress */}
            <div style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s 0.6s ease",
              padding: "20px",
              borderRadius: "14px",
              background: "var(--bg-surface)",
              border: "1px solid var(--bd-soft)",
            }}>
              <p style={{
                fontSize: "0.55rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.14em",
                color: "var(--tx-faint)",
                marginBottom: "14px",
              }}>
                TRANSFORMATION JOURNEY
              </p>
              {stages.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => setActiveStage(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    marginBottom: "4px",
                    cursor: "pointer",
                    background: activeStage === i ? `${s.color}12` : "transparent",
                    border: `1px solid ${activeStage === i ? s.color + "30" : "transparent"}`,
                    transition: "all 0.25s",
                  }}
                >
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: i <= activeStage ? s.color : "var(--dash-track)",
                    boxShadow: i === activeStage ? `0 0 8px ${s.glowColor}` : "none",
                    flexShrink: 0,
                    transition: "all 0.3s",
                  }} />
                  <span style={{
                    fontSize: "0.7rem",
                    color: activeStage === i ? "var(--tx-head)" : i < activeStage ? "var(--tx-muted)" : "var(--tx-faint)",
                    transition: "color 0.3s",
                    fontWeight: activeStage === i ? 500 : 400,
                  }}>
                    {s.label}
                  </span>
                  {s.isHighlighted && (
                    <span style={{
                      marginLeft: "auto",
                      fontSize: "0.52rem",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "rgba(255,107,53,0.15)",
                      color: "#FF6B35",
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      US
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA BAR ──────────────────────────────────── */}
        <div style={{
          marginTop: "56px",
          padding: "28px 36px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(56,189,248,0.06) 100%)",
          border: "1px solid rgba(255,107,53,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s 0.7s ease",
        }}>
          <div>
            <p style={{
              fontSize: "0.6rem",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.14em",
              color: "rgba(255,107,53,0.7)",
              marginBottom: "6px",
            }}>
              WHERE WE ACCELERATE YOUR JOURNEY
            </p>
            <p style={{
              fontSize: "1.15rem",
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              color: "var(--tx-head)",
              margin: 0,
            }}>
              Our platform takes you from Digital → Smart → Autonomous
            </p>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { val: "Stage 2→3", label: "In as little as 3 months" },
              { val: "50+", label: "Hospital transformations" },
              { val: "Stage 3→4", label: "Active development" },
            ].map((stat) => (
              <div key={stat.val} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  color: "#FF6B35",
                  lineHeight: 1,
                }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: "0.6rem", color: "var(--tx-muted)", marginTop: "3px", whiteSpace: "nowrap" }}>
                  {stat.label}
                </div>
              </div>
            ))}
            <Link href="/request-demo">
              <button style={{
                padding: "12px 24px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #FF6B35, #FF8C5A)",
                border: "none",
                color: "#fff",
                fontSize: "0.82rem",
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 6px 24px rgba(255,107,53,0.4)",
                letterSpacing: "-0.01em",
              }}>
                Start Your Transformation →
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
