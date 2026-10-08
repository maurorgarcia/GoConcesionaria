/**
 * Todo el texto editable de la landing vive acá.
 * Lo que está entre corchetes [ ] es un placeholder: reemplázalo con datos reales.
 */

export const site = {
  name: "GoConcesionaria",
  title: "GoConcesionaria | CRM con inteligencia artificial para concesionarias",
  description:
    "La IA responde cada consulta en segundos, registra los datos y entrega a tus vendedores leads ya calificados. Un producto de GODREAMAI.",
  maker: "GODREAMAI",
  year: 2026,
};

export const nav = {
  links: [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#casos", label: "Casos" },
    { href: "#arranque", label: "Cómo arrancás" },
    { href: "#faq", label: "Preguntas" },
  ],
  cta: "Pedir una demo",
};

export const hero = {
  title: "Respondé cada consulta en segundos. Deja de perder ventas.",
  /** El mismo título partido para dar énfasis visual: [normal, atenuado, destacado, atenuado]. */
  titleParts: ["Respondé cada consulta en segundos.", " Deja de perder ", "ventas", "."],
  subtitle:
    "El CRM con IA que responde cada consulta, la califica y entrega a tus vendedores leads listos para cerrar.",
  primaryCta: "Pedir una demo",
  secondaryCta: "Ver cómo funciona",
  benefits: [
    { icon: "bolt", title: "Responde en segundos", text: "Cada consulta, a cualquier hora." },
    { icon: "filter", title: "Califica solo", text: "Pregunta, registra y da temperatura." },
    { icon: "user", title: "Entrega listo", text: "Tu vendedor recibe el lead con contexto." },
  ],
  note: "Integrado con WhatsApp. Pensado para concesionarias con una o varias sucursales.",
  caption: "Ejemplo ilustrativo de una conversación real de WhatsApp.",
  posterLabel:
    "Conversación de WhatsApp de ejemplo: el cliente consulta por una pickup 4x4 2022, la IA le hace preguntas y la ficha del lead se completa sola hasta quedar calificado como caliente.",
};

export const steps = {
  title: "De la primera consulta a la visita, sin trabajo manual.",
  subtitle: "Cada consulta sigue el mismo camino.",
  posterLabel:
    "Flujo en cuatro pasos: llega el lead, la IA conversa, se clasifica y registra, tu vendedor cierra.",
  items: [
    { title: "Llega el lead", text: "Una persona escribe por WhatsApp. Se crea su ficha al instante en tu CRM." },
    {
      title: "La IA conversa",
      text: "Responde dudas y pregunta lo que importa: modelo buscado, forma de pago, permuta y presupuesto.",
    },
    {
      title: "Se clasifica y registra",
      text: "Extrae los datos de la charla, completa la ficha y asigna una temperatura al lead.",
    },
    {
      title: "Tu vendedor cierra",
      text: "Recibe el lead con todo el contexto y retoma la conversación cuando está listo para avanzar.",
    },
  ],
};

/** Tres situaciones de una concesionaria, cada una con su animación. */
export const stories = {
  title: "Tres situaciones que cambian en tu concesionaria.",
  subtitle: "Elegí un caso y mirá cómo funciona.",
  items: [
    {
      id: "noche",
      tab: "Consultas de noche",
      anim: "NightLeads" as const,
      title: "Responde al instante, también cuando tu equipo no está.",
      text: "Quien escribe un domingo a las 23:00 recibe respuesta en segundos y queda calificado antes de que tu equipo vuelva.",
      bullets: [
        "Atención todos los días, a cualquier hora",
        "Cada conversación termina en una ficha completa",
        "Tu equipo empieza el día con leads listos para llamar",
      ],
      caption: "Ejemplo ilustrativo de una noche de consultas.",
      label: "Reloj que avanza de 22:14 a 08:30 mientras llegan tres consultas por WhatsApp; cada una se responde al instante y queda calificada.",
    },
    {
      id: "pipeline",
      tab: "Pipeline de ventas",
      anim: "PipelineLive" as const,
      title: "Tu equipo ve primero a quien está listo para comprar.",
      text: "Los leads avanzan solos por el pipeline según lo que dicen en la conversación. Tus vendedores abren el CRM y saben a quién llamar.",
      bullets: [
        "Temperatura por lead: caliente, tibio o frío",
        "Etapas siempre al día, sin cargar nada a mano",
        "Cada lead con su historial y su vendedor",
      ],
      caption: "Ejemplo ilustrativo con datos de prueba.",
      label: "Pipeline de ventas con cuatro etapas: Nuevos, Calificados, Visita agendada y En negociación. Un lead caliente avanza hasta En negociación.",
    },
    {
      id: "sucursales",
      tab: "Varias sucursales",
      anim: "Branches" as const,
      title: "Una sola plataforma para todas tus sucursales.",
      text: "Cada sucursal o marca trabaja con su propia información, y vos ves todo en un solo lugar.",
      bullets: [
        "Datos de cada sucursal bien separados",
        "Vista general para la dirección",
        "Cada equipo ve solo lo suyo",
      ],
      caption: "Ejemplo ilustrativo con datos de prueba.",
      label: "Selector de sucursales: cada una muestra solo sus leads, y la vista Todas reúne los de las tres.",
    },
  ],
};

export const screen = {
  title: "Así se ve en el día a día.",
  text: "El tablero que usa tu equipo: leads por etapa, con temperatura, origen y vendedor asignado.",
  caption: "Captura del CRM con una cuenta de demostración.",
  alt: "Pantalla de Leads del CRM: tablero con columnas Nuevo lead, Contactado, Calificado e Interesado, con tarjetas por cliente y temperatura.",
};

export const includes = {
  title: "Todo en un solo lugar.",
  subtitle: "Un CRM pensado para el día a día de una concesionaria.",
  items: [
    {
      title: "Conversación con IA, 24 horas",
    },
    {
      title: "Clasificación automática",
    },
    {
      title: "Cualificación de leads",
    },
    {
      title: "Registro de datos",
    },
    {
      title: "Multi-concesionaria",
    },
  ],
};

export const onboarding = {
  title: "Cómo arrancás",
  posterLabel:
    "Tres pasos para empezar: demo con tu caso, conexión de tu WhatsApp y llegada de leads calificados a tu CRM.",
  items: [
    { title: "Demo con tu caso" },
    { title: "Conectamos tu WhatsApp" },
    { title: "Empezás a recibir leads calificados" },
  ],
};

export const demo = {
  title: "Probalo vos: así atiende la IA.",
  subtitle: "Elegí qué responde el cliente y mirá cómo se arma la ficha para tu vendedor.",
  cars: [
    { name: "Pickup 4x4 2022", ask: "Hola, vi la pickup 4x4 2022 en su web. ¿Sigue disponible?", reply: "¡Hola! Sí, sigue disponible. ¿La buscás para financiar o pagarías de contado?" },
    { name: "SUV usado", ask: "Hola, busco una SUV usada. ¿Qué tienen?", reply: "¡Hola! Tenemos varias SUV usadas con garantía. ¿Pensás financiar o pagarías de contado?" },
  ],
  payments: [
    { name: "Financiado", ask: "Financiada.", hot: true },
    { name: "De contado", ask: "De contado.", hot: true },
    { name: "Todavía no sé", ask: "Todavía no lo sé.", hot: false },
  ],
  tradeQuestion: "Perfecto. ¿Tenés algún vehículo para entregar como parte de pago?",
  trades: [
    { name: "Sí, hatchback 2016", ask: "Sí, un hatchback 2016.", hot: true },
    { name: "Sin permuta", ask: "No, sin permuta.", hot: false },
  ],
  closing: "Genial, ya tengo todo. Le paso tu consulta a un asesor con lo que me contaste, así te escribe directo.",
};

export const faq = {
  title: "Preguntas frecuentes",
  aside: "¿Queda alguna duda? Te la respondemos en la demo, con el caso de tu concesionaria.",
  items: [
    {
      q: "¿Cómo se conecta con mi WhatsApp?",
      a: "Conectamos tu número de WhatsApp Business y te acompañamos en toda la configuración inicial.",
    },
    {
      q: "¿Mis vendedores tienen que cambiar cómo trabajan?",
      a: "No. Reciben cada lead ya calificado, con la conversación completa y la ficha armada, y retoman la charla cuando está listo para avanzar.",
    },
    {
      q: "¿La IA reemplaza a mis vendedores?",
      a: "No. Se encarga de la primera conversación y de ordenar la información; tu equipo se queda con lo que mejor hace: cerrar la venta.",
    },
    {
      q: "¿Qué datos registra de cada lead?",
      a: "Vehículo de interés, forma de pago, permuta, presupuesto y nivel de urgencia, entre otros, todo extraído de la conversación.",
    },
    {
      q: "¿Puedo usarlo con varias sucursales?",
      a: "Sí. La plataforma es multi-concesionaria: cada sucursal o marca trabaja con su propia información.",
    },
    {
      q: "¿Cuánto tarda la implementación?",
      a: "Depende de tu operación y de cuántas sucursales tengas. En la demo te damos un plazo claro para tu caso.",
    },
  ],
};

/** WhatsApp comercial: todos los botones de "pedir / consultar" llevan acá. */
const WA_NUMBER = "5493364294964";
const WA_MESSAGE = "Hola! Quiero pedir una demo de GoConcesionaria.";

export const whatsapp = {
  number: WA_NUMBER,
  display: "+54 9 3364 29-4964",
  message: WA_MESSAGE,
  /** Link a WhatsApp con un mensaje precargado (por defecto, el de pedir demo). */
  link(message: string = WA_MESSAGE) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  },
};

export const cta = {
  title: "Convierte cada consulta en una visita al salón.",
  text: "Escribinos por WhatsApp y te mostramos GoConcesionaria funcionando con el caso de tu concesionaria.",
  button: "Pedir una demo por WhatsApp",
};

export const footer = {
  product: "Un producto de GODREAMAI",
  tagline: "Software, sistemas de IA y automatización para empresas",
  copyright: "© 2026 GODREAMAI",
};

/* ---------------------------------------------------------------------------
 * Secciones desactivadas (faltan datos reales). Para activarlas, agregar el
 * componente en app/page.tsx.
 * ------------------------------------------------------------------------- */

/** <Logos />: logos de clientes. */
export const logos = {
  caption: "Concesionarias que ya trabajan con GoConcesionaria",
  items: ["[LOGO CLIENTE 1]", "[LOGO CLIENTE 2]", "[LOGO CLIENTE 3]", "[LOGO CLIENTE 4]"],
};

export type Metric = {
  placeholder: string;
  value: number | null;
  suffix: string;
  label: string;
};

/**
 * <Results />: métricas. Cuando tengas datos reales, completa `value` (número) y el
 * contador se anima al entrar en pantalla. Mientras sea null se muestra el placeholder.
 */
export const results = {
  title: "Lo que cambia cuando ningún lead queda sin respuesta.",
  items: [
    { placeholder: "[X seg]", value: null, suffix: " seg", label: "Tiempo promedio de primera respuesta" },
    { placeholder: "[X%]", value: null, suffix: "%", label: "Leads atendidos fuera de horario" },
    { placeholder: "[X h]", value: null, suffix: " h", label: "Horas semanales de carga manual ahorradas" },
  ] satisfies Metric[],
};
