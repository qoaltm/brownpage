import PageHeader from "../components/PageHeader";
import usePageMeta from "../hooks/usePageMeta";
import RecipeDropdown from "../components/RecipeDropdown";
import Controls from "../components/Controls";
import ScheduleTimer from "../components/ScheduleTimer";
import useBrewCalculator from "../hooks/useBrewCalculator";

function SectionHead({ num, title }) {
  return (
    <div className="flex items-baseline gap-3.5 mb-5">
      <span className="font-mono text-xs text-roastamber">{num}</span>
      <h2 className="font-display font-bold text-xl tracking-tight">{title}</h2>
    </div>
  );
}

export default function TeknikPage() {
  usePageMeta({
    title: "Teknik Seduh Manual",
    description:
      "Pilih teknik seduh manual, atur dosis/rasio/suhu/gilingan sesuai selera, lalu ikuti jadwal tuang dan timer otomatis.",
    path: "/teknik",
  });
  const brew = useBrewCalculator();

  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <PageHeader
        eyebrow="Kalkulator & jadwal tuang"
        title="Teknik seduh manual"
        lede="Pilih teknik, atur parameter sesuai selera dan alat yang kamu punya, lalu ikuti jadwal tuang dan timer di bawah."
      />

      <section className="py-11 border-b border-garis">
        <SectionHead num="01" title="Pilih teknik" />
        <RecipeDropdown activeKey={brew.recipeKey} onSelect={brew.selectRecipe} />
      </section>

      <Controls brew={brew} />

      <ScheduleTimer schedule={brew.schedule} />
    </div>
  );
}
