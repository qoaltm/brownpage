import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader eyebrow="Tentang" title="Tentang Kopitaim" />

      <section className="py-11 border-b border-garis">
        <div className="max-w-[70ch] space-y-4 text-sm leading-relaxed text-tintasoft">
          <p>
            <span className="text-tinta font-bold">Kopitaim</span> adalah alat bantu gratis untuk
            barista dan penikmat kopi rumahan yang ingin lebih paham cara kerja seduh manual — mulai
            dari kosakata dasar (roda rasa, jenis biji, proses, sangrai, gilingan) sampai kalkulator
            rasio dan jadwal tuang yang bisa langsung dipakai di dapur atau bar kopi.
          </p>
          <p>
            Tujuannya sederhana: jadi referensi cepat yang tidak perlu buka banyak tab atau menghafal
            angka. Semua resep di halaman Teknik diadaptasi dari metode yang sudah dipublikasikan
            secara luas oleh komunitas kopi dunia — dipakai sebagai titik awal yang bisa disesuaikan
            lagi dengan biji, alat, dan selera masing-masing.
          </p>
          <p>
            Kopitaim dibangun dan dirawat secara mandiri, gratis untuk dipakai siapa saja. Kalau ada
            masukan, teknik yang mau ditambahkan, atau bug yang ketemu, jangan ragu untuk kontak lewat
            kanal yang tersedia.
          </p>
        </div>
      </section>

      <section className="py-11 pb-16">
        <div className="font-mono text-xs text-tintasoft space-y-1">
          <div>Kopitaim</div>
          <div>Dibuat untuk dipakai gratis oleh sesama barista.</div>
        </div>
      </section>
    </div>
  );
}
