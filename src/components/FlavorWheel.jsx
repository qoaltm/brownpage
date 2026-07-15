import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flavorWheel, noteDescriptions } from "../data/coffeeKnowledge";

const CX = 250;
const CY = 250;
const R0 = 46; // empty core
const R1 = 100; // end of ring 1 (category)
const R2 = 150; // end of ring 2 (subcategory)
const R3 = 190; // end of ring 3 (specific note)

function polar(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
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

const wedgeStyle = { transformBox: "fill-box", transformOrigin: "center" };

export default function FlavorWheel() {
  const layout = useMemo(() => buildLayout(flavorWheel), []);
  const wrapRef = useRef(null);
  const [hover, setHover] = useState(null); // { label, x, y }
  const [selected, setSelected] = useState({
    path: [layout[0].label],
    desc: layout[0].desc,
    color: layout[0].color,
  });

  function showTooltip(label, e) {
    const rect = wrapRef.current.getBoundingClientRect();
    setHover({ label, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[460px_1fr] gap-8 items-center">
      <div className="relative" ref={wrapRef}>
        <svg viewBox="0 0 500 500" className="w-full max-w-[460px] mx-auto" style={{ overflow: "visible" }}>
          {layout.map((cat) => (
            <g key={cat.key}>
              {/* ring 1: category */}
              <motion.path
                d={arcPath(cat.start, cat.end, R0, R1)}
                fill={cat.color}
                stroke="#F2EFE6"
                strokeWidth="1.5"
                style={wedgeStyle}
                whileHover={{ scale: 1.045 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="cursor-pointer"
                onClick={() => setSelected({ path: [cat.label], desc: cat.desc, color: cat.color })}
                onMouseMove={(e) => showTooltip(cat.label, e)}
                onMouseLeave={() => setHover(null)}
              />
              {cat.end - cat.start > 10 && (
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
                <g key={sc.key}>
                  <motion.path
                    d={arcPath(sc.start, sc.end, R1, R2)}
                    fill={cat.color}
                    opacity={0.72}
                    stroke="#F2EFE6"
                    strokeWidth="1"
                    style={wedgeStyle}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="cursor-pointer"
                    onClick={() => setSelected({ path: [cat.label, sc.label], desc: sc.desc, color: cat.color })}
                    onMouseMove={(e) => showTooltip(sc.label, e)}
                    onMouseLeave={() => setHover(null)}
                  />
                  {sc.end - sc.start > 13 && (
                    <RadialLabel
                      text={sc.label}
                      radius={(R1 + R2) / 2}
                      midAngle={(sc.start + sc.end) / 2}
                      fontSize="8"
                      fill="#F2EFE6"
                    />
                  )}
                </g>
              ))}

              {/* ring 3: specific note */}
              {cat.sub.map((sc) =>
                sc.notes.map((n) => (
                  <g key={n.note}>
                    <motion.path
                      d={arcPath(n.start, n.end, R2, R3)}
                      fill={cat.color}
                      opacity={0.45}
                      stroke="#F2EFE6"
                      strokeWidth="0.75"
                      style={wedgeStyle}
                      whileHover={{ scale: 1.035 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelected({
                          path: [cat.label, sc.label, n.note],
                          desc: noteDescriptions[n.note] ?? sc.desc,
                          color: cat.color,
                        })
                      }
                      onMouseMove={(e) => showTooltip(n.note, e)}
                      onMouseLeave={() => setHover(null)}
                    />
                    {n.end - n.start > 7 && (
                      <RadialLabel
                        text={n.note}
                        radius={(R2 + R3) / 2}
                        midAngle={(n.start + n.end) / 2}
                        fontSize="6.5"
                        fill="#3B2A20"
                      />
                    )}
                  </g>
                ))
              )}
            </g>
          ))}
        </svg>

        <AnimatePresence>
          {hover && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none absolute z-20 whitespace-nowrap bg-tinta text-kertas text-[11px] font-mono px-2.5 py-1.5 shadow-[3px_3px_0_0_rgba(28,23,18,0.25)]"
              style={{ left: hover.x, top: hover.y, transform: "translate(-50%, -135%)" }}
            >
              {hover.label}
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
