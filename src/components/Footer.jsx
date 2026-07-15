import { useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();
  const isTeknik = pathname === "/teknik";

  if (!isTeknik) {
    return (
      <footer className="py-9 pb-16 border-t border-garis">
        <div className="font-mono text-[11px] text-tintasoft">© All Rights Reserved - Kopitaim 2026</div>
      </footer>
    );
  }

  return (
    <footer className="py-9 pb-16 border-t border-garis">
      <p className="text-xs text-tintasoft leading-relaxed max-w-[70ch]">
        Rasio dan jadwal tuang diadaptasi dari teknik yang telah dipublikasikan secara publik oleh
        masing-masing barista/juara — dipakai di sini sebagai titik awal, bukan aturan mati. Estimasi
        kekuatan pada visualizer bersifat indikatif untuk membantu intuisi rasa, bukan pengukuran TDS/EY
        yang presisi. Sesuaikan selalu dengan biji kopi, alat, dan selera aktual di lapangan.
      </p>
      <div className="font-mono text-[11px] text-tintasoft mt-4">© All Rights Reserved - Kopitaim 2026</div>
    </footer>
  );
}
