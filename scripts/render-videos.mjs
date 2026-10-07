// Renderiza cada composición de /remotion a MP4 y WebM en /public/videos.
// Uso: npm run render:videos   (opcional: npm run render:videos -- LeadQualify NightLeads)
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "videos");
const ALL = ["LeadQualify", "FlowSteps", "NightLeads", "PipelineLive", "Branches"];
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

const formats = [
  { ext: "mp4", codec: "h264", extra: { pixelFormat: "yuv420p" } },
  { ext: "webm", codec: "vp8", extra: {} },
];

await fs.mkdir(outDir, { recursive: true });

console.log("Empaquetando composiciones…");
const serveUrl = await bundle({ entryPoint: path.join(root, "remotion", "index.ts") });

for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id });
  for (const { ext, codec, extra } of formats) {
    const outputLocation = path.join(outDir, `${id}.${ext}`);
    let last = -1;
    await renderMedia({
      composition,
      serveUrl,
      codec,
      outputLocation,
      ...extra,
      onProgress: ({ progress }) => {
        const pct = Math.floor(progress * 10) * 10;
        if (pct !== last) {
          last = pct;
          process.stdout.write(`\r${id}.${ext} ${pct}%   `);
        }
      },
    });
    process.stdout.write(`\r${id}.${ext} listo        \n`);
  }
}

console.log(`Videos en ${path.relative(root, outDir)}`);
