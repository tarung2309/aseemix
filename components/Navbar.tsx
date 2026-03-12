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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[70px] transition-all duration-400 ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl shadow-[0_1px_0_rgba(112,145,230,0.15)]"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
       <Link href="/" className="flex items-center gap-2.5 no-underline">
        <Image src="/logo.png" alt="SmartHospital" width={210} height={48} style={{ mixBlendMode: "multiply" }} />
      </Link>

      {/* Links */}
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

      {/* CTA */}
      <a
        href="#cta"
        onClick={(e) => handleNav(e, "#cta")}
        className="bg-accent text-white px-5 py-2.5 rounded-md text-[0.85rem] font-semibold tracking-wide no-underline transition-all duration-200 hover:-translate-y-0.5"
        style={{ boxShadow: "0 0 20px rgba(255,107,53,0.3)" }}
      >
        Request Demo
      </a>
    </nav>
  );
}
