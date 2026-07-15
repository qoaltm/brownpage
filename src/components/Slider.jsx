export default function Slider({ label, displayValue, rawValue, min, max, step = 1, onChange, scaleLeft, scaleRight }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="text-[13px] font-bold uppercase tracking-wide">{label}</span>
        <span className="font-mono text-sm text-roastamber font-medium">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={rawValue}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between font-mono text-[10px] text-tintasoft mt-1.5">
        <span>{scaleLeft}</span>
        <span>{scaleRight}</span>
      </div>
    </div>
  );
}
