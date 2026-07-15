import { useEffect, useRef, useState } from "react";
import { fmtTime } from "../data/recipes";

export default function ScheduleTimer({ schedule }) {
  const [phase, setPhase] = useState("idle"); // idle | running | paused | done
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  // Reset whenever the recipe/parameters (and therefore the schedule) change
  useEffect(() => {
    clearInterval(intervalRef.current);
    setPhase("idle");
    setElapsed(0);
  }, [schedule]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  function start() {
    setPhase("running");
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= schedule.totalTime + 3) {
          clearInterval(intervalRef.current);
          setPhase("done");
        }
        return next;
      });
    }, 1000);
  }

  function pause() {
    clearInterval(intervalRef.current);
    setPhase("paused");
  }

  function reset() {
    clearInterval(intervalRef.current);
    setPhase("idle");
    setElapsed(0);
  }

  let currentIdx = 0;
  schedule.steps.forEach((s, i) => {
    if (elapsed >= s.t) currentIdx = i;
  });

  const mainLabel = phase === "running" ? "Jeda" : phase === "paused" ? "Lanjut" : "Mulai";
  const statusText =
    phase === "idle"
      ? "Belum dimulai"
      : phase === "paused"
      ? "Dijeda"
      : phase === "done"
      ? "Selesai"
      : `Sekarang: ${schedule.steps[currentIdx]?.label ?? ""}`;
  const clockValue = phase === "idle" ? schedule.totalTime : elapsed;

  return (
    <section className="py-11 border-t border-garis">
      <div className="flex items-baseline gap-3.5 mb-5">
        <span className="font-mono text-xs text-roastamber">03</span>
        <h2 className="font-display font-bold text-xl tracking-tight">Jadwal tuang &amp; timer</h2>
      </div>

      <div className="flex items-center gap-4.5 mb-6 p-4 bg-kertas2 border border-garis flex-wrap">
        <div className="font-mono text-[28px] font-medium min-w-[96px]">{fmtTime(clockValue)}</div>
        <button
          onClick={phase === "running" ? pause : start}
          className="font-mono text-xs tracking-wide uppercase px-4.5 py-2.5 bg-tinta text-kertas cursor-pointer"
        >
          {mainLabel}
        </button>
        <button
          onClick={reset}
          className="font-mono text-xs tracking-wide uppercase px-4.5 py-2.5 bg-transparent text-tinta border border-tinta cursor-pointer"
        >
          Reset
        </button>
        <div className="font-mono text-[11px] text-tintasoft flex-1 text-right min-w-[160px]">{statusText}</div>
      </div>

      <div className="border-t border-garis">
        {schedule.steps.map((s, i) => {
          const isCurrent = i === currentIdx;
          return (
            <div
              key={i}
              className={`grid grid-cols-[56px_76px_1fr] sm:grid-cols-[70px_100px_1fr_90px] gap-4 py-4 border-b border-garis items-center ${
                isCurrent ? "bg-kertas2" : ""
              }`}
            >
              <div className="font-mono text-[13px] text-roastamber font-medium">{fmtTime(s.t)}</div>
              <div className="font-mono text-[13px]">{s.amt > 0 ? `${s.amt} g` : "—"}</div>
              <div className="text-[13px] text-tintasoft">{s.label}</div>
              <div
                className={`font-mono text-[10px] uppercase text-right hidden sm:block ${
                  isCurrent ? "text-hijauok font-bold" : "text-tintasoft"
                }`}
              >
                {s.tag}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
