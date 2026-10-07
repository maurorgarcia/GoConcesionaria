import React from "react";
import { FPS, color, font } from "./tokens";
import { Avatar, BOUNCE, CheckIcon, clamp, pop, Scene, SOFT, typed } from "./kit";

export const QUAL_H = 1064;
export const QUAL_DURATION = 12 * FPS;
export const QUAL_POSTER = 318;

const MESSAGES = [
  { from: "lead", text: "Hola, vi la pickup 4x4 2022 en su web. ¿Sigue disponible?", at: 14, typing: 0 },
  { from: "ai", text: "¡Hola! Sí, sigue disponible. ¿La buscas para financiar o pagarías de contado?", at: 78, typing: 42 },
  { from: "lead", text: "Financiada. Entregaría mi hatchback 2016.", at: 136, typing: 0 },
  { from: "ai", text: "Perfecto. ¿Qué cuota mensual te resultaría cómoda?", at: 204, typing: 164 },
] as const;

/** La ficha se completa a medida que el cliente responde. */
const FIELDS = [
  { label: "Interés", value: "Pickup 4x4 2022", at: 34 },
  { label: "Forma de pago", value: "Financiado", at: 152 },
  { label: "Permuta", value: "Sí · hatchback 2016", at: 168 },
];

const TEMPS = [
  { label: "Frío", at: 30 },
  { label: "Tibio", at: 152 },
  { label: "Caliente", at: 236 },
];

function Bubble({ from, text, progress }: { from: "lead" | "ai"; text: string; progress: number }) {
  const ai = from === "ai";
  return (
    <div
      style={{
        justifySelf: ai ? "start" : "end",
        maxWidth: "80%",
        background: ai ? color.bubbleAi : color.bubble,
        borderRadius: ai ? "28px 28px 28px 8px" : "28px 28px 8px 28px",
        padding: "16px 26px",
        fontSize: 29,
        lineHeight: 1.32,
        opacity: clamp(progress * 1.6),
        transform: `translateY(${(1 - progress) * 20}px) scale(${0.94 + 0.06 * progress})`,
        transformOrigin: ai ? "left bottom" : "right bottom",
      }}
    >
      {text}
    </div>
  );
}

function Typing({ frame }: { frame: number }) {
  return (
    <div style={{ justifySelf: "start", background: color.bubbleAi, borderRadius: "28px 28px 28px 8px", padding: "26px 30px", display: "flex", gap: 10 }}>
      {[0, 1, 2].map((i) => {
        const w = Math.max(0, Math.sin((frame - i * 4) / 4.5));
        return <span key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: color.muted, opacity: 0.45 + 0.55 * w, transform: `translateY(${-6 * w}px)` }} />;
      })}
    </div>
  );
}

export function LeadQualifyView({ frame }: { frame: number }) {
  const cardIn = pop(frame, 28, SOFT);
  const fill = clamp(pop(frame, TEMPS[0].at, SOFT) / 3 + pop(frame, TEMPS[1].at, SOFT) / 3 + pop(frame, TEMPS[2].at, SOFT) / 3);
  const currentTemp = frame >= TEMPS[2].at ? 2 : frame >= TEMPS[1].at ? 1 : frame >= TEMPS[0].at ? 0 : -1;
  const qualified = frame >= TEMPS[2].at;
  const chip = pop(frame, TEMPS[2].at, BOUNCE);

  return (
    <Scene height={QUAL_H} frame={frame} duration={QUAL_DURATION}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Chat */}
        <div style={{ background: color.surface, border: `2px solid ${color.line}`, borderRadius: 36, padding: "30px 30px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, paddingBottom: 22, borderBottom: `2px solid ${color.line}` }}>
            <Avatar label="G" size={68} accent />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
              <span style={{ fontWeight: 600, fontSize: 31 }}>Asistente de la concesionaria</span>
              <span style={{ fontSize: 25, color: color.ok }}>En línea · responde en segundos</span>
            </div>
          </div>
          {MESSAGES.map((m, i) => {
            const showTyping = m.typing > 0 && frame >= m.typing && frame < m.at;
            return (
              <div key={i} style={{ display: "grid", minHeight: 106, alignContent: "start" }}>
                {showTyping ? <Typing frame={frame - m.typing} /> : null}
                {frame >= m.at ? <Bubble from={m.from} text={m.text} progress={pop(frame, m.at)} /> : null}
              </div>
            );
          })}
        </div>

        {/* Ficha del lead */}
        <div
          style={{
            background: color.surface2,
            border: `2px solid ${qualified ? color.accent : color.line}`,
            borderRadius: 32,
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: clamp(cardIn * 1.6),
            transform: `translateY(${(1 - cardIn) * 36}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 36 }}>Ficha del lead</span>
            {qualified ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 22px", borderRadius: 999, background: color.accent, color: color.bg, fontWeight: 600, fontSize: 26, transform: `scale(${chip})` }}>
                <CheckIcon size={26} stroke={color.bg} /> Calificado
              </span>
            ) : (
              <span style={{ padding: "6px 22px", borderRadius: 999, border: `2px solid ${color.line}`, color: color.muted, fontSize: 26 }}>Nuevo</span>
            )}
          </div>
          {FIELDS.map((f) => {
            const chars = Math.max(0, Math.floor((frame - f.at) * 1.6));
            return (
              <div key={f.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 29, minHeight: 40 }}>
                <span style={{ color: color.muted }}>{f.label}</span>
                <span>
                  {typed(f.value, frame, f.at)}
                  {chars > 0 && chars < f.value.length ? <span style={{ color: color.accent }}>|</span> : null}
                </span>
              </div>
            );
          })}
          {/* Temperatura */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
            <div style={{ height: 14, borderRadius: 999, background: color.line, overflow: "hidden" }}>
              <div style={{ width: `${fill * 100}%`, height: "100%", background: color.accent, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25 }}>
              {TEMPS.map((t, i) => (
                <span key={t.label} style={{ color: currentTemp === i ? color.fg : color.muted, fontWeight: currentTemp === i ? 600 : 400 }}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
