import { useState } from "react";
import useSavedRecipes from "../hooks/useSavedRecipes";
import { recipes, fmtRatio } from "../data/recipes";

export default function SavedRecipesPanel({ brew }) {
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();
  const [name, setName] = useState("");

  function handleSave() {
    if (!name.trim()) return;
    saveRecipe(name, brew);
    setName("");
  }

  return (
    <div className="mt-4 border border-garis">
      <div className="flex flex-col sm:flex-row gap-2 p-4 border-b border-garis bg-kertas2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="Nama resep, misal Pagi Manis"
          className="flex-1 bg-kertas border border-tinta px-3.5 py-2.5 text-sm placeholder:text-tintasoft/70 focus:outline-none focus:border-roastamber"
        />
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 border border-tinta bg-tinta text-kertas hover:bg-espresso transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Simpan resep saat ini
        </button>
      </div>

      {savedRecipes.length === 0 ? (
        <p className="text-xs text-tintasoft leading-relaxed p-4">
          Belum ada resep tersimpan. Atur parameter di bawah, lalu simpan supaya bisa dipakai lagi nanti.
        </p>
      ) : (
        <div className="divide-y divide-garis max-h-[320px] overflow-y-auto">
          {savedRecipes.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <span className="font-display font-bold text-sm block truncate">{r.name}</span>
                <span className="font-mono text-[10px] text-tintasoft uppercase tracking-wide">
                  {recipes[r.recipeKey]?.name ?? r.recipeKey} · {r.dose}g · {fmtRatio(r.ratio)} · {r.temp}°C
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => brew.loadRecipe(r)}
                  className="font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 border border-tinta hover:bg-tinta hover:text-kertas transition-colors cursor-pointer"
                >
                  Muat
                </button>
                <button
                  onClick={() => removeRecipe(r.id)}
                  className="font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 border border-garis text-tintasoft hover:border-tinta hover:text-tinta transition-colors cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
