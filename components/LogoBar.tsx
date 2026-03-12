const logos = ["Epic Systems","Cerner (Oracle)","Meditech","Allscripts","eClinicalWorks","athenahealth","NextGen","Greenway Health","DrChrono","PointClickCare"];

export default function LogoBar() {
  return (
    <div className="py-10 overflow-hidden"
      style={{ background:"var(--bg-panel)", borderTop:"1px solid var(--bd-soft)", borderBottom:"1px solid var(--bd-soft)" }}>
      <p className="text-center text-[.72rem] font-semibold uppercase tracking-widest mb-6" style={{ color:"var(--tx-faint)" }}>
        Integrates seamlessly with leading hospital systems
      </p>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {[...logos,...logos].map((name,i) => (
            <div key={i} className="mx-8 flex items-center gap-2 flex-shrink-0 whitespace-nowrap" style={{ color:"var(--tx-faint)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[.6rem] font-bold flex-shrink-0"
                style={{ background:"linear-gradient(135deg,#ADBBDA,#8697C4)" }}>
                {name.charAt(0)}
              </div>
              <span className="text-[.85rem] font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
