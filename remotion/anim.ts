/**
 * spring() e interpolate() con la misma firma y matemática que los de `remotion`
 * (oscilador amortiguado analítico; interpolación lineal por tramos).
 *
 * Las vistas los importan desde acá, y no desde "remotion", para que el póster
 * estático se pueda dibujar en el HTML inicial sin cargar la librería completa
 * (~70 KB gzip) en el bundle principal. El Player y Remotion Studio siguen
 * usando el runtime real de Remotion para el reloj, el loop y el render.
 */

type SpringConfig = { damping?: number; stiffness?: number; mass?: number };

export function spring({
  frame,
  fps,
  config = {},
}: {
  frame: number;
  fps: number;
  config?: SpringConfig;
}): number {
  const { damping = 10, stiffness = 100, mass = 1 } = config;
  const t = Math.max(0, frame) / fps;
  if (t === 0) return 0;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const decay = Math.exp(-zeta * w0 * t);

  if (zeta < 1) {
    const w1 = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - decay * (Math.cos(w1 * t) + ((zeta * w0) / w1) * Math.sin(w1 * t));
  }
  if (zeta === 1) {
    return 1 - decay * (1 + w0 * t);
  }
  const w2 = w0 * Math.sqrt(zeta * zeta - 1);
  return 1 - decay * (Math.cosh(w2 * t) + ((zeta * w0) / w2) * Math.sinh(w2 * t));
}

export function interpolate(
  input: number,
  inputRange: readonly number[],
  outputRange: readonly number[],
  options: { extrapolateLeft?: "clamp" | "extend"; extrapolateRight?: "clamp" | "extend" } = {},
): number {
  const last = inputRange.length - 1;
  let i = 0;
  while (i < last - 1 && input > inputRange[i + 1]) i++;
  const [a, b] = [inputRange[i], inputRange[i + 1]];
  const [c, d] = [outputRange[i], outputRange[i + 1]];
  if (input < inputRange[0] && options.extrapolateLeft === "clamp") return outputRange[0];
  if (input > inputRange[last] && options.extrapolateRight === "clamp") return outputRange[last];
  return c + ((input - a) / (b - a)) * (d - c);
}
