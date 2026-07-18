import Slider from "./Slider";
import Segmented from "./Segmented";
import SpecCard from "./SpecCard";
import { GRIND_LABELS } from "../data/recipes";

export default function Controls({ brew }) {
  const {
    dose, ratio, temp, grind, agitation, sweetAcid, strengthPours, showMini, icedMode, icedDisabled,
    setDose, setRatio, setTemp, setGrind, setAgitation, setSweetAcid, setStrengthPours, setIcedMode,
    schedule,
  } = brew;

  const fmtRatio = (r) => "1 : " + (r / 10).toFixed(1).replace(/\.0$/, "");

  return (
    <section className="py-11 border-t border-garis">
      <div className="flex items-baseline gap-3.5 mb-5">
        <span className="font-mono text-xs text-roastamber">02</span>
        <h2 className="font-display font-bold text-xl tracking-tight">Atur parameter</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_.85fr] gap-12">
        <div>
          <Slider
            label="Dosis kopi"
            displayValue={`${dose} g`}
            rawValue={dose}
            min={10}
            max={45}
            onChange={setDose}
            scaleLeft="10g"
            scaleRight="45g"
          />
          <Slider
            label="Rasio kopi : air"
            displayValue={fmtRatio(ratio)}
            rawValue={ratio}
            min={80}
            max={180}
            onChange={setRatio}
            scaleLeft="1:8 (pekat)"
            scaleRight="1:18 (encer)"
          />
          <Slider
            label="Suhu air"
            displayValue={`${temp}°C`}
            rawValue={temp}
            min={75}
            max={97}
            onChange={setTemp}
            scaleLeft="75°C"
            scaleRight="97°C"
          />
          <Slider
            label="Ukuran gilingan"
            displayValue={GRIND_LABELS[grind - 1]}
            rawValue={grind}
            min={1}
            max={10}
            onChange={setGrind}
            scaleLeft="Halus (espresso)"
            scaleRight="Kasar (french press)"
          />

          <div className="mb-7">
            <div className="flex justify-between items-baseline mb-2.5">
              <span className="text-[13px] font-bold uppercase tracking-wide">Agitasi</span>
            </div>
            <Segmented
              options={[
                { value: 1, label: "Rendah" },
                { value: 2, label: "Sedang" },
                { value: 3, label: "Tinggi" },
              ]}
              value={agitation}
              onChange={setAgitation}
            />
          </div>

          <div className="mb-7">
            <div className="flex justify-between items-baseline mb-2.5">
              <span className="text-[13px] font-bold uppercase tracking-wide">Jadwal tuang</span>
            </div>
            <Segmented
              options={[
                { value: false, label: "Panas" },
                { value: true, label: "Es (Japanese iced)" },
              ]}
              value={icedDisabled ? false : icedMode}
              onChange={setIcedMode}
            />
            {icedDisabled ? (
              <p className="text-[11px] text-tintasoft leading-relaxed mt-2">
                Cold Brew sudah dingin secara alami, toggle ini tidak berlaku untuk teknik ini.
              </p>
            ) : icedMode ? (
              <p className="text-[11px] text-tintasoft leading-relaxed mt-2">
                Jadwal di bawah otomatis dihitung ulang: cuma sejumlah air panas yang dituang lewat
                dripper, sisanya sudah berupa es batu di gelas saji.
              </p>
            ) : null}
          </div>

          {showMini && (
            <div className="flex flex-wrap gap-6 my-5 p-4.5 border border-dashed border-garis">
              <div className="flex-1 min-w-[200px]">
                <span className="text-[11px] uppercase tracking-wide text-tintasoft mb-2 block">
                  Manis ⟷ Asam (tuangan 1&amp;2)
                </span>
                <input
                  type="range"
                  min={30}
                  max={70}
                  step={5}
                  value={sweetAcid}
                  onChange={(e) => setSweetAcid(Number(e.target.value))}
                />
                <div className="flex justify-between font-mono text-[10px] text-tintasoft mt-1.5">
                  <span>Manis</span>
                  <span>Asam</span>
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <span className="text-[11px] uppercase tracking-wide text-tintasoft mb-2 block">
                  Kekuatan (jumlah tuangan akhir)
                </span>
                <Segmented
                  options={[
                    { value: 2, label: "2× tuang" },
                    { value: 3, label: "3× tuang" },
                    { value: 4, label: "4× tuang" },
                  ]}
                  value={strengthPours}
                  onChange={setStrengthPours}
                />
              </div>
            </div>
          )}
        </div>

        <SpecCard brew={brew} schedule={schedule} />
      </div>
    </section>
  );
}
