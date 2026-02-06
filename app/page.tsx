"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("ASEEMIX — Early Interest");
    const body = encodeURIComponent(
      `Hello ASEEMIX Team,\n\nI would like to be notified when you launch.\n\nEmail: ${email}\n`,
    );

    window.location.href = `mailto:contact@aseemix.ai?subject=${subject}&body=${body}`;
  };

  return (
    <main className="container">
      <section className="card">
        <div className="logo">
          <Image
            src="/logo.png"
            alt="ASEEMIX Logo"
            width={407}
            height={64}
            priority
          />
        </div>
        <p className="tagline font-stretch-50%">From Research to Real-World Intelligence.</p>

        <p className="description">
          We are building intelligent systems at the intersection of research,
          engineering, and real-world impact.
        </p>

        <div className="divider" />

        <p className="subtitle">Website launching soon.</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Notify Me</button>
        </form>

        <p className="contact">
          Or reach us at{" "}
          <a href="mailto:contact@aseemix.ai">contact@aseemix.ai</a>
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Aseemix Dlab Technologies Private (OPC)
        Limited
      </footer>
    </main>
  );
}
