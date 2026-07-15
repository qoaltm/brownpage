import { useState } from "react";
import { Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StarRating from "../components/StarRating";
import FlavorTagPicker from "../components/FlavorTagPicker";
import useCuppingLog from "../hooks/useCuppingLog";
import { recipes, fmtRatio } from "../data/recipes";
import { flavorWheel } from "../data/coffeeKnowledge";

const EMPTY_FORM = {
  originName: "",
  recipeKey: Object.keys(recipes)[0],
  dose: "",
  ratio: "",
  temp: "",
  rating: 0,
  flavorKeys: [],
  notes: "",
};

function fmtDate(ts) {
  return new Date(ts).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function JurnalPage() {
  const { entries, addEntry, removeEntry } = useCuppingLog();
  const [form, setForm] = useState(EMPTY_FORM);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleFlavor(key) {
    setForm((prev) => ({
      ...prev,
      flavorKeys: prev.flavorKeys.includes(key)
        ? prev.flavorKeys.filter((k) => k !== key)
        : [...prev.flavorKeys, key],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.originName.trim() || form.rating === 0) return;
    addEntry(form);
    setForm(EMPTY_FORM);
  }

  const canSubmit = form.originName.trim().length > 0 && form.rating > 0;

  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Catatan seduh"
        title="Jurnal seduh"
        lede="Simpan catatan dari setiap seduhan: kopi apa yang dipakai, teknik dan parameternya, rasa yang muncul, dan seberapa puas kamu dengan hasilnya. Tersimpan di browser kamu sendiri, bukan di server Brownpage."
      />

      <section className="py-11 border-b border-garis">
        <div className="flex items-baseline gap-3.5 mb-6">
          <span className="font-mono text-xs text-roastamber">01</span>
          <h2 className="font-display font-bold text-xl tracking-tight">Catat seduhan baru</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <div className="md:col-span-2">
            <label className="text-[13px] font-bold uppercase tracking-wide block mb-2">
              Nama kopi / origin
            </label>
            <input
              type="text"
              value={form.originName}
              onChange={(e) => update("originName", e.target.value)}
              placeholder="Misal: Toraja Sapan Honey"
              className="w-full bg-kertas border border-tinta px-3.5 py-2.5 text-sm placeholder:text-tintasoft/70 focus:outline-none focus:border-roastamber"
            />
          </div>

          <div>
            <label className="text-[13px] font-bold uppercase tracking-wide block mb-2">Teknik seduh</label>
            <select
              value={form.recipeKey}
              onChange={(e) => update("recipeKey", e.target.value)}
              className="w-full bg-kertas border border-tinta px-3.5 py-2.5 text-sm focus:outline-none focus:border-roastamber"
            >
              {Object.values(recipes).map((r) => (
                <option key={r.key} value={r.key}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[13px] font-bold uppercase tracking-wide block mb-2">Rating</label>
            <div className="h-[42px] flex items-center">
              <StarRating value={form.rating} onChange={(v) => update("rating", v)} size={24} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:col-span-2">
            <div>
              <label className="text-[11px] uppercase tracking-wide text-tintasoft block mb-2">Dosis (g)</label>
              <input
                type="number"
                min="0"
                value={form.dose}
                onChange={(e) => update("dose", e.target.value)}
                placeholder="20"
                className="w-full bg-kertas border border-tinta px-3 py-2 text-sm placeholder:text-tintasoft/70 focus:outline-none focus:border-roastamber"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide text-tintasoft block mb-2">Rasio (1 : x)</label>
              <input
                type="number"
                min="0"
                value={form.ratio}
                onChange={(e) => update("ratio", e.target.value)}
                placeholder="15"
                className="w-full bg-kertas border border-tinta px-3 py-2 text-sm placeholder:text-tintasoft/70 focus:outline-none focus:border-roastamber"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide text-tintasoft block mb-2">Suhu (°C)</label>
              <input
                type="number"
                min="0"
                value={form.temp}
                onChange={(e) => update("temp", e.target.value)}
                placeholder="92"
                className="w-full bg-kertas border border-tinta px-3 py-2 text-sm placeholder:text-tintasoft/70 focus:outline-none focus:border-roastamber"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-[13px] font-bold uppercase tracking-wide block mb-2.5">Catatan rasa</label>
            <FlavorTagPicker selected={form.flavorKeys} onToggle={toggleFlavor} />
          </div>

          <div className="md:col-span-2">
            <label className="text-[13px] font-bold uppercase tracking-wide block mb-2">Catatan pribadi</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              placeholder="Misal: bloom kurang lama, next time coba 40 detik..."
              className="w-full bg-kertas border border-tinta px-3.5 py-2.5 text-sm placeholder:text-tintasoft/70 focus:outline-none focus:border-roastamber resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className="font-mono text-xs uppercase tracking-wide px-5 py-3 border border-tinta bg-tinta text-kertas hover:bg-espresso transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Simpan ke jurnal
            </button>
            {!canSubmit && (
              <span className="ml-3 text-xs text-tintasoft">
                Isi nama kopi dan kasih rating dulu ya.
              </span>
            )}
          </div>
        </form>
      </section>

      <section className="py-11">
        <div className="flex items-baseline gap-3.5 mb-6">
          <span className="font-mono text-xs text-roastamber">02</span>
          <h2 className="font-display font-bold text-xl tracking-tight">Riwayat seduhan</h2>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-tintasoft leading-relaxed">
            Belum ada catatan. Isi form di atas setelah selesai menyeduh, biar rekam jejak rasanya kekumpul.
          </p>
        ) : (
          <div className="flex flex-col gap-px bg-garis border border-garis">
            {entries.map((entry) => {
              const recipe = recipes[entry.recipeKey];
              return (
                <div key={entry.id} className="bg-kertas p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-tintasoft block mb-1">
                        {fmtDate(entry.createdAt)}
                      </span>
                      <h3 className="font-display font-bold text-lg leading-tight">{entry.originName}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating value={entry.rating} readOnly size={16} />
                      <button
                        onClick={() => removeEntry(entry.id)}
                        aria-label="Hapus catatan"
                        title="Hapus catatan"
                        className="w-8 h-8 flex items-center justify-center border border-garis text-tintasoft hover:border-tinta hover:text-tinta transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-tintasoft uppercase tracking-wide mb-3">
                    <span>{recipe?.name ?? entry.recipeKey}</span>
                    {entry.dose && <span>{entry.dose} g</span>}
                    {entry.ratio && <span>{fmtRatio(entry.ratio * 10)}</span>}
                    {entry.temp && <span>{entry.temp}°C</span>}
                  </div>

                  {entry.flavorKeys.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {entry.flavorKeys.map((key) => {
                        const flavor = flavorWheel.find((f) => f.key === key);
                        if (!flavor) return null;
                        return (
                          <span
                            key={key}
                            className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1"
                            style={{ backgroundColor: flavor.color, color: "#F2EFE6" }}
                          >
                            {flavor.label}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="text-[13px] text-tintasoft leading-relaxed">{entry.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
