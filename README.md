# GoConcesionaria

Landing de **GoConcesionaria**, el CRM con IA para concesionarias, un producto de GODREAMAI.

Next.js (App Router) + TypeScript + Tailwind v4 + Remotion (`@remotion/player`).

## Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run typecheck` | Chequeo de tipos |
| `npm run remotion` | Abre Remotion Studio para editar las animaciones |
| `npm run render:videos` | Renderiza las animaciones a MP4 y WebM en `public/videos` |

## Dónde se edita cada cosa

- **Textos, planes, preguntas frecuentes, número y mensaje de WhatsApp:** `content/landing.ts`.
  Todos los botones de "pedir / consultar" salen de `whatsapp.link()`.
- **Secciones:** `components/` (una por archivo) y el orden en `app/page.tsx`.
- **Colores y fondos:** `app/globals.css`. Paleta de la marca: negro `#0A0A0A`, blanco `#F5F5F5`, lima `#CCFF00`.
- **Animaciones:** `remotion/` (composiciones puras en `remotion/*.tsx`, registradas en `remotion/Root.tsx` y `remotion/specs.ts`).
- **SEO:** metadatos en `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, datos estructurados en `components/JsonLd.tsx`.

## Deploy en Vercel

1. Importar el repo en Vercel (framework: Next.js, sin configuración extra).
2. Variable de entorno `NEXT_PUBLIC_SITE_URL` con el dominio final (por ejemplo `https://goconcesionaria.com`). Se usa para canonical, sitemap e imagen para compartir.
3. Deploy.

## Pendientes antes de lanzar

- Datos reales: precios de los planes ("A medida" por ahora), garantía comercial, plazo de implementación, resultados y testimonios. La sección de resultados y los logos están apagados en el código (`components/Results.tsx`, `logos` en `content/landing.ts`).
- Definir el dominio y darlo de alta en Google Search Console.
- Remotion es gratis para individuos y empresas pequeñas; para empresas más grandes puede requerir licencia ([detalle](https://www.remotion.dev/license)).

## Notas de desarrollo

- `NEXT_DIST_DIR=.next-check npm run build` compila en otra carpeta, para verificar sin pisar `npm run dev`.
- La captura `public/crm-leads.webp` es del CRM con una cuenta de demostración.
