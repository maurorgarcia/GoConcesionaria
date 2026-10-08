import { cta, whatsapp } from "@/content/landing";
import { Arrow, container, WhatsAppIcon } from "./ui";
import { SectionBg } from "./SectionBg";

/** Cierre: un chat de WhatsApp listo para enviar. El botón abre la conversación real. */
export function CtaForm() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="relative isolate py-14 md:py-20">
      <SectionBg kind="particles" />
      <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <h2 id="demo-title" className="text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.05]">
            {cta.title}
          </h2>
          <p className="mx-auto max-w-[480px] text-[18px] text-muted lg:mx-0">{cta.text}</p>
        </div>
        <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-[#2b2b2b] bg-[#111111] p-4 shadow-[0_30px_80px_-30px_rgba(204,255,0,0.2)] lg:ml-auto lg:mr-0">
          <div className="flex items-center gap-3 border-b border-[#2b2b2b] pb-3">
            <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-bg">
              <WhatsAppIcon />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[16px] font-medium">GoConcesionaria</span>
              <span className="text-[13px] text-accent">Te respondemos por WhatsApp</span>
            </span>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <p className="max-w-[85%] self-start rounded-xl rounded-tl-sm bg-bubble px-4 py-2.5 text-[15px]">Hola, ¿qué querés ver en tu concesionaria?</p>
            <p className="max-w-[85%] self-end rounded-xl rounded-tr-sm bg-bubble-ai px-4 py-2.5 text-[15px]">{whatsapp.message}</p>
          </div>
          <a
            href={whatsapp.link()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-lg bg-accent text-[17px] font-semibold text-bg transition hover:brightness-110 active:scale-[0.98]"
          >
            {cta.button}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
