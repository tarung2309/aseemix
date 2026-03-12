"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════════
   CSS VARIABLES + KEYFRAMES (injected as <style>)
════════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

:root {
  /* brand */
  --brand-deep:   #3D52A0;
  --brand-mid:    #7091E6;
  --brand-soft:   #8697C4;
  --brand-muted:  #ADBBDA;
  --brand-pale:   #EDE8F5;
  --brand-dark:   #333333;
  --accent:       #FF6B35;
  --accent-light: #FF8C5A;
}

/* ── LIGHT MODE ── */
.ar-light {
  --bg-base:      #F9F7FF;
  --bg-surface:   #FFFFFF;
  --bg-card:      #FFFFFF;
  --bg-subtle:    #EDE8F5;
  --bg-panel:     #F0EEFF;
  --tx-head:      #1A1F3C;
  --tx-body:      #3D3D4F;
  --tx-muted:     #6B6B8A;
  --tx-faint:     #9999BB;
  --bd-soft:      rgba(61,82,160,0.1);
  --bd-mid:       rgba(61,82,160,0.2);
  --bd-strong:    rgba(61,82,160,0.35);
  --nav-bg:       rgba(249,247,255,0.92);
  --nav-shadow:   0 1px 32px rgba(61,82,160,0.08);
  --hero-bg:      linear-gradient(160deg, #EDE8F5 0%, #F9F7FF 50%, #E8F0FF 100%);
  --card-hover:   0 8px 40px rgba(61,82,160,0.12);
  --section-alt:  #F4F1FF;
}

/* ── DARK MODE ── */
.ar-dark {
  --bg-base:      #070B18;
  --bg-surface:   #0D1121;
  --bg-card:      rgba(255,255,255,0.035);
  --bg-subtle:    rgba(61,82,160,0.08);
  --bg-panel:     rgba(255,255,255,0.025);
  --tx-head:      #E8EAF6;
  --tx-body:      #B0B8D4;
  --tx-muted:     #7080A8;
  --tx-faint:     #4A5580;
  --bd-soft:      rgba(112,145,230,0.1);
  --bd-mid:       rgba(112,145,230,0.2);
  --bd-strong:    rgba(112,145,230,0.4);
  --nav-bg:       rgba(7,11,24,0.9);
  --nav-shadow:   0 1px 32px rgba(0,0,0,0.4);
  --hero-bg:      linear-gradient(160deg, #0A0F22 0%, #070B18 60%, #0D0818 100%);
  --card-hover:   0 8px 40px rgba(112,145,230,0.12);
  --section-alt:  rgba(255,255,255,0.015);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.ar-root {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-base);
  color: var(--tx-body);
  transition: background 0.4s ease, color 0.4s ease;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── ANIMATIONS ── */
@keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
@keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
@keyframes float1    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
@keyframes float2    { 0%,100%{transform:translateY(-6px);} 50%{transform:translateY(6px);} }
@keyframes shimmer   { from{background-position:-200% center;} to{background-position:200% center;} }
@keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,53,0.4);} 50%{box-shadow:0 0 0 8px rgba(255,107,53,0);} }
@keyframes flowDot   { 0%{top:0;opacity:0;} 10%{opacity:1;} 90%{opacity:1;} 100%{top:100%;opacity:0;} }
@keyframes rotateSlowly { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
@keyframes barGrow   { from{width:0;} to{width:var(--bar-w);} }
@keyframes scanMove  { 0%{transform:translateY(-100%);} 100%{transform:translateY(200%);} }
@keyframes blink     { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
@keyframes slideInLeft  { from{opacity:0;transform:translateX(-20px);} to{opacity:1;transform:none;} }
@keyframes slideInRight { from{opacity:0;transform:translateX(20px);}  to{opacity:1;transform:none;} }
@keyframes numberCount  { from{opacity:0;transform:translateY(-8px);} to{opacity:1;transform:none;} }

.reveal { opacity:0; transform:translateY(24px); transition:opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity:1; transform:none; }

/* ── TYPOGRAPHY ── */
.font-syne     { font-family:'Syne',serif; }
.font-playfair { font-family:'Playfair Display',serif; }
.font-mono     { font-family:'DM Mono',monospace; }

.tx-head  { color:var(--tx-head); }
.tx-body  { color:var(--tx-body); }
.tx-muted { color:var(--tx-muted); }
.tx-accent{ color:var(--accent); }
.tx-brand { color:var(--brand-mid); }

/* gradient text */
.gt-brand { background:linear-gradient(135deg,var(--brand-deep),var(--brand-mid)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.gt-accent { background:linear-gradient(135deg,var(--accent),#FF9F6B); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.gt-full   { background:linear-gradient(100deg,var(--brand-deep),var(--brand-mid),var(--accent)); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 6s linear infinite; }

/* ── SECTION SHARED ── */
.ar-section { padding: 80px 5%; max-width: 1280px; margin: 0 auto; }
.section-tag {
  display:inline-flex; align-items:center; gap:7px;
  padding:5px 14px; border-radius:100px;
  background:rgba(61,82,160,0.1); border:1px solid var(--bd-mid);
  font-family:'DM Mono',monospace; font-size:.6rem;
  letter-spacing:.14em; text-transform:uppercase; color:var(--brand-mid);
  margin-bottom:16px;
}
.ar-dark .section-tag { background:rgba(112,145,230,0.08); }
.section-tag .dot { width:5px; height:5px; border-radius:50%; background:var(--accent); display:inline-block; animation:blink 2s infinite; }

.section-title {
  font-family:'Syne',serif; font-weight:800;
  font-size:clamp(1.9rem,3.5vw,2.9rem);
  letter-spacing:-0.025em; line-height:1.1;
  color:var(--tx-head);
}
.section-sub {
  font-size:.95rem; font-weight:300; color:var(--tx-muted);
  max-width:560px; line-height:1.7; margin-top:12px;
}

/* ── CARD ── */
.ar-card {
  background:var(--bg-card);
  border:1px solid var(--bd-soft);
  border-radius:16px;
  padding:24px;
  transition:all 0.3s ease;
}
.ar-card:hover { box-shadow:var(--card-hover); border-color:var(--bd-mid); transform:translateY(-3px); }
.ar-light .ar-card { box-shadow:0 2px 16px rgba(61,82,160,0.06); }

/* ── BUTTONS ── */
.btn-primary {
  padding:12px 26px; border-radius:10px; border:none; cursor:pointer;
  background:linear-gradient(135deg,var(--brand-deep),var(--brand-mid));
  color:#fff; font-family:'Syne',serif; font-weight:700; font-size:.88rem;
  letter-spacing:-.01em; transition:all 0.3s ease;
  box-shadow:0 4px 20px rgba(61,82,160,0.35);
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(61,82,160,0.45); }
.btn-accent {
  padding:12px 26px; border-radius:10px; border:none; cursor:pointer;
  background:linear-gradient(135deg,var(--accent),#FF8C5A);
  color:#fff; font-family:'Syne',serif; font-weight:700; font-size:.88rem;
  transition:all 0.3s ease; box-shadow:0 4px 20px rgba(255,107,53,0.35);
}
.btn-accent:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(255,107,53,0.45); }
.btn-ghost {
  padding:12px 26px; border-radius:10px; cursor:pointer;
  background:transparent;
  border:1.5px solid var(--bd-strong);
  color:var(--tx-head); font-family:'Syne',serif; font-weight:700; font-size:.88rem;
  transition:all 0.3s ease;
}
.btn-ghost:hover { background:var(--bg-subtle); }

/* ── DIVIDER ── */
.ar-divider {
  width:100%; height:1px;
  background:linear-gradient(90deg,transparent,var(--bd-mid),transparent);
  margin:0;
}

/* ── CHIP ── */
.ar-chip {
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 10px; border-radius:8px;
  background:var(--bg-subtle); border:1px solid var(--bd-soft);
  font-size:.68rem; color:var(--tx-muted);
}
.ar-chip.accent { background:rgba(255,107,53,0.1); border-color:rgba(255,107,53,0.25); color:var(--accent); }
.ar-chip.brand  { background:rgba(112,145,230,0.1); border-color:rgba(112,145,230,0.25); color:var(--brand-mid); }

/* ── NAV ── */
.ar-nav {
  position:fixed; top:0; left:0; right:0; z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 5%; height:64px;
  background:var(--nav-bg); backdrop-filter:blur(16px);
  border-bottom:1px solid var(--bd-soft);
  box-shadow:var(--nav-shadow);
  transition:all 0.3s;
}
.ar-nav .logo { font-family:'Syne',serif; font-weight:800; font-size:1.2rem; color:var(--tx-head); display:flex; align-items:center; gap:8px; }
.ar-nav .logo .logo-dot { width:8px; height:8px; border-radius:50%; background:var(--accent); animation:blink 2s infinite; }
.nav-links { display:flex; gap:28px; list-style:none; }
.nav-links a { font-size:.82rem; font-weight:500; color:var(--tx-muted); text-decoration:none; transition:color 0.2s; }
.nav-links a:hover { color:var(--tx-head); }
.nav-right { display:flex; align-items:center; gap:12px; }

/* mode toggle */
.mode-toggle {
  width:44px; height:24px; border-radius:100px;
  background:var(--bg-subtle); border:1.5px solid var(--bd-mid);
  cursor:pointer; position:relative; transition:background 0.3s;
  display:flex; align-items:center; padding:2px;
}
.mode-toggle .knob {
  width:18px; height:18px; border-radius:50%;
  background:linear-gradient(135deg,var(--brand-deep),var(--brand-mid));
  transition:transform 0.3s ease;
  display:flex; align-items:center; justify-content:center;
  font-size:.6rem;
}
.ar-dark .mode-toggle .knob { transform:translateX(20px); }

/* ── HERO ── */
.ar-hero {
  min-height:100vh; display:flex; align-items:center;
  background:var(--hero-bg);
  padding:100px 5% 60px;
  position:relative; overflow:hidden;
}
.hero-grid {
  position:absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(var(--bd-soft) 1px,transparent 1px),
    linear-gradient(90deg,var(--bd-soft) 1px,transparent 1px);
  background-size:48px 48px;
}
.ar-light .hero-grid { opacity:0.5; }
.ar-dark  .hero-grid { opacity:0.3; }

/* ── WORKFLOW ── */
.wf-step {
  display:flex; align-items:flex-start; gap:16px;
  padding:18px; border-radius:14px;
  background:var(--bg-card); border:1px solid var(--bd-soft);
  position:relative; transition:all 0.3s;
}
.wf-step:hover { border-color:var(--bd-mid); box-shadow:var(--card-hover); }
.wf-num {
  width:36px; height:36px; border-radius:10px; flex-shrink:0;
  background:linear-gradient(135deg,var(--brand-deep),var(--brand-mid));
  display:flex; align-items:center; justify-content:center;
  font-family:'Syne',serif; font-weight:800; font-size:.8rem; color:#fff;
}
.wf-arrow { text-align:center; color:var(--tx-faint); font-size:1.1rem; padding:4px 0; }

/* ── BENEFITS TABLE ── */
.benefit-col { flex:1; min-width:200px; }
.benefit-col h4 {
  font-family:'Syne',serif; font-weight:800; font-size:.9rem;
  color:var(--tx-head); margin-bottom:12px; padding-bottom:10px;
  border-bottom:2px solid var(--brand-mid);
}
.benefit-item {
  display:flex; gap:8px; align-items:flex-start; margin-bottom:9px;
}
.benefit-item .b-dot {
  width:5px; height:5px; border-radius:50%; background:var(--accent);
  flex-shrink:0; margin-top:6px;
}

/* ── INTEGRATION LOGOS ── */
.int-logo {
  padding:12px 20px; border-radius:12px;
  background:var(--bg-card); border:1px solid var(--bd-soft);
  font-family:'Syne',serif; font-weight:700; font-size:.78rem;
  color:var(--tx-muted); text-align:center;
  transition:all 0.3s; cursor:default;
}
.int-logo:hover { border-color:var(--brand-mid); color:var(--brand-mid); background:rgba(112,145,230,0.08); }

/* ── FOOTER ── */
.ar-footer {
  background:#0A0D1A; color:rgba(255,255,255,0.55);
  padding:60px 5% 32px;
}
.ar-light .ar-footer { background:#1A1F3C; }

/* ── PRECISION ENGINE ── */
.pe-ring {
  width:200px; height:200px; border-radius:50%;
  border:2px solid var(--bd-mid);
  display:flex; align-items:center; justify-content:center;
  position:relative; flex-shrink:0;
}
.pe-ring.outer { animation:rotateSlowly 20s linear infinite; }
.pe-ring.inner { width:130px; height:130px; animation:rotateSlowly 12s linear infinite reverse; }
.pe-core {
  position:absolute; width:70px; height:70px; border-radius:50%;
  background:linear-gradient(135deg,var(--brand-deep),var(--accent));
  display:flex; align-items:center; justify-content:center;
  font-size:1.4rem; box-shadow:0 0 30px rgba(255,107,53,0.4);
}

/* ── STATS ── */
.stat-num {
  font-family:'Syne',serif; font-weight:800; font-size:2.2rem;
  line-height:1; color:var(--tx-head);
}
.ar-dark .stat-num { text-shadow:0 0 20px rgba(112,145,230,0.3); }

/* ── SCROLLBAR ── */
.ar-root::-webkit-scrollbar { width:4px; }
.ar-root::-webkit-scrollbar-track { background:transparent; }
.ar-root::-webkit-scrollbar-thumb { background:var(--brand-mid); border-radius:2px; }

/* ── MOBILE ── */
@media (max-width:768px) {
  .nav-links { display:none; }
  .ar-hero { padding:100px 5% 60px; }
  .ar-section { padding:60px 5%; }
}
`;

/* ════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Tag({ children, color = "brand" }: { children: React.ReactNode; color?: string }) {
  return (
    <div className={`section-tag`} style={{ color: color === "accent" ? "var(--accent)" : undefined, background: color === "accent" ? "rgba(255,107,53,0.1)" : undefined, borderColor: color === "accent" ? "rgba(255,107,53,0.25)" : undefined }}>
      <span className="dot" style={{ background: color === "accent" ? "var(--accent)" : undefined }} />
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg,transparent,var(--bd-mid),transparent)" }} />;
}

/* ════════════════════════════════════════════════════════════
   NAV
════════════════════════════════════════════════════════════ */
function Nav({ dark, toggle, onNav }: { dark: boolean; toggle: () => void; onNav: (id: string) => void }) {
  const links = ["platform", "ipd", "opd", "technology", "about"];
  return (
    <nav className="ar-nav">
      <div className="logo">
        <span className="logo-dot" />
        <span>AI-rogyam</span>
      </div>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l}>
            <a href="#" onClick={(e) => { e.preventDefault(); onNav(l); }}>
              {l === "ipd" ? "IPD Solution" : l === "opd" ? "OPD Solution" : l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="mode-toggle" onClick={toggle} aria-label="Toggle dark mode">
          <span className="knob">{dark ? "☽" : "☀"}</span>
        </button>
        <button className="btn-accent" style={{ padding: "8px 18px", fontSize: ".78rem" }}>Request Demo</button>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
function Hero({ dark }: { dark: boolean }) {
  return (
    <section className="ar-hero" id="home">
      <div className="hero-grid" />
      {/* ambient blobs */}
      <div style={{ position: "absolute", top: "15%", right: "8%", width: 500, height: 500, borderRadius: "50%", background: dark ? "radial-gradient(circle,rgba(61,82,160,0.15) 0%,transparent 70%)" : "radial-gradient(circle,rgba(112,145,230,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: dark ? "radial-gradient(circle,rgba(255,107,53,0.08) 0%,transparent 70%)" : "radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <Tag color="accent">Clinical Nutrition Intelligence Platform</Tag>
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
            <button className="btn-accent">Request Demo</button>
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
   PROBLEM SECTION
════════════════════════════════════════════════════════════ */
function ProblemSection() {
  const problems = [
    { icon: "📋", title: "Manual Diet Planning", desc: "Dieticians spend hours on manual calculations with no clinical data integration." },
    { icon: "🚫", title: "No Personalization", desc: "Generic diets ignore patient allergies, comorbidities, and medication interactions." },
    { icon: "🔗", title: "Disconnected Systems", desc: "Kitchen, ward, and dietician teams operate in silos with no shared workflow." },
    { icon: "📊", title: "Zero Lifestyle Monitoring", desc: "Post-discharge patients get no AI-guided monitoring or compliance tracking." },
  ];
  return (
    <section style={{ background: "var(--section-alt)", padding: "80px 0" }} id="problem">
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag>The Problem</Tag>
          <h2 className="section-title" style={{ maxWidth: 620, margin: "0 auto" }}>
            Nutrition is <span className="gt-accent">Critical</span> to Patient Recovery
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            Yet most hospitals still rely on manual workflows, disconnected systems, and generic diet plans that fail patients.
          </p>
        </div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {problems.map((p) => (
            <div key={p.title} className="ar-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{p.icon}</div>
              <h4 className="font-syne" style={{ fontSize: ".9rem", fontWeight: 700, color: "var(--tx-head)", marginBottom: 8 }}>{p.title}</h4>
              <p style={{ fontSize: ".75rem", color: "var(--tx-muted)", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PRECISION NUTRITION ENGINE
════════════════════════════════════════════════════════════ */
function PrecisionEngine({ dark }: { dark: boolean }) {
  const inputs = ["Clinical Data", "Lab Results", "Allergies", "Medication", "BMI / Body"];
  const outputs = ["Diet Plan", "Calorie Target", "Macro Ratios", "Meal Schedule", "Supplements"];
  return (
    <section id="platform" style={{ padding: "80px 0", background: "var(--bg-base)" }}>
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 52 }}>
          <Tag color="accent">Core Technology</Tag>
          <h2 className="section-title">Precision Nutrition <span className="gt-brand">Engine</span></h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>AI-rogyam's intelligence core processes clinical data through multiple knowledge layers to generate personalized nutrition recommendations.</p>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="font-mono" style={{ fontSize: ".6rem", letterSpacing: ".12em", color: "var(--tx-faint)", marginBottom: 4 }}>CLINICAL INPUTS</p>
            {inputs.map((inp, i) => (
              <div key={inp} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--bd-soft)", animation: `slideInLeft 0.5s ${i * 0.08}s ease both` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7091E6", boxShadow: "0 0 6px rgba(112,145,230,0.5)" }} />
                <span style={{ fontSize: ".75rem", color: "var(--tx-body)" }}>{inp}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(112,145,230,0.3),transparent)`, marginLeft: 4 }} />
              </div>
            ))}
          </div>

          {/* Center engine */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            {/* Outer ring */}
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(112,145,230,0.3)", animation: "rotateSlowly 20s linear infinite" }}>
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", width: 6, height: 6, borderRadius: "50%", background: "var(--brand-mid)", transform: `rotate(${deg}deg) translateX(94px) translateY(-50%)`, opacity: 0.6 }} />
                ))}
              </div>
              {/* Inner ring */}
              <div style={{ position: "absolute", top: "15%", left: "15%", right: "15%", bottom: "15%", borderRadius: "50%", border: `2px solid rgba(255,107,53,0.25)`, animation: "rotateSlowly 12s linear infinite reverse" }}>
                {[0, 90, 180, 270].map((deg) => (
                  <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", transform: `rotate(${deg}deg) translateX(58px) translateY(-50%)`, opacity: 0.7 }} />
                ))}
              </div>
              {/* Core */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,var(--brand-deep),var(--brand-mid))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", boxShadow: dark ? "0 0 40px rgba(112,145,230,0.4)" : "0 0 30px rgba(61,82,160,0.3)" }}>
                🧬
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <p className="font-syne" style={{ fontWeight: 800, fontSize: ".85rem", color: "var(--tx-head)" }}>Precision AI Engine</p>
              <p style={{ fontSize: ".65rem", color: "var(--tx-faint)", marginTop: 3 }}>Clinical · Nutrition · Lifestyle</p>
            </div>
          </div>

          {/* Outputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p className="font-mono" style={{ fontSize: ".6rem", letterSpacing: ".12em", color: "var(--tx-faint)", marginBottom: 4, textAlign: "right" }}>AI OUTPUTS</p>
            {outputs.map((out, i) => (
              <div key={out} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--bd-soft)", flexDirection: "row-reverse", animation: `slideInRight 0.5s ${i * 0.08}s ease both` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px rgba(255,107,53,0.5)" }} />
                <span style={{ fontSize: ".75rem", color: "var(--tx-body)" }}>{out}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg,rgba(255,107,53,0.3),transparent)`, marginRight: 4 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge layers */}
        <div className="reveal" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { label: "Clinical Knowledge", icon: "🏥", sub: "Disease protocols & guidelines", color: "#7091E6" },
            { label: "Nutrition Science", icon: "🥗", sub: "12,000+ food database", color: "#FF6B35" },
            { label: "Drug-Food Database", icon: "💊", sub: "Interaction rules engine", color: "#a78bfa" },
            { label: "Lifestyle Intelligence", icon: "🧘", sub: "Fitness & yoga protocols", color: "#34d399" },
          ].map((k) => (
            <div key={k.label} className="ar-card" style={{ borderTop: `3px solid ${k.color}`, textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{k.icon}</div>
              <h4 className="font-syne" style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--tx-head)", marginBottom: 4 }}>{k.label}</h4>
              <p style={{ fontSize: ".65rem", color: "var(--tx-muted)" }}>{k.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CAPABILITIES GRID
════════════════════════════════════════════════════════════ */
function Capabilities() {
  const caps = [
    { icon: "🧠", title: "Clinical Diet Planning", desc: "Disease-specific diet plans generated from EMR/LIS data. Supports 40+ conditions.", color: "#7091E6" },
    { icon: "🏃", title: "Fitness & Lifestyle", desc: "Personalized exercise and yoga protocols matched to patient condition and mobility.", color: "#FF6B35" },
    { icon: "🏥", title: "Hospital Diet Ops", desc: "End-to-end IPD diet management: planning → kitchen → delivery → tracking.", color: "#34d399" },
    { icon: "📱", title: "Patient Monitoring", desc: "Real-time compliance tracking, symptom logging, and AI-driven nudges via app.", color: "#a78bfa" },
    { icon: "👨‍⚕️", title: "Dietician Workflow", desc: "Smart dashboards that slash planning time by 70% with one-click approvals.", color: "#38bdf8" },
    { icon: "📊", title: "Nutrition Analytics", desc: "Population-level nutrition insights and outcome tracking for hospital leadership.", color: "#F59E0B" },
  ];
  return (
    <section style={{ background: "var(--section-alt)", padding: "80px 0" }}>
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag>Platform Capabilities</Tag>
          <h2 className="section-title">One Platform. <span className="gt-accent">Complete Coverage.</span></h2>
        </div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {caps.map((c) => (
            <div key={c.title} className="ar-card" style={{ borderLeft: `3px solid ${c.color}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}18`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: 12 }}>{c.icon}</div>
              <h4 className="font-syne" style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--tx-head)", marginBottom: 6 }}>{c.title}</h4>
              <p style={{ fontSize: ".73rem", color: "var(--tx-muted)", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SOLUTIONS — IPD + OPD
════════════════════════════════════════════════════════════ */
function Solutions({ dark }: { dark: boolean }) {
  const [tab, setTab] = useState<"ipd" | "opd">("ipd");
  const cardBg = dark ? "rgba(255,255,255,0.03)" : "#fff";
  const ipdModules = [
    { icon: "👩‍⚕️", title: "Dietician Dashboard", desc: "AI-assisted plan creation with allergy alerts and drug-food checks." },
    { icon: "🏨", title: "Ward Manager Tools", desc: "Real-time diet order tracking, patient diet status, and escalation alerts." },
    { icon: "🍽️", title: "Kitchen Operations", desc: "Automated meal tickets, dietary flags, and production planning." },
    { icon: "📈", title: "Nutrition Analytics", desc: "Hospital-wide nutrition KPIs, compliance rates, and outcome reporting." },
  ];
  const opdModules = [
    { icon: "📲", title: "Doctor / Dietician App", desc: "Prescription-driven diet plans with clinical context and follow-up tools." },
    { icon: "💪", title: "Fitness Trainer Portal", desc: "Condition-matched exercise protocols with progress sync to patient app." },
    { icon: "📱", title: "Patient Mobile App", desc: "Personalized diet & fitness plans, meal logging, and AI coaching." },
    { icon: "🔄", title: "Lifestyle Monitoring", desc: "Continuous activity, sleep, and symptom tracking with AI alerts." },
  ];
  const modules = tab === "ipd" ? ipdModules : opdModules;

  return (
    <section id={tab} style={{ padding: "80px 0" }}>
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
          <Tag>Platform Solutions</Tag>
          <h2 className="section-title">Two Powerful <span className="gt-brand">Solutions</span></h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>Whether you're managing inpatients in the hospital or supporting outpatients' lifestyle journeys, AI-rogyam has you covered.</p>
        </div>

        {/* Tab switcher */}
        <div className="reveal" style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 36 }}>
          {(["ipd", "opd"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 28px", borderRadius: 100, border: `1.5px solid ${tab === t ? "var(--brand-mid)" : "var(--bd-soft)"}`, background: tab === t ? "rgba(112,145,230,0.12)" : "transparent", color: tab === t ? "var(--brand-mid)" : "var(--tx-muted)", fontFamily: "'Syne',serif", fontWeight: 700, fontSize: ".82rem", cursor: "pointer", transition: "all 0.25s" }}>
              {t === "ipd" ? "🏥 IPD — Hospital Solution" : "📱 OPD — Patient Solution"}
            </button>
          ))}
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          {/* Description */}
          <div>
            <div style={{ padding: 28, borderRadius: 16, background: tab === "ipd" ? "rgba(112,145,230,0.06)" : "rgba(255,107,53,0.05)", border: `1px solid ${tab === "ipd" ? "rgba(112,145,230,0.2)" : "rgba(255,107,53,0.2)"}`, marginBottom: 20 }}>
              <h3 className="font-syne" style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--tx-head)", marginBottom: 12 }}>
                {tab === "ipd" ? "IPD Hospital Solution" : "OPD Lifestyle Solution"}
              </h3>
              <p style={{ fontSize: ".82rem", color: "var(--tx-muted)", lineHeight: 1.7 }}>
                {tab === "ipd"
                  ? "Complete inpatient diet management — from admission to discharge. AI-rogyam coordinates dieticians, ward managers, and kitchen teams through a single intelligent platform connected to your HIS."
                  : "Personalized outpatient care through mobile-first technology. Patients receive AI-curated diet and fitness plans, delivered via app with continuous monitoring and dietician oversight."}
              </p>
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(tab === "ipd" ? ["EMR Integration", "FHIR Compliant", "Kitchen Automation"] : ["iOS & Android", "Wearable Sync", "AI Coaching"]).map((t) => (
                  <span key={t} className="ar-chip brand">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Modules */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {modules.map((m, i) => (
              <div key={m.title} className="wf-step" style={{ animation: `fadeUp 0.4s ${i * 0.07}s ease both` }}>
                <div className="wf-num">{m.icon}</div>
                <div>
                  <h4 className="font-syne" style={{ fontWeight: 700, fontSize: ".82rem", color: "var(--tx-head)", marginBottom: 3 }}>{m.title}</h4>
                  <p style={{ fontSize: ".7rem", color: "var(--tx-muted)", lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   WORKFLOW DIAGRAMS
════════════════════════════════════════════════════════════ */
function Workflows({ dark }: { dark: boolean }) {
  const ipd = [
    { n: "01", label: "Patient Admission", sub: "HIS triggers diet referral" },
    { n: "02", label: "Clinical Data Integration", sub: "EMR, LIS, allergy flags synced" },
    { n: "03", label: "AI Diet Recommendation", sub: "Precision Engine generates plan" },
    { n: "04", label: "Dietician Approval", sub: "One-click review with CDSS alerts" },
    { n: "05", label: "Kitchen Meal Preparation", sub: "Auto-generated meal tickets" },
    { n: "06", label: "Patient Meal Delivery", sub: "Bedside confirmation & feedback" },
  ];
  const opd = [
    { n: "01", label: "Patient Consultation", sub: "Doctor/dietician sets goals" },
    { n: "02", label: "AI Diet & Fitness Plan", sub: "Personalized to clinical profile" },
    { n: "03", label: "Mobile App Activation", sub: "Patient onboarded instantly" },
    { n: "04", label: "Daily Patient Updates", sub: "Meal logs, activity, symptoms" },
    { n: "05", label: "Progress Tracking", sub: "AI analyzes trends & adapts plan" },
  ];
  function Flow({ steps, color }: { steps: typeof ipd; color: string }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, i) => (
          <div key={s.n}>
            <div className="wf-step">
              <div className="wf-num" style={{ background: `linear-gradient(135deg,${color}CC,${color})` }}>{s.n}</div>
              <div>
                <h4 className="font-syne" style={{ fontWeight: 700, fontSize: ".82rem", color: "var(--tx-head)" }}>{s.label}</h4>
                <p style={{ fontSize: ".68rem", color: "var(--tx-muted)", marginTop: 2 }}>{s.sub}</p>
              </div>
              {/* Flow particle */}
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.6 }} />
            </div>
            {i < steps.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", position: "relative", height: 20 }}>
                <div style={{ width: 2, height: "100%", background: `linear-gradient(to bottom,${color}60,${color}20)` }} />
                <div style={{ position: "absolute", bottom: 0, width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `6px solid ${color}50` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <section style={{ background: "var(--section-alt)", padding: "80px 0" }}>
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag>Clinical Workflows</Tag>
          <h2 className="section-title">How <span className="gt-accent">AI-rogyam</span> Works</h2>
        </div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h3 className="font-syne" style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 20, color: "var(--tx-head)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(112,145,230,0.1)", border: "1px solid rgba(112,145,230,0.25)", color: "var(--brand-mid)", fontSize: ".7rem" }}>IPD</span>
              Hospital Diet Workflow
            </h3>
            <Flow steps={ipd} color="#7091E6" />
          </div>
          <div>
            <h3 className="font-syne" style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 20, color: "var(--tx-head)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.25)", color: "var(--accent)", fontSize: ".7rem" }}>OPD</span>
              Patient Lifestyle Journey
            </h3>
            <Flow steps={opd} color="#FF6B35" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   BENEFITS
════════════════════════════════════════════════════════════ */
function Benefits() {
  const cols = [
    {
      title: "For Hospitals",
      icon: "🏥",
      color: "#7091E6",
      items: ["Standardized nutrition protocols", "Improved patient recovery rates", "Efficient kitchen operations", "Reduced diet planning time by 70%", "NABH-ready documentation"],
    },
    {
      title: "For Dieticians",
      icon: "👩‍⚕️",
      color: "#FF6B35",
      items: ["Faster, AI-assisted diet planning", "Intelligent clinical recommendations", "Real-time patient monitoring", "Drug-food interaction alerts", "One-click plan approvals"],
    },
    {
      title: "For Patients",
      icon: "🙂",
      color: "#34d399",
      items: ["Personalized diet plans", "Disease-specific meal guidance", "Lifestyle & fitness coaching", "Health progress tracking", "24/7 AI nutrition support"],
    },
  ];
  return (
    <section style={{ padding: "80px 0" }}>
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag>Impact & Benefits</Tag>
          <h2 className="section-title">Measurable <span className="gt-brand">Outcomes</span> for Everyone</h2>
        </div>
        <div className="reveal" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {cols.map((c) => (
            <div key={c.title} className="benefit-col ar-card" style={{ borderTop: `3px solid ${c.color}` }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{c.icon}</div>
              <h4 className="benefit-col" style={{ borderBottomColor: c.color }}>{c.title}</h4>
              {c.items.map((item) => (
                <div key={item} className="benefit-item">
                  <div className="b-dot" style={{ background: c.color }} />
                  <span style={{ fontSize: ".73rem", color: "var(--tx-muted)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Stats row */}
        <div className="reveal" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { val: "70%", label: "Reduction in diet planning time" },
            { val: "40%", label: "Improved patient recovery outcomes" },
            { val: "94%", label: "AI recommendation accuracy" },
            { val: "3×", label: "Faster kitchen operations" },
          ].map((s) => (
            <div key={s.label} className="ar-card" style={{ textAlign: "center" }}>
              <div className="stat-num gt-full">{s.val}</div>
              <p style={{ fontSize: ".68rem", color: "var(--tx-muted)", marginTop: 6, lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   INTEGRATION SECTION
════════════════════════════════════════════════════════════ */
function Integration() {
  const systems = ["HIS", "EMR", "LIS", "PACS", "Pharmacy", "IoT Devices", "FHIR API", "Patient App"];
  return (
    <section style={{ background: "var(--section-alt)", padding: "80px 0" }} id="technology">
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag>Integrations</Tag>
          <h2 className="section-title">Seamlessly Integrated with <span className="gt-brand">Smart Hospital Platform</span></h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>AI-rogyam connects natively with all major hospital systems, making it a true extension of your digital health infrastructure.</p>
        </div>
        {/* Architecture visual */}
        <div className="reveal" style={{ position: "relative", padding: "32px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-block", padding: "14px 32px", borderRadius: 12, background: "linear-gradient(135deg,rgba(61,82,160,0.15),rgba(112,145,230,0.1))", border: "1.5px solid rgba(112,145,230,0.3)", fontFamily: "'Syne',serif", fontWeight: 800, fontSize: ".9rem", color: "var(--tx-head)" }}>
              🧬 AI-rogyam Intelligence Platform
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, gap: 40, flexWrap: "wrap" }}>
            {["Nutrition Engine", "Knowledge Graph", "CDSS Core"].map((l) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 1, height: 24, background: "var(--bd-mid)" }} />
                <div style={{ padding: "8px 16px", borderRadius: 8, background: "var(--bg-card)", border: "1px solid var(--bd-soft)", fontSize: ".72rem", color: "var(--tx-body)", fontFamily: "'DM Mono',monospace" }}>{l}</div>
                <div style={{ width: 1, height: 24, background: "var(--bd-mid)" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {systems.map((s) => (
              <div key={s} className="int-logo">{s}</div>
            ))}
          </div>
        </div>
        {/* Compliance badges */}
        <div className="reveal" style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {["HIPAA Compliant", "FHIR R4", "HL7 v2.x", "NABH Ready", "ISO 27001", "SOC 2"].map((b) => (
            <span key={b} className="ar-chip brand" style={{ padding: "6px 14px" }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA SECTION
════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section style={{ padding: "80px 5%", background: "linear-gradient(135deg,var(--brand-deep),#5074d4 50%,var(--brand-deep))" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div className="reveal">
          <p className="font-mono" style={{ fontSize: ".65rem", letterSpacing: ".18em", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>TRANSFORM YOUR HOSPITAL</p>
          <h2 className="font-syne" style={{ fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff", letterSpacing: "-.025em", lineHeight: 1.1, marginBottom: 16 }}>
            Transform Clinical Nutrition<br />with <span style={{ background: "linear-gradient(135deg,#FF8C5A,#FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI-rogyam</span>
          </h2>
          <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,0.65)", marginBottom: 32, fontWeight: 300, lineHeight: 1.7 }}>
            Join 50+ hospitals that have already transformed their clinical nutrition programs. Request a personalized demo today.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-accent" style={{ padding: "14px 32px", fontSize: ".9rem", animation: "pulseRing 2s ease infinite" }}>Request Demo</button>
            <button style={{ padding: "14px 32px", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 10, background: "transparent", color: "#fff", fontFamily: "'Syne',serif", fontWeight: 700, fontSize: ".9rem", cursor: "pointer", transition: "all 0.3s" }}>Talk to an Expert</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
function Footer() {
  const cols = [
    { head: "AI-rogyam", items: ["Platform Overview", "Precision Engine", "Technology", "Security"] },
    { head: "Solutions", items: ["IPD Hospital Module", "OPD Lifestyle App", "Dietician Portal", "Patient App"] },
    { head: "Company", items: ["About Us", "Careers", "Partners", "Contact"] },
    { head: "Resources", items: ["Blog", "Case Studies", "Whitepapers", "API Docs"] },
  ];
  return (
    <footer className="ar-footer">
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ fontFamily: "'Syne',serif", fontWeight: 800, fontSize: "1.2rem", color: "#fff", marginBottom: 12 }}>AI-rogyam</div>
            <p style={{ fontSize: ".78rem", lineHeight: 1.7, maxWidth: 280 }}>AI-Powered Clinical Nutrition & Lifestyle Intelligence Platform for Smart Hospitals.</p>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              {["LinkedIn", "Twitter", "YouTube"].map((s) => (
                <div key={s} style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", fontSize: ".65rem", cursor: "pointer", transition: "all 0.2s" }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.head}>
              <h4 style={{ fontFamily: "'Syne',serif", fontWeight: 700, fontSize: ".82rem", color: "rgba(255,255,255,0.8)", marginBottom: 14 }}>{c.head}</h4>
              {c.items.map((item) => (
                <div key={item} style={{ fontSize: ".73rem", marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: ".68rem" }}>
          <span>© 2025 AI-rogyam. Part of Smart Hospital Platform.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span>Privacy Policy</span><span>Terms of Service</span><span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════
   ABOUT SECTION
════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: "80px 0", background: "var(--bg-base)" }}>
      <div className="ar-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <Tag>About AI-rogyam</Tag>
            <h2 className="section-title">Clinical Nutrition Intelligence, <span className="gt-accent">Reimagined</span></h2>
            <p style={{ fontSize: ".88rem", color: "var(--tx-muted)", lineHeight: 1.75, marginTop: 16, marginBottom: 20 }}>
              AI-rogyam is a clinical nutrition intelligence platform built exclusively for healthcare. We combine nutrition science, clinical knowledge, and AI to deliver personalized diet and lifestyle programs that integrate natively with hospital workflows.
            </p>
            <p style={{ fontSize: ".88rem", color: "var(--tx-muted)", lineHeight: 1.75, marginBottom: 28 }}>
              As a module of the Smart Hospital Platform ecosystem, AI-rogyam connects clinical data, dietician expertise, and patient engagement into a single, intelligent system — helping hospitals deliver better nutrition care at scale.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-primary">Our Mission</button>
              <button className="btn-ghost">Meet the Team</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🎯", title: "Our Mission", desc: "Make clinical-grade nutrition intelligence accessible to every hospital and patient." },
              { icon: "🔬", title: "Our Technology", desc: "Built on healthcare AI with clinical knowledge graphs and FHIR-native integrations." },
              { icon: "🌍", title: "Our Reach", desc: "Deployed in 50+ hospitals across Asia and the Middle East, serving 2M+ patients." },
              { icon: "🤝", title: "Our Platform", desc: "A core module of the Smart Hospital Platform — built for ecosystem interoperability." },
            ].map((card) => (
              <div key={card.title} className="ar-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{card.icon}</div>
                <h4 className="font-syne" style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--tx-head)", marginBottom: 6 }}>{card.title}</h4>
                <p style={{ fontSize: ".68rem", color: "var(--tx-muted)", lineHeight: 1.5 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   ROOT COMPONENT
════════════════════════════════════════════════════════════ */
export default function AirogyamWebsite() {
  const [dark, setDark] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div ref={rootRef} className={`ar-root ${dark ? "ar-dark" : "ar-light"}`}>
        <Nav dark={dark} toggle={() => setDark((d) => !d)} onNav={scrollTo} />
        <Hero dark={dark} />
        <Divider />
        <ProblemSection />
        <Divider />
        <PrecisionEngine dark={dark} />
        <Divider />
        <Capabilities />
        <Divider />
        <Solutions dark={dark} />
        <Divider />
        <Workflows dark={dark} />
        <Divider />
        <Benefits />
        <Divider />
        <Integration />
        <Divider />
        <About />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
