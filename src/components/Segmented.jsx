export default function Segmented({ options, value, onChange }) {
  return (
    <div className="flex border border-tinta">
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2.5 px-2 font-mono text-xs tracking-wide cursor-pointer ${
              i < options.length - 1 ? "border-r border-tinta" : ""
            } ${active ? "bg-tinta text-kertas" : "bg-kertas text-tinta"}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
