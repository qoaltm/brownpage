import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFoundPage() {
  usePageMeta({
    title: "Halaman Tidak Ditemukan",
    description: "Halaman yang kamu cari tidak ditemukan di Brownpage.",
    path: "/404",
  });
  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <div className="py-24 md:py-32 text-center max-w-[50ch] mx-auto">
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-roastamber mb-4">404</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4">
          Halaman ini belum diseduh.
        </h1>
        <p className="text-sm text-tintasoft leading-relaxed mb-8">
          Kemungkinan alamatnya salah ketik atau halamannya sudah dipindah. Coba balik ke Dashboard
          atau langsung ke halaman Teknik.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-wide bg-tinta text-kertas px-4 py-2.5 hover:bg-espresso transition-colors"
          >
            Ke Dashboard
          </Link>
          <Link
            to="/teknik"
            className="font-mono text-xs uppercase tracking-wide border border-tinta text-tinta px-4 py-2.5 hover:bg-kertas2 transition-colors"
          >
            Ke Teknik
          </Link>
        </div>
      </div>
    </div>
  );
}
