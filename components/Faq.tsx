import { faq, whatsapp } from "@/content/landing";
import { Reveal } from "./Reveal";
import { Arrow, btnGhost, container, sectionY } from "./ui";
import { SectionBg } from "./SectionBg";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`${sectionY} relative isolate`}>
      <SectionBg kind="dots" />
      <div className={`${container} flex flex-col items-center gap-8`}>
        <Reveal className="flex max-w-[640px] flex-col items-center gap-3 text-center">
          <h2 id="faq-title" className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08]">
            {faq.title}
          </h2>
          <p className="text-[17px] text-muted">{faq.aside}</p>
        </Reveal>
        <div className="w-full max-w-[760px] divide-y divide-line border-y border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-[17px] font-medium">
                {item.q}
                <svg className="plus shrink-0" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M11 3v16M3 11h16" />
                </svg>
              </summary>
              <p className="faq-body pb-5 pr-10 text-[15.5px] text-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <a href={whatsapp.link("Hola! Tengo una duda sobre GoConcesionaria.")} target="_blank" rel="noopener noreferrer" className={`${btnGhost} min-h-12 px-5`}>
          Preguntanos por WhatsApp
          <Arrow />
        </a>
      </div>
    </section>
  );
}
