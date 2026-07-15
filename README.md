# Brownpage

Dashboard edukasi & kalkulator seduh manual untuk barista. Dibangun dengan React + Vite + Tailwind CSS v4 + React Router + Framer Motion.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build untuk production

```bash
npm run build
```

Hasilnya ada di folder `dist/`. Karena pakai React Router (client-side routing), kalau di-hosting di
static host (Netlify/Vercel/dll), pastikan semua route di-redirect ke `index.html` (di Vercel/Netlify
biasanya otomatis terdeteksi untuk SPA; kalau tidak, tambahkan rewrite rule `/* -> /index.html`).

## Halaman

- **`/` — Dashboard**: pengantar ilmu kopi, roda rasa interaktif 3 tingkat, jenis biji (Arabika/
  Robusta/Liberika/Excelsa), proses pasca panen, tingkat sangrai, panduan ukuran gilingan, origin
  (asal kopi dunia dan Indonesia), dan varietas/kultivar kopi. Ada jump-link nav supaya gampang
  lompat antar section.
- **`/teknik` — Teknik**: kalkulator rasio seduh. Pilih teknik lewat dropdown, atur parameter, jadwal
  tuang & timer otomatis mengikuti teknik yang dipilih, termasuk versi Japanese iced.
- **`/tools` — Tools**: etalase alat seduh dengan tautan afiliasi, bisa difilter per kategori alat.
- **`/tentang` — Tentang Kami**: profil singkat Brownpage.
- **`/syarat-dan-ketentuan`**, **`/kebijakan-privasi`**: halaman legal, ditautkan dari footer.
- **`*` (404)**: halaman not-found untuk URL yang salah/tidak ada.

## Struktur project

```
src/
  assets/brownpage-logo.png
  data/
    recipes.js                 preset teknik seduh + semua logika kalkulasi (pure functions)
    coffeeKnowledge.js          konten edukasi Dashboard (flavor wheel, biji, proses, sangrai,
                                 gilingan, origin, varietas)
    tools.js                    data etalase alat seduh + kategori
  hooks/useBrewCalculator.js    state kalkulator + nilai turunan (schedule, strength, iced)
  components/
    NavBar.jsx                 logo + menu utama
    Footer.jsx                 footer 4 kolom (fitur, info, sosial, kontak) + link legal
    DashboardHero.jsx          hero besar khusus halaman Dashboard
    DashboardSectionNav.jsx    jump-link nav antar section Dashboard
    PageHeader.jsx             header ringkas untuk halaman selain Dashboard
    FlavorWheel.jsx            roda rasa SVG interaktif (sunburst 3 ring + hover highlight)
    RecipeDropdown.jsx         dropdown pilihan teknik seduh
    Slider.jsx / Segmented.jsx komponen kontrol yang dipakai ulang
    Controls.jsx                semua slider parameter + kontrol khusus Kasuya
    SpecCard.jsx                kartu ringkasan resep (termasuk versi iced)
    ScheduleTimer.jsx           jadwal tuang + timer berjalan, ikut teknik aktif
  pages/
    DashboardPage.jsx, TeknikPage.jsx, ToolsPage.jsx, AboutPage.jsx,
    SyaratKetentuanPage.jsx, KebijakanPrivasiPage.jsx, NotFoundPage.jsx
  App.jsx                       routing, transisi antar halaman, layout global
  index.css                     @theme Tailwind v4 (warna, font) + styling range input
```

## Menambah resep baru

Tambahkan entry baru di `recipes` object, `src/data/recipes.js`. Kalau butuh jadwal tuang khusus,
tambahkan cabang baru di `buildSchedule()`. Muncul otomatis di dropdown Teknik.

## Menambah tool/produk afiliasi baru

Tambahkan entry baru di `tools` array, `src/data/tools.js`, isi `affiliateUrl` dengan link asli.

## Catatan

- Estimasi "kekuatan" di kartu resep adalah heuristik sederhana untuk intuisi rasa, bukan pengukuran
  TDS/EY yang presisi.
- `public/og-image.png` masih placeholder sederhana (logo di atas background polos), ganti dengan
  desain yang lebih matang kalau sempat.
