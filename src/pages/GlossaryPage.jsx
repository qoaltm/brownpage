import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import usePageMeta from "../hooks/usePageMeta";
import { glossaryTerms, glossaryCategories } from "../data/glossary";

export default function GlossaryPage() {
  usePageMeta({
    title: "Kamus Kopi",
    description:
      "Istilah seduh manual, proses pasca panen, tingkat sangrai, ukuran gilingan, dan roda rasa kopi dari A sampai Z.",
    path: "/kamus",
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryTerms.filter((g) => {
      const matchQuery = !q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q);
      const matchCategory = category === "Semua" || g.category === category;
      return matchQuery && matchCategory;
    });
  }, [query, category]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((g) => {
      const letter = g.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(g);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Referensi"
        title="Kamus Kopi"
        lede="Kumpulan istilah seduh manual, proses, sangrai, gilingan, rasa, dan varietas kopi dalam satu halaman, disusun A sampai Z."
      />

      <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari istilah, misalnya 'bloom' atau 'washed'..."
          className="w-full sm:max-w-xs border border-tinta bg-kertas px-3.5 py-2.5 text-sm placeholder:text-tintasoft/60 focus:outline-none focus:bg-kertas2"
        />
        <div className="flex flex-wrap gap-2">
          {["Semua", ...glossaryCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`font-mono text-xs uppercase tracking-wide px-3.5 py-2 border border-tinta cursor-pointer transition-colors ${
                category === c ? "bg-tinta text-kertas" : "bg-kertas text-tinta hover:bg-kertas2"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 && (
        <p className="text-sm text-tintasoft py-10">Tidak ada istilah yang cocok dengan pencarian kamu.</p>
      )}

      <div className="pb-16">
        {grouped.map(([letter, terms]) => (
          <div key={letter} className="mb-8">
            <div className="font-display font-bold text-2xl text-roastamber mb-3 pb-2 border-b border-garis">
              {letter}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {terms.map((g) => (
                <div key={g.term}>
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <span className="font-display font-bold text-sm">{g.term}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wide text-roastamber">
                      {g.category}
                    </span>
                  </div>
                  <p className="text-xs text-tintasoft leading-relaxed">{g.definition}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
