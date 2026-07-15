import { useEffect, useState } from "react";

const STORAGE_KEY = "brownpage_saved_recipes";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage penuh atau diblokir browser, biarkan saja diam-diam
  }
}

export default function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(savedRecipes);
  }, [savedRecipes]);

  function saveRecipe(name, state) {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || "Resep tanpa nama",
      createdAt: Date.now(),
      recipeKey: state.recipeKey,
      dose: state.dose,
      ratio: state.ratio,
      temp: state.temp,
      grind: state.grind,
      agitation: state.agitation,
      sweetAcid: state.sweetAcid,
      strengthPours: state.strengthPours,
    };
    setSavedRecipes((prev) => [entry, ...prev]);
    return entry;
  }

  function removeRecipe(id) {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  return { savedRecipes, saveRecipe, removeRecipe };
}
