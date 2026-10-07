import React from "react";
import { FPS, color, font } from "./tokens";
import { Avatar, clamp, pop, Scene, SNAP, SOFT, TempPill, type Temp } from "./kit";

export const BRANCH_H = 940;
export const BRANCH_DURATION = 12 * FPS;
export const BRANCH_POSTER = 330;

type Row = { initials: string; name: string; car: string; temp: Temp };

const DATA: Row[][] = [
  [
    { initials: "MR", name: "Martina R.", car: "SUV 2023", temp: "Caliente" },
    { initials: "DF", name: "Diego F.", car: "Sedán 2021", temp: "Tibio" },
    { initials: "LP", name: "Lucía P.", car: "Hatchback 0 km", temp: "Frío" },
  ],
  [
    { initials: "AC", name: "Andrés C.", car: "Pickup 4x4 2022", temp: "Caliente" },
    { initials: "SM", name: "Sofía M.", car: "SUV 2020", temp: "Tibio" },
    { initials: "NB", name: "Nicolás B.", car: "Sedán 2022", temp: "Caliente" },
  ],
  [
    { initials: "VS", name: "Valeria S.", car: "Utilitario 2019", temp: "Tibio" },
    { initials: "JT", name: "Joaquín T.", car: "Pickup 2021", temp: "Caliente" },
    { initials: "CO", name: "Camila O.", car: "Hatchback 2020", temp: "Frío" },
  ],
];

const TABS = ["Sucursal 1", "Sucursal 2", "Sucursal 3", "Todas"];
const SEG_AT = [0, 90, 180, 270];
const TAB_W = 800 / 4;

const segmentAt = (frame: number) => (frame >= SEG_AT[3] ? 3 : frame >= SEG_AT[2] ? 2 : frame >= SEG_AT[1] ? 1 : 0);

function LockIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function BranchesView({ frame }: { frame: number }) {
  const seg = segmentAt(frame);
  const segStart = SEG_AT[seg];
  const prevX = (seg === 0 ? 0 : seg - 1) * TAB_W;
  const x = prevX + (seg * TAB_W - prevX) * pop(frame, segStart, SOFT);

  const all = seg === 3;
  const rows: (Row & { branch: number })[] = all
    ? [0, 1, 2].flatMap((b) => DATA[b].slice(0, 2).map((r) => ({ ...r, branch: b })))
    : DATA[seg].map((r) => ({ ...r, branch: seg }));

  const ROW_H = all ? 104 : 168;

  return (
    <Scene height={BRANCH_H} frame={frame} duration={BRANCH_DURATION}>
      {/* selector */}
      <div style={{ position: "relative", height: 84, background: color.surface, border: `2px solid ${color.line}`, borderRadius: 24, boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: 6, left: x + 6, width: TAB_W - 12, height: 68, borderRadius: 18, background: color.accent }} />
        <div style={{ position: "relative", display: "flex", height: "100%" }}>
          {TABS.map((t, i) => (
            <span key={t} style={{ width: TAB_W, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 27, fontWeight: 600, color: seg === i ? color.bg : color.muted }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* panel */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 108, bottom: 0, background: color.surface, border: `2px solid ${color.line}`, borderRadius: 32, padding: "28px 30px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 38 }}>{all ? "Todos los leads" : `Leads de ${TABS[seg]}`}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color: all ? color.accent : color.muted, fontSize: 25 }}>
            {all ? null : <LockIcon />}
            {all ? "Vista de dirección" : "Solo esta sucursal"}
          </span>
        </div>

        {rows.map((r, i) => {
          const p = pop(frame, segStart + 6 + i * 6, SNAP);
          return (
            <div
              key={`${seg}-${r.name}`}
              style={{
                height: ROW_H,
                display: "flex",
                alignItems: "center",
                gap: 22,
                borderTop: `2px solid ${color.line}`,
                opacity: clamp(p * 1.6),
                transform: `translateX(${(1 - p) * 40}px)`,
              }}
            >
              <Avatar label={r.initials} size={all ? 60 : 76} />
              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: all ? 31 : 34 }}>{r.name}</span>
                <span style={{ color: color.muted, fontSize: 25 }}>{r.car}</span>
              </div>
              {all ? <span style={{ fontSize: 23, color: color.muted, border: `2px solid ${color.line}`, borderRadius: 10, padding: "2px 12px" }}>S{r.branch + 1}</span> : null}
              <span style={{ width: 150, display: "flex", justifyContent: "flex-end" }}>
                <TempPill temp={r.temp} size={25} />
              </span>
            </div>
          );
        })}

        {!all ? (
          <div style={{ position: "absolute", left: 30, right: 30, bottom: 28, display: "flex", alignItems: "center", gap: 14, fontSize: 27, color: color.muted, opacity: pop(frame, segStart + 30), lineHeight: 1.3 }}>
            <LockIcon />
            Cada equipo ve solo lo suyo.
          </div>
        ) : (
          <div style={{ position: "absolute", left: 30, right: 30, bottom: 28, fontSize: 27, color: color.muted, opacity: pop(frame, segStart + 40), lineHeight: 1.3 }}>
            Y vos ves todas las sucursales en un solo lugar.
          </div>
        )}
      </div>
    </Scene>
  );
}
