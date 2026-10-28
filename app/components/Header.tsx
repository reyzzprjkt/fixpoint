"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Layanan", href: "#layanan" },
  { label: "Alur Servis", href: "#alur" },
  { label: "Kontak", href: "#kontak" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4">
      <div
        className={`glass-pill relative mx-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-3 transition-shadow duration-300 sm:px-6 ${
          scrolled ? "shadow-xl" : ""
        }`}
      >
        <a href="/" className="text-lg font-semibold tracking-tight text-ink">
          FixPoint
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#tiket"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Track Order
        </a>
      </div>
    </header>
  );
}
