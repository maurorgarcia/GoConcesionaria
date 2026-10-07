/**
 * Tokens compartidos con la página (app/globals.css). Dentro de la landing se
 * resuelven con las variables CSS del documento; en Remotion Studio o al
 * renderizar a MP4 se usa el valor de respaldo (el mismo hex).
 */
export const FPS = 30;

export const color = {
  bg: "var(--color-bg, #0A0A0A)",
  surface: "var(--color-surface, #111111)",
  surface2: "var(--color-surface-2, #151515)",
  line: "var(--color-line, #2B2B2B)",
  fg: "var(--color-fg, #F5F5F5)",
  muted: "var(--color-muted, #B0B0B0)",
  accent: "var(--color-accent, #CCFF00)",
  ok: "var(--color-ok, #CCFF00)",
  bubble: "var(--color-bubble, #1C1C1C)",
  bubbleAi: "var(--color-bubble-ai, #161B08)",
  chip: "var(--color-chip, #2B2B2B)",
};

export const font = {
  display: 'var(--font-geist, "Geist"), system-ui, sans-serif',
  body: 'var(--font-geist, "Geist"), system-ui, sans-serif',
  mono: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, monospace',
};

/** Fundido de entrada/salida para que el loop no corte en seco. */
export const loopFade = (frame: number, duration: number, edge = 10) => {
  const a = Math.min(1, Math.max(0, frame / edge));
  const b = Math.min(1, Math.max(0, (duration - frame) / edge));
  return Math.min(a, b);
};
