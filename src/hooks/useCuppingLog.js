import { useEffect, useState } from "react";

const STORAGE_KEY = "brownpage_cupping_log";

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

export default function useCuppingLog() {
  const [entries, setEntries] = useState(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(entries);
  }, [entries]);

  function addEntry(data) {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      originName: data.originName.trim() || "Tanpa nama",
      recipeKey: data.recipeKey,
      dose: data.dose === "" ? null : Number(data.dose),
      ratio: data.ratio === "" ? null : Number(data.ratio),
      temp: data.temp === "" ? null : Number(data.temp),
      rating: data.rating,
      flavorKeys: data.flavorKeys,
      notes: data.notes.trim(),
    };
    setEntries((prev) => [entry, ...prev]);
    return entry;
  }

  function removeEntry(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return { entries, addEntry, removeEntry };
}
