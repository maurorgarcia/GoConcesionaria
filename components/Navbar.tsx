import { nav, whatsapp } from "@/content/landing";
import Image from "next/image";
import { Arrow, btnPrimary, container } from "./ui";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(10,10,10,0.96)]">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-4 gap-y-0 py-3`}>
        <a href="#inicio" aria-label="GODREAMAI, ir al inicio" className="inline-flex min-h-11 items-center">
          <Image src="/godreamai-white.png" alt="GODREAMAI" width={584} height={302} priority className="h-10 w-auto" />
        </a>
        <nav aria-label="Principal" className="order-3 -mx-3 flex w-full flex-wrap items-center text-[15px] text-muted lg:order-none lg:mx-0 lg:w-auto lg:gap-1">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center px-3 transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={whatsapp.link()} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} min-h-11 px-4 text-[15px]`}>
          {nav.cta}
          <Arrow />
        </a>
      </div>
    </header>
  );
}
