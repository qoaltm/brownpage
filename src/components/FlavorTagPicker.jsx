import { flavorWheel } from "../data/coffeeKnowledge";

export default function FlavorTagPicker({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {flavorWheel.map((f) => {
        const isActive = selected.includes(f.key);
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onToggle(f.key)}
            className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 border cursor-pointer transition-colors"
            style={
              isActive
                ? { backgroundColor: f.color, borderColor: f.color, color: "#F2EFE6" }
                : { backgroundColor: "transparent", borderColor: "var(--color-garis)", color: "var(--color-tintasoft)" }
            }
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
