import React from "react";
import { useCurrentFrame } from "remotion";
import { BranchesView } from "./Branches";
import { FlowStepsView } from "./FlowSteps";
import { LeadQualifyView } from "./LeadQualify";
import { OnboardingView } from "./Onboarding";
import { NightLeadsView } from "./NightLeads";
import { PipelineLiveView } from "./PipelineLive";

/** Wrappers de composición: leen el frame actual de Remotion y delegan en las vistas puras. */
export const LeadQualify: React.FC = () => <LeadQualifyView frame={useCurrentFrame()} />;
export const FlowSteps: React.FC = () => <FlowStepsView frame={useCurrentFrame()} />;
export const Onboarding: React.FC = () => <OnboardingView frame={useCurrentFrame()} />;
export const FlowStepsH: React.FC = () => <FlowStepsView frame={useCurrentFrame()} horizontal />;
export const NightLeads: React.FC = () => <NightLeadsView frame={useCurrentFrame()} />;
export const PipelineLive: React.FC = () => <PipelineLiveView frame={useCurrentFrame()} />;
export const Branches: React.FC = () => <BranchesView frame={useCurrentFrame()} />;
