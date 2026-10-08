import Image from "next/image";
import { footer, nav, whatsapp } from "@/content/landing";
import { container, WhatsAppIcon } from "./ui";

const linkCls = "text-[15px] text-muted transition-colors hover:text-fg";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(245,245,245,0.12)] bg-bg">
      <div className={`${container} grid grid-cols-2 gap-x-6 gap-y-10 py-10 text-center md:grid-cols-[1.6fr_1fr_1fr] md:text-left md:gap-x-16 md:py-14`}>
        <div className="col-span-2 flex flex-col items-center gap-4 md:col-span-1 md:items-start">
          <a href="https://www.godreamai.com/" target="_blank" rel="noopener noreferrer" aria-label="GODREAMAI, ir al sitio" className="inline-flex">
            <Image src="/godreamai-white.png" alt="GODREAMAI" width={584} height={302} className="h-8 w-auto" />
          </a>
          <p className="max-w-[340px] text-[15px] text-muted">{footer.tagline}</p>
          <p className="text-[14.5px] text-muted">
            <span className="font-semibold text-fg">GoConcesionaria</span>, un producto de GODREAMAI.
          </p>
        </div>
        <nav aria-label="Secciones" className="col-span-2 flex flex-col items-center gap-3 sm:col-span-1 md:items-start">
          <h2 className="text-[15px] font-semibold">Producto</h2>
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className={`${linkCls} w-fit`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="col-span-2 flex flex-col items-center gap-3 sm:col-span-1 md:items-start">
          <h2 className="text-[15px] font-semibold">Contacto</h2>
          <a href={whatsapp.link()} target="_blank" rel="noopener noreferrer" className={`${linkCls} flex w-fit items-center gap-2.5`}>
            <WhatsAppIcon />
            WhatsApp
          </a>
          <a href="https://www.instagram.com/godreamai.ar/" target="_blank" rel="noopener noreferrer" className={`${linkCls} flex w-fit items-center gap-2.5`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" />
            </svg>
            Instagram
          </a>
          <a href="mailto:go@godreamai.com" className={`${linkCls} w-fit`}>
            go@godreamai.com
          </a>
          <span className="text-[15px] text-muted">Buenos Aires, Argentina</span>
        </div>
      </div>
      <div className="border-t border-line">
        <p className={`${container} py-6 pb-8 text-center text-sm text-muted md:text-left`}>{footer.copyright}</p>
      </div>
    </footer>
  );
}
