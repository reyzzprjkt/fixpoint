import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import OrderTracking from "./components/OrderTracking";
import ServiceSection from "./components/ServiceSection";
import Membership from "./components/Membership";

const serviceFlow = [
  { title: "Kirim Tiket", description: "Pelanggan mengirim permintaan servis awal." },
  { title: "Proses & Perbarui Status", description: "Admin menugaskan dan teknisi memperbarui progres." },
  { title: "Selesai", description: "Tiket ditutup setelah proses perbaikan dan penutupan." },
];

const contacts = [
  { title: "WhatsApp", description: "Kanal komunikasi utama untuk permintaan awal." },
  { title: "Lokasi", description: "Operasional terpusat pada satu lokasi." },
  { title: "Jam Operasional", description: "Informasi akan ditampilkan setelah konten bisnis disetujui." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <HeroSlider />
        <OrderTracking />
        <ServiceSection />
        <Membership />
        <section id="alur" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Alur Servis</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {serviceFlow.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold text-blue-600">Langkah {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="kontak" className="border-t border-slate-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Kontak</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {contacts.map((contact) => (
                <div key={contact.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold">{contact.title}</h3>
                  <p className="mt-2 text-sm text-muted">{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
          <p className="text-xl font-semibold">FixPoint</p>
          <p className="mt-2 text-sm text-muted">IT Solution &amp; Service Center.</p>
        </div>
      </footer>
    </div>
  );
}
