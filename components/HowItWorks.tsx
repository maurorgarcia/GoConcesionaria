"use client";

import { useCallback, useState } from "react";
import { steps } from "@/content/landing";
import { flowStepFrame, flowStepsLit } from "@/remotion/FlowSteps";
import { RemotionStage } from "./RemotionStage";
import { Reveal } from "./Reveal";
import { container, panelNeutral, panelPad, SectionHeading, sectionY } from "./ui";

export function HowItWorks() {
  // null = sin animación en curso (póster / reduced motion)
  const [lit, setLit] = useState<number | null>(null);
  const [seek, setSeek] = useState({ frame: 0, n: 0 });
  const onFrame = useCallback((frame: number) => setLit(flowStepsLit(frame)), []);
  const current = lit === null ? null : Math.max(0, lit - 1);

  return (
    <section id="como-funciona" aria-labelledby="como-title" className={`${sectionY} fx fx-b pat-dots`}>
      <div className={container}>
      <Reveal className={`${panelNeutral} ${panelPad} grid items-center gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-14`}>
          <SectionHeading id="como-title" title={steps.title} subtitle={steps.subtitle} className="lg:col-span-2" />
        <div className="flex flex-col gap-6">
          <ol className="flex flex-col gap-1">
            {steps.items.map((s, i) => {
              const active = current === i;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setSeek((p) => ({ frame: flowStepFrame(i), n: p.n + 1 }))}
                    aria-label={`Ver el paso ${i + 1} en la animación: ${s.title}`}
                    aria-current={active ? "step" : undefined}
                    className={`flex min-h-11 w-full items-start gap-4 rounded-xl p-3 text-left transition-colors ${active ? "bg-bg" : "hover:bg-bg/60"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold transition-colors duration-300 ${active || current === null ? "bg-accent text-bg" : "bg-chip text-muted"}`}
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[18px] font-medium">{s.title}</span>
                      <span className="text-[15px] text-muted">{s.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <RemotionStage name="FlowSteps" label={steps.posterLabel} onFrame={onFrame} seek={seek} className="mx-auto w-full max-w-[340px]" />
      </Reveal>
    </div>
    </section>
  );
}
