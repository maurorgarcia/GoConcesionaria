import Image from "next/image";
import { includes, screen } from "@/content/landing";
import { Reveal } from "./Reveal";
import { Check, container, SectionHeading, sectionY } from "./ui";

/** El CRM real en grande, y debajo lo que incluye. */
export function Product() {
  return (
    <section aria-labelledby="producto-title" className={`${sectionY} fx fx-b pat-diag defer-render`}>
      <div className={`${container} flex flex-col gap-10`}>
        <Reveal>
          <SectionHeading id="producto-title" title={includes.title} subtitle={includes.subtitle} />
        </Reveal>
        <Reveal className="flex flex-col gap-3">
          <div className="mx-auto w-full max-w-[1040px] overflow-hidden rounded-2xl border border-[rgba(245,245,245,0.14)] bg-bg shadow-[0_30px_80px_-20px_rgba(204,255,0,0.18)]">
            <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5" aria-hidden="true">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-md bg-bg px-3 py-1 text-[12.5px] text-muted">goconcesionaria.godreamai.com/leads</span>
            </div>
            <Image src="/crm-leads.webp" alt={screen.alt} width={1440} height={900} sizes="(min-width: 1080px) 1040px, 100vw" className="h-auto w-full" />
          </div>
          <p className="text-center text-[13px] text-muted">{screen.caption}</p>
        </Reveal>
        <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {includes.items.map((it) => (
            <li key={it.title} className="flex gap-3">
              <Check className="mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <h3 className="text-[17px] font-medium">{it.title}</h3>
                <p className="text-[14.5px] text-muted">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
