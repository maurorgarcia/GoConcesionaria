import { steps } from "@/content/landing";
import { RemotionStage } from "./RemotionStage";
import { Reveal } from "./Reveal";
import { container, SectionHeading, sectionY } from "./ui";
import { SectionBg } from "./SectionBg";

/** Título y la animación del flujo: horizontal en pantallas grandes, vertical en mobile. */
export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className={`${sectionY} relative isolate`}>
      <SectionBg kind="dots" />
      <div className={`${container} flex flex-col gap-10`}>
        <Reveal>
          <SectionHeading id="como-title" title={steps.title} subtitle={steps.subtitle} />
        </Reveal>
        <Reveal>
          <RemotionStage name="FlowSteps" label={steps.posterLabel} className="mx-auto w-full max-w-[280px] md:hidden" />
          <RemotionStage name="FlowStepsH" label={steps.posterLabel} className="mx-auto hidden w-full max-w-[920px] md:block" />
        </Reveal>
      </div>
    </section>
  );
}
