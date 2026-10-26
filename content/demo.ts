import type { Locale } from "@/i18n/routing";

/**
 * Fictional data for the content-generator demo. "Kora" is a made-up
 * point-of-sale product; nothing here comes from a real client or model call.
 */

export const ICPS = ["retail", "restaurants", "ecommerce"] as const;
export const TONES = ["professional", "friendly", "bold"] as const;
export const FORMATS = ["post", "carousel"] as const;

export type Icp = (typeof ICPS)[number];
export type Tone = (typeof TONES)[number];
export type Format = (typeof FORMATS)[number];

type Copy = {
  hooks: Record<Tone, string>;
  body: string[];
  slides: { title: string; text: string }[];
  hashtags: string[];
};

const ctas: Record<Locale, Record<Tone, string>> = {
  es: {
    professional:
      "¿Quieres ver cómo se vería en tu negocio? Agenda una demo de 15 minutos.",
    friendly: "¿Te pasa algo parecido? Cuéntanos en los comentarios 👇",
    bold: "Deja de adivinar. Prueba Kora 14 días gratis.",
  },
  en: {
    professional:
      "Want to see how it would look in your business? Book a 15-minute demo.",
    friendly: "Sound familiar? Tell us in the comments 👇",
    bold: "Stop guessing. Try Kora free for 14 days.",
  },
};

const copy: Record<Locale, Record<Icp, Copy>> = {
  es: {
    retail: {
      hooks: {
        professional:
          "Un inventario desactualizado es la forma más silenciosa de perder ventas.",
        friendly:
          "¿Alguna vez vendiste algo que ya no tenías en stock? No eres el único.",
        bold: "Tu Excel de inventario te está haciendo perder clientes.",
      },
      body: [
        "Cuando el stock vive en tres lugares distintos, el error es cuestión de tiempo.",
        "Con Kora, cada venta en caja actualiza el inventario al instante, y recibes una alerta antes de quedarte sin tus productos más vendidos.",
      ],
      slides: [
        {
          title: "Stock en tiempo real",
          text: "Cada venta descuenta del inventario al momento.",
        },
        {
          title: "Alertas inteligentes",
          text: "Avisos antes de que se agoten tus best-sellers.",
        },
        {
          title: "Una sola fuente",
          text: "Caja, tienda online y depósito, sincronizados.",
        },
      ],
      hashtags: ["#Retail", "#Inventario", "#PuntoDeVenta"],
    },
    restaurants: {
      hooks: {
        professional:
          "En hora pico, cada minuto entre la orden y la cocina cuenta.",
        friendly:
          "Viernes, 9 p. m., cocina llena y una comanda perdida. Te suena, ¿no?",
        bold: "Las comandas en papel están frenando tu cocina.",
      },
      body: [
        "Los pedidos de salón, delivery y para llevar llegan por canales distintos y se pisan entre sí.",
        "Kora los centraliza en una sola pantalla de cocina, ordenados por tiempo de preparación.",
      ],
      slides: [
        {
          title: "Una sola cola",
          text: "Salón, delivery y para llevar en la misma pantalla.",
        },
        {
          title: "Tiempos visibles",
          text: "Cada orden muestra cuánto lleva esperando.",
        },
        {
          title: "Menos errores",
          text: "Sin comandas perdidas ni pedidos duplicados.",
        },
      ],
      hashtags: ["#Restaurantes", "#Gastronomía", "#Operaciones"],
    },
    ecommerce: {
      hooks: {
        professional: "El 70 % de los carritos se abandona antes del pago.",
        friendly:
          "Ese cliente que llenó el carrito y se fue... todavía puede volver.",
        bold: "Estás dejando ventas en el carrito. Todos los días.",
      },
      body: [
        "Un checkout lento o con pocos medios de pago es suficiente para perder la venta.",
        "Kora conecta tu tienda online con tu caja, para que el stock, los precios y los pagos sean los mismos en todos lados.",
      ],
      slides: [
        {
          title: "Checkout en 1 paso",
          text: "Menos fricción, más pedidos completados.",
        },
        {
          title: "Stock unificado",
          text: "Lo que ves online es lo que hay en tienda.",
        },
        {
          title: "Recupera carritos",
          text: "Recordatorios automáticos que traen de vuelta al cliente.",
        },
      ],
      hashtags: ["#Ecommerce", "#Ventas", "#Checkout"],
    },
  },
  en: {
    retail: {
      hooks: {
        professional:
          "Out-of-date inventory is the quietest way to lose sales.",
        friendly:
          "Ever sold something you no longer had in stock? You're not alone.",
        bold: "Your inventory spreadsheet is losing you customers.",
      },
      body: [
        "When stock lives in three different places, a mistake is only a matter of time.",
        "With Kora, every sale at the register updates inventory instantly, and you get an alert before your best-sellers run out.",
      ],
      slides: [
        {
          title: "Real-time stock",
          text: "Every sale is deducted from inventory right away.",
        },
        {
          title: "Smart alerts",
          text: "Heads-up before your best-sellers sell out.",
        },
        {
          title: "One source of truth",
          text: "Register, online store and warehouse, in sync.",
        },
      ],
      hashtags: ["#Retail", "#Inventory", "#PointOfSale"],
    },
    restaurants: {
      hooks: {
        professional:
          "At peak hours, every minute between order and kitchen matters.",
        friendly:
          "Friday, 9 p.m., a full kitchen and one lost ticket. Sound familiar?",
        bold: "Paper tickets are slowing your kitchen down.",
      },
      body: [
        "Dine-in, delivery and takeout orders arrive through different channels and collide.",
        "Kora puts them on a single kitchen screen, sorted by prep time.",
      ],
      slides: [
        {
          title: "One queue",
          text: "Dine-in, delivery and takeout on the same screen.",
        },
        {
          title: "Visible timing",
          text: "Every order shows how long it has been waiting.",
        },
        {
          title: "Fewer mistakes",
          text: "No lost tickets, no duplicated orders.",
        },
      ],
      hashtags: ["#Restaurants", "#Hospitality", "#Operations"],
    },
    ecommerce: {
      hooks: {
        professional: "70% of carts are abandoned before payment.",
        friendly:
          "That customer who filled the cart and left... can still come back.",
        bold: "You're leaving sales in the cart. Every single day.",
      },
      body: [
        "A slow checkout or too few payment options is all it takes to lose the sale.",
        "Kora connects your online store to your register, so stock, prices and payments match everywhere.",
      ],
      slides: [
        {
          title: "1-step checkout",
          text: "Less friction, more completed orders.",
        },
        {
          title: "Unified stock",
          text: "What you see online is what's in store.",
        },
        {
          title: "Win back carts",
          text: "Automatic reminders that bring customers back.",
        },
      ],
      hashtags: ["#Ecommerce", "#Sales", "#Checkout"],
    },
  },
};

export type DemoOutput =
  | { format: "post"; text: string; hashtags: string[] }
  | {
      format: "carousel";
      slides: { title: string; text: string }[];
      hashtags: string[];
    };

export function generateDemo(
  locale: Locale,
  icp: Icp,
  tone: Tone,
  format: Format,
): DemoOutput {
  const c = copy[locale][icp];
  const cta = ctas[locale][tone];

  if (format === "post") {
    return {
      format,
      text: [c.hooks[tone], ...c.body, cta].join("\n\n"),
      hashtags: c.hashtags,
    };
  }

  return {
    format,
    slides: [
      { title: c.hooks[tone], text: "Kora" },
      ...c.slides,
      { title: cta, text: "Kora" },
    ],
    hashtags: c.hashtags,
  };
}
