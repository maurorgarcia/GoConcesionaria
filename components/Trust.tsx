import { commitment, onboarding } from "@/content/landing";
import { Reveal } from "./Reveal";
import { Check, container, panelGreen, panelPad, sectionY } from "./ui";

/** Garantías y arranque en un solo panel verde: lo que transmite confianza. */
export function Trust() {
  return (
    <section id="garantias" aria-labelledby="garantia-title" className={`${sectionY} fx fx-c pat-dots`}>
      <div className={container}>
      <Reveal className={`${panelGreen} ${panelPad} defer-render flex flex-col gap-10`}>
        <div className="flex flex-col gap-6">
          <h2 id="garantia-title" className="text-center text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08]">
            {commitment.title}
          </h2>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {commitment.items.map((it) => (
              <li key={it.title} className="flex flex-col gap-2">
                <Check className="mb-1" />
                <h3 className="text-[17px] font-medium leading-snug">{it.title}</h3>
                <p className="text-[14.5px] text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 border-t border-[#2b2b2b] pt-8">
          <h2 className="text-center text-[22px] font-semibold">{onboarding.title}</h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {onboarding.items.map((it, i) => (
              <li key={it.title} className="flex gap-4">
                <span aria-hidden="true" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-bg">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16.5px] font-medium">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {it.title}
                  </h3>
                  <p className="text-[14.5px] text-muted">{it.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
    </section>
  );
}
