"use client";

import { useEffect, useState } from "react";
import { nav, whatsapp } from "@/content/landing";
import Image from "next/image";
import { Arrow, btnPrimary, container } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(10,10,10,0.96)]">
      <div className={`${container} flex items-center justify-between gap-3 py-3`}>
        <a href="#inicio" aria-label="GODREAMAI, ir al inicio" className="inline-flex min-h-11 items-center">
          <Image src="/godreamai-white.png" alt="GODREAMAI" width={584} height={302} priority className="h-7 w-auto" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-1 text-[15px] text-muted lg:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex min-h-11 items-center px-3 transition hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsapp.link()} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} max-lg:hidden min-h-11 px-4 text-[15px]`}>
            {nav.cta}
            <Arrow />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(245,245,245,0.16)] lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-mobile" aria-label="Menú" className="border-t border-line lg:hidden">
          <ul className={`${container} flex flex-col py-2`}>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-[17px] text-muted transition hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={`${container} pb-4 pt-2`}>
            <a href={whatsapp.link()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={`${btnPrimary} min-h-12 w-full px-4 text-[16px]`}>
              {nav.cta}
              <Arrow />
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
