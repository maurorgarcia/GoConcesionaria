import React from "react";
import { FPS, color, font } from "./tokens";
import { Avatar, CheckIcon, clamp, pop, Scene, SNAP, SOFT, TempPill, type Temp } from "./kit";
import { interpolate } from "./anim";

export const NIGHT_H = 940;
export const NIGHT_DURATION = 12 * FPS;
export const NIGHT_POSTER = 318;

const LEADS: { at: number; initials: string; name: string; msg: string; temp: Temp }[] = [
  { at: 22, initials: "ML", name: "Marcos L.", msg: "¿Tienen la SUV 2023 disponible?", temp: "Caliente" },
  { at: 106, initials: "JR", name: "Julieta R.", msg: "¿Aceptan mi usado como parte de pago?", temp: "Tibio" },
  { at: 190, initials: "PG", name: "Pablo G.", msg: "Quiero financiar, ¿qué cuota sería?", temp: "Caliente" },
];
const MORNING_AT = 272;

/** Minutos transcurridos desde las 22:00. */
const minutes = (frame: number) =>
  interpolate(frame, [0, 22, 106, 190, MORNING_AT], [14, 14, 217, 532, 630], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const clock = (mins: number) => {
  const total = (22 * 60 + Math.round(mins)) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

function Moon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}
function Sun() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function NightLeadsView({ frame }: { frame: number }) {
  const m = minutes(frame);
  const day = m >= 480;
  const swap = clamp((m - 470) / 20);
  const summary = pop(frame, MORNING_AT, SOFT);
  const count = LEADS.filter((l) => frame >= l.at + 52).length;

  return (
    <Scene height={NIGHT_H} frame={frame} duration={NIGHT_DURATION}>
      {/* reloj */}
      <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px" }}>
        <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 112, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{clock(m)}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: day ? color.accent : color.muted }}>
          <span style={{ fontSize: 28, textAlign: "right", lineHeight: 1.25 }}>{day ? "Tu equipo llega" : "Fuera de horario"}</span>
          <span style={{ position: "relative", width: 64, height: 64 }}>
            <span style={{ position: "absolute", inset: 0, opacity: 1 - swap, transform: `rotate(${swap * 40}deg)` }}>
              <Moon />
            </span>
            <span style={{ position: "absolute", inset: 0, opacity: swap, transform: `rotate(${(1 - swap) * -40}deg)` }}>
              <Sun />
            </span>
          </span>
        </div>
      </div>

      {/* leads que van llegando */}
      {LEADS.map((l, i) => {
        const p = pop(frame, l.at, SNAP);
        const replied = pop(frame, l.at + 24);
        const classified = pop(frame, l.at + 52);
        return (
          <div
            key={l.name}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 176 + i * 214,
              height: 198,
              background: color.surface,
              border: `2px solid ${color.line}`,
              borderRadius: 30,
              padding: "24px 28px",
              boxSizing: "border-box",
              display: "flex",
              gap: 22,
              opacity: clamp(p * 1.6),
              transform: `translateY(${(1 - p) * 40}px)`,
            }}
          >
            <Avatar label={l.initials} size={76} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 34 }}>{l.name}</span>
                <span style={{ fontSize: 24, color: color.muted }}>WhatsApp</span>
              </div>
              <span style={{ fontSize: 28, color: color.muted, lineHeight: 1.25 }}>{l.msg}</span>
              <div style={{ display: "flex", gap: 14, marginTop: "auto", alignItems: "center", height: 46 }}>
                {frame >= l.at + 24 ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 25, color: color.ok, opacity: clamp(replied * 1.6), transform: `translateX(${(1 - replied) * -10}px)` }}>
                    <CheckIcon size={26} /> Respondido al instante
                  </span>
                ) : null}
                {frame >= l.at + 52 ? (
                  <span style={{ opacity: clamp(classified * 1.6), transform: `scale(${0.8 + 0.2 * classified})` }}>
                    <TempPill temp={l.temp} size={25} />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      {/* resumen de la mañana */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 830,
          height: 110,
          boxSizing: "border-box",
          border: `2px solid ${color.accent}`,
          background: color.surface2,
          borderRadius: 30,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          opacity: clamp(summary * 1.6) * (frame >= MORNING_AT ? 1 : 0),
          transform: `translateY(${(1 - summary) * 30}px)`,
        }}
      >
        <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 35, lineHeight: 1.15 }}>{count || 3} leads calificados, listos para llamar</span>
        <CheckIcon size={44} stroke={color.accent} />
      </div>
    </Scene>
  );
}
