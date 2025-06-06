// Servicio para obtener tendencias de búsqueda relacionadas con el dólar
export interface TrendData {
  keyword: string
  volume: number
  category: string
  priority: number
}

// Palabras clave base relacionadas con el dólar argentino (expandidas)
const BASE_KEYWORDS = [
  { keyword: "dólar blue hoy", volume: 100000, category: "cotizacion", priority: 1 },
  { keyword: "precio del dólar", volume: 95000, category: "cotizacion", priority: 1 },
  { keyword: "dólar oficial", volume: 85000, category: "cotizacion", priority: 1 },
  { keyword: "cotización dólar", volume: 80000, category: "cotizacion", priority: 1 },
  { keyword: "dólar MEP", volume: 70000, category: "cotizacion", priority: 2 },
  { keyword: "dólar CCL", volume: 65000, category: "cotizacion", priority: 2 },
  { keyword: "dólar cripto", volume: 60000, category: "cotizacion", priority: 2 },
  { keyword: "dólar solidario", volume: 55000, category: "cotizacion", priority: 2 },
  { keyword: "dólar tarjeta", volume: 50000, category: "cotizacion", priority: 2 },
  { keyword: "calculadora dólar", volume: 45000, category: "herramienta", priority: 3 },
  { keyword: "conversor pesos dólares", volume: 40000, category: "herramienta", priority: 3 },
  { keyword: "evolución del dólar", volume: 35000, category: "analisis", priority: 3 },
  { keyword: "pronóstico dólar", volume: 30000, category: "analisis", priority: 3 },
  { keyword: "noticias dólar", volume: 25000, category: "noticias", priority: 4 },
  { keyword: "dólar hoy argentina", volume: 90000, category: "cotizacion", priority: 1 },
  { keyword: "valor del dólar", volume: 88000, category: "cotizacion", priority: 1 },
  { keyword: "cambio dólar peso", volume: 75000, category: "cotizacion", priority: 2 },
  { keyword: "dólar banco nación", volume: 72000, category: "cotizacion", priority: 2 },
  { keyword: "dólar turista", volume: 68000, category: "cotizacion", priority: 2 },
  { keyword: "dólar ahorro", volume: 65000, category: "cotizacion", priority: 2 },
  { keyword: "comprar dólares", volume: 62000, category: "operacion", priority: 2 },
  { keyword: "vender dólares", volume: 58000, category: "operacion", priority: 2 },
  { keyword: "dólar paralelo", volume: 55000, category: "cotizacion", priority: 2 },
  { keyword: "dólar informal", volume: 52000, category: "cotizacion", priority: 2 },
  { keyword: "cotización blue", volume: 48000, category: "cotizacion", priority: 2 },
  { keyword: "precio blue hoy", volume: 45000, category: "cotizacion", priority: 2 },
  { keyword: "dólar mayorista", volume: 42000, category: "cotizacion", priority: 3 },
  { keyword: "dólar minorista", volume: 40000, category: "cotizacion", priority: 3 },
  { keyword: "tipo de cambio", volume: 85000, category: "cotizacion", priority: 1 },
  { keyword: "mercado cambiario", volume: 38000, category: "analisis", priority: 3 },
  { keyword: "brecha cambiaria", volume: 35000, category: "analisis", priority: 3 },
  { keyword: "cepo cambiario", volume: 32000, category: "analisis", priority: 3 },
  { keyword: "reservas bcra", volume: 30000, category: "analisis", priority: 3 },
  { keyword: "política cambiaria", volume: 28000, category: "analisis", priority: 4 },
]

// Frases SEO para integrar sutilmente en el contenido
export const SEO_PHRASES = [
  "Seguí las cotizaciones del dólar en tiempo real",
  "Todas las variantes del dólar argentino actualizadas",
  "Compará precios entre dólar oficial, blue, MEP y CCL",
  "Calculá el tipo de cambio más conveniente",
  "Información actualizada del mercado cambiario",
  "Evolución histórica de las cotizaciones",
  "Análisis de la brecha cambiaria argentina",
  "Herramientas para convertir pesos a dólares",
  "Noticias y tendencias del mercado financiero",
  "Pronósticos y análisis económico del dólar",
]

// Función para obtener tendencias (simulada pero más realista)
export async function getTrendingKeywords(): Promise<TrendData[]> {
  try {
    const now = new Date()
    const hour = now.getHours()
    const dayOfWeek = now.getDay()

    // Ajustar volúmenes según contexto temporal
    const hourMultiplier = hour >= 9 && hour <= 18 ? 1.3 : 0.8
    const dayMultiplier = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.2 : 0.9

    // Eventos que afectan las búsquedas
    const volatilityEvents = [
      { condition: hour === 11, keywords: ["blue", "oficial"], boost: 2.0 },
      { condition: hour === 16, keywords: ["oficial", "bcra"], boost: 1.8 },
      { condition: dayOfWeek === 1, keywords: ["pronóstico", "evolución"], boost: 1.5 },
      { condition: dayOfWeek === 5, keywords: ["análisis", "tendencia"], boost: 1.4 },
    ]

    const trendsWithVariation = BASE_KEYWORDS.map((trend) => {
      let adjustedVolume = trend.volume * hourMultiplier * dayMultiplier

      // Aplicar eventos de volatilidad
      volatilityEvents.forEach((event) => {
        if (event.condition) {
          event.keywords.forEach((keyword) => {
            if (trend.keyword.includes(keyword)) {
              adjustedVolume *= event.boost
            }
          })
        }
      })

      // Variación aleatoria pequeña
      adjustedVolume *= 0.9 + Math.random() * 0.2

      return {
        ...trend,
        volume: Math.round(adjustedVolume),
      }
    })

    return trendsWithVariation.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority
      }
      return b.volume - a.volume
    })
  } catch (error) {
    console.error("Error obteniendo tendencias:", error)
    return BASE_KEYWORDS
  }
}

// Función para generar títulos dinámicos más naturales
export function generateDynamicTitle(trends: TrendData[]): string {
  const topTrend = trends[0]
  const hour = new Date().getHours()

  const timeBasedPrefixes = {
    morning: hour >= 6 && hour < 12 ? "Hoy" : "",
    afternoon: hour >= 12 && hour < 18 ? "Ahora" : "",
    evening: hour >= 18 || hour < 6 ? "Última Hora" : "",
  }

  const currentTimePrefix = Object.values(timeBasedPrefixes).find((prefix) => prefix) || "Hoy"

  if (topTrend.keyword.includes("blue")) {
    return `${currentTimePrefix}: Dólar Blue y Todas las Cotizaciones | Argentina 2024`
  }

  if (topTrend.keyword.includes("oficial")) {
    return `${currentTimePrefix}: Dólar Oficial, Blue, MEP y CCL | Cotizaciones en Vivo`
  }

  if (topTrend.keyword.includes("precio")) {
    return `${currentTimePrefix}: Precio del Dólar | Todas las Cotizaciones Argentina`
  }

  return `${currentTimePrefix}: Cotizaciones del Dólar en Argentina | Tiempo Real 2024`
}

// Función para generar descripciones más ricas en SEO
export function generateDynamicDescription(trends: TrendData[], cotizaciones: any[]): string {
  const topTrends = trends.slice(0, 4)
  const dolarOficial = cotizaciones.find((c) => c.casa === "oficial")
  const dolarBlue = cotizaciones.find((c) => c.casa === "blue")

  const trendKeywords = topTrends.map((t) => t.keyword).join(" | ")

  return `🔥 ${trendKeywords} EN VIVO ✓ Dólar oficial: $${dolarOficial?.venta || "N/A"} ✓ Dólar blue: $${dolarBlue?.venta || "N/A"} ✓ MEP, CCL, cripto y solidario ✓ Calculadora de conversión gratuita ✓ Gráficos históricos interactivos ✓ Noticias BCRA ✓ Mejor precio para comprar dólares hoy ✓ Tipo de cambio actualizado cada 5 minutos ✓ Argentina 2024`
}

// Función para obtener frases SEO contextuales
export function getContextualSEOPhrase(context: string): string {
  const contextPhrases = {
    calculadora: [
      "Convertí pesos a dólares con nuestra calculadora actualizada",
      "Calculá el tipo de cambio más conveniente para tus operaciones",
      "Herramienta gratuita para conversión de monedas en tiempo real",
    ],
    graficos: [
      "Analizá la evolución histórica del dólar argentino",
      "Gráficos interactivos con tendencias del mercado cambiario",
      "Seguí las variaciones diarias de todas las cotizaciones",
    ],
    noticias: [
      "Mantente informado sobre las últimas decisiones del BCRA",
      "Noticias que impactan en el mercado cambiario argentino",
      "Análisis económico y pronósticos del dólar",
    ],
    recomendacion: [
      "Encontrá la cotización más conveniente para comprar dólares",
      "Compará precios entre dólar oficial, blue, MEP y CCL",
      "Asesoramiento para elegir el mejor tipo de cambio",
    ],
  }

  const phrases = contextPhrases[context] || SEO_PHRASES
  return phrases[Math.floor(Math.random() * phrases.length)]
}

// Función para generar palabras clave dinámicas
export function generateDynamicKeywords(trends: TrendData[]): string {
  const baseKeywords = [
    "dólar hoy",
    "precio del dólar",
    "cotización dólar",
    "dólar argentina",
    "peso argentino",
    "tipo de cambio",
    "BCRA",
    "banco central",
    "mercado cambiario",
    "divisa",
    "finanzas argentina",
    "economía argentina",
    "inflación",
    "reservas",
    "brecha cambiaria",
    "cepo cambiario",
    "política monetaria",
  ]

  const trendKeywords = trends.slice(0, 15).flatMap((t) => t.keyword.split(" ").filter((word) => word.length > 3))

  const allKeywords = [...baseKeywords, ...trendKeywords]
  const uniqueKeywords = [...new Set(allKeywords)]

  return uniqueKeywords.join(", ")
}
