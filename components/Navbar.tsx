"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Platform", href: "#platform-intro" },
  { label: "Solutions", href: "#solutions" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Resources", href: "#why-us" },
  { label: "About", href: "#vision" },
  { label: "Contact", href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl shadow-[0_1px_0_rgba(112,145,230,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-[5%] h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/logo.png" alt="SmartHospital" width={180} height={41} style={{ mixBlendMode: "multiply" }} />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-[0.88rem] font-medium text-light hover:text-[var(--tx-head)] transition-colors duration-200 no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#cta"
          onClick={(e) => handleNav(e, "#cta")}
          className="hidden md:inline-block bg-accent text-white px-5 py-2.5 rounded-md text-[0.85rem] font-semibold tracking-wide no-underline transition-all duration-200 hover:-translate-y-0.5"
          style={{ boxShadow: "0 0 20px rgba(255,107,53,0.3)" }}
        >
          Request Demo
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-[var(--tx-head)] transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
          />
          <span
            className="block w-5 h-0.5 bg-[var(--tx-head)] transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-[var(--tx-head)] transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          borderBottom: menuOpen ? "1px solid rgba(112,145,230,0.15)" : "none",
        }}
      >
        <div className="px-[5%] pb-6 pt-2">
          <ul className="list-none flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="block py-3 text-[0.9rem] font-medium text-light hover:text-[var(--tx-head)] transition-colors duration-200 no-underline border-b border-[rgba(112,145,230,0.1)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#cta"
            onClick={(e) => handleNav(e, "#cta")}
            className="block mt-4 bg-accent text-white px-5 py-3 rounded-md text-[0.85rem] font-semibold tracking-wide no-underline text-center"
            style={{ boxShadow: "0 0 20px rgba(255,107,53,0.3)" }}
          >
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
