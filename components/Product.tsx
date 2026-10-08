import { includes } from "@/content/landing";
import { Reveal } from "./Reveal";
import { Check, container, SectionHeading, sectionY } from "./ui";
import { SectionBg } from "./SectionBg";

/** Lo que incluye: título, subtítulo y checks. */
export function Product() {
  return (
    <section aria-labelledby="producto-title" className={`${sectionY} relative isolate`}>
      <SectionBg kind="grid" />
      <div className={`${container} flex flex-col gap-10`}>
        <Reveal>
          <SectionHeading id="producto-title" title={includes.title} subtitle={includes.subtitle} />
        </Reveal>
        <ul className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-3">
          {includes.items.map((it) => (
            <li key={it.title} className="flex items-center gap-3 rounded-full border border-line bg-surface/80 px-5 py-3">
              <Check className="shrink-0" />
              <span className="text-[17px] font-medium">{it.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
