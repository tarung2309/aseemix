"use client";
import { useReveal } from "@/hooks/useReveal";

function FeatureRow({ reverse, tag, title, desc, bullets, visual }: {
  reverse?:boolean; tag:string; title:React.ReactNode; desc:string; bullets:string[]; visual:React.ReactNode;
}) {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <div ref={ref} className={`flex flex-col ${reverse?"lg:flex-row-reverse":"lg:flex-row"} items-center gap-16 max-w-7xl mx-auto py-20`}>
      <div className="flex-1">
        <div className={`slabel mb-4 ${reverse?"slide-r":"slide-l"}`}>{tag}</div>
        <h2 className={`font-extrabold tracking-tight mb-5 ${reverse?"slide-r":"slide-l"}`}
          style={{ fontSize:"clamp(1.7rem,3.5vw,2.6rem)", fontFamily:"var(--font-syne)", color:"var(--tx-head)" }}>
          {title}
        </h2>
        <p className={`text-[.95rem] leading-relaxed mb-7 ${reverse?"slide-r":"slide-l"}`} style={{ color:"var(--tx-muted)" }}>{desc}</p>
        <ul className={`space-y-3 ${reverse?"slide-r":"slide-l"}`}>
          {bullets.map(b=>(
            <li key={b} className="flex items-start gap-3 text-[.88rem]" style={{ color:"var(--tx-body)" }}>
              <span className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[.65rem]"
                style={{ background:"linear-gradient(135deg,#3D52A0,#7091E6)" }}>✓</span>
              {b}
            </li>
          ))}
        </ul>
        <a href="#cta" className={`mt-8 inline-flex items-center gap-2 font-semibold text-[.88rem] no-underline transition-all duration-200 hover:gap-3 ${reverse?"slide-r":"slide-l"}`}
          style={{ color:"#3D52A0" }}>
          Learn more <span>→</span>
        </a>
      </div>
      <div className={`flex-1 w-full ${reverse?"slide-l":"slide-r"}`}>{visual}</div>
    </div>
  );
}

function StackVisual() {
  const layers = [
    { icon:"🏥", name:"Smart Applications",    tag:"Layer 6",   color:"#FF6B35", bg:"rgba(255,107,53,.07)" },
    { icon:"🤖", name:"Clinical AI Engine",     tag:"Layer 4–5", color:"#3D52A0", bg:"rgba(61,82,160,.07)" },
    { icon:"🗄", name:"Clinical Data Platform", tag:"Layer 3",   color:"#16a34a", bg:"rgba(22,163,74,.07)" },
    { icon:"🔌", name:"Integration Layer",      tag:"Layer 1–2", color:"#7c3aed", bg:"rgba(124,58,237,.07)" },
  ];
  return (
    <div className="rounded-2xl p-8" style={{ background:"var(--fcard-bg)", border:"1px solid var(--bd-soft)", boxShadow:"var(--fcard-shadow)" }}>
      <p className="text-[.68rem] uppercase tracking-widest mb-5 text-center" style={{ color:"var(--tx-faint)" }}>Healthcare Intelligence Stack</p>
      <div className="flex flex-col gap-1.5">
        {layers.map((l,i) => (
          <div key={l.name}>
            <div className="stack-block flex items-center gap-4 p-4 rounded-xl"
              style={{ background:"var(--bg-surface)", border:`1px solid ${l.color}22`, boxShadow:"0 1px 6px rgba(0,0,0,.04)" }}>
              <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background:l.color }}/>
              <span className="text-lg">{l.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-[.85rem]" style={{ fontFamily:"var(--font-syne)", color:"var(--tx-head)" }}>{l.name}</p>
              </div>
              <span className="text-[.62rem] px-2.5 py-1 rounded-full font-semibold" style={{ background:l.bg, color:l.color }}>{l.tag}</span>
            </div>
            {i < layers.length-1 && <p className="text-center text-[.8rem] py-0.5" style={{ color:"var(--stack-arrow)" }}>↕</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CDSSVisual() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background:"var(--bg-surface)", border:"1px solid var(--bd-soft)", boxShadow:"var(--fcard-shadow)" }}>
      <div className="px-5 py-3.5 flex items-center justify-between" style={{ background:"linear-gradient(90deg,#3D52A0,#5074d4)" }}>
        <span className="text-white/90 text-[.76rem] font-semibold" style={{ fontFamily:"var(--font-syne)" }}>Clinical Decision Support — Live</span>
        <span className="text-white/60 text-[.68rem]">Updated 2s ago</span>
      </div>
      <div className="p-5 space-y-3">
        {[
          { risk:"HIGH", label:"Sepsis Risk",       patient:"Room 3B, ICU",      detail:"Early warning indicators detected. Recommend lactate test + blood cultures.", color:"#dc2626", bg:"rgba(220,38,38,.06)",   border:"rgba(220,38,38,.18)" },
          { risk:"MED",  label:"Drug Interaction",  patient:"Ward B, Bed 12",    detail:"Warfarin + Aspirin flagged. Review anticoagulation protocol.",                color:"#d97706", bg:"rgba(217,119,6,.06)",  border:"rgba(217,119,6,.18)" },
          { risk:"AI",   label:"Diet Plan Ready",   patient:"Diabetic Pt #47",   detail:"Personalized 7-day meal plan generated based on labs + preferences.",         color:"#3D52A0", bg:"rgba(61,82,160,.06)",  border:"rgba(61,82,160,.18)" },
          { risk:"OK",   label:"Discharge Cleared", patient:"7 patients",         detail:"Criteria met. Care coordinators notified automatically.",                      color:"#16a34a", bg:"rgba(22,163,74,.06)",  border:"rgba(22,163,74,.18)" },
        ].map(a=>(
          <div key={a.label} className="rounded-xl p-4" style={{ background:a.bg, border:`1px solid ${a.border}` }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[.6rem] font-bold px-2 py-0.5 rounded-full text-white" style={{ background:a.color }}>{a.risk}</span>
                <span className="font-semibold text-[.82rem]" style={{ color:"var(--tx-head)" }}>{a.label}</span>
              </div>
              <span className="text-[.68rem]" style={{ color:"var(--tx-faint)" }}>{a.patient}</span>
            </div>
            <p className="text-[.76rem] mt-1.5 leading-relaxed" style={{ color:"var(--tx-muted)" }}>{a.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopHealthVisual() {
  const regions = [
    { name:"Metro General", risk:72, patients:1240, color:"#3D52A0" },
    { name:"North District", risk:58, patients:876,  color:"#7091E6" },
    { name:"East Clinic",   risk:44, patients:532,  color:"#16a34a" },
    { name:"West Outpost",  risk:83, patients:421,  color:"#FF6B35" },
  ];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background:"var(--bg-surface)", border:"1px solid var(--bd-soft)", boxShadow:"var(--fcard-shadow)" }}>
      <div className="px-5 py-3.5 flex items-center justify-between" style={{ background:"linear-gradient(90deg,#3D52A0,#5074d4)" }}>
        <span className="text-white/90 text-[.76rem] font-semibold" style={{ fontFamily:"var(--font-syne)" }}>Population Health — Risk Dashboard</span>
        <span className="flex items-center gap-1.5 text-white/60 text-[.68rem]"><span className="w-1.5 h-1.5 rounded-full bg-green-400 pdot"/>Live</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label:"Enrolled Patients",    val:"3,069", color:"#3D52A0" },
            { label:"High-Risk Flagged",    val:"246",   color:"#FF6B35" },
            { label:"Interventions Active", val:"1,124", color:"#16a34a" },
            { label:"Avg Risk Score",       val:"61.4",  color:"#7c3aed" },
          ].map(m=>(
            <div key={m.label} className="rounded-xl p-3.5" style={{ background:"var(--bg-panel)", border:"1px solid var(--bd-soft)" }}>
              <p className="text-[.62rem] uppercase tracking-wide mb-1" style={{ color:"var(--tx-faint)" }}>{m.label}</p>
              <p className="font-extrabold text-[1.3rem] leading-none" style={{ fontFamily:"var(--font-syne)", color:m.color }}>{m.val}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {regions.map(r=>(
            <div key={r.name}>
              <div className="flex justify-between text-[.76rem] mb-1">
                <span className="font-medium" style={{ color:"var(--tx-head)" }}>{r.name}</span>
                <span style={{ color:r.color }} className="font-semibold">{r.risk}% · {r.patients.toLocaleString()} pts</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background:"var(--dash-bar-track)" }}>
                <div className="h-full rounded-full" style={{ width:`${r.risk}%`, background:r.color }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeatureRows() {
  return (
    <section id="solutions" className="px-[5%]" style={{ background:"var(--bg-base)" }}>
      <FeatureRow tag="Platform Architecture"
        title={<>The 6-Layer Healthcare<br/><em className="not-italic gt-blue">Intelligence Stack</em></>}
        desc="Our platform is built on a multi-layer architecture that sits as an intelligence layer on top of your existing hospital systems — connecting data, AI, and clinical knowledge without replacing what works."
        bullets={["Plug into existing HIS/EMR without disruption","FHIR R4 & HL7 native interoperability","Modular deployment — start with one layer","Scales from single clinic to hospital networks"]}
        visual={<StackVisual/>}
      />
      <div style={{ borderTop:"1px solid var(--bd-soft)" }}>
        <FeatureRow reverse tag="Clinical AI"
          title={<>AI-Powered Clinical<br/><em className="not-italic gt-blue">Decision Support</em></>}
          desc="Empower clinicians with real-time AI that monitors every patient continuously, flags risks before they escalate, and delivers evidence-based recommendations at the point of care."
          bullets={["Sepsis, deterioration, and readmission prediction","Drug interaction and contraindication alerts","Automated treatment pathway recommendations","Integrated with EHR workflows via CDS Hooks"]}
          visual={<CDSSVisual/>}
        />
      </div>
      <div style={{ borderTop:"1px solid var(--bd-soft)" }}>
        <FeatureRow tag="Population Health"
          title={<>Proactive Population<br/><em className="not-italic gt-blue">Health Intelligence</em></>}
          desc="Move beyond reactive care. Identify at-risk populations, deploy preventive interventions, and track health outcomes across entire communities with AI-driven population analytics."
          bullets={["Disease trend surveillance and early warning","Risk stratification across 10M+ patient records","Automated preventive care program enrollment","Real-time population dashboards by geography, cohort"]}
          visual={<PopHealthVisual/>}
        />
      </div>
    </section>
  );
}
