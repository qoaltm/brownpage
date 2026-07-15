# Kopitaim

Dashboard edukasi & kalkulator seduh manual untuk barista. Dibangun dengan React + Vite + Tailwind CSS v4 + React Router.

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

- **`/` — Dashboard**: pengantar ilmu kopi — roda rasa interaktif, jenis biji (Arabika/Robusta/Liberika/
  Excelsa), proses pasca panen (washed/natural/honey/giling basah/anaerobic), tingkat sangrai, dan
  panduan ukuran gilingan.
- **`/teknik` — Teknik**: kalkulator rasio seduh. Pilih teknik lewat dropdown, atur parameter, jadwal
  tuang & timer otomatis mengikuti teknik yang dipilih.
- **`/tentang` — Tentang Kami**: profil singkat Kopitaim.

## Struktur project

```
src/
  assets/kopitaim-logo.png
  data/
    recipes.js              preset teknik seduh + semua logika kalkulasi (pure functions)
    coffeeKnowledge.js       konten edukasi untuk halaman Dashboard
  hooks/useBrewCalculator.js state kalkulator + nilai turunan (schedule, strength)
  components/
    NavBar.jsx               logo + menu Dashboard/Teknik/Tentang Kami
    PageHeader.jsx           header halaman yang ringkas (bukan hero besar)
    FlavorWheel.jsx          roda rasa SVG interaktif
    RecipeDropdown.jsx       dropdown pilihan teknik seduh
    Slider.jsx / Segmented.jsx  komponen kontrol yang dipakai ulang
    Controls.jsx             semua slider parameter + kontrol khusus Kasuya
    SpecCard.jsx             kartu ringkasan resep (termasuk estimasi kekuatan)
    ScheduleTimer.jsx        jadwal tuang + timer berjalan, ikut teknik aktif
    Footer.jsx
  pages/
    DashboardPage.jsx
    TeknikPage.jsx
    AboutPage.jsx
  App.jsx                    routing + layout global
  index.css                  @theme Tailwind v4 (warna, font) + styling range input
```

## Teknik seduh yang tersedia

Tetsu Kasuya (4:6 Method), James Hoffmann (Ultimate V60), Kalita Wave, Chemex, AeroPress standar,
French Press, Moka Pot, Cold Brew, dan Custom (kontrol manual penuh). Rasio/suhu/waktu masing-masing
diadaptasi dari panduan yang umum dipakai di komunitas kopi — dipakai sebagai titik awal, bukan aturan
mati.

## Menambah teknik baru

1. Tambahkan entry baru di `recipes` object, `src/data/recipes.js`.
2. Kalau butuh jadwal tuang khusus (bukan pola generik 2 tahap), tambahkan cabang baru di
   `buildSchedule()` (lihat contoh `kasuyaSchedule`, `hoffmannSchedule`, `kalitaSchedule`, dst).
3. Muncul otomatis di dropdown Teknik — tidak perlu ubah komponen UI.

## Catatan

- Estimasi "kekuatan" di kartu resep adalah heuristik sederhana untuk intuisi rasa, bukan pengukuran
  TDS/EY yang presisi.
- Konten Dashboard (roda rasa, jenis biji, dll) adalah panduan umum yang dipakai luas di dunia kopi,
  bukan referensi ilmiah presisi laboratorium — cocok untuk pengantar, bukan pengganti sertifikasi
  Q-Grader.
