import { hero, whatsapp } from "@/content/landing";
import { RemotionStage } from "./RemotionStage";
import { Arrow, btnGhost, btnPrimary, Check, container } from "./ui";

export function Hero() {
  const [first, mid, emphasis, end] = hero.titleParts;
  return (
    <section id="inicio" aria-labelledby="hero-title" className="fx fx-hero pat-grid">
      <div className={`${container} grid items-center gap-10 pb-12 pt-8 md:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-16`}>
        <div className="flex min-w-0 flex-col gap-6">
          <h1 id="hero-title" className="text-[clamp(38px,5.2vw,68px)] font-semibold leading-[1]">
            {first}
            <span className="text-muted">
              {mid}
              <span className="text-accent">{emphasis}</span>
              {end}
            </span>
          </h1>
          <p className="max-w-[560px] text-[18px] text-muted">{hero.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={whatsapp.link()} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} min-h-[52px] px-6 text-[16px]`}>
              {hero.primaryCta}
              <Arrow />
            </a>
            <a href="#como-funciona" className={`${btnGhost} min-h-[52px] px-6 text-[16px]`}>
              {hero.secondaryCta}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted">
            {hero.benefits.map((b) => (
              <li key={b.title} className="flex items-center gap-2">
                <Check className="h-[18px] w-[18px]" />
                {b.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <RemotionStage name="LeadQualify" label={hero.posterLabel} eager className="mx-auto w-full max-w-[440px] lg:ml-auto" />
          <p className="mx-auto w-full max-w-[440px] text-[13px] text-muted lg:ml-auto">{hero.caption}</p>
        </div>
      </div>
    </section>
  );
}
