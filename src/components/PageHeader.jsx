export default function PageHeader({ eyebrow, title, lede }) {
  return (
    <div className="pt-10 pb-8 border-b border-garis">
      {eyebrow && (
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-roastamber mb-2.5">{eyebrow}</p>
      )}
      <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-2.5">{title}</h1>
      {lede && <p className="max-w-[65ch] text-sm leading-relaxed text-tintasoft">{lede}</p>}
    </div>
  );
}
