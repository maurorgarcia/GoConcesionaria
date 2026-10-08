import { BRANCH_DURATION, BRANCH_H, BRANCH_POSTER } from "./Branches";
import { FLOW_DURATION, FLOW_H, FLOW_POSTER, FLOW_W, FLOWH_H, FLOWH_W } from "./FlowSteps";
import { ONB_DURATION, ONB_H, ONB_POSTER, ONB_W } from "./Onboarding";
import { QUAL_DURATION, QUAL_H, QUAL_POSTER } from "./LeadQualify";
import { STAGE_PAD, STAGE_W } from "./kit";
import { NIGHT_DURATION, NIGHT_H, NIGHT_POSTER } from "./NightLeads";
import { PIPE_DURATION, PIPE_H, PIPE_POSTER, PIPE_W } from "./PipelineLive";

export type CompositionName = "LeadQualify" | "FlowSteps" | "FlowStepsH" | "Onboarding" | "NightLeads" | "PipelineLive" | "Branches";

/** Medidas, duración y frame del póster de cada animación (fuente única para la página y para Remotion). */
type Spec = { width: number; height: number; duration: number; poster: number };

const CONTENT: Record<CompositionName, Spec> = {
  LeadQualify: { width: STAGE_W, height: QUAL_H, duration: QUAL_DURATION, poster: QUAL_POSTER },
  FlowSteps: { width: FLOW_W, height: FLOW_H, duration: FLOW_DURATION, poster: FLOW_POSTER },
  FlowStepsH: { width: FLOWH_W, height: FLOWH_H, duration: FLOW_DURATION, poster: FLOW_POSTER },
  Onboarding: { width: ONB_W, height: ONB_H, duration: ONB_DURATION, poster: ONB_POSTER },
  NightLeads: { width: STAGE_W, height: NIGHT_H, duration: NIGHT_DURATION, poster: NIGHT_POSTER },
  PipelineLive: { width: PIPE_W, height: PIPE_H, duration: PIPE_DURATION, poster: PIPE_POSTER },
  Branches: { width: STAGE_W, height: BRANCH_H, duration: BRANCH_DURATION, poster: BRANCH_POSTER },
};

/** Tamaño real de cada composición: el contenido más el margen de la escena. */
export const SPECS = Object.fromEntries(
  Object.entries(CONTENT).map(([k, v]) => [k, { ...v, width: v.width + STAGE_PAD * 2, height: v.height + STAGE_PAD * 2 }]),
) as Record<CompositionName, Spec>;
