import React from "react";
import { FPS, color, font } from "./tokens";
import { Avatar, BOUNCE, CheckIcon, clamp, pop, Scene, SNAP } from "./kit";
import { interpolate } from "./anim";

export const FLOW_W = 800;
export const FLOW_H = 940;
export const FLOW_DURATION = 8 * FPS;
export const FLOW_POSTER = 205;

const NODE = 104;
const NODE_X = 20;
const ROW = 226;
const TOP = 30;
const LINE_START = 24;
const LINE_END = 176;

const STEPS = ["Llega el lead", "La IA conversa", "Se clasifica y registra", "Tu vendedor cierra"];

const center = (i: number) => ({ x: NODE_X + NODE / 2, y: TOP + NODE / 2 + i * ROW });
const litAt = (i: number) => LINE_START + (i / (STEPS.length - 1)) * (LINE_END - LINE_START);

/** Frame en el que se enciende el paso i (para saltar a él desde la página). */
export const flowStepFrame = (i: number) => Math.round(litAt(i)) + 2;

/** Cantidad de pasos ya encendidos en un frame dado (0 a 4). */
export const flowStepsLit = (frame: number) => STEPS.reduce((n, _s, i) => (frame >= litAt(i) ? n + 1 : n), 0);

const ICONS = [
  <path key="a" d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />,
  <g key="b">
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  </g>,
  <g key="c">
    <path d="M4 6h16M4 12h9M4 18h6" />
    <path d="M15 17l2.2 2.2L22 14.5" />
  </g>,
  <g key="d">
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21c0-4 3-6 7-6s6 1.6 7 4" />
    <path d="M16 11l2.2 2.2L22 9.5" />
  </g>,
];

const bubble = (ai: boolean): React.CSSProperties => ({
  background: ai ? color.bubbleAi : color.bubble,
  borderRadius: ai ? "26px 26px 26px 8px" : "26px 26px 8px 26px",
  padding: "14px 24px",
  fontSize: 28,
  lineHeight: 1.3,
  maxWidth: 520,
});

function Visual({ i, frame, start }: { i: number; frame: number; start: number }) {
  const p = pop(frame, start);
  const wrap: React.CSSProperties = { opacity: clamp(p * 1.6), transform: `translateY(${(1 - p) * 16}px)` };
  if (i === 0) return <div style={{ ...wrap, ...bubble(false) }}>Hola, vi la pickup 4x4 2022 en su web.</div>;
  if (i === 1) {
    const typing = frame < start + 30;
    return typing ? (
      <div style={{ ...wrap, ...bubble(true), display: "flex", gap: 9, padding: "24px 28px", width: "fit-content" }}>
        {[0, 1, 2].map((k) => {
          const w = Math.max(0, Math.sin((frame - k * 4) / 4.5));
          return <span key={k} style={{ width: 13, height: 13, borderRadius: "50%", background: color.muted, opacity: 0.45 + 0.55 * w, transform: `translateY(${-5 * w}px)` }} />;
        })}
      </div>
    ) : (
      <div style={{ ...bubble(true), opacity: clamp(pop(frame, start + 30) * 1.6), transform: `translateY(${(1 - pop(frame, start + 30)) * 12}px)` }}>
        ¿La buscas para financiar o pagarías de contado?
      </div>
    );
  }
  if (i === 2) {
    const chips = [
      { t: "Pickup 4x4 2022", hot: false },
      { t: "Financiado", hot: false },
      { t: "Caliente", hot: true },
    ];
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {chips.map((c, k) => {
          const q = pop(frame, start + k * 9, BOUNCE);
          return (
            <span
              key={c.t}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                fontSize: 27,
                fontWeight: 600,
                background: c.hot ? color.accent : color.chip,
                color: c.hot ? color.bg : color.fg,
                transform: `scale(${q})`,
                opacity: clamp(q * 2),
              }}
            >
              {c.t}
            </span>
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ ...wrap, display: "flex", alignItems: "center", gap: 20 }}>
      <Avatar label="JP" size={74} accent />
      <div style={{ display: "flex", flexDirection: "column", fontSize: 28, lineHeight: 1.3 }}>
        <span style={{ fontWeight: 600 }}>Lead asignado</span>
        <span style={{ color: color.muted }}>con toda la conversación</span>
      </div>
      <CheckIcon size={34} />
    </div>
  );
}

export function FlowStepsView({ frame }: { frame: number }) {
  const p = interpolate(frame, [LINE_START, LINE_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const first = center(0);
  const last = center(STEPS.length - 1);
  const dotY = first.y + (last.y - first.y) * p;
  const dotOpacity = interpolate(frame, [LINE_START - 6, LINE_START, LINE_END, LINE_END + 14], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = "color-mix(in srgb, var(--color-accent, #CCFF00) 50%, transparent)";

  return (
    <Scene width={FLOW_W} height={FLOW_H} frame={frame} duration={FLOW_DURATION}>
      {/* línea base y línea que se dibuja */}
      <div style={{ position: "absolute", left: first.x - 2, top: first.y, width: 4, height: last.y - first.y, background: color.line, borderRadius: 4 }} />
      <div style={{ position: "absolute", left: first.x - 2, top: first.y, width: 4, height: (last.y - first.y) * p, background: color.accent, borderRadius: 4 }} />

      {STEPS.map((label, i) => {
        const c = center(i);
        const appear = pop(frame, i * 5);
        const at = litAt(i);
        const lit = frame < at ? 0 : pop(frame, at, BOUNCE);
        const ring = clamp((frame - at) / 22);
        return (
          <React.Fragment key={label}>
            <div style={{ position: "absolute", left: c.x - NODE / 2, top: c.y - NODE / 2, width: NODE, height: NODE, transform: `scale(${appear})` }}>
              <div style={{ position: "absolute", inset: -40, borderRadius: "50%", background: `radial-gradient(circle, ${glow} 0%, transparent 66%)`, opacity: clamp(lit) }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 30, border: `3px solid ${color.accent}`, opacity: lit > 0 ? 0.7 * (1 - ring) : 0, transform: `scale(${1 + ring * 0.6})` }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: color.surface2, border: `3px solid ${color.line}`, color: color.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon>{ICONS[i]}</Icon>
              </div>
              <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: color.accent, color: color.bg, opacity: clamp(lit), display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon>{ICONS[i]}</Icon>
              </div>
            </div>
            <div style={{ position: "absolute", left: 170, top: c.y - 62, right: 0, opacity: clamp(appear * 1.5) }}>
              <div style={{ fontFamily: font.display, fontWeight: 600, fontSize: 38, letterSpacing: "-0.02em", color: lit > 0.5 ? color.fg : color.muted }}>{label}</div>
            </div>
            <div style={{ position: "absolute", left: 170, top: c.y - 4, right: 0, minHeight: 96 }}>{frame >= at + 4 ? <Visual i={i} frame={frame} start={at + 4} /> : null}</div>
          </React.Fragment>
        );
      })}

      {/* punto de luz */}
      <div style={{ position: "absolute", left: first.x - 14, top: dotY - 14, width: 28, height: 28, borderRadius: "50%", background: color.fg, boxShadow: `0 0 0 8px ${glow}`, opacity: dotOpacity }}>
        <div style={{ position: "absolute", inset: -40, borderRadius: "50%", background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }} />
      </div>
    </Scene>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export { SNAP };
