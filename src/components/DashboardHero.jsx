export default function DashboardHero() {
  return (
    <section className="pt-16 pb-10 md:pt-24 md:pb-14">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-10 bg-roastamber" />
        <span className="font-mono text-xs tracking-[0.12em] uppercase text-roastamber">Brownpage</span>
      </div>
      <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.05] max-w-[20ch]">
        Panduan seduh manual, dari dasar sampai racikan siap pakai.
      </h1>
      <p className="font-display italic text-lg md:text-xl text-tintasoft mt-4 max-w-[45ch]">
        Di balik setiap takaran, ada tangan yang terus belajar meracik rasa.
      </p>
      <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-tintasoft">
        Alat bantu gratis untuk barista dan penikmat kopi rumahan yang ingin lebih paham cara kerja
        seduh manual, dari kosakata dasar sampai kalkulator rasio dan jadwal tuang.
      </p>

      <div className="mt-10 h-px w-full bg-garis" />

      <p className="mt-6 max-w-[65ch] text-sm leading-relaxed text-tintasoft">
        Sebelum masuk ke rasio dan jadwal tuang di halaman Teknik, ini dasar-dasar yang wajib
        dikuasai duluan, dimulai dari yang paling sepele: roda rasa, jenis biji, proses pasca
        panen, tingkat sangrai, sampai ukuran gilingan.
      </p>
    </section>
  );
}
