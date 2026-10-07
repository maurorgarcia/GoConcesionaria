import { problems } from "@/content/landing";
import { Reveal } from "./Reveal";
import { container, SectionHeading } from "./ui";

/** Franja corta con el dolor del cliente, antes de mostrar la solución. */
export function Problem() {
  return (
    <section aria-labelledby="problema-title" className="fx fx-b pat-diag py-10 md:py-12">
      <div className={`${container} flex flex-col gap-8`}>
        <Reveal>
          <SectionHeading id="problema-title" title={problems.title} />
        </Reveal>
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-3">
          {problems.items.map((p) => (
            <li key={p.title} className="flex flex-col gap-2 border-l-2 border-accent pl-5">
              <h3 className="text-[18px] font-medium">{p.title}</h3>
              <p className="text-[15.5px] text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
