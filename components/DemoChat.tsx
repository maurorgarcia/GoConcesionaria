"use client";

import { useEffect, useRef, useState } from "react";
import { demo } from "@/content/landing";
import { Reveal } from "./Reveal";
import { container, SectionHeading, sectionY } from "./ui";

type Msg = { from: "client" | "ai"; text: string };
type Temp = "Frío" | "Tibio" | "Caliente";

const TEMP_STYLE: Record<Temp, string> = {
  Frío: "bg-chip text-muted",
  Tibio: "bg-[rgba(245,245,245,0.12)] text-fg",
  Caliente: "bg-[rgba(204,255,0,0.16)] text-accent",
};

/** Demo interactiva guiada: el visitante elige qué responde el "cliente" y ve cómo la IA arma la ficha. Todo corre en el navegador. */
export function DemoChat() {
  const [car, setCar] = useState<(typeof demo.cars)[number] | null>(null);
  const [pay, setPay] = useState<(typeof demo.payments)[number] | null>(null);
  const [trade, setTrade] = useState<(typeof demo.trades)[number] | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const step = !car ? 0 : !pay ? 1 : !trade ? 2 : 3;
  const temp: Temp = !car ? "Frío" : !pay ? "Tibio" : trade?.hot || pay.hot ? "Caliente" : "Tibio";

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  function say(client: string, ai: string, apply: () => void) {
    if (typing) return;
    apply();
    setMsgs((m) => [...m, { from: "client", text: client }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { from: "ai", text: ai }]);
      setTyping(false);
    }, 800);
  }

  function reset() {
    clearTimeout(timer.current);
    setCar(null);
    setPay(null);
    setTrade(null);
    setMsgs([]);
    setTyping(false);
  }

  return (
    <section id="probalo" aria-labelledby="probalo-title" className={`${sectionY} fx fx-a pat-grid defer-render`}>
      <div className={`${container} flex flex-col gap-10`}>
        <Reveal>
          <SectionHeading id="probalo-title" title={demo.title} subtitle={demo.subtitle} />
        </Reveal>

        <div className="mx-auto grid w-full max-w-[980px] gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Chat */}
          <div className="flex min-h-[420px] flex-col rounded-2xl border border-[#2b2b2b] bg-[#111111] p-4">
            <div className="flex items-center gap-3 border-b border-[#2b2b2b] pb-3">
              <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-bg">
                G
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[15.5px] font-medium">Asistente de la concesionaria</span>
                <span className="text-[12.5px] text-accent">En línea · responde en segundos</span>
              </span>
            </div>

            <div ref={log} role="log" aria-live="polite" aria-label="Conversación de ejemplo" className="flex max-h-[300px] min-h-[200px] flex-1 flex-col gap-2 overflow-y-auto py-4">
              {msgs.length === 0 ? <p className="m-auto max-w-[260px] text-center text-[14.5px] text-muted">Elegí un mensaje de abajo para empezar la conversación.</p> : null}
              {msgs.map((m, i) => (
                <p key={i} className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[15px] ${m.from === "client" ? "self-end rounded-tr-sm bg-bubble" : "self-start rounded-tl-sm bg-bubble-ai"}`}>
                  {m.text}
                </p>
              ))}
              {typing ? (
                <p className="typing flex items-center gap-1 self-start rounded-xl rounded-tl-sm bg-bubble-ai px-4 py-3" aria-label="La IA está escribiendo">
                  <i className="h-1.5 w-1.5 rounded-full bg-fg" />
                  <i className="h-1.5 w-1.5 rounded-full bg-fg" />
                  <i className="h-1.5 w-1.5 rounded-full bg-fg" />
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-[#2b2b2b] pt-3">
              {step === 0 &&
                demo.cars.map((c) => (
                  <Chip key={c.name} disabled={typing} onClick={() => say(c.ask, c.reply, () => setCar(c))}>
                    {c.ask}
                  </Chip>
                ))}
              {step === 1 &&
                demo.payments.map((p) => (
                  <Chip key={p.name} disabled={typing} onClick={() => say(p.ask, demo.tradeQuestion, () => setPay(p))}>
                    {p.ask}
                  </Chip>
                ))}
              {step === 2 &&
                demo.trades.map((t) => (
                  <Chip key={t.name} disabled={typing} onClick={() => say(t.ask, demo.closing, () => setTrade(t))}>
                    {t.ask}
                  </Chip>
                ))}
              {step === 3 ? (
                <button type="button" onClick={reset} className="min-h-11 rounded-lg border border-[rgba(245,245,245,0.16)] px-4 text-[15px] font-medium transition hover:bg-surface">
                  Probar otro caso
                </button>
              ) : null}
            </div>
          </div>

          {/* Ficha del lead */}
          <div className={`flex flex-col gap-4 rounded-2xl border bg-surface p-5 transition-colors ${step === 3 ? "border-accent" : "border-line"}`} aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[19px] font-semibold">Ficha del lead</h3>
              <span className={`rounded-md px-2.5 py-1 text-[13px] font-medium transition-colors ${TEMP_STYLE[temp]}`}>{temp}</span>
            </div>
            <dl className="flex flex-col gap-3 text-[15.5px]">
              <Row label="Interés" value={car?.name} />
              <Row label="Forma de pago" value={pay?.name} />
              <Row label="Permuta" value={trade?.name} />
            </dl>
            <p className="mt-auto text-[13.5px] text-muted">
              {step === 3 ? "Tu vendedor recibe esta ficha y la conversación completa, listo para llamar." : "La ficha se completa sola, a medida que el cliente responde."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ children, onClick, disabled }: { children: string; onClick: () => void; disabled: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="min-h-11 rounded-lg border border-accent/50 px-3.5 text-left text-[14.5px] font-medium text-fg transition hover:bg-[rgba(204,255,0,0.12)] disabled:opacity-50">
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <dt className="text-muted">{label}</dt>
      <dd className={value ? "text-right font-medium" : "text-right text-muted"}>{value ?? "—"}</dd>
    </div>
  );
}
