import { BRANCH_DURATION, BRANCH_H, BRANCH_POSTER } from "./Branches";
import { FLOW_DURATION, FLOW_H, FLOW_POSTER, FLOW_W } from "./FlowSteps";
import { QUAL_DURATION, QUAL_H, QUAL_POSTER } from "./LeadQualify";
import { STAGE_W } from "./kit";
import { NIGHT_DURATION, NIGHT_H, NIGHT_POSTER } from "./NightLeads";
import { PIPE_DURATION, PIPE_H, PIPE_POSTER, PIPE_W } from "./PipelineLive";

export type CompositionName = "LeadQualify" | "FlowSteps" | "NightLeads" | "PipelineLive" | "Branches";

/** Medidas, duración y frame del póster de cada animación (fuente única para la página y para Remotion). */
export const SPECS: Record<CompositionName, { width: number; height: number; duration: number; poster: number }> = {
  LeadQualify: { width: STAGE_W, height: QUAL_H, duration: QUAL_DURATION, poster: QUAL_POSTER },
  FlowSteps: { width: FLOW_W, height: FLOW_H, duration: FLOW_DURATION, poster: FLOW_POSTER },
  NightLeads: { width: STAGE_W, height: NIGHT_H, duration: NIGHT_DURATION, poster: NIGHT_POSTER },
  PipelineLive: { width: PIPE_W, height: PIPE_H, duration: PIPE_DURATION, poster: PIPE_POSTER },
  Branches: { width: STAGE_W, height: BRANCH_H, duration: BRANCH_DURATION, poster: BRANCH_POSTER },
};
