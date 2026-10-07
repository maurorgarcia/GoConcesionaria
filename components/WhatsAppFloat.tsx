import { whatsapp } from "@/content/landing";
import { WhatsAppIcon } from "./ui";

/** Botón flotante de WhatsApp, fijo abajo a la derecha. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsapp.link("Hola! Quiero info de GoConcesionaria.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition hover:scale-105 hover:bg-[#d6ff33] active:scale-95 md:bottom-6 md:right-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
