import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "GoConcesionaria: ningún lead se enfría";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "godreamai-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#F5F5F5",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="8" fill="#CCFF00" />
            <path d="M8 15h13M16 9.5l5.5 5.5-5.5 5.5" stroke="#0A0A0A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700 }}>
            Go<span style={{ color: "#B0B0B0", fontWeight: 400 }}>Concesionaria</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            Ningún lead se enfría.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#B0B0B0" }}>
            CRM con inteligencia artificial para concesionarias
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "#B0B0B0" }}>
          Un producto de
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={116} height={60} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
