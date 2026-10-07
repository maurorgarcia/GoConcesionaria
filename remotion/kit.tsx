import React from "react";
import { interpolate, spring } from "./anim";
import { FPS, color, font, loopFade } from "./tokens";

/** Todas las composiciones miden 800 px de ancho y usan tipografía grande para leerse bien en móvil. */
export const STAGE_W = 800;

export const SOFT = { damping: 20, stiffness: 90, mass: 1 };
export const SNAP = { damping: 14, stiffness: 170, mass: 0.7 };
export const BOUNCE = { damping: 9, stiffness: 180, mass: 0.6 };

/** Entrada con resorte: 0 antes de `at`, 1 al asentarse. */
export const pop = (frame: number, at: number, config: { damping?: number; stiffness?: number; mass?: number } = SNAP) =>
  spring({ frame: frame - at, fps: FPS, config });

export const fadeIn = (frame: number, at: number, dur = 10) =>
  interpolate(frame, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const typed = (text: string, frame: number, at: number, cps = 1.6) =>
  text.slice(0, Math.max(0, Math.floor((frame - at) * cps)));

export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export function Scene({
  width = STAGE_W,
  height,
  frame,
  duration,
  children,
}: {
  width?: number;
  height: number;
  frame: number;
  duration: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        fontFamily: font.body,
        color: color.fg,
        opacity: loopFade(frame, duration),
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

export function CheckIcon({ size = 30, stroke = color.ok }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 9.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export function Avatar({ label, size = 72, accent = false }: { label: string; size?: number; accent?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        background: accent ? color.accent : color.chip,
        color: accent ? color.bg : color.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font.display,
        fontWeight: 600,
        fontSize: size * 0.42,
      }}
    >
      {label}
    </div>
  );
}

export type Temp = "Caliente" | "Tibio" | "Frío";

export function TempPill({ temp, size = 24 }: { temp: Temp; size?: number }) {
  const hot = temp === "Caliente";
  const warm = temp === "Tibio";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: `${size * 0.2}px ${size * 0.6}px`,
        borderRadius: 999,
        fontSize: size,
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: hot ? color.accent : warm ? color.chip : "transparent",
        color: hot ? color.bg : warm ? color.fg : color.muted,
        border: hot || warm ? "none" : `2px solid ${color.line}`,
      }}
    >
      {temp}
    </span>
  );
}
