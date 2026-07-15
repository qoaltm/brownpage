import { Fragment } from "react";
import { X } from "lucide-react";

const ATTRS = [
  { key: "category", label: "Kategori" },
  { key: "price", label: "Harga" },
  { key: "difficulty", label: "Tingkat kesulitan" },
  { key: "portability", label: "Portabilitas" },
  { key: "brewTime", label: "Waktu seduh" },
  { key: "bestFor", label: "Cocok untuk" },
  { key: "desc", label: "Deskripsi" },
];

export default function CompareTable({ tools, onRemove, onReset }) {
  return (
    <div className="border border-garis">
      <div
        className="grid"
        style={{ gridTemplateColumns: `160px repeat(${tools.length}, 1fr)` }}
      >
        <div className="bg-kertas2 p-4 border-b border-r border-garis" />
        {tools.map((t) => (
          <div
            key={t.key}
            className="bg-kertas2 p-4 border-b border-garis flex items-start justify-between gap-2"
          >
            <span className="font-display font-bold text-sm leading-tight">{t.name}</span>
            <button
              onClick={() => onRemove(t.key)}
              aria-label={`Hapus ${t.name} dari perbandingan`}
              className="shrink-0 text-tintasoft hover:text-tinta transition-colors cursor-pointer"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}

        {ATTRS.map((attr) => (
          <Fragment key={attr.key}>
            <div className="p-4 border-b border-r border-garis font-mono text-[11px] uppercase tracking-wide text-tintasoft">
              {attr.label}
            </div>
            {tools.map((t) => (
              <div key={t.key + attr.key} className="p-4 border-b border-garis text-[13px] leading-relaxed">
                {t[attr.key]}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="p-3 bg-kertas flex justify-end">
        <button
          onClick={onReset}
          className="font-mono text-xs uppercase tracking-wide px-3.5 py-2 border border-tinta hover:bg-tinta hover:text-kertas transition-colors cursor-pointer"
        >
          Reset perbandingan
        </button>
      </div>
    </div>
  );
}
