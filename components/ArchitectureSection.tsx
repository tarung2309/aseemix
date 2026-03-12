"use client";
import { useReveal } from "@/hooks/useReveal";

type Chip = { icon: string; label: string; highlight?: boolean };
type Layer = { num: string; label: string; chips: Chip[]; chipStyle: { bg: string; border: string; highlightBorder: string } };

const layers: Layer[] = [
  {
    num: "6",
    label: "Applications",
    chipStyle: { bg: "rgba(255,107,53,0.06)", border: "rgba(255,107,53,0.15)", highlightBorder: "rgba(255,107,53,0.25)" },
    chips: [
      { icon: "🖥", label: "Command Center", highlight: true },
      { icon: "📊", label: "Analytics Portal" },
      { icon: "📱", label: "Patient App" },
      { icon: "👨‍⚕️", label: "Clinician Portal" },
    ],
  },
  {
    num: "5",
    label: "Smart Solutions",
    chipStyle: { bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.15)", highlightBorder: "rgba(167,139,250,0.25)" },
    chips: [
      { icon: "🧠", label: "CDSS", highlight: true },
      { icon: "🥗", label: "Diet Planning" },
      { icon: "❤️", label: "Patient Engage" },
      { icon: "🌍", label: "Pop. Health" },
    ],
  },
  {
    num: "4",
    label: "AI Engine",
    chipStyle: { bg: "rgba(112,145,230,0.07)", border: "rgba(112,145,230,0.15)", highlightBorder: "rgba(112,145,230,0.3)" },
    chips: [
      { icon: "🤖", label: "ML Models", highlight: true },
      { icon: "🎯", label: "CDS Rules Engine" },
      { icon: "📈", label: "Predictive Analytics" },
      { icon: "📚", label: "Knowledge Base" },
    ],
  },
  {
    num: "3",
    label: "Data Platform",
    chipStyle: { bg: "rgba(34,197,94,0.05)", border: "rgba(34,197,94,0.15)", highlightBorder: "rgba(34,197,94,0.25)" },
    chips: [
      { icon: "🗄", label: "Unified Patient Record", highlight: true },
      { icon: "🔗", label: "FHIR Data Store" },
      { icon: "📅", label: "Longitudinal Records" },
    ],
  },
  {
    num: "2",
    label: "Interoperability",
    chipStyle: { bg: "rgba(234,179,8,0.07)", border: "rgba(234,179,8,0.2)", highlightBorder: "rgba(234,179,8,0.2)" },
    chips: [
      { icon: "🔄", label: "HL7 / FHIR APIs" },
      { icon: "🔐", label: "Security & Auth" },
      { icon: "⚙️", label: "CDS Hooks" },
    ],
  },
  {
    num: "1",
    label: "Integration",
    chipStyle: { bg: "rgba(61,82,160,0.1)", border: "rgba(61,82,160,0.25)", highlightBorder: "rgba(61,82,160,0.4)" },
    chips: [
      { icon: "🏥", label: "HIS / EMR", highlight: true },
      { icon: "🔬", label: "Lab Systems" },
      { icon: "📡", label: "IoT Devices" },
      { icon: "💊", label: "Pharmacy" },
    ],
  },
];

export default function ArchitectureSection() {
  const ref = useReveal();

  return (
    <section
      id="architecture"
      ref={ref}
      className="py-24 px-[5%]"
      style={{ background: "var(--bg-page-deep)" }}
    >
      {/* Title */}
      <div className="text-center mb-16">
        <div className="section-label reveal justify-center">Platform Architecture</div>
        <h2
          className="reveal font-extrabold leading-tight tracking-tight mt-4"
          style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
        >
          The Healthcare{" "}
          <em className="not-italic gradient-text-blue">Intelligence Platform</em>
        </h2>
        <p className="reveal text-mid mt-4 max-w-lg mx-auto font-light leading-relaxed">
          A multi-layer healthcare intelligence architecture designed for the next generation of smart hospitals
        </p>
      </div>

      {/* Diagram */}
      <div className="reveal max-w-4xl mx-auto flex flex-col gap-1.5">
        {layers.map((layer, li) => (
          <div key={layer.num}>
            <div className="grid items-center grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 sm:gap-4">
              {/* Label */}
              <div
                className="text-left sm:text-right text-[0.7rem] font-semibold text-mid sm:pr-4 pb-1 sm:pb-0 leading-tight border-b sm:border-b-0 sm:border-r border-[rgba(112,145,230,0.2)]"
              >
                Layer {layer.num}
                <br />
                <span className="text-[0.65rem]">{layer.label}</span>
              </div>
              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {layer.chips.map((chip) => (
                  <div
                    key={chip.label}
                    className="arch-chip flex-1 rounded-lg p-3 text-center text-[0.72rem]"
                    style={{
                      background: chip.highlight ? layer.chipStyle.bg : layer.chipStyle.bg,
                      border: `1px solid ${chip.highlight ? layer.chipStyle.highlightBorder : layer.chipStyle.border}`,
                      color: chip.highlight ? "var(--tx-head)" : "var(--color-mid)",
                    }}
                  >
                    <span className="block text-base mb-1">{chip.icon}</span>
                    {chip.label}
                  </div>
                ))}
              </div>
            </div>
            {/* Connector */}
            {li < layers.length - 1 && (
              <div className="grid items-center grid-cols-1 sm:grid-cols-[120px_1fr] gap-3 sm:gap-4 py-[3px]">
                <div />
                <div className="flex gap-2 justify-start sm:justify-around px-4">
                  {layer.chips.map((_, i) => (
                    <span key={i} className="text-[rgba(112,145,230,0.3)] text-sm">↕</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
