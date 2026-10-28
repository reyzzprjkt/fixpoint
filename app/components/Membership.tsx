const tiers = [
  {
    name: "Basic",
    price: "TBD",
    note: "Benefit dan fitur: TBD.",
  },
  {
    name: "Pro",
    price: "TBD",
    note: "Benefit dan fitur: TBD.",
    featured: true,
  },
  {
    name: "Max",
    price: "TBD",
    note: "Benefit dan fitur: TBD.",
  },
];

export default function Membership() {
  return (
    <section className="border-t border-slate-200 bg-slate-50/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Membership</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Tiga paket Basic, Pro, dan Max untuk berlangganan layanan FixPoint. Paket ini disajikan sebagai
          presentasi UI pada tahap ini.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border p-8 shadow-sm ${
                tier.featured
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <h3 className="text-2xl font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm font-medium text-blue-700">Harga: {tier.price}</p>
              <p className="mt-3 text-sm text-muted">{tier.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Harga, benefit, syarat, dan fitur membership yang belum ditentukan ditandai TBD dan belum dipasarkan
          sebagai fakta.
        </p>
      </div>
    </section>
  );
}
