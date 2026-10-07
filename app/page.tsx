import { Cases } from "@/components/Cases";
import { CtaForm } from "@/components/CtaForm";
import { Faq } from "@/components/Faq";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Problem } from "@/components/Problem";
import { DemoChat } from "@/components/DemoChat";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Plans } from "@/components/Plans";
import { Product } from "@/components/Product";
import { Trust } from "@/components/Trust";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-bg"
      >
        Saltar al contenido
      </a>
      <JsonLd />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Problem />
        <HowItWorks />
        <Cases />
        <DemoChat />
        <Product />
        <Trust />
        <Plans />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
