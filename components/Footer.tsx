const footerLinks = {
  Platform: ["Platform Overview", "Architecture", "AI Engine", "Data Platform", "Security"],
  Solutions: ["Clinical CDSS", "Diet Planning", "Patient Engagement", "Population Health"],
  Company: ["About", "Resources", "Blog", "Case Studies", "Contact"],
};

export default function Footer() {
  return (
    <footer 
    className="bg-[var(--bg-page)] pt-16 pb-8 px-[5%]" 
    
    style={{ borderTop: "1px solid var(--bd-soft)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 max-w-7xl mx-auto">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="font-extrabold text-xl text-[var(--tx-head)]" style={{ fontFamily: "var(--font-syne)" }}>
              Aseemix Dlab
            </span>
          </div>
          <p className="text-[0.85rem] text-mid leading-relaxed max-w-[260px]">
            The intelligence platform powering the future of smart hospitals — integrating data, AI, and clinical knowledge.
          </p>
          <div className="flex gap-4 mt-5">
            {["LinkedIn", "Twitter", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-[0.8rem] text-mid hover:text-[var(--tx-head)] transition-colors no-underline">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4
              className="text-[0.82rem] font-bold uppercase tracking-widest text-light mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {heading}
            </h4>
            <ul className="space-y-2.5 list-none">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[0.84rem] text-mid hover:text-[var(--tx-head)] transition-colors no-underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 max-w-7xl mx-auto"
        style={{ borderTop: "1px solid var(--bd-soft)" }}
      >
        <p className="text-[0.78rem] text-mid">
          © 2026 Aseemix Dlab Technologies Pvt. Ltd.
        </p>
        <p className="text-[0.78rem] text-mid">
          Privacy Policy · Terms of Service · Security
        </p>
      </div>
    </footer>
  );
}
