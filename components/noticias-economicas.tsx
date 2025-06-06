"use client"

import { useState, useEffect } from "react"
import { Newspaper, ExternalLink, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Noticias simuladas (en una implementación real, estas vendrían de una API)
const noticiasSimuladas = [
  {
    id: 1,
    titulo: "El Banco Central intervino en el mercado cambiario",
    resumen: "La autoridad monetaria vendió US$ 50 millones para contener la presión sobre el tipo de cambio oficial.",
    fecha: "2024-06-05T10:30:00Z",
    categoria: "Política Monetaria",
    fuente: "Ámbito Financiero",
    url: "https://www.ambito.com/economia/dolar/",
    impacto: "alto",
  },
  {
    id: 2,
    titulo: "Nuevas medidas para el acceso al dólar oficial",
    resumen: "El gobierno anunció modificaciones en los requisitos para la compra de divisas en el mercado oficial.",
    fecha: "2024-06-05T08:15:00Z",
    categoria: "Regulaciones",
    fuente: "La Nación",
    url: "https://www.lanacion.com.ar/economia/dolar/",
    impacto: "medio",
  },
  {
    id: 3,
    titulo: "El dólar blue se mantiene estable en la semana",
    resumen: "La cotización paralela mostró poca volatilidad en los últimos días, manteniéndose en torno a los $1200.",
    fecha: "2024-06-04T16:45:00Z",
    categoria: "Mercados",
    fuente: "Cronista",
    url: "https://www.cronista.com/finanzas/divisas/",
    impacto: "bajo",
  },
  {
    id: 4,
    titulo: "Expectativas de inflación impactan en el tipo de cambio",
    resumen: "Los analistas ajustan sus proyecciones cambiarias ante las nuevas estimaciones inflacionarias del INDEC.",
    fecha: "2024-06-04T14:20:00Z",
    categoria: "Análisis",
    fuente: "iProfesional",
    url: "https://www.iprofesional.com/economia/",
    impacto: "medio",
  },
]

export default function NoticiasEconomicas() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de noticias
    const cargarNoticias = async () => {
      setLoading(true)
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setNoticias(noticiasSimuladas)
      setLoading(false)
    }

    cargarNoticias()
  }, [])

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case "alto":
        return "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
      case "medio":
        return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
      case "bajo":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
    }
  }

  if (loading) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl dark:bg-gray-900/70">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 sm:px-6 py-3 sm:py-4">
          <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
            <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            Noticias Económicas
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Últimas noticias que pueden impactar el mercado cambiario
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl dark:bg-gray-900/70">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          Noticias Económicas
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Últimas noticias que pueden impactar el mercado cambiario
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-4">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 line-clamp-2">
                {noticia.titulo}
              </h3>
              <Badge variant="outline" className={`text-xs shrink-0 ${getImpactoColor(noticia.impacto)}`}>
                {noticia.impacto === "alto" && <TrendingUp className="h-3 w-3 mr-1" />}
                {noticia.impacto.charAt(0).toUpperCase() + noticia.impacto.slice(1)}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{noticia.resumen}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatearFecha(noticia.fecha)}
                </span>
                <span>{noticia.fuente}</span>
                <Badge variant="secondary" className="text-xs">
                  {noticia.categoria}
                </Badge>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => {
                  if (noticia.url && noticia.url !== "#") {
                    window.open(noticia.url, "_blank", "noopener,noreferrer")
                  }
                }}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        <div className="text-center pt-2">
          <Button variant="outline" size="sm" className="text-xs">
            Ver más noticias
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
