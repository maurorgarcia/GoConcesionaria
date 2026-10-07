"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { stories } from "@/content/landing";
import { RemotionStage } from "./RemotionStage";
import { Reveal } from "./Reveal";
import { Check, container, panelNeutral, panelPad, SectionHeading, sectionY } from "./ui";

/** Tres casos en pestañas: una sola animación a la vez (menos scroll y menos carga). */
export function Cases() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = stories.items[active];

  function onKeyDown(e: KeyboardEvent) {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + stories.items.length) % stories.items.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="casos" aria-labelledby="casos-title" className={`${sectionY} fx fx-a pat-rings`}>
      <div className={container}>
      <Reveal className={`${panelNeutral} ${panelPad} flex flex-col gap-8`}>
        <div className="flex flex-col items-center gap-6">
          <SectionHeading id="casos-title" title={stories.title} subtitle={stories.subtitle} />
          <div role="tablist" aria-label="Casos" onKeyDown={onKeyDown} className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {stories.items.map((it, i) => (
              <button
                key={it.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`caso-tab-${it.id}`}
                aria-selected={i === active}
                aria-controls="caso-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`min-h-11 shrink-0 rounded-lg border px-4 text-[15px] font-medium transition-colors ${i === active ? "border-accent bg-bg text-fg" : "border-line text-muted hover:text-fg"}`}
              >
                {it.tab}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id="caso-panel" aria-labelledby={`caso-tab-${s.id}`} className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
          <div className="flex flex-col gap-5">
            <h3 className="text-[clamp(24px,2.8vw,34px)] font-semibold leading-[1.1]">{s.title}</h3>
            <p className="max-w-[520px] text-[17px] text-muted">{s.text}</p>
            <ul className="flex flex-col gap-3">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[16.5px]">
                  <Check className="mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <RemotionStage key={s.id} name={s.anim} label={s.label} className="mx-auto w-full max-w-[380px]" />
            <p className="mx-auto w-full max-w-[380px] text-[13px] text-muted">{s.caption}</p>
          </div>
        </div>
      </Reveal>
    </div>
    </section>
  );
}
