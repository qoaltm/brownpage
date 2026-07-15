import { flavorWheel, processingMethods, roastLevels, beanSpecies, grindGuide, varieties } from "./coffeeKnowledge";

// Istilah seduh manual umum yang belum tercakup di data lain (coffeeKnowledge.js).
const generalTerms = [
  { term: "Rasio", definition: "Perbandingan berat kopi terhadap air, misalnya 1:15 berarti 1 gram kopi untuk 15 gram air. Rasio lebih kecil menghasilkan seduhan lebih pekat, rasio lebih besar lebih encer.", category: "Istilah Umum" },
  { term: "Dosis", definition: "Berat kopi bubuk yang dipakai dalam satu seduhan, biasanya ditulis dalam gram.", category: "Istilah Umum" },
  { term: "Ekstraksi", definition: "Proses air melarutkan senyawa rasa dari bubuk kopi. Under-extraction terasa asam dan hijau, over-extraction terasa pahit dan kering.", category: "Istilah Umum" },
  { term: "TDS (Total Dissolved Solids)", definition: "Persentase padatan terlarut dalam secangkir kopi, diukur pakai refraktometer, jadi salah satu indikator kekuatan seduhan secara presisi.", category: "Istilah Umum" },
  { term: "EY (Extraction Yield)", definition: "Persentase massa kopi bubuk yang berhasil terekstrak ke air seduhan, dihitung dari TDS, berat air, dan dosis kopi.", category: "Istilah Umum" },
  { term: "Bloom", definition: "Tahap awal menuang sedikit air panas ke bubuk kopi untuk melepaskan gas CO2, biasanya didiamkan 30-45 detik sebelum tuangan utama.", category: "Istilah Umum" },
  { term: "Agitasi", definition: "Gerakan mengaduk atau mengocok air dan bubuk kopi selama seduh. Makin tinggi agitasi, ekstraksi biasanya makin cepat dan kuat.", category: "Istilah Umum" },
  { term: "Pulse-pour", definition: "Teknik menuang air bertahap dalam beberapa kali tuangan kecil, bukan sekaligus, untuk kontrol ekstraksi yang lebih rata.", category: "Istilah Umum" },
  { term: "Immersion", definition: "Metode seduh dengan merendam bubuk kopi penuh di air selama waktu tertentu sebelum disaring, contohnya French Press.", category: "Istilah Umum" },
  { term: "Pour-over", definition: "Metode seduh dengan menuang air panas secara manual lewat bubuk kopi yang disaring memakai dripper dan filter kertas.", category: "Istilah Umum" },
  { term: "Dripper", definition: "Alat berbentuk corong tempat filter dan bubuk kopi diletakkan untuk metode pour-over, misalnya V60, Kalita Wave, atau Origami.", category: "Istilah Umum" },
  { term: "Cupping", definition: "Metode standar mencicipi kopi untuk menilai kualitas dan karakter rasa, dengan menyeduh beberapa sampel sekaligus tanpa filter kertas.", category: "Istilah Umum" },
];

const processTerms = processingMethods.map((p) => ({
  term: p.name,
  definition: `${p.desc} ${p.flavor}`,
  category: "Metode Proses",
}));

const roastTerms = roastLevels.map((r) => ({
  term: r.name,
  definition: `${r.desc} Contoh: ${r.example}.`,
  category: "Tingkat Sangrai",
}));

const speciesTerms = beanSpecies.map((b) => ({
  term: b.name,
  definition: `${b.profile} ${b.note}`,
  category: "Jenis Biji",
}));

const grindTerms = grindGuide.map((g) => ({
  term: g.label,
  definition: `Ukuran gilingan yang cocok untuk: ${g.use}.`,
  category: "Ukuran Gilingan",
}));

const flavorTerms = flavorWheel.map((f) => ({
  term: f.label,
  definition: f.desc,
  category: "Kategori Rasa",
}));

const varietyTerms = varieties.map((v) => ({
  term: v.name,
  definition: `${v.flavor} ${v.note}`,
  category: "Varietas Kopi",
}));

export const glossaryCategories = [
  "Istilah Umum",
  "Metode Proses",
  "Tingkat Sangrai",
  "Jenis Biji",
  "Ukuran Gilingan",
  "Kategori Rasa",
  "Varietas Kopi",
];

export const glossaryTerms = [
  ...generalTerms,
  ...processTerms,
  ...roastTerms,
  ...speciesTerms,
  ...grindTerms,
  ...flavorTerms,
  ...varietyTerms,
].sort((a, b) => a.term.localeCompare(b.term, "id"));
