import { useMemo, useState } from "react";
import { Cog, Droplets, Scale, Filter, Beaker, Package, FlaskConical, GlassWater, Layers, ArrowUpRight, GitCompare, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import usePageMeta from "../hooks/usePageMeta";
import CompareTable from "../components/CompareTable";
import useProducts from "../hooks/useProducts";
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

// Contoh tampilan dipakai kalau Firebase belum disetel (lihat .env.example)
// atau koleksi "products" masih kosong, supaya halaman tidak polos blank
// saat masih tahap setup.
const DEMO_ITEMS = tools.map((t) => ({ ...t, id: t.key }));

export default function ToolsPage() {
  usePageMeta({
    title: "Tools untuk Barista",
    description:
      "Etalase alat seduh manual dari grinder sampai server, lengkap dengan fitur bandingkan spesifikasi berdampingan.",
    path: "/tools",
  });
  const { products, status } = useProducts();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [compareKeys, setCompareKeys] = useState([]);
  const categories = ["Semua", ...toolCategories];

  const items = useMemo(() => {
    if (status === "not-configured") return DEMO_ITEMS;
    if (status === "ready" && products.length === 0) return DEMO_ITEMS;
    return products;
  }, [status, products]);
  const usingDemoData = items === DEMO_ITEMS;

  const visible = activeCategory === "Semua" ? items : items.filter((t) => t.category === activeCategory);
  const compareItems = items.filter((t) => compareKeys.includes(t.id));

  function toggleCompare(id) {
    setCompareKeys((prev) => {
      if (prev.includes(id)) return prev.filter((k) => k !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Etalase"
        title="Tools untuk barista"
        lede="Alat-alat dasar yang dipakai untuk seduh manual, dari menggiling sampai menuang. Klik salah satu untuk lihat pilihan dan beli, atau centang beberapa buat dibandingkan."
      />

      {status === "not-configured" && (
        <p className="mt-6 p-4 text-xs leading-relaxed text-tintasoft border border-dashed border-garis">
          Firebase belum disetel (isi <code className="font-mono">.env</code> berdasarkan{" "}
          <code className="font-mono">.env.example</code>), jadi ini masih data contoh. Produk asli yang
          kamu input lewat backoffice akan muncul di sini otomatis begitu sudah tersambung.
        </p>
      )}
      {status === "error" && (
        <p className="mt-6 p-4 text-xs leading-relaxed text-tintasoft border border-dashed border-garis">
          Gagal memuat produk dari server. Coba muat ulang halaman ini.
        </p>
      )}
      {status === "ready" && usingDemoData && (
        <p className="mt-6 p-4 text-xs leading-relaxed text-tintasoft border border-dashed border-garis">
          Belum ada produk yang diinput. Ini data contoh sementara, tambahkan produk asli lewat backoffice.
        </p>
      )}

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

      {status === "loading" ? (
        <p className="text-sm text-tintasoft py-10">Memuat produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-garis border border-garis">
          {visible.map((t) => {
            const Icon = ICONS[t.icon] ?? Package;
            const isComparing = compareKeys.includes(t.id);
            const compareDisabled = !isComparing && compareKeys.length >= MAX_COMPARE;
            return (
              <div key={t.id} className="bg-kertas p-5 flex flex-col">
                {t.imageUrl ? (
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-full aspect-square object-cover bg-kertas2 mb-4"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-kertas2 mb-4">
                    <Icon size={18} strokeWidth={1.75} className="text-roastamber" />
                  </div>
                )}

                <span className="font-mono text-[10px] uppercase tracking-wide text-roastamber block mb-1.5">
                  {t.category}
                </span>
                <span className="font-display font-bold text-base block mb-1.5 leading-tight">{t.name}</span>
                {t.price && <span className="font-mono text-sm text-tinta block mb-2">{t.price}</span>}
                {t.desc && <p className="text-xs text-tintasoft leading-relaxed mb-4 flex-1">{t.desc}</p>}

                <button
                  onClick={() => toggleCompare(t.id)}
                  disabled={compareDisabled}
                  className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide px-3 py-2 w-fit mb-3 mt-auto border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
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
      )}

      <div className="pb-16">
        {compareItems.length === 0 ? null : compareItems.length === 1 ? (
          <div className="mt-8 p-5 border border-dashed border-garis text-sm text-tintasoft">
            Pilih minimal 1 tools lagi (maksimal {MAX_COMPARE}) buat mulai membandingkan.
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex items-baseline gap-3.5 mb-5">
              <h2 className="font-display font-bold text-xl tracking-tight">Perbandingan tools</h2>
              <span className="font-mono text-xs text-tintasoft">{compareItems.length}/{MAX_COMPARE}</span>
            </div>
            <CompareTable
              tools={compareItems}
              onRemove={toggleCompare}
              onReset={() => setCompareKeys([])}
            />
          </div>
        )}
      </div>
    </div>
  );
}
