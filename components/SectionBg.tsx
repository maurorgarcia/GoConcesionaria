"use client";

import { useEffect, useRef, useState } from "react";
import { DotPattern } from "./ui/dot-pattern";
import { GridPattern } from "./ui/grid-pattern";
import { MeshGradientBackground } from "./ui/mesh-gradient";
import { Particles } from "./ui/particles";
import { StarfieldBackground } from "./ui/starfield";

const LIME = "#ccff00";
const fill = "pointer-events-none absolute inset-0 bg-transparent";

/** Fondos de shadcn.io con los colores de la marca; cada uno se monta solo mientras su sección está cerca de la pantalla. */
const KINDS = {
  particles: () => <Particles className={fill} color={LIME} quantity={70} size={0.7} />,
  dots: () => <DotPattern className={fill} baseColor="#2b2b2b" glowColor={LIME} />,
  stars: () => <StarfieldBackground className={fill} starColor={LIME} count={220} speed={0.3} />,
  mesh: () => <MeshGradientBackground className={fill} backgroundColor="transparent" colors={[LIME, "#7dff3a", LIME, "#3aff9a"]} />,
  grid: () => <GridPattern className="fill-[#ccff00]/5 stroke-[#ccff00]/15 [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]" width={48} height={48} />,
};

export function SectionBg({ kind }: { kind: keyof typeof KINDS }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {on ? KINDS[kind]() : null}
    </div>
  );
}
