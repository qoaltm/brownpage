import DashboardHero from "../components/DashboardHero";
import FlavorWheel from "../components/FlavorWheel";
import { beanSpecies, processingMethods, roastLevels, grindGuide, originProfiles, flavorWheel } from "../data/coffeeKnowledge";

const flavorColor = Object.fromEntries(flavorWheel.map((c) => [c.key, c.color]));

function SectionHead({ num, title }) {
  return (
    <div className="flex items-baseline gap-3.5 mb-5">
      <span className="font-mono text-xs text-roastamber">{num}</span>
      <h2 className="font-display font-bold text-xl tracking-tight">{title}</h2>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <DashboardHero />

      <section className="py-11 border-b border-garis">
        <SectionHead num="01" title="Roda rasa kopi" />
        <FlavorWheel />
      </section>

      <section className="py-11 border-b border-garis">
        <SectionHead num="02" title="Jenis biji kopi" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-garis border border-garis">
          {beanSpecies.map((b) => (
            <div key={b.key} className="bg-kertas p-5">
              <span className="font-display font-bold text-lg block mb-3">{b.name}</span>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-tintasoft shrink-0">Porsi produksi</dt>
                  <dd className="font-mono text-right">{b.portion}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-tintasoft shrink-0">Ketinggian</dt>
                  <dd className="font-mono text-right">{b.altitude}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-tintasoft shrink-0">Kafein</dt>
                  <dd className="font-mono text-right">{b.caffeine}</dd>
                </div>
              </dl>
              <p className="text-xs text-tintasoft leading-relaxed mt-3">{b.profile}</p>
              <p className="text-xs text-tintasoft leading-relaxed mt-2">
                <span className="font-bold text-tinta">Bentuk: </span>
                {b.shape}
              </p>
              <p className="text-xs text-tintasoft/80 leading-relaxed mt-2 italic">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-11 border-b border-garis">
        <SectionHead num="03" title="Proses pasca panen (wash)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-garis border border-garis">
          {processingMethods.map((p) => (
            <div key={p.key} className="bg-kertas p-5">
              <span className="font-display font-bold text-base block mb-2">{p.name}</span>
              <p className="text-xs text-tintasoft leading-relaxed mb-2">{p.desc}</p>
              <p className="text-xs text-roastamber leading-relaxed">{p.flavor}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-11 border-b border-garis">
        <SectionHead num="04" title="Tingkat sangrai (roast level)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roastLevels.map((r) => (
            <div key={r.key} className="border border-garis">
              <div className="h-16" style={{ backgroundColor: r.color }} />
              <div className="p-4">
                <span className="font-display font-bold text-sm block mb-1">{r.name}</span>
                <span className="font-mono text-[10px] text-tintasoft block mb-2">{r.example}</span>
                <p className="text-xs text-tintasoft leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-11 border-b border-garis">
        <SectionHead num="05" title="Ukuran gilingan" />
        <div className="border border-garis">
          {grindGuide.map((g, i) => (
            <div
              key={g.key}
              className={`flex items-center gap-4 px-5 py-4 ${i !== grindGuide.length - 1 ? "border-b border-garis" : ""}`}
            >
              <div className="flex gap-1 shrink-0 w-24">
                {Array.from({ length: 10 }).map((_, dot) => (
                  <span
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full ${dot < g.grain ? "bg-tinta" : "bg-garis"}`}
                  />
                ))}
              </div>
              <span className="font-display font-bold text-sm w-32 shrink-0">{g.label}</span>
              <span className="text-xs text-tintasoft">{g.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-11 pb-16">
        <SectionHead num="06" title="Asal kopi (origin)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-garis border border-garis">
          {originProfiles.map((o) => (
            <div key={o.key} className="bg-kertas p-5 flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-wide text-roastamber block mb-1.5">
                {o.country}
              </span>
              <span className="font-display font-bold text-base block mb-3 leading-tight">{o.region}</span>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-tintasoft shrink-0">Ketinggian</dt>
                  <dd className="font-mono text-right">{o.altitude}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-tintasoft shrink-0">Proses</dt>
                  <dd className="font-mono text-right">{o.process}</dd>
                </div>
              </dl>
              <p className="text-xs text-tintasoft leading-relaxed mt-3 flex-1">{o.flavor}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {o.flavorTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-wide px-2 py-1 text-kertas"
                    style={{ backgroundColor: flavorColor[tag] }}
                  >
                    {flavorWheel.find((c) => c.key === tag)?.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
