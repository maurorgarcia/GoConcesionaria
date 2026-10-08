import { onboarding, whatsapp } from "@/content/landing";
import { RemotionStage } from "./RemotionStage";
import { Reveal } from "./Reveal";
import { Arrow, btnPrimary, container, sectionY } from "./ui";
import { SectionBg } from "./SectionBg";

/** Cómo arrancás: animación de Remotion con los tres pasos, sin párrafos. */
export function Trust() {
  return (
    <section id="arranque" aria-labelledby="arranque-title" className={`${sectionY} relative isolate`}>
      <SectionBg kind="mesh" />
      <div className={`${container} flex flex-col items-center gap-10 py-6 md:py-10`}>
        <Reveal>
          <h2 id="arranque-title" className="text-center text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.05]">
            {onboarding.title}
          </h2>
        </Reveal>
        <Reveal className="w-full">
          <RemotionStage name="Onboarding" label={onboarding.posterLabel} className="mx-auto w-full max-w-[640px]" />
        </Reveal>
        <a href={whatsapp.link()} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} min-h-[52px] px-6 text-[16px]`}>
          Pedir una demo
          <Arrow />
        </a>
      </div>
    </section>
  );
}
