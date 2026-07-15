import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flavorWheel, noteDescriptions } from "../data/coffeeKnowledge";

const CX = 250;
const CY = 250;
const R0 = 46; // empty core
const R1 = 100; // end of ring 1 (category)
const R2 = 150; // end of ring 2 (subcategory)
const R3 = 190; // end of ring 3 (specific note)
const HOVER_LIFT = 7; // how far the hovered wedge grows outward only

function polar(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Roughly how wide one monospace character is relative to its font size.
const CHAR_WIDTH_RATIO = 0.62;

// A label reads radially (its text width runs along the ring's thickness),
// so it only fits if the text width stays inside the ring band AND the
// wedge is tangentially wide enough to not collide with its neighbours.
function labelFits(text, fontSize, bandWidth, spanDeg, radiusAtMid) {
  const textWidth = text.length * fontSize * CHAR_WIDTH_RATIO;
  if (textWidth > bandWidth - 6) return false;
  const minSpanDeg = ((fontSize * 1.1) / radiusAtMid) * (180 / Math.PI);
  return spanDeg > minSpanDeg;
}

function arcPath(startAngle, endAngle, rInner, rOuter) {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const oStart = polar(CX, CY, rOuter, startAngle);
  const oEnd = polar(CX, CY, rOuter, endAngle);
  const iStart = polar(CX, CY, rInner, startAngle);
  const iEnd = polar(CX, CY, rInner, endAngle);
  return [
    `M ${oStart.x} ${oStart.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${oEnd.x} ${oEnd.y}`,
    `L ${iEnd.x} ${iEnd.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${iStart.x} ${iStart.y}`,
    "Z",
  ].join(" ");
}

// Build angle layout: each category's span is proportional to how many
// leaf notes it has, so the wheel looks balanced like a real cupping wheel.
function buildLayout(data) {
  const totalLeaves = data.reduce((s, c) => s + c.sub.reduce((s2, sc) => s2 + sc.notes.length, 0), 0);
  let angle = 0;
  return data.map((cat) => {
    const leafCount = cat.sub.reduce((s, sc) => s + sc.notes.length, 0);
    const catSpan = (leafCount / totalLeaves) * 360;
    const catStart = angle;
    let subAngle = catStart;
    const sub = cat.sub.map((sc) => {
      const scSpan = (sc.notes.length / leafCount) * catSpan;
      const scStart = subAngle;
      let noteAngle = scStart;
      const noteSpan = scSpan / sc.notes.length;
      const notes = sc.notes.map((note) => {
        const noteStart = noteAngle;
        noteAngle += noteSpan;
        return { note, start: noteStart, end: noteAngle };
      });
      subAngle += scSpan;
      return { ...sc, start: scStart, end: scStart + scSpan, notes };
    });
    angle += catSpan;
    return { ...cat, start: catStart, end: catStart + catSpan, sub };
  });
}

// Label that reads radially outward from the center, sitting inside its
// own ring band instead of spilling past the outer edge.
function RadialLabel({ text, radius, midAngle, fontSize, fill }) {
  const pos = polar(CX, CY, radius, midAngle);
  const flip = midAngle > 90 && midAngle < 270;
  const rotation = flip ? midAngle + 90 : midAngle - 90;
  return (
    <text
      x={pos.x}
      y={pos.y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={fontSize}
      fontFamily="'DM Mono', monospace"
      fill={fill}
      transform={`rotate(${rotation}, ${pos.x}, ${pos.y})`}
      className="pointer-events-none select-none"
    >
      {text}
    </text>
  );
}

export default function FlavorWheel() {
  const layout = useMemo(() => buildLayout(flavorWheel), []);
  const wrapRef = useRef(null);
  // hoverWedge drives BOTH the tooltip and a single top-layer highlight
  // wedge, so there is only one source of truth for "what's hovered".
  const [hoverWedge, setHoverWedge] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState({
    path: [layout[0].label],
    desc: layout[0].desc,
    color: layout[0].color,
  });

  function trackPointer(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function clearHover() {
    setHoverWedge(null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[460px_1fr] gap-8 items-center">
      <div className="relative" ref={wrapRef}>
        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[460px] mx-auto"
          style={{ overflow: "visible" }}
          onMouseLeave={clearHover}
        >
          {layout.map((cat) => (
            <g key={cat.key}>
              {/* ring 1: category */}
              <path
                d={arcPath(cat.start, cat.end, R0, R1)}
                fill={cat.color}
                stroke="#F2EFE6"
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => setSelected({ path: [cat.label], desc: cat.desc, color: cat.color })}
                onMouseMove={trackPointer}
                onMouseEnter={() =>
                  setHoverWedge({
                    start: cat.start,
                    end: cat.end,
                    rInner: R0,
                    rOuter: R1,
                    opacity: 1,
                    color: cat.color,
                    label: cat.label,
                  })
                }
                onMouseLeave={clearHover}
              />
              {labelFits(cat.label.split(" ")[0], 10.5, R1 - R0, cat.end - cat.start, (R0 + R1) / 2) && (
                <RadialLabel
                  text={cat.label.split(" ")[0]}
                  radius={(R0 + R1) / 2}
                  midAngle={(cat.start + cat.end) / 2}
                  fontSize="10.5"
                  fill="#F2EFE6"
                />
              )}

              {/* ring 2: subcategory */}
              {cat.sub.map((sc) => (
                <path
                  key={sc.key}
                  d={arcPath(sc.start, sc.end, R1, R2)}
                  fill={cat.color}
                  opacity={0.72}
                  stroke="#F2EFE6"
                  strokeWidth="1"
                  className="cursor-pointer"
                  onClick={() => setSelected({ path: [cat.label, sc.label], desc: sc.desc, color: cat.color })}
                  onMouseMove={trackPointer}
                  onMouseEnter={() =>
                    setHoverWedge({
                      start: sc.start,
                      end: sc.end,
                      rInner: R1,
                      rOuter: R2,
                      opacity: 0.72,
                      color: cat.color,
                      label: sc.label,
                    })
                  }
                  onMouseLeave={clearHover}
                />
              ))}

              {/* ring 3: specific note */}
              {cat.sub.map((sc) =>
                sc.notes.map((n) => (
                  <path
                    key={n.note}
                    d={arcPath(n.start, n.end, R2, R3)}
                    fill={cat.color}
                    opacity={0.45}
                    stroke="#F2EFE6"
                    strokeWidth="0.75"
                    className="cursor-pointer"
                    onClick={() =>
                      setSelected({
                        path: [cat.label, sc.label, n.note],
                        desc: noteDescriptions[n.note] ?? sc.desc,
                        color: cat.color,
                      })
                    }
                    onMouseMove={trackPointer}
                    onMouseEnter={() =>
                      setHoverWedge({
                        start: n.start,
                        end: n.end,
                        rInner: R2,
                        rOuter: R3,
                        opacity: 0.45,
                        color: cat.color,
                        label: n.note,
                      })
                    }
                    onMouseLeave={clearHover}
                  />
                ))
              )}
            </g>
          ))}

          {/* Single top-layer highlight: painted last, so it always sits
              above every wedge underneath it. Grows outward only (rOuter
              increases, rInner stays put), never bleeding toward the core. */}
          <AnimatePresence>
            {hoverWedge && (
              <motion.path
                key="hover-highlight"
                d={arcPath(hoverWedge.start, hoverWedge.end, hoverWedge.rInner, hoverWedge.rOuter + HOVER_LIFT)}
                fill={hoverWedge.color}
                opacity={hoverWedge.opacity}
                stroke="#F2EFE6"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoverWedge.opacity, filter: `drop-shadow(0 0 7px ${hoverWedge.color})` }}
                exit={{ opacity: 0, filter: "drop-shadow(0 0 0px transparent)" }}
                transition={{ duration: 0.12 }}
                style={{ pointerEvents: "none" }}
              />
            )}
          </AnimatePresence>
        </svg>

        <AnimatePresence>
          {hoverWedge && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none absolute z-20 whitespace-nowrap bg-tinta text-kertas text-[11px] font-mono px-4 py-2.5 shadow-[3px_3px_0_0_rgba(28,23,18,0.25),0_0_20px_4px_rgba(184,114,30,0.5)]"
              style={{ left: hoverPos.x, top: hoverPos.y, transform: "translate(-50%, -135%)" }}
            >
              {hoverWedge.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.path.join(">")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <span className="inline-block w-3 h-3 mr-2 align-middle" style={{ backgroundColor: selected.color }} />
            <span className="font-mono text-xs text-tintasoft align-middle">
              {selected.path.slice(0, -1).map((p) => `${p} / `)}
            </span>
            <span className="font-display font-bold text-lg align-middle">
              {selected.path[selected.path.length - 1]}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-tintasoft max-w-[55ch]">{selected.desc}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-xs text-tintasoft/70">
          Klik ring mana pun, kategori, subkategori, atau catatan spesifik, untuk menjelajah roda rasa.
          Arahkan kursor untuk lihat nama catatan yang teksnya tidak muat ditampilkan.
        </p>
      </div>
    </div>
  );
}
