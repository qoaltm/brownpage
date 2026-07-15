import { useState } from "react";
import { Cog, Droplets, Scale, Filter, Beaker, Package, FlaskConical, GlassWater, Layers, ArrowUpRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { tools, toolCategories } from "../data/tools";

const ICONS = {
  cog: Cog,
  droplets: Droplets,
  scale: Scale,
  filter: Filter,
  beaker: Beaker,
  package: Package,
  flaskConical: FlaskConical,
  glassWater: GlassWater,
  layers: Layers,
};

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", ...toolCategories];
  const visible = activeCategory === "Semua" ? tools : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Etalase"
        title="Tools untuk barista"
        lede="Alat-alat dasar yang dipakai untuk seduh manual, dari menggiling sampai menuang. Klik salah satu untuk lihat pilihan dan beli."
      />

      <p className="text-[11px] text-tintasoft/70 leading-relaxed mt-6 max-w-[70ch]">
        Halaman ini berisi tautan afiliasi. Brownpage bisa mendapat komisi kecil dari pembelian lewat
        tautan di sini, tanpa menambah biaya apa pun untuk kamu.
      </p>

      <div className="flex flex-wrap gap-2 mt-6 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`font-mono text-xs uppercase tracking-wide px-3.5 py-2 border border-tinta cursor-pointer transition-colors ${
              activeCategory === c ? "bg-tinta text-kertas" : "bg-kertas text-tinta hover:bg-kertas2"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-garis border border-garis pb-16">
        {visible.map((t) => {
          const Icon = ICONS[t.icon] ?? Package;
          return (
            <div key={t.key} className="bg-kertas p-5 flex flex-col">
              <div className="w-10 h-10 flex items-center justify-center bg-kertas2 mb-4">
                <Icon size={18} strokeWidth={1.75} className="text-roastamber" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-roastamber block mb-1.5">
                {t.category}
              </span>
              <span className="font-display font-bold text-base block mb-2 leading-tight">{t.name}</span>
              <p className="text-xs text-tintasoft leading-relaxed mb-4 flex-1">{t.desc}</p>
              <a
                href={t.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide bg-tinta text-kertas px-3.5 py-2.5 w-fit hover:bg-espresso transition-colors"
              >
                Lihat & beli
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
