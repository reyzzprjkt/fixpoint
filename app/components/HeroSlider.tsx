"use client";

import { useState } from "react";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    id: "hero-primary",
    eyebrow: "IT Solution & Service Center",
    title: "Reparasi dan solusi IT untuk bisnis.",
    description:
      "FixPoint menyediakan layanan servis perangkat, konsultasi, dan instalasi IT untuk pelanggan hingga perusahaan, dari satu lokasi.",
    primaryCta: { label: "Ajukan Tiket Servis", href: "#tiket" },
    secondaryCta: { label: "Hubungi via WhatsApp", href: "#kontak" },
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <section
      aria-label="Beranda"
      className="mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:pb-24 md:pt-40"
    >
      <div className="relative h-[70vh] min-h-[520px] overflow-hidden rounded-3xl shadow-xl">
        <img
          src="/images/hero/woman-repairing-laptop.jpg"
          alt="Teknisi wanita memperbaiki laptop di meja kerja dengan peralatan servis"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`hero-slide absolute inset-0 flex items-center px-6 py-16 md:px-16 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/35 to-slate-900/55"
            />
            <div className="relative z-10 max-w-2xl">
              <p className="text-sm font-semibold text-blue-100">{s.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
                {s.title}
              </h1>
              <p className="mt-5 text-lg text-white/85">{s.description}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={s.primaryCta.href}
                  className="rounded-full bg-white px-6 py-3.5 text-center font-medium text-blue-700 hover:bg-blue-50"
                >
                  {s.primaryCta.label}
                </a>
                <a
                  href={s.secondaryCta.href}
                  className="rounded-full border border-white/60 bg-white/10 px-6 py-3.5 text-center font-medium text-white backdrop-blur hover:bg-white/20"
                >
                  {s.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-white" : "w-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
