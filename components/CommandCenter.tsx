const bars = [
  { h: "55%", color: "#7091E6", delay: "0.1s" },
  { h: "70%", color: "#7091E6", delay: "0.15s" },
  { h: "45%", color: "#7091E6", delay: "0.2s" },
  { h: "80%", color: "#7091E6", delay: "0.25s" },
  { h: "60%", color: "#7091E6", delay: "0.3s" },
  { h: "90%", color: "#FF6B35", delay: "0.35s" },
  { h: "75%", color: "#7091E6", delay: "0.4s" },
];

const metrics = [
  { label: "Active Alerts", val: "12", cls: "text-accent", delta: "↑ 3 critical" },
  { label: "AI Predictions", val: "94.2%", cls: "text-bright", delta: "↑ accuracy" },
  { label: "Avg. LOS", val: "3.8d", cls: "text-green-400", delta: "↓ 0.4 days" },
  { label: "CDR Compliance", val: "98.1%", cls: "text-purple-400", delta: "↑ this week" },
];

const navItems = [
  { label: "Overview", active: true },
  { label: "ICU Monitor", active: false },
  { label: "Clinical AI", active: false },
  { label: "Pharmacy", active: false },
  { label: "Population", active: false },
  { label: "Analytics", active: false },
];

const alerts = [
  {
    title: "🔴 Critical Alert",
    desc: "ICU Room 4A — O₂ Saturation below threshold",
    cls: "text-accent",
    bg: "bg-[rgba(255,107,53,0.08)] border-[rgba(255,107,53,0.2)]",
  },
  {
    title: "⚠️ Drug Warning",
    desc: "Contraindication detected for Patient #2281",
    cls: "text-yellow-400",
    bg: "bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.2)]",
  },
  {
    title: "📊 AI Insight",
    desc: "Readmission risk flagged for 3 patients",
    cls: "text-bright",
    bg: "bg-[rgba(112,145,230,0.08)] border-[rgba(112,145,230,0.2)]",
  },
  {
    title: "✓ Lab Results",
    desc: "12 reports processed by AI",
    cls: "text-green-400",
    bg: "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)]",
  },
];

const aiFlags = [
  { emoji: "🔴", label: "Sepsis Risk", sub: "Room 3B · ICU", bg: "bg-[rgba(255,107,53,0.08)] border-[rgba(255,107,53,0.2)]", tc: "text-accent" },
  { emoji: "⚠️", label: "Drug Interaction", sub: "Ward B · Bed 12", bg: "bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.2)]", tc: "text-yellow-400" },
  { emoji: "🤖", label: "Diet Plan Ready", sub: "Diabetic Patient #47", bg: "bg-[rgba(112,145,230,0.08)] border-[rgba(112,145,230,0.2)]", tc: "text-bright" },
  { emoji: "✓", label: "Discharge Ready", sub: "7 patients queued", bg: "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)]", tc: "text-green-400" },
];

export default function CommandCenter() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "var(--cmd-bg)",
        border: "1px solid rgba(112,145,230,0.2)",
        boxShadow: "var(--cmd-shadow)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{
          background: "rgba(61,82,160,0.15)",
          borderBottom: "1px solid rgba(112,145,230,0.15)",
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="text-[0.78rem] font-semibold text-mid uppercase tracking-widest"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Smart Hospital Command Center
        </span>
        <div className="flex items-center gap-1.5 text-[0.72rem] text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
          Live — All Systems Operational
        </div>
      </div>

      {/* Body: 3-column grid */}
      <div className="grid grid-cols-[180px_1fr_180px] divide-x divide-[rgba(112,145,230,0.1)]">
        {/* Sidebar */}
        <div className="p-4 bg-[var(--bg-panel)] hidden lg:block">
          <p className="text-[0.62rem] uppercase tracking-widest text-mid mb-3">Navigation</p>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-md mb-1 text-[0.72rem] cursor-pointer ${
                item.active
                  ? "bg-[rgba(112,145,230,0.15)] text-bright"
                  : "text-mid hover:text-[var(--tx-head)]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.active ? "bg-accent pulse-dot" : "bg-mid"
                }`}
              />
              {item.label}
            </div>
          ))}
          <div className="mt-5 pt-4 border-t border-[rgba(112,145,230,0.1)]">
            <p className="text-[0.62rem] uppercase tracking-widest text-mid mb-2">Patient Census</p>
            <p
              className="text-bright font-extrabold leading-none"
              style={{ fontFamily: "var(--font-syne)", fontSize: "2rem" }}
            >
              847
            </p>
            <p className="text-[0.65rem] text-mid mt-1">Active Patients</p>
            <div className="mt-2.5 bg-[rgba(112,145,230,0.1)] rounded h-1 overflow-hidden">
              <div className="h-full w-[72%] bg-bright rounded" />
            </div>
            <p className="text-[0.62rem] text-mid mt-1">72% bed occupancy</p>
          </div>
        </div>

        {/* Main */}
        <div className="p-4">
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-2.5 mb-3.5">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg p-3"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--bd-soft)",
                }}
              >
                <p className="text-[0.62rem] text-mid uppercase tracking-wider">{m.label}</p>
                <p
                  className={`font-extrabold mt-1 leading-none ${m.cls}`}
                  style={{ fontFamily: "var(--font-syne)", fontSize: "1.3rem" }}
                >
                  {m.val}
                </p>
                <p className="text-[0.62rem] text-green-400 mt-0.5">{m.delta}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Bar chart */}
            <div
              className="rounded-lg p-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--bd-soft)" }}
            >
              <p className="text-[0.65rem] text-mid uppercase tracking-wider mb-2.5">Admissions (7 days)</p>
              <div className="flex items-end gap-0.5 h-14">
                {bars.map((b, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bar-animate"
                    style={{
                      height: b.h,
                      background: b.color,
                      opacity: 0.8,
                      animationDelay: b.delay,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Donut */}
            <div
              className="rounded-lg p-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--bd-soft)" }}
            >
              <p className="text-[0.65rem] text-mid uppercase tracking-wider mb-2.5">Risk Score Distribution</p>
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  {[
                    { color: "#22c55e", label: "Low Risk", pct: "68%" },
                    { color: "#eab308", label: "Medium", pct: "24%" },
                    { color: "#FF6B35", label: "High Risk", pct: "8%" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-1.5 text-[0.62rem] text-mid">
                      <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: r.color }} />
                      {r.label}
                      <span className="ml-auto font-semibold text-[var(--tx-head)]">{r.pct}</span>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 60 60" width="56" height="56">
                  <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(112,145,230,0.1)" strokeWidth="8" />
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="87.96 138.23" strokeDashoffset="34.56" transform="rotate(-90 30 30)" />
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#eab308" strokeWidth="8" strokeDasharray="30.79 138.23" strokeDashoffset="-53.4" transform="rotate(-90 30 30)" />
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#FF6B35" strokeWidth="8" strokeDasharray="11.06 138.23" strokeDashoffset="-84.19" transform="rotate(-90 30 30)" />
                </svg>
              </div>
            </div>

            {/* AI Flags row */}
            <div
              className="col-span-2 rounded-lg p-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--bd-soft)" }}
            >
              <p className="text-[0.65rem] text-mid uppercase tracking-wider mb-2.5">
                AI Clinical Decision Support — Real-time Flags
              </p>
              <div className="grid grid-cols-4 gap-2">
                {aiFlags.map((f) => (
                  <div key={f.label} className={`rounded-md p-2 border text-[0.68rem] ${f.bg}`}>
                    <p className={`font-semibold mb-0.5 ${f.tc}`}>{f.emoji} {f.label}</p>
                    <p className="text-mid">{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="p-4 bg-[var(--bg-panel)] hidden lg:block">
          <p className="text-[0.62rem] uppercase tracking-widest text-mid mb-3">Live Alerts</p>
          {alerts.map((a) => (
            <div key={a.title} className={`rounded-md p-2 border mb-2 text-[0.7rem] ${a.bg}`}>
              <p className={`font-semibold mb-0.5 ${a.cls}`}>{a.title}</p>
              <p className="text-mid">{a.desc}</p>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-[rgba(112,145,230,0.1)]">
            <p className="text-[0.62rem] uppercase tracking-widest text-mid mb-2">System Health</p>
            {[
              { label: "AI Engine", status: "Online", color: "text-green-400" },
              { label: "HIS Sync", status: "Active", color: "text-green-400" },
              { label: "FHIR API", status: "Running", color: "text-green-400" },
              { label: "IoT Devices", status: "2 Alerts", color: "text-yellow-400" },
            ].map((s) => (
              <div key={s.label} className="flex justify-between text-[0.65rem] mb-1.5">
                <span className="text-mid">{s.label}</span>
                <span className={s.color}>● {s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
