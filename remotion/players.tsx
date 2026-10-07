"use client";

import React, { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { Branches, FlowSteps, LeadQualify, NightLeads, PipelineLive } from "./compositions";
import { SPECS, type CompositionName } from "./specs";
import { FPS } from "./tokens";

const COMPONENTS = { LeadQualify, FlowSteps, NightLeads, PipelineLive, Branches } as const;

/**
 * Se carga con dynamic import (ssr: false) desde RemotionStage.
 * Arranca en el frame del póster para que el cambio de póster a video sea invisible.
 */
export default function StagePlayer({
  name,
  playing,
  onReady,
  onFrame,
  seek,
}: {
  name: CompositionName;
  playing: boolean;
  onReady: () => void;
  onFrame?: (frame: number) => void;
  /** Cambiar `n` salta al frame indicado y reproduce desde ahí. */
  seek?: { frame: number; n: number };
}) {
  const ref = useRef<PlayerRef>(null);
  const spec = SPECS[name];

  useEffect(() => {
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const player = ref.current;
    if (!player || !onFrame) return;
    const handler = (e: { detail: { frame: number } }) => onFrame(e.detail.frame);
    player.addEventListener("frameupdate", handler);
    return () => player.removeEventListener("frameupdate", handler);
  }, [onFrame]);

  useEffect(() => {
    if (!seek || seek.n === 0) return;
    ref.current?.seekTo(seek.frame);
    ref.current?.play();
  }, [seek]);

  useEffect(() => {
    if (playing) ref.current?.play();
    else ref.current?.pause();
  }, [playing]);

  return (
    <Player
      ref={ref}
      component={COMPONENTS[name]}
      durationInFrames={spec.duration}
      compositionWidth={spec.width}
      compositionHeight={spec.height}
      fps={FPS}
      initialFrame={spec.poster}
      autoPlay
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      acknowledgeRemotionLicense
      style={{ width: "100%", height: "100%" }}
    />
  );
}
