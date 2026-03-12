"use client";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { val:"50+",  label:"Hospital Partners" },
  { val:"2M+",  label:"Patients on Platform" },
  { val:"94%",  label:"AI Clinical Accuracy" },
  { val:"40%",  label:"LOS Reduction" },
  { val:"<2s",  label:"Real-time AI Response" },
  { val:"99.9%",label:"Platform Uptime SLA" },
];

export default function StatsBar() {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section id="stats" ref={ref} className="py-20 px-[5%] stat-bar">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-center text-[.76rem] font-semibold uppercase tracking-widest mb-12 text-white/60">
          Trusted by leading healthcare organisations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((s,i) => (
            <div key={s.label} className="reveal text-center" style={{ transitionDelay:`${i*0.07}s` }}>
              <p className="font-extrabold text-white mb-1" style={{ fontFamily:"var(--font-syne)", fontSize:"clamp(2rem,3.5vw,2.8rem)" }}>{s.val}</p>
              <p className="text-[.78rem] font-medium text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
