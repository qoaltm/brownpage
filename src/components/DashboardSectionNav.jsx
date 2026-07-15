const sections = [
  { id: "roda-rasa", label: "Roda Rasa" },
  { id: "biji-kopi", label: "Jenis Biji" },
  { id: "proses", label: "Proses" },
  { id: "sangrai", label: "Sangrai" },
  { id: "gilingan", label: "Gilingan" },
  { id: "origin", label: "Origin" },
  { id: "varietas", label: "Varietas" },
];

export default function DashboardSectionNav() {
  return (
    <nav className="flex flex-wrap gap-2 py-5 border-b border-garis sticky top-[57px] bg-kertas/95 backdrop-blur z-[5]">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 border border-garis text-tintasoft hover:border-tinta hover:text-tinta transition-colors"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
