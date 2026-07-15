import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Palette } from "lucide-react";
import { GRIND_LABELS, AGITATION_LABELS, fmtRatio, fmtTime } from "../data/recipes";

const CARD_COLORS = [
  { name: "Espresso", value: "#1C1712" },
  { name: "Kayu manis", value: "#3B2412" },
  { name: "Zaitun tua", value: "#1F2A1B" },
  { name: "Anggur", value: "#3A1620" },
  { name: "Malam biru", value: "#14202B" },
];

export default function SpecCard({ brew, schedule }) {
  const { dose, ratio, temp, grind, agitation, strength, iced, recipeKey } = brew;
  const [label, setLabel] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);
  const inputRef = useRef(null);

  const cardColor = CARD_COLORS[colorIndex].value;

  // Sinkron attribute value manual, supaya isi input ikut ke-render saat di-capture jadi gambar
  useEffect(() => {
    if (inputRef.current) inputRef.current.setAttribute("value", label);
  }, [label]);

  function cycleColor() {
    setColorIndex((prev) => (prev + 1) % CARD_COLORS.length);
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: cardColor,
        filter: (node) => node.getAttribute?.("data-capture-ignore") !== "true",
      });
      const safeName = label
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const link = document.createElement("a");
      link.download = `brownpage-${safeName || "resep"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal membuat kartu resep:", err);
    } finally {
      setIsExporting(false);
    }
  }

  const Row = ({ k, v }) => (
    <div className="flex justify-between items-baseline py-2.5 border-b border-white/10 text-[13px] last:border-b-0">
      <span className="text-[#C9C0AC]">{k}</span>
      <span className="font-mono font-medium">{v}</span>
    </div>
  );

  return (
    <div
      ref={cardRef}
      style={{ backgroundColor: cardColor }}
      className="text-kertas p-6 h-fit md:sticky md:top-5 transition-colors"
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <h3 className="font-display text-[15px] uppercase tracking-wide text-karamel">Kartu resep</h3>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={cycleColor}
            aria-label="Ganti warna kartu"
            title={`Warna kartu: ${CARD_COLORS[colorIndex].name}`}
            data-capture-ignore="true"
            className="w-7 h-7 rounded-full flex items-center justify-center bg-kertas2 text-tinta cursor-pointer hover:brightness-95 transition"
          >
            <Palette size={14} strokeWidth={2} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            aria-label="Download kartu resep"
            title="Download kartu resep (PNG)"
            data-capture-ignore="true"
            className="w-7 h-7 rounded-full flex items-center justify-center bg-karamel text-tinta cursor-pointer hover:brightness-95 transition disabled:opacity-40"
          >
            <Download size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Nama resep (opsional)"
        className="w-full bg-kertas2 text-tinta border border-tinta/15 rounded-sm px-2.5 py-1.5 text-[12px] placeholder:text-tintasoft/70 outline-none focus:border-karamel mb-4"
      />
      <span className="text-[11px] text-[#C9C0AC] uppercase tracking-wide">Total air diperlukan</span>
      <div className="font-mono text-[34px] font-medium mt-1.5 mb-0.5">{schedule.totalWater} g</div>
      <div className="h-px bg-white/10 my-4.5" />
      <Row k="Dosis kopi" v={`${dose} g`} />
      <Row k="Rasio" v={fmtRatio(ratio)} />
      <Row k="Suhu air" v={`${temp}°C`} />
      <Row k="Gilingan" v={GRIND_LABELS[grind - 1]} />
      <Row k="Agitasi" v={AGITATION_LABELS[agitation]} />
      <Row k="Estimasi total waktu" v={fmtTime(schedule.totalTime)} />
      <Row k="Estimasi kekuatan" v={`${strength}%`} />
      <p className="text-[10px] text-[#8A8070] leading-relaxed mt-3">
        Estimasi kekuatan bersifat indikatif untuk intuisi rasa, bukan pengukuran TDS/EY presisi.
      </p>

      <div className="h-px bg-white/10 my-4.5" />
      <h3 className="font-display text-[13px] mb-3 uppercase tracking-wide text-karamel">Versi es (Japanese iced)</h3>
      {recipeKey === "coldbrew" ? (
        <p className="text-xs text-[#C9C0AC] leading-relaxed">
          Cold brew sudah dingin secara alami lewat rendam lama, tidak perlu versi flash-chill ini.
        </p>
      ) : (
        <>
          <Row k="Air panas untuk seduh" v={`${iced.hotWater} g`} />
          <Row k="Es batu di gelas saji" v={`${iced.ice} g`} />
          <p className="text-[10px] text-[#8A8070] leading-relaxed mt-3">
            Seduh langsung di atas es sejumlah itu supaya cepat dingin dan aromanya lebih terkunci.
            Split 60:40 ini titik awal, boleh disesuaikan ke selera.
          </p>
        </>
      )}
    </div>
  );
}
