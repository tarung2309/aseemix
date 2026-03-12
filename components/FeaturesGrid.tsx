"use client";
import { useReveal } from "@/hooks/useReveal";

const features = [
  { icon:"🧠", title:"Clinical Decision Support", desc:"AI-driven CDSS surfaces risk predictions, treatment recommendations, and drug interaction alerts at the point of care.", color:"#3D52A0", bg:"rgba(61,82,160,.09)" },
  { icon:"🔗", title:"Universal Integration",     desc:"Connect HIS, EMR, lab, radiology, pharmacy, and IoT via our FHIR R4 and HL7-compatible integration layer.", color:"#7091E6", bg:"rgba(112,145,230,.1)" },
  { icon:"📊", title:"Real-time Analytics",       desc:"Live operational dashboards with predictive insights across patient flow, bed utilization, readmission risk, and outcomes.", color:"#FF6B35", bg:"rgba(255,107,53,.08)" },
  { icon:"🥗", title:"Intelligent Diet Planning", desc:"Disease-specific clinical nutrition protocols with AI-generated meal plans, nutritional analytics, and dietician workflow tools.", color:"#16a34a", bg:"rgba(22,163,74,.08)" },
  { icon:"❤️", title:"Patient Engagement",        desc:"Digital-first patient experience: medication reminders, health monitoring, lifestyle coaching, and remote care management.", color:"#7c3aed", bg:"rgba(124,58,237,.08)" },
  { icon:"🌍", title:"Population Health",         desc:"Proactively manage health across populations with disease trend analysis, risk stratification, and preventive care programs.", color:"#0891b2", bg:"rgba(8,145,178,.08)" },
  { icon:"🔐", title:"Enterprise Security",       desc:"HIPAA-compliant, SOC 2 Type II certified with end-to-end encryption and role-based access control.", color:"#dc2626", bg:"rgba(220,38,38,.07)" },
  { icon:"⚡", title:"AI-First Architecture",     desc:"Built ground-up for healthcare AI — not retrofitted. Every layer is optimized for clinical intelligence and real-time inference.", color:"#d97706", bg:"rgba(217,119,6,.08)" },
];

export default function FeaturesGrid() {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section id="platform" ref={ref} className="py-24 px-[5%]" style={{ background:"var(--bg-surface)" }}>
      <div className="text-center mb-16">
        <div className="slabel reveal justify-center mb-4">Platform Features</div>
        <h2 className="reveal font-extrabold tracking-tight" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontFamily:"var(--font-syne)", color:"var(--tx-head)" }}>
          Everything Your Hospital Needs<br /><em className="not-italic gt-blue">In One Unified Platform</em>
        </h2>
        <p className="reveal text-[1rem] font-light max-w-xl mx-auto mt-4 leading-relaxed" style={{ color:"var(--tx-muted)" }}>
          A modular, enterprise-ready suite of AI-powered healthcare applications built on a single intelligent data platform.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {features.map((f,i) => (
          <div key={f.title} className="reveal card p-7" style={{ transitionDelay:`${i*0.05}s` }}>
            <div className="fibox mb-5" style={{ background:f.bg }}>{f.icon}</div>
            <h3 className="font-bold mb-2.5 text-[.95rem]" style={{ fontFamily:"var(--font-syne)", color:"var(--tx-head)" }}>{f.title}</h3>
            <p className="text-[.82rem] leading-relaxed" style={{ color:"var(--tx-muted)" }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
