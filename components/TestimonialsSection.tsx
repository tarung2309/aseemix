"use client";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  { quote:"SmartHospital's CDSS has fundamentally changed how our clinical team makes decisions. We're catching sepsis cases 6 hours earlier than before, and drug interaction alerts have reduced adverse events by 34%.", name:"Dr. Priya Ramanujan", role:"Chief Medical Officer, Apollo Hospitals", initials:"PR", color:"#3D52A0" },
  { quote:"The operational intelligence dashboard gave us visibility we never had before. Bed occupancy improved by 22% in the first quarter, and discharge times dropped from 4.2 hours to 2.1 hours.", name:"Rahul Mehta", role:"COO, Fortis Healthcare", initials:"RM", color:"#7091E6" },
  { quote:"What impressed us most was how quickly it integrated with our existing HIS. Within 3 weeks we had live AI insights running — no disruption to clinical staff, no rip-and-replace.", name:"Dr. Anika Singh", role:"CIO, Max Healthcare", initials:"AS", color:"#FF6B35" },
];

export default function TestimonialsSection() {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="py-24 px-[5%]" style={{ background:"var(--bg-subtle)" }}>
      <div className="text-center mb-16">
        <div className="slabel reveal justify-center mb-4">Customer Stories</div>
        <h2 className="reveal font-extrabold tracking-tight" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontFamily:"var(--font-syne)", color:"var(--tx-head)" }}>
          Trusted by Healthcare Leaders<br /><em className="not-italic gt-blue">Across the Region</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t,i) => (
          <div key={t.name} className="reveal tcard flex flex-col" style={{ transitionDelay:`${i*0.1}s` }}>
            <div className="flex gap-1 mb-5">
              {Array(5).fill(0).map((_,i)=>(
                <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FF6B35"><path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9l-3.5 2.5 1.5-4L1.5 5H6z"/></svg>
              ))}
            </div>
            <p className="text-[.88rem] leading-relaxed flex-1 mb-6 italic" style={{ color:"var(--tx-body)" }}>"{t.quote}"</p>
            <div className="flex items-center gap-3 pt-5" style={{ borderTop:"1px solid var(--bd-soft)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[.8rem] font-bold flex-shrink-0"
                style={{ background:`linear-gradient(135deg,${t.color},${t.color}99)` }}>
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-[.85rem]" style={{ color:"var(--tx-head)" }}>{t.name}</p>
                <p className="text-[.75rem]" style={{ color:"var(--tx-faint)" }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
