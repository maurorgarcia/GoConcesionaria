import React from "react";
import { FPS, color, font } from "./tokens";
import { Avatar, BOUNCE, CheckIcon, clamp, pop, Scene, TempPill } from "./kit";
import { interpolate } from "./anim";

export const ONB_W = 800;
export const ONB_H = 600;
export const ONB_DURATION = 8 * FPS;
export const ONB_POSTER = 215;

const CARD_W = 236;
const GAP = 46;
const LIT = [18, 88, 158];
const TITLES = ["Demo con tu caso", "Conectamos tu WhatsApp", "Empezás a recibir leads calificados"];
const x = (i: number) => i * (CARD_W + GAP);
const NODE_Y = 40;

const ICONS = [
  <path key="a" d="M3 5h18v12H3zM8 21h8M12 17v4" />,
  <path key="b" d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.4L3 21z" />,
  <path key="c" d="M5 12l4 4 10-10" />,
];

function Icon({ i, size = 40 }: { i: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[i]}
    </svg>
  );
}

function Visual({ i, frame, start }: { i: number; frame: number; start: number }) {
  if (i === 0) {
    // mini tablero: tres filas que se dibujan, la primera destacada
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        {[0.9, 0.65, 0.8].map((w, k) => {
          const p = pop(frame, start + k * 8);
          return (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, opacity: clamp(p * 1.6), transform: `translateY(${(1 - p) * 12}px)`, background: color.surface2, border: `2px solid ${k === 0 ? color.accent : color.line}`, borderRadius: 18, padding: "14px 16px" }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: k === 0 ? color.accent : color.chip, flexShrink: 0 }} />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                <span style={{ height: 10, width: `${w * 100}%`, borderRadius: 6, background: color.chip }} />
                <span style={{ height: 8, width: `${w * 60}%`, borderRadius: 6, background: color.line }} />
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  if (i === 1) {
    const p = pop(frame, start, BOUNCE);
    const done = pop(frame, start + 28, BOUNCE);
    const pulse = clamp((frame - start) / 26);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ position: "relative", width: 110, height: 110 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `3px solid ${color.accent}`, opacity: 0.6 * (1 - pulse), transform: `scale(${1 + pulse * 0.7})` }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color.accent, color: color.bg, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${p})` }}>
            <Icon i={1} size={56} />
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", borderRadius: 999, background: color.bubbleAi, border: `2px solid ${color.accent}`, fontSize: 26, fontWeight: 600, opacity: clamp(done * 2), transform: `scale(${0.8 + 0.2 * done})` }}>
          <CheckIcon size={26} />
          Conectado
        </span>
      </div>
    );
  }
  const leads = [
    { n: "JP", t: "Pickup 4x4 2022", temp: "Caliente" as const },
    { n: "TA", t: "SUV usada", temp: "Tibio" as const },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      {leads.map((l, k) => {
        const p = pop(frame, start + k * 14, BOUNCE);
        return (
          <div key={l.n} style={{ display: "flex", flexDirection: "column", gap: 10, background: color.surface2, border: `2px solid ${k === 0 ? color.accent : color.line}`, borderRadius: 18, padding: "14px 16px", opacity: clamp(p * 2), transform: `translateY(${(1 - p) * 26}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar label={l.n} size={40} accent={k === 0} />
              <span style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.15 }}>{l.t}</span>
            </div>
            <TempPill temp={l.temp} size={22} />
          </div>
        );
      })}
    </div>
  );
}

export function OnboardingView({ frame }: { frame: number }) {
  const last = x(2) + CARD_W / 2;
  const first = x(0) + CARD_W / 2;
  const p = interpolate(frame, [LIT[0], LIT[2]], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = "color-mix(in srgb, var(--color-accent, #CCFF00) 45%, transparent)";

  return (
    <Scene width={ONB_W} height={ONB_H} frame={frame} duration={ONB_DURATION}>
      <div style={{ position: "absolute", left: first, top: NODE_Y + 36, width: last - first, height: 4, background: color.line, borderRadius: 4 }} />
      <div style={{ position: "absolute", left: first, top: NODE_Y + 36, width: (last - first) * p, height: 4, background: color.accent, borderRadius: 4 }} />

      {TITLES.map((title, i) => {
        const appear = pop(frame, i * 6);
        const lit = frame < LIT[i] ? 0 : pop(frame, LIT[i], BOUNCE);
        const ring = clamp((frame - LIT[i]) / 22);
        return (
          <div key={title} style={{ position: "absolute", left: x(i), top: 0, width: CARD_W, opacity: clamp(appear * 1.5), transform: `translateY(${(1 - appear) * 14}px)` }}>
            <div style={{ position: "relative", margin: `${NODE_Y}px auto 0`, width: 76, height: 76 }}>
              <div style={{ position: "absolute", inset: -34, borderRadius: "50%", background: `radial-gradient(circle, ${glow} 0%, transparent 66%)`, opacity: clamp(lit) }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 24, border: `3px solid ${color.accent}`, opacity: lit > 0 ? 0.7 * (1 - ring) : 0, transform: `scale(${1 + ring * 0.6})` }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: color.surface2, border: `3px solid ${color.line}`, color: color.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon i={i} />
              </div>
              <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: color.accent, color: color.bg, opacity: clamp(lit), display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon i={i} />
              </div>
            </div>
            <div style={{ marginTop: 26, minHeight: 124, textAlign: "center", fontFamily: font.display, fontWeight: 600, fontSize: 31, lineHeight: 1.15, letterSpacing: "-0.02em", color: lit > 0.5 ? color.fg : color.muted }}>
              <span style={{ display: "block", fontSize: 22, color: color.accent, marginBottom: 6, opacity: clamp(lit) }}>0{i + 1}</span>
              {title}
            </div>
            <div style={{ marginTop: 10, minHeight: 250, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              {frame >= LIT[i] + 6 ? <Visual i={i} frame={frame} start={LIT[i] + 6} /> : null}
            </div>
          </div>
        );
      })}
    </Scene>
  );
}
