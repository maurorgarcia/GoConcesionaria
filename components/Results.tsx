"use client";

import { useEffect, useRef, useState } from "react";
import { results, type Metric } from "@/content/landing";
import { Reveal } from "./Reveal";
import { container, SectionHeading } from "./ui";

/** Muestra el placeholder mientras no haya dato real; con dato, cuenta hasta él al entrar en pantalla. */
function Counter({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const target = metric.value;

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref} className="font-display text-[clamp(44px,6vw,56px)] font-semibold leading-none text-accent">
      {target === null ? metric.placeholder : `${n}${metric.suffix}`}
    </span>
  );
}

export function Results() {
  return (
    <section aria-labelledby="resultados" className={`defer-render ${container} flex flex-col gap-12 py-20 md:py-[104px]`}>
      <Reveal>
        <SectionHeading id="resultados" title={results.title} />
      </Reveal>
      <ul className="grid gap-5 md:grid-cols-3">
        {results.items.map((m, i) => (
          <Reveal as="li" key={m.label} delay={i * 80} className="flex flex-col gap-2 rounded-[20px] border border-dashed border-line p-7">
            <Counter metric={m} />
            <span className="text-base text-muted">{m.label}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
