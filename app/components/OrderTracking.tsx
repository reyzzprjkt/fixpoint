"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function OrderTracking() {
  const [ticket, setTicket] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ticket.trim()) {
      setError("Masukkan nomor tiket servis.");
      setNotice(null);
      return;
    }
    setError(null);
    setNotice(
      "Pemeriksaan status belum tersedia pada tahap ini. Coba lagi setelah backend tersedia."
    );
    setTicket("");
  }

  return (
    <section id="tiket" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur md:p-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Track Order</h2>
        <p className="mt-3 text-muted">
          Masukkan nomor tiket servis untuk memeriksa status perbaikan.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            value={ticket}
            onChange={(event) => setTicket(event.target.value)}
            placeholder="Contoh: FS-2026-0001"
            aria-label="Nomor tiket servis"
            className="flex-1 rounded-full border border-slate-200 bg-white px-6 py-3.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-6 py-3.5 font-medium text-white hover:bg-blue-700"
          >
            Cek Status
          </button>
        </form>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {notice}
          </p>
        ) : null}
      </div>
    </section>
  );
}
