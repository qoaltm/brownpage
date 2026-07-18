export const GRIND_LABELS = [
  "Sangat halus", "Halus", "Halus", "Halus-sedang", "Sedang",
  "Sedang", "Sedang-kasar", "Sedang-kasar", "Kasar", "Sangat kasar",
];

export const AGITATION_LABELS = { 1: "Rendah", 2: "Sedang", 3: "Tinggi" };

export const recipes = {
  kasuya: {
    key: "kasuya",
    tag: "Pour-over · 2016 World Brewers Cup",
    name: "Tetsu Kasuya — 4:6 Method",
    desc: "5 tuangan, 40% atur rasa, 60% atur kekuatan.",
    dose: 20, ratio: 150, temp: 92, grind: 6, agitation: 1,
    showMini: true,
    popular: true,
  },
  hoffmann: {
    key: "hoffmann",
    tag: "Pour-over · James Hoffmann",
    name: "Ultimate V60",
    desc: "Bloom besar + 2 tuangan utama + swirl.",
    dose: 30, ratio: 167, temp: 95, grind: 5, agitation: 2,
    showMini: false,
    popular: true,
  },
  kalita: {
    key: "kalita",
    tag: "Pour-over · Flat bed",
    name: "Kalita Wave",
    desc: "Dasar rata 3 lubang, pulse-pour, ekstraksi merata.",
    dose: 20, ratio: 160, temp: 93, grind: 6, agitation: 2,
    showMini: false,
  },
  chemex: {
    key: "chemex",
    tag: "Immersion-drip · Umum",
    name: "Chemex",
    desc: "Gilingan kasar, filter tebal, seduh lembut.",
    dose: 30, ratio: 160, temp: 95, grind: 8, agitation: 1,
    showMini: false,
  },
  aeropress: {
    key: "aeropress",
    tag: "Pressure · Umum",
    name: "AeroPress Standar",
    desc: "Rendam singkat, tekan di akhir.",
    dose: 16, ratio: 150, temp: 87, grind: 5, agitation: 2,
    showMini: false,
  },
  frenchpress: {
    key: "frenchpress",
    tag: "Immersion · Umum",
    name: "French Press",
    desc: "Rendam penuh 4 menit, gilingan kasar, dipress di akhir.",
    dose: 30, ratio: 150, temp: 93, grind: 9, agitation: 1,
    showMini: false,
  },
  mokapot: {
    key: "mokapot",
    tag: "Stovetop pressure · Umum",
    name: "Moka Pot",
    desc: "Tekanan uap di atas kompor, hasil pekat ala espresso.",
    dose: 18, ratio: 80, temp: 95, grind: 4, agitation: 1,
    showMini: false,
  },
  coldbrew: {
    key: "coldbrew",
    tag: "Immersion dingin · Umum",
    name: "Cold Brew",
    desc: "Rendam 12–18 jam di suhu dingin/ruang.",
    dose: 25, ratio: 80, temp: 20, grind: 9, agitation: 1,
    showMini: false,
  },
  custom: {
    key: "custom",
    tag: "Manual",
    name: "Custom",
    desc: "Kontrol penuh semua parameter.",
    dose: 20, ratio: 150, temp: 92, grind: 5, agitation: 2,
    showMini: false,
  },
};

export function fmtRatio(r) {
  return "1 : " + (r / 10).toFixed(1).replace(/\.0$/, "");
}

export function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

// NOTE: ratio is stored as the real ratio × 10 (e.g. 150 = 1:15.0), so the
// water multiplier is ratio/10 — not ratio/100. (Fixed a 10x bug here during
// the dashboard rebuild: total water was quietly coming out 10x too low.)
function totalWaterFor(state) {
  return Math.round(state.dose * (state.ratio / 10));
}

function kasuyaSchedule(state, totalWater) {
  const first40 = Math.round(totalWater * 0.4);
  const last60 = totalWater - first40;
  const p1 = Math.round(first40 * (state.sweetAcid / 100));
  const p2 = first40 - p1;
  const n = state.strengthPours;
  const each = Math.round(last60 / n);

  const steps = [];
  let t = 0;
  let cum = 0;

  steps.push({ t, amt: p1, label: "Tuang 1 — bangunkan & bloom", tag: "RASA" });
  cum += p1;
  t += 45;
  steps.push({ t, amt: p2, label: "Tuang 2 — genapkan 40%", tag: "RASA" });
  cum += p2;

  for (let i = 0; i < n; i++) {
    t += 45;
    const amt = i === n - 1 ? totalWater - cum : each;
    cum += amt;
    steps.push({ t, amt, label: `Tuang ${3 + i} — bangun kekuatan`, tag: "KEKUATAN" });
  }

  t += 45;
  steps.push({ t, amt: 0, label: "Angkat dripper, biarkan tetes habis", tag: "SELESAI" });

  return { steps, totalWater, totalTime: t };
}

function hoffmannSchedule(state, totalWater) {
  const bloom = Math.round(state.dose * 2);
  const p60 = Math.round(totalWater * 0.6);

  const steps = [
    { t: 0, amt: bloom, label: "Bloom — tuang & aduk pelan", tag: "BLOOM" },
    { t: 45, amt: p60 - bloom, label: "Tuang utama — spiral hingga 60%", tag: "UTAMA" },
    { t: 75, amt: totalWater - p60, label: "Tuang kedua — hingga 100%", tag: "UTAMA" },
    { t: 105, amt: 0, label: "Aduk searah & berlawanan jarum jam, lalu swirl", tag: "FINISH" },
    { t: 210, amt: 0, label: "Target selesai tetes (3:30–4:00)", tag: "SELESAI" },
  ];

  return { steps, totalWater, totalTime: 225 };
}

function kalitaSchedule(state, totalWater) {
  const bloom = Math.round(state.dose * 2);
  const stage1 = Math.round(totalWater * 0.5);
  const stage2 = Math.round(totalWater * 0.8);

  const steps = [
    { t: 0, amt: bloom, label: "Bloom, ratakan bubuk kopi", tag: "BLOOM" },
    { t: 45, amt: stage1 - bloom, label: "Pulse-pour pertama", tag: "UTAMA" },
    { t: 105, amt: stage2 - stage1, label: "Pulse-pour kedua", tag: "UTAMA" },
    { t: 165, amt: totalWater - stage2, label: "Pulse-pour terakhir", tag: "UTAMA" },
    { t: 210, amt: 0, label: "Biarkan tetes hingga habis", tag: "SELESAI" },
  ];

  return { steps, totalWater, totalTime: 210 };
}

function frenchPressSchedule(state, totalWater) {
  const steps = [
    { t: 0, amt: totalWater, label: "Tuang semua air, aduk perlahan", tag: "RENDAM" },
    { t: 240, amt: 0, label: "Tekan plunger perlahan, lalu sajikan", tag: "TEKAN" },
  ];
  return { steps, totalWater, totalTime: 240 };
}

function mokaPotSchedule(state, totalWater) {
  const steps = [
    { t: 0, amt: totalWater, label: "Isi chamber bawah air panas hingga batas katup", tag: "SIAP" },
    { t: 15, amt: 0, label: "Pasang basket berisi kopi (jangan ditekan), rakit, nyalakan api kecil-sedang", tag: "PANASKAN" },
    { t: 180, amt: 0, label: "Angkat begitu terdengar suara mendesis/gurgling", tag: "SELESAI" },
  ];
  return { steps, totalWater, totalTime: 240 };
}

function genericSchedule(state, totalWater) {
  let steps;
  let totalTime;

  if (state.recipe === "aeropress") {
    steps = [
      { t: 0, amt: totalWater, label: "Tuang semua air, aduk 10 detik", tag: "RENDAM" },
      { t: 60, amt: 0, label: "Pasang plunger, diamkan", tag: "RENDAM" },
      { t: 90, amt: 0, label: "Tekan perlahan 20–30 detik", tag: "TEKAN" },
    ];
    totalTime = 120;
  } else if (state.recipe === "coldbrew") {
    steps = [
      { t: 0, amt: totalWater, label: "Campur kopi & air, aduk rata", tag: "RENDAM" },
      { t: 60, amt: 0, label: "Simpan dingin 12–18 jam", tag: "RENDAM" },
      { t: 120, amt: 0, label: "Saring dengan filter/kain", tag: "SARING" },
    ];
    totalTime = 120;
  } else if (state.recipe === "chemex") {
    steps = [
      { t: 0, amt: Math.round(state.dose * 2), label: "Bloom 30–45 detik", tag: "BLOOM" },
      { t: 45, amt: Math.round(totalWater * 0.5), label: "Tuang bertahap, jaga level air", tag: "UTAMA" },
      { t: 150, amt: totalWater, label: "Genapkan sisa air", tag: "UTAMA" },
      { t: 270, amt: 0, label: "Target selesai tetes ±4:30", tag: "SELESAI" },
    ];
    totalTime = 270;
  } else {
    steps = [
      { t: 0, amt: Math.round(totalWater * 0.3), label: "Bloom", tag: "BLOOM" },
      { t: 45, amt: totalWater, label: "Tuang sisa air bertahap", tag: "UTAMA" },
      { t: 180, amt: 0, label: "Selesai tetes", tag: "SELESAI" },
    ];
    totalTime = 180;
  }

  return { steps, totalWater, totalTime };
}

// state.icedMode (opsional): kalau true, jadwal tuang dihitung dari porsi AIR
// PANAS versi es (bukan gramasi penuh), karena sisa gramasinya berasal dari
// es batu yang sudah ada di gelas, bukan dituang lewat dripper. Tanpa ini,
// orang bakal nuang gramasi penuh + es di atasnya jadi kelebihan air.
export function buildSchedule(state) {
  const fullWater = totalWaterFor(state);
  const useIced = Boolean(state.icedMode) && state.recipe !== "coldbrew";
  const pourWater = useIced ? icedVersion(fullWater).hotWater : fullWater;

  let result;
  if (state.recipe === "kasuya") result = kasuyaSchedule(state, pourWater);
  else if (state.recipe === "hoffmann") result = hoffmannSchedule(state, pourWater);
  else if (state.recipe === "kalita") result = kalitaSchedule(state, pourWater);
  else if (state.recipe === "frenchpress") result = frenchPressSchedule(state, pourWater);
  else if (state.recipe === "mokapot") result = mokaPotSchedule(state, pourWater);
  else result = genericSchedule(state, pourWater);

  if (useIced) {
    const { ice } = icedVersion(fullWater);
    result = {
      ...result,
      steps: [
        ...result.steps,
        {
          t: result.totalTime + 5,
          amt: 0,
          label: `Tuang langsung ke gelas berisi ${ice}g es batu, aduk rata`,
          tag: "ES",
        },
      ],
      totalTime: result.totalTime + 5,
    };
  }

  return { ...result, totalWater: fullWater, pourWater };
}

// Japanese iced coffee (flash chill): brew hot with only part of the total
// water, poured straight onto ice equal to the rest of the water weight.
// The ice melts instantly and locks in aroma. ~60/40 hot-water/ice split is
// a common general starting point, adjust to taste.
export function icedVersion(totalWater) {
  const hotWater = Math.round(totalWater * 0.6);
  const ice = totalWater - hotWater;
  return { hotWater, ice };
}

// Heuristic, visual-only estimate, not a real TDS/EY measurement.
export function strengthEstimate(state, sched) {
  const tempScore = Math.min(1, Math.max(0, (state.temp - 78) / 18));
  const ratioScore = Math.min(1, Math.max(0, (18 - state.ratio / 10) / 10));
  const timeScore = Math.min(1, sched.totalTime / 300);
  const agScore = state.agitation / 3;
  let score = (tempScore * 0.3 + ratioScore * 0.35 + timeScore * 0.2 + agScore * 0.15) * 100;
  if (state.recipe === "coldbrew" || state.recipe === "mokapot") score = Math.min(100, score + 15);
  return Math.round(Math.max(6, Math.min(96, score)));
}
