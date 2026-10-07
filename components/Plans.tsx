import { plans, whatsapp } from "@/content/landing";
import { Reveal } from "./Reveal";
import { Arrow, btnGhost, btnPrimary, Check, container, SectionHeading, sectionY } from "./ui";

export function Plans() {
  return (
    <section id="planes" aria-labelledby="planes-title" className={`${sectionY} fx fx-a pat-rings-l`}>
      <div className={container}>
      <div className="defer-render flex flex-col gap-8 ">
        <Reveal>
          <SectionHeading id="planes-title" title={plans.title} subtitle={plans.subtitle} />
        </Reveal>
        <ul className="grid items-stretch gap-4 md:grid-cols-3">
          {plans.items.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 70}
              className={`flex flex-col gap-5 rounded-2xl bg-surface p-7 ${p.featured ? "border border-accent" : "border border-line"}`}
            >
              <div className="flex min-h-8 items-center justify-between gap-3">
                <h3 className="text-[22px] font-medium">{p.name}</h3>
                {p.featured ? <span className="rounded-md bg-[rgba(204,255,0,0.12)] px-2.5 py-1 text-[13px] font-medium text-accent">Recomendado</span> : null}
              </div>
              <p className="text-[15px] text-muted">{p.description}</p>
              <span className="text-[34px] font-semibold leading-none tracking-tight">{p.price}</span>
              <ul className="flex flex-grow flex-col gap-2.5 border-t border-line pt-5 text-[15px]">
                {p.features.map((ft) => (
                  <li key={ft} className="flex gap-2.5">
                    <Check className="mt-0.5 shrink-0" />
                    {ft}
                  </li>
                ))}
              </ul>
              <a href={whatsapp.link(`Hola! Quiero info del plan ${p.name} de GoConcesionaria.`)} target="_blank" rel="noopener noreferrer" className={`${p.featured ? btnPrimary : btnGhost} min-h-12 px-5`}>
                {p.cta}
                <Arrow />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
    </section>
  );
}
