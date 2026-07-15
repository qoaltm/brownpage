import { Star } from "lucide-react";

export default function StarRating({ value, onChange, readOnly = false, size = 20 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => {
        const filled = s <= value;
        if (readOnly) {
          return (
            <Star
              key={s}
              size={size}
              strokeWidth={1.75}
              className={filled ? "text-roastamber" : "text-garis"}
              fill={filled ? "currentColor" : "none"}
            />
          );
        }
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-label={`Rating ${s} dari 5`}
            className="cursor-pointer p-0.5"
          >
            <Star
              size={size}
              strokeWidth={1.75}
              className={filled ? "text-roastamber" : "text-garis hover:text-tintasoft"}
              fill={filled ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
}
