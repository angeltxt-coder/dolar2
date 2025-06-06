"use server"

// Cliente para NewsAPI - Noticias reales de Argentina
export interface NoticiaReal {
  titulo: string
  descripcion: string
  url: string
  fuente: string
  fechaPublicacion: string
  imagen?: string
  categoria: string
  relevancia: number
}

const NEWS_API_KEY = "49b09a8f119647b5ad356526a3455eed"
const NEWS_API_BASE_URL = "https://newsapi.org/v2"

// Palabras clave para filtrar noticias económicas relevantes (más amplio)
const KEYWORDS_ECONOMICOS = [
  "dólar",
  "dolar",
  "peso",
  "economía",
  "economia",
  "inflación",
  "inflacion",
  "bcra",
  "banco central",
  "milei",
  "caputo",
  "finanzas",
  "mercado",
  "tipo de cambio",
  "devaluación",
  "devaluacion",
  "reservas",
  "fmi",
  "blue",
  "mep",
  "ccl",
  "cripto",
  "bitcoin",
  "inversión",
  "inversion",
  "precios",
  "salario",
  "sueldo",
  "trabajo",
  "empleo",
  "industria",
  "exportación",
  "importación",
  "comercio",
  "negocio",
  "empresa",
]

// Función principal más robusta
export async function obtenerNoticiasRelevantes(): Promise<NoticiaReal[]> {
  console.log("🔍 Iniciando búsqueda de noticias...")

  try {
    // Primero intentar headlines de Argentina
    let noticias = await obtenerHeadlinesArgentina()

    if (noticias.length === 0) {
      console.log("⚠️ No se encontraron headlines, intentando búsqueda por keywords...")
      noticias = await obtenerNoticiasPorKeywords()
    }

    if (noticias.length === 0) {
      console.log("⚠️ No se encontraron noticias por keywords, intentando búsqueda general...")
      noticias = await obtenerNoticiasGenerales()
    }

    console.log(`✅ Total de noticias encontradas: ${noticias.length}`)
    return noticias
  } catch (error) {
    console.error("❌ Error general:", error)
    return []
  }
}

// Función para obtener headlines de Argentina
async function obtenerHeadlinesArgentina(): Promise<NoticiaReal[]> {
  try {
    console.log("📰 Obteniendo headlines de Argentina...")

    const url = `${NEWS_API_BASE_URL}/top-headlines?country=ar&apiKey=${NEWS_API_KEY}&pageSize=100`
    console.log("🌐 URL:", url.replace(NEWS_API_KEY, "***"))

    const response = await fetch(url, {
      next: { revalidate: 1800 },
      headers: {
        "User-Agent": "DolarOficial/1.0",
      },
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ Error response:", errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log("📊 API Response status:", data.status)
    console.log("📊 Total articles received:", data.totalResults)

    if (data.status !== "ok") {
      console.error("❌ API Error:", data.message)
      throw new Error(`API Error: ${data.message}`)
    }

    if (!data.articles || data.articles.length === 0) {
      console.log("⚠️ No articles in response")
      return []
    }

    // Procesar artículos con filtrado más permisivo
    const noticiasRelevantes = data.articles
      .filter((article: any) => {
        if (!article.title || !article.description || article.title === "[Removed]") {
          return false
        }

        // Filtrado más permisivo - buscar cualquier palabra clave económica
        const textoCompleto = `${article.title} ${article.description}`.toLowerCase()
        const esRelevante = KEYWORDS_ECONOMICOS.some((keyword) => textoCompleto.includes(keyword.toLowerCase()))

        if (esRelevante) {
          console.log("✅ Noticia relevante encontrada:", article.title.substring(0, 50) + "...")
        }

        return esRelevante
      })
      .map((article: any) => ({
        titulo: article.title,
        descripcion: article.description || "Sin descripción disponible",
        url: article.url,
        fuente: article.source?.name || "Fuente desconocida",
        fechaPublicacion: article.publishedAt,
        imagen: article.urlToImage,
        categoria: determinarCategoria(article.title, article.description || ""),
        relevancia: calcularRelevancia(article.title, article.description || ""),
      }))
      .sort((a, b) => b.relevancia - a.relevancia)
      .slice(0, 10)

    console.log(`📈 Noticias relevantes filtradas: ${noticiasRelevantes.length}`)
    return noticiasRelevantes
  } catch (error) {
    console.error("❌ Error en headlines:", error)
    return []
  }
}

// Función para buscar por palabras clave específicas
async function obtenerNoticiasPorKeywords(): Promise<NoticiaReal[]> {
  try {
    console.log("🔍 Buscando por palabras clave específicas...")

    const keywords = ["dólar", "economía argentina", "BCRA", "peso argentino"]
    const todasLasNoticias: any[] = []

    for (const keyword of keywords) {
      try {
        const url = `${NEWS_API_BASE_URL}/everything?q="${keyword}"&language=es&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=20`
        console.log(`🔍 Buscando: "${keyword}"`)

        const response = await fetch(url, {
          next: { revalidate: 1800 },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.status === "ok" && data.articles) {
            console.log(`✅ Encontradas ${data.articles.length} noticias para "${keyword}"`)
            todasLasNoticias.push(...data.articles)
          }
        } else {
          console.log(`⚠️ Error buscando "${keyword}": ${response.status}`)
        }
      } catch (err) {
        console.error(`❌ Error con keyword "${keyword}":`, err)
      }
    }

    // Eliminar duplicados y procesar
    const noticiasUnicas = todasLasNoticias
      .filter((article, index, self) => index === self.findIndex((a) => a.title === article.title))
      .filter((article) => article.title && article.description && article.title !== "[Removed]")
      .map((article) => ({
        titulo: article.title,
        descripcion: article.description || "Sin descripción disponible",
        url: article.url,
        fuente: article.source?.name || "Fuente desconocida",
        fechaPublicacion: article.publishedAt,
        imagen: article.urlToImage,
        categoria: determinarCategoria(article.title, article.description || ""),
        relevancia: calcularRelevancia(article.title, article.description || ""),
      }))
      .sort((a, b) => b.relevancia - a.relevancia)
      .slice(0, 10)

    console.log(`📈 Noticias únicas procesadas: ${noticiasUnicas.length}`)
    return noticiasUnicas
  } catch (error) {
    console.error("❌ Error en búsqueda por keywords:", error)
    return []
  }
}

// Función de respaldo: noticias generales de Argentina
async function obtenerNoticiasGenerales(): Promise<NoticiaReal[]> {
  try {
    console.log("📰 Obteniendo noticias generales como respaldo...")

    const url = `${NEWS_API_BASE_URL}/top-headlines?country=ar&apiKey=${NEWS_API_KEY}&pageSize=50`

    const response = await fetch(url, {
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== "ok" || !data.articles) {
      return []
    }

    // Tomar cualquier noticia válida como respaldo
    const noticiasGenerales = data.articles
      .filter((article: any) => article.title && article.description && article.title !== "[Removed]")
      .slice(0, 8)
      .map((article: any) => ({
        titulo: article.title,
        descripcion: article.description,
        url: article.url,
        fuente: article.source?.name || "Fuente desconocida",
        fechaPublicacion: article.publishedAt,
        imagen: article.urlToImage,
        categoria: "General",
        relevancia: 1,
      }))

    console.log(`📈 Noticias generales como respaldo: ${noticiasGenerales.length}`)
    return noticiasGenerales
  } catch (error) {
    console.error("❌ Error en noticias generales:", error)
    return []
  }
}

// Función para calcular relevancia (más permisiva)
function calcularRelevancia(titulo: string, descripcion: string): number {
  let relevancia = 1 // Base mínima
  const textoCompleto = `${titulo} ${descripcion}`.toLowerCase()

  // Palabras de alta relevancia
  const altaRelevancia = ["dólar", "dolar", "bcra", "peso", "inflación", "milei"]
  const mediaRelevancia = ["economía", "economia", "finanzas", "mercado"]

  altaRelevancia.forEach((palabra) => {
    if (textoCompleto.includes(palabra)) relevancia += 10
  })

  mediaRelevancia.forEach((palabra) => {
    if (textoCompleto.includes(palabra)) relevancia += 5
  })

  // Bonus especiales
  if (textoCompleto.includes("blue")) relevancia += 15
  if (textoCompleto.includes("oficial")) relevancia += 8

  return relevancia
}

// Función para determinar categoría
function determinarCategoria(titulo: string, descripcion: string): string {
  const textoCompleto = `${titulo} ${descripcion}`.toLowerCase()

  if (textoCompleto.includes("política") || textoCompleto.includes("milei") || textoCompleto.includes("gobierno")) {
    return "Política"
  }

  if (textoCompleto.includes("dólar") || textoCompleto.includes("peso") || textoCompleto.includes("bcra")) {
    return "Economía"
  }

  if (textoCompleto.includes("mercado") || textoCompleto.includes("bolsa")) {
    return "Mercados"
  }

  return "General"
}

// Función de test para verificar la API
export async function testearAPI(): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    console.log("🧪 Testeando conexión con NewsAPI...")

    const url = `${NEWS_API_BASE_URL}/top-headlines?country=ar&apiKey=${NEWS_API_KEY}&pageSize=5`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok && data.status === "ok") {
      return {
        success: true,
        message: `API funcionando correctamente. ${data.totalResults} noticias disponibles.`,
        data: data,
      }
    } else {
      return {
        success: false,
        message: `Error de API: ${data.message || response.statusText}`,
        data: data,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error de conexión: ${error.message}`,
    }
  }
}
