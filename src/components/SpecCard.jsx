import { GRIND_LABELS, AGITATION_LABELS, fmtRatio, fmtTime } from "../data/recipes";

export default function SpecCard({ brew, schedule }) {
  const { dose, ratio, temp, grind, agitation, strength, iced, recipeKey } = brew;

  const Row = ({ k, v }) => (
    <div className="flex justify-between items-baseline py-2.5 border-b border-white/10 text-[13px] last:border-b-0">
      <span className="text-[#C9C0AC]">{k}</span>
      <span className="font-mono font-medium">{v}</span>
    </div>
  );

  return (
    <div className="bg-tinta text-kertas p-6 h-fit md:sticky md:top-5">
      <h3 className="font-display text-[15px] mb-4.5 uppercase tracking-wide text-karamel">Kartu resep</h3>
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
