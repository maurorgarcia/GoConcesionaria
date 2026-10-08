"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { BranchesView } from "@/remotion/Branches";
import { FlowStepsView } from "@/remotion/FlowSteps";
import { LeadQualifyView } from "@/remotion/LeadQualify";
import { NightLeadsView } from "@/remotion/NightLeads";
import { OnboardingView } from "@/remotion/Onboarding";
import { PipelineLiveView } from "@/remotion/PipelineLive";
import { SPECS, type CompositionName } from "@/remotion/specs";

// Remotion Player: solo en el cliente, nunca en el bundle inicial.
const StagePlayer = dynamic(() => import("@/remotion/players"), { ssr: false });

/** Vistas puras: el póster estático se dibuja sin cargar Remotion. */
const POSTERS: Record<CompositionName, () => ReactNode> = {
  LeadQualify: () => <LeadQualifyView frame={SPECS.LeadQualify.poster} />,
  FlowSteps: () => <FlowStepsView frame={SPECS.FlowSteps.poster} />,
  FlowStepsH: () => <FlowStepsView frame={SPECS.FlowStepsH.poster} horizontal />,
  Onboarding: () => <OnboardingView frame={SPECS.Onboarding.poster} />,
  NightLeads: () => <NightLeadsView frame={SPECS.NightLeads.poster} />,
  PipelineLive: () => <PipelineLiveView frame={SPECS.PipelineLive.poster} />,
  Branches: () => <BranchesView frame={SPECS.Branches.poster} />,
};

function useMedia(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Momento (compartido por todas las animaciones) a partir del cual el Player puede arrancar. */
let idleAt: number | null = null;
const IDLE_DELAY = 2500;

export function RemotionStage({
  name,
  label,
  className,
  eager = false,
  onFrame,
  seek,
}: {
  name: CompositionName;
  label: string;
  className?: string;
  /** Dibuja el póster en el HTML inicial (usar solo en lo que se ve al cargar). */
  eager?: boolean;
  onFrame?: (frame: number) => void;
  seek?: { frame: number; n: number };
}) {
  const { width, height } = SPECS[name];
  const reduced = useMedia("(prefers-reduced-motion: reduce)", true);
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [idle, setIdle] = useState(false);
  const [ready, setReady] = useState(false);

  // El Player no compite con el primer render: espera a que cargue la página y haya tiempo libre.
  useEffect(() => {
    let timer = 0;
    const arm = () => {
      if (idleAt === null) idleAt = performance.now() + IDLE_DELAY;
      timer = window.setTimeout(() => setIdle(true), Math.max(0, idleAt - performance.now()));
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      window.clearTimeout(timer);
    };
  }, []);

  // El póster se dibuja al acercarse (lejos no cuesta nada); el video corre solo mientras se ve.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ioNear = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "700px" });
    const ioView = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    ioNear.observe(el);
    ioView.observe(el);
    return () => {
      ioNear.disconnect();
      ioView.disconnect();
    };
  }, []);

  const showPoster = eager || near;
  const mountPlayer = near && idle && !reduced;

  return (
    <div ref={ref} role="img" aria-label={label} className={`stage ${className ?? ""}`}>
      <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {showPoster ? (
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="absolute inset-0 h-full w-full"
            style={{ visibility: ready ? "hidden" : "visible" }}
            aria-hidden="true"
            focusable="false"
          >
            <foreignObject width={width} height={height}>
              {POSTERS[name]()}
            </foreignObject>
          </svg>
        ) : null}
        {mountPlayer ? (
          <div className="absolute inset-0">
            <StagePlayer name={name} playing={inView} onReady={() => setReady(true)} onFrame={onFrame} seek={seek} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
