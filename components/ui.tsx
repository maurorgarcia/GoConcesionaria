import type { ReactNode } from "react";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent font-medium text-bg transition hover:bg-[#d6ff33] active:scale-[0.98]";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(245,245,245,0.16)] font-medium transition hover:border-[rgba(245,245,245,0.3)] hover:bg-surface active:scale-[0.98]";

export const container = "mx-auto w-full max-w-[1200px] px-5 md:px-6";

/**
 * Cada sección es un panel redondeado sobre el fondo de la página: se separan por
 * color sin cambiar el fondo de lado a lado. "neutral" usa la superficie de la marca;
 * "green" usa el verde oscuro de la marca para lo que transmite confianza.
 */
export const panelNeutral = "";
export const panelGreen = "";
export const panelPad = "";

/** Espacio vertical entre bloques de la página. */
export const sectionY = "py-10 md:py-14";

export function WhatsAppIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.4L3 21z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5z" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Check({ className = "", stroke = "var(--color-accent)" }: { className?: string; stroke?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3.5 9.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[21px] font-semibold tracking-tight ${className}`}>
      <Isotype />
      <span>
        Go<span className="font-normal text-muted">Concesionaria</span>
      </span>
    </span>
  );
}

export function Isotype({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <rect width="30" height="30" rx="8" fill="var(--color-accent)" />
      <path d="M8 15h13M16 9.5l5.5 5.5-5.5 5.5" stroke="#0A0A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Encabezado de sección: título y subtítulo, alineados a la izquierda. */
export function SectionHeading({
  title,
  subtitle,
  id,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center ${className}`}>
      <h2 id={id} className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08]">
        {title}
      </h2>
      {subtitle ? <p className="max-w-[600px] text-[17px] text-muted">{subtitle}</p> : null}
    </div>
  );
}
