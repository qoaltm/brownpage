import { useEffect, useRef, useState } from "react";
import { recipes } from "../data/recipes";

function PopularBadge() {
  return (
    <span className="inline-block font-mono text-[9px] uppercase tracking-wide bg-roastamber text-kertas px-2 py-0.5 ml-2 align-middle">
      Paling sering dipilih
    </span>
  );
}

export default function RecipeDropdown({ activeKey, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = recipes[activeKey];

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 border border-tinta bg-kertas hover:bg-kertas2 px-5 py-4 text-left cursor-pointer transition-colors"
      >
        <span>
          <span className="font-mono text-[10px] tracking-wide uppercase text-roastamber block mb-1">
            {active.tag}
          </span>
          <span className="font-display font-bold text-lg leading-tight">
            {active.name}
            {active.popular && <PopularBadge />}
          </span>
        </span>
        <span
          className={`font-mono text-lg shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ⌄
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-1 border border-tinta bg-kertas z-20 shadow-[6px_6px_0_0_rgba(28,23,18,0.15)] max-h-[420px] overflow-y-auto">
          {Object.values(recipes).map((r) => {
            const isActive = r.key === activeKey;
            return (
              <button
                key={r.key}
                onClick={() => {
                  onSelect(r.key);
                  setOpen(false);
                }}
                className={`w-full text-left px-5 py-3.5 border-b border-garis last:border-b-0 cursor-pointer transition-colors ${
                  isActive ? "bg-tinta text-kertas" : "bg-kertas hover:bg-kertas2 text-tinta"
                }`}
              >
                <span
                  className={`font-mono text-[10px] tracking-wide uppercase block mb-1 ${
                    isActive ? "text-karamel" : "text-roastamber"
                  }`}
                >
                  {r.tag}
                </span>
                <span className="font-display font-bold text-base block leading-tight mb-1">
                  {r.name}
                  {r.popular && <PopularBadge />}
                </span>
                <span className={`text-xs leading-snug ${isActive ? "text-[#C9C0AC]" : "text-tintasoft"}`}>
                  {r.desc}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
