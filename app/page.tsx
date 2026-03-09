"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const ecgSegment = (x: number, baseline: number, scale: number): number => {
      const mod = ((x % 220) + 220) % 220;
      if (mod < 60) return baseline + Math.sin(mod * 0.05) * 4 * scale;
      if (mod < 80) return baseline - (mod - 60) * 1.2 * scale;
      if (mod < 90) return baseline + (mod - 80) * 6 * scale;
      if (mod < 100) return baseline - (mod - 90) * 5.5 * scale;
      if (mod < 115) return baseline + (mod - 100) * 1.4 * scale;
      if (mod < 130) return baseline + Math.sin((mod - 115) * 0.21) * 8 * scale;
      return baseline + Math.sin(mod * 0.04) * 3 * scale;
    };

    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 3 + 1.5,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      t += 1;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      nodes.forEach((n) => {
        n.x = (n.x + n.vx + 1) % 1;
        n.y = (n.y + n.vy + 1) % 1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * W;
          const dy = (nodes[i].y - nodes[j].y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < W * 0.22) {
            const alpha = (1 - dist / (W * 0.22)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
            ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
            ctx.strokeStyle = `rgba(61, 82, 160, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.04 + n.phase);
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 145, 230, 0.45)`;
        ctx.fill();
      });

      const baseline = H * 0.78;
      const scale = H * 0.022;
      const speed = t * 1.5;

      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = ecgSegment(x - speed, baseline, scale);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(31, 166, 160, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = ecgSegment(x - speed * 0.6 + 110, baseline + H * 0.05, scale * 0.55);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(61, 82, 160, 0.09)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("AseemiX — Early Interest");
    const body = encodeURIComponent(
      `Hello AseemiX Team,\n\nI would like to be notified when you launch.\n\nEmail: ${email}\n`
    );
    window.location.href = `mailto:contact@aseemix.ai?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&family=IBM+Plex+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #EDE8F5;
          --ink: #333333;
          --blue-deep: #3D52A0;
          --blue-mid: #7091E6;
          --blue-soft: #8697C4;
          --blue-pale: #ADBBDA;
          --orange: #FF6B35;
          --teal: #1FA6A0;
        }

        html, body { height: 100%; background: var(--bg); font-family: 'Outfit', sans-serif; color: var(--ink); }

        .page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 { width: 620px; height: 620px; background: radial-gradient(circle, rgba(112,145,230,0.3) 0%, transparent 70%); top: -200px; right: -120px; }
        .blob-2 { width: 420px; height: 420px; background: radial-gradient(circle, rgba(31,166,160,0.2) 0%, transparent 70%); bottom: -60px; left: -100px; }
        .blob-3 { width: 280px; height: 280px; background: radial-gradient(circle, rgba(255,107,53,0.14) 0%, transparent 70%); top: 40%; right: 5%; }

        .canvas-wrap { position: absolute; inset: 0; z-index: 1; }
        .canvas-wrap canvas { width: 100%; height: 100%; display: block; }

        header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px clamp(24px, 6vw, 80px);
        }

        .logo-img { height: 46px; width: auto; }

        .header-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(61, 82, 160, 0.1);
          border: 1px solid rgba(61, 82, 160, 0.2);
          border-radius: 100px;
          padding: 7px 18px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--blue-deep);
          text-transform: uppercase;
        }
          

        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          animation: blink 2.2s ease-in-out infinite;
        }

        main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 20px clamp(24px, 6vw, 80px) 48px;
          gap: 48px;
        }

        .left {
          display: flex;
          flex-direction: column;
          max-width: 560px;
        }

        .eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 20px;
          opacity: 0;
          animation: slideUp 0.7s 0.1s forwards;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::before { content: ''; width: 28px; height: 1.5px; background: var(--teal); display: inline-block; }

        .headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 70px);
          line-height: 1.06;
          font-weight: 700;
          color: var(--blue-deep);
          margin-bottom: 4px;
          opacity: 0;
          animation: slideUp 0.8s 0.2s forwards;
        }

        .headline em { font-style: italic; color: var(--orange); }

        .headline-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 50px);
          font-weight: 600;
          font-style: italic;
          color: var(--blue-soft);
          margin-bottom: 28px;
          opacity: 0;
          animation: slideUp 0.8s 0.3s forwards;
        }

        .divider-line {
          width: 60px; height: 3px;
          background: linear-gradient(90deg, var(--orange), var(--teal));
          border-radius: 2px;
          margin-bottom: 22px;
          opacity: 0;
          animation: slideUp 0.7s 0.4s forwards;
        }

        .description {
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.8;
          color: #5a5a72;
          margin-bottom: 36px;
          max-width: 420px;
          opacity: 0;
          animation: slideUp 0.8s 0.5s forwards;
        }

        .form-section {
          opacity: 0;
          animation: slideUp 0.8s 0.65s forwards;
        }

        .form-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--blue-soft);
          margin-bottom: 10px;
          display: block;
        }

        .form-row {
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          border: 1.5px solid rgba(61, 82, 160, 0.22);
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          transition: border-color 0.25s, box-shadow 0.25s;
          max-width: 440px;
        }

        .form-row:focus-within {
          border-color: var(--blue-mid);
          box-shadow: 0 0 0 4px rgba(112,145,230,0.18);
        }

        .form-row input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 14px 18px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--ink);
          min-width: 0;
        }

        .form-row input::placeholder { color: var(--blue-pale); }

        .form-row button {
          background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-mid) 100%);
          border: none;
          padding: 14px 22px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #fff;
          cursor: pointer;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .form-row button:hover { opacity: 0.85; }

        .contact-line {
          margin-top: 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #999;
          letter-spacing: 0.04em;
        }

        .contact-line a {
          color: var(--blue-deep);
          text-decoration: none;
          border-bottom: 1px solid rgba(61,82,160,0.3);
          transition: color 0.2s;
        }
        .contact-line a:hover { color: var(--teal); border-color: var(--teal); }

        .stats-row {
          display: flex;
          gap: 28px;
          margin-top: 36px;
          opacity: 0;
          animation: slideUp 0.8s 0.85s forwards;
          align-items: center;
        }

        .stat { display: flex; flex-direction: column; gap: 2px; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--blue-deep); line-height: 1; }
        .stat-label { font-size: 11px; color: var(--blue-soft); letter-spacing: 0.04em; }
        .stat-sep { width: 1px; height: 36px; background: rgba(61,82,160,0.15); }

        .success-msg {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: rgba(31,166,160,0.1);
          border: 1px solid rgba(31,166,160,0.3);
          border-radius: 10px;
          font-size: 14px;
          color: var(--teal);
          font-weight: 500;
          max-width: 440px;
        }

        /* Right visual */
        .right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 420px;
          opacity: 0;
          animation: fadeScale 1s 0.5s forwards;
        }

        .visual-card {
          position: relative;
          width: clamp(300px, 38vw, 510px);
          aspect-ratio: 16/11;
          border-radius: 24px;
          overflow: hidden;
          
          box-shadow:
            0 48px 96px rgba(61,82,160,0.2),
            0 12px 32px rgba(61,82,160,0.14),
            inset 0 1px 0 rgba(255,255,255,0.5);
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            105deg,
            rgba(237, 232, 245, 0.92) 0%,
            rgba(237, 232, 245, 0.82) 40%,
            rgba(61, 82, 160, 0.55) 70%,
            rgba(31, 166, 160, 0.45) 100%
          );
        }

        .float-badge {
          position: absolute;
          background: rgba(255,255,255,0.93);
          backdrop-filter: blur(18px);
          border-radius: 100px;
          padding: 9px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 28px rgba(61,82,160,0.16);
          font-size: 12px;
          font-weight: 600;
          color: var(--blue-deep);
          white-space: nowrap;
          z-index: 4;
          border: 1px solid rgba(255,255,255,0.6);
        }

        .badge-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }

        .badge-top { top: -20px; right: 12%; animation: floatY 4s ease-in-out infinite; }
        .badge-bl  { bottom: -20px; left: 8%; animation: floatY 4.6s 0.9s ease-in-out infinite; }
        .badge-rt  { right: -26px; top: 36%; animation: floatX 5s 0.4s ease-in-out infinite; }

        footer {
          position: relative;
          z-index: 10;
          padding: 18px clamp(24px, 6vw, 80px);
          border-top: 1px solid rgba(61,82,160,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: var(--blue-pale);
          letter-spacing: 0.04em;
        }

        .footer-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: var(--blue-soft);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--blue-deep); }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes floatX {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(8px); }
        }

        @media (max-width: 880px) {
          main { grid-template-columns: 1fr; }
          .right { display: none; }
          .left { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .stats-row { flex-wrap: wrap; gap: 16px; }
          .stat-sep { display: none; }
          .header-badge { display: none; }
        }
      `}</style>

      <div className="page">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

       {/*  <div className="canvas-wrap">
          <canvas ref={canvasRef} />
        </div> */}

        <header>
          <Image src="/logo.png" alt="AseemiX" width={320} height={90} priority className="logo-img" />
          <div className="header-badge">
            <span className="badge-dot" />
            Launching Soon
          </div>
        </header>

        <main>
          <div className="left">
            <div className="eyebrow">Healthcare Intelligence Platform</div>

            <h1 className="headline">
              Where Research<br />Meets <em>Impact.</em>
            </h1>
            <p className="headline-sub">Launching Soon</p>

            <div className="divider-line" />

            <p className="description">
              AseemiX builds next-generation intelligent systems at the
              intersection of medical research, engineering, and real-world
              clinical outcomes. Smarter healthcare starts here.
            </p>

            <div className="form-section">
              {submitted ? (
                <div className="success-msg">
                  <span>✓</span>
                  <span>You're on the list! We'll reach out at launch.</span>
                </div>
              ) : (
                <>
                  <span className="form-label">Get early access — be first to know</span>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit">Notify Me →</button>
                    </div>
                  </form>
                  <p className="contact-line">
                    Or write to us at{" "}
                    <a href="mailto:contact@aseemix.ai">contact@aseemix.ai</a>
                  </p>
                </>
              )}
            </div>

            <div className="stats-row">
              <div className="stat">
                <span className="stat-num">AI</span>
                <span className="stat-label">Powered Systems</span>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <span className="stat-num">R&D</span>
                <span className="stat-label">Research-Backed</span>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Real-World Impact</span>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="visual-card">
              <Image
                src="/comingSoon.png"
                alt="AseemiX Healthcare Intelligence"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              {/* Overlay to make content readable */}
              <div className="bg-overlay" />
            </div>
             
            

            <div className="float-badge badge-top">
              <div className="badge-icon" style={{ background: "rgba(31,166,160,0.12)" }}>🧬</div>
              AI Diagnostics
            </div>

            <div className="float-badge badge-bl">
              <div className="badge-icon" style={{ background: "rgba(255,107,53,0.12)" }}>❤️</div>
              Cardio Intelligence
            </div>

            <div className="float-badge badge-rt">
              <div className="badge-icon" style={{ background: "rgba(61,82,160,0.1)" }}>🔬</div>
              Research-Grade
            </div>
          </div>
        </main>

        <footer>
          <span className="footer-copy" suppressHydrationWarning>
            © {new Date().getFullYear()} Aseemix Dlab Technologies Private (OPC) Limited
          </span>
          <a href="mailto:contact@aseemix.ai" className="footer-link">Contact</a>
        </footer>
      </div>
    </>
  );
}