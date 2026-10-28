const services = [
  {
    name: "Reparasi Perangkat",
    description: "Diagnosa dan perbaikan perangkat teknologi.",
    icon: (
      <path d="M14.7 6.3a4 4 0 0 0 0 5.7l2.6 2.6a4 4 0 0 0 5.7 0 4 4 0 0 0 0-5.7l-2.6-2.6zM9 6.3a4 4 0 0 1 0 5.7l-2.6 2.6a4 4 0 0 1-5.7 0 4 4 0 0 1 0-5.7l2.6-2.6z" />
    ),
  },
  {
    name: "Konsultasi IT",
    description: "Rekomendasi arsitektur, keamanan, dan solusi teknis.",
    icon: (
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0 6 6c0 2.5-.9 4.9-2.4 6.4-.4.5-.6 1.1-.6 1.7v.5h6v-.5c0-.6-.2-1.2-.6-1.7C18.9 13.9 20 11.5 20 9a6 6 0 0 0-6-6z" />
    ),
  },
  {
    name: "Instalasi & Penerapan",
    description: "Instalasi perangkat dan penerapan solusi perusahaan.",
    icon: (
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82z" />
    ),
  },
];

export default function ServiceSection() {
  return (
    <section id="layanan" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Layanan Kami</h2>
      <ul className="mt-10 divide-y divide-slate-200">
        {services.map((service) => (
          <li key={service.name} className="flex items-start gap-4 py-6 first:pt-0">
            <svg
              className="mt-1 h-6 w-6 shrink-0 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {service.icon}
            </svg>
            <div>
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="mt-1 text-muted">{service.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
