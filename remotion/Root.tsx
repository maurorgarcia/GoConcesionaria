import React from "react";
import { Composition } from "remotion";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { Branches, FlowSteps, FlowStepsH, LeadQualify, NightLeads, Onboarding, PipelineLive } from "./compositions";
import { SPECS } from "./specs";
import { FPS } from "./tokens";

// Solo se usa en Remotion Studio y al renderizar a video; en la página
// las fuentes llegan por next/font (variable --font-geist).
loadGeist("normal", { weights: ["400", "500", "600", "700"] });

const comps = { LeadQualify, FlowSteps, FlowStepsH, NightLeads, Onboarding, PipelineLive, Branches } as const;

export const RemotionRoot: React.FC = () => (
  <>
    {(Object.keys(comps) as (keyof typeof comps)[]).map((id) => (
      <Composition
        key={id}
        id={id}
        component={comps[id]}
        durationInFrames={SPECS[id].duration}
        fps={FPS}
        width={SPECS[id].width}
        height={SPECS[id].height}
      />
    ))}
  </>
);
