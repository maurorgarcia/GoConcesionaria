import React from "react";
import { FPS, color, font } from "./tokens";
import { clamp, pop, Scene, SOFT } from "./kit";

export const PIPE_W = 800;
export const PIPE_H = 940;
export const PIPE_DURATION = 12 * FPS;
export const PIPE_POSTER = 300;

type Lead = { name: string; detail: string; temp?: "hot" | "warm" };

const LEADS: Record<string, Lead> = {
  lucia: { name: "Lucía P.", detail: "Hatchback 0 km" },
  martina: { name: "Martina R.", detail: "SUV 2023 · Contado" },
  diego: { name: "Diego F.", detail: "Sedán 2021" },
  andres: { name: "Andrés C.", detail: "Pickup 4x4 · Caliente", temp: "hot" },
  sofia: { name: "Sofía M.", detail: "SUV 2020 · Tibio", temp: "warm" },
  nicolas: { name: "Nicolás B.", detail: "Sedán 2022 · Jueves" },
  valeria: { name: "Valeria S.", detail: "Utilitario · Sábado" },
  joaquin: { name: "Joaquín T.", detail: "Pickup 2021" },
};

const LANES = ["Nuevos", "Calificados", "Visita agendada", "En negociación"];

/** Por etapa y por carril, los leads de izquierda a derecha. */
const STAGES: string[][][] = [
  [["martina", "diego"], ["andres", "sofia"], ["nicolas", "valeria"], ["joaquin"]],
  [["lucia", "martina", "diego"], ["andres", "sofia"], ["nicolas", "valeria"], ["joaquin"]],
  [["lucia", "martina", "diego"], ["sofia"], ["andres", "nicolas", "valeria"], ["joaquin"]],
  [["lucia", "martina", "diego"], ["sofia"], ["nicolas", "valeria"], ["andres", "joaquin"]],
];
const STAGE_AT = [0, 30, 104, 176];

const HEAD = 100;
const LANE_H = 200;
const LANE_STEP = 212;
const CARD_W = 236;
const CARD_H = 124;
const CARD_STEP = 248;

const slot = (lane: number, idx: number) => ({ x: 24 + idx * CARD_STEP, y: HEAD + lane * LANE_STEP + 60 });

const find = (stage: number, id: string) => {
  for (let l = 0; l < LANES.length; l++) {
    const i = STAGES[stage][l].indexOf(id);
    if (i >= 0) return { lane: l, idx: i };
  }
  return null;
};

export function PipelineLiveView({ frame }: { frame: number }) {
  const prog = STAGE_AT.map((at, i) => (i === 0 ? 1 : pop(frame, at, SOFT)));
  const stageNow = prog[3] > 0.5 ? 3 : prog[2] > 0.5 ? 2 : prog[1] > 0.5 ? 1 : 0;

  const position = (id: string) => {
    const s0 = find(0, id);
    let { x, y } = s0 ? slot(s0.lane, s0.idx) : { x: -CARD_W - 20, y: slot(0, 0).y };
    for (let k = 1; k < STAGES.length; k++) {
      const t = find(k, id);
      if (!t) continue;
      const target = slot(t.lane, t.idx);
      x += (target.x - x) * prog[k];
      y += (target.y - y) * prog[k];
    }
    return { x, y };
  };

  const moving = (id: string) => (id === "andres" ? Math.max(Math.sin(Math.PI * clamp(prog[2])) * (prog[3] < 0.01 ? 1 : 0), Math.sin(Math.PI * clamp(prog[3]))) : 0);
  const arrived = frame >= STAGE_AT[3] + 30;
  const toastIn = pop(frame, 62, SOFT);
  const toastText = arrived ? "Andrés C. llegó a negociación" : "Lead caliente: Andrés C.";

  return (
    <Scene height={PIPE_H} frame={frame} duration={PIPE_DURATION}>
      <div style={{ height: HEAD - 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 38 }}>Pipeline de ventas</span>
        {frame >= 62 ? (
          <span
            style={{
              fontSize: 25,
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: 999,
              border: `2px solid ${color.accent}`,
              color: color.accent,
              background: color.surface,
              opacity: clamp(toastIn * 1.6),
              transform: `translateY(${(1 - toastIn) * -14}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {toastText}
          </span>
        ) : null}
      </div>

      {LANES.map((name, l) => (
        <div key={name} style={{ position: "absolute", left: 0, right: 0, top: HEAD + l * LANE_STEP, height: LANE_H, background: color.surface, border: `2px solid ${color.line}`, borderRadius: 28, boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 26px 0", fontSize: 28, fontWeight: 600 }}>
            <span>{name}</span>
            <span style={{ color: color.muted }}>{STAGES[stageNow][l].length}</span>
          </div>
        </div>
      ))}

      {Object.entries(LEADS).map(([id, lead]) => {
        const { x, y } = position(id);
        const hot = id === "andres";
        const lift = moving(id);
        const glowing = hot && (lift > 0.01 || arrived);
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: CARD_W,
              height: CARD_H,
              boxSizing: "border-box",
              background: color.surface2,
              border: `2px solid ${glowing ? color.accent : color.line}`,
              borderRadius: 22,
              padding: "14px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              zIndex: hot ? 5 : 1,
              transform: `scale(${1 + 0.05 * lift})`,
              boxShadow: hot && lift > 0.01 ? "0 14px 30px rgba(0,0,0,0.55)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {lead.temp ? <span style={{ width: 14, height: 14, borderRadius: "50%", background: lead.temp === "hot" ? color.accent : color.muted, flexShrink: 0 }} /> : null}
              <span style={{ fontWeight: 600, fontSize: 28 }}>{lead.name}</span>
            </div>
            <span style={{ color: color.muted, fontSize: 23, lineHeight: 1.25 }}>{lead.detail}</span>
          </div>
        );
      })}
    </Scene>
  );
}
