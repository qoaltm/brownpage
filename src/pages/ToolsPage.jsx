import { useState } from "react";
import { Cog, Droplets, Scale, Filter, Beaker, Package, FlaskConical, GlassWater, Layers, ArrowUpRight, GitCompare, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import usePageMeta from "../hooks/usePageMeta";
import CompareTable from "../components/CompareTable";
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

const MAX_COMPARE = 3;

export default function ToolsPage() {
  usePageMeta({
    title: "Tools untuk Barista",
    description:
      "Etalase alat seduh manual dari grinder sampai server, lengkap dengan fitur bandingkan spesifikasi berdampingan.",
    path: "/tools",
  });
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [compareKeys, setCompareKeys] = useState([]);
  const categories = ["Semua", ...toolCategories];
  const visible = activeCategory === "Semua" ? tools : tools.filter((t) => t.category === activeCategory);
  const compareTools = tools.filter((t) => compareKeys.includes(t.key));

  function toggleCompare(key) {
    setCompareKeys((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, key];
    });
  }

  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Etalase"
        title="Tools untuk barista"
        lede="Alat-alat dasar yang dipakai untuk seduh manual, dari menggiling sampai menuang. Klik salah satu untuk lihat pilihan dan beli, atau centang beberapa buat dibandingkan."
      />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-garis border border-garis">
        {visible.map((t) => {
          const Icon = ICONS[t.icon] ?? Package;
          const isComparing = compareKeys.includes(t.key);
          const compareDisabled = !isComparing && compareKeys.length >= MAX_COMPARE;
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

              <button
                onClick={() => toggleCompare(t.key)}
                disabled={compareDisabled}
                className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-3 py-2 w-fit mb-3 border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  isComparing
                    ? "bg-tinta text-kertas border-tinta"
                    : "bg-transparent text-tintasoft border-garis hover:border-tinta hover:text-tinta"
                }`}
              >
                {isComparing ? <Check size={12} strokeWidth={2} /> : <GitCompare size={12} strokeWidth={2} />}
                {isComparing ? "Dibandingkan" : "Bandingkan"}
              </button>

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

      <div className="pb-16">
        {compareTools.length === 0 ? null : compareTools.length === 1 ? (
          <div className="mt-8 p-5 border border-dashed border-garis text-sm text-tintasoft">
            Pilih minimal 1 tools lagi (maksimal {MAX_COMPARE}) buat mulai membandingkan.
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex items-baseline gap-3.5 mb-5">
              <h2 className="font-display font-bold text-xl tracking-tight">Perbandingan tools</h2>
              <span className="font-mono text-xs text-tintasoft">{compareTools.length}/{MAX_COMPARE}</span>
            </div>
            <CompareTable
              tools={compareTools}
              onRemove={toggleCompare}
              onReset={() => setCompareKeys([])}
            />
          </div>
        )}
      </div>
    </div>
  );
}
