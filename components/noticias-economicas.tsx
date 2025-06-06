"use client"

import { useState, useEffect } from "react"
import { Newspaper, ExternalLink, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAnalyticsEventTracker } from "@/components/google-analytics"

const noticiasSimuladas = [
  {
    id: 1,
    titulo: "El Banco Central intervino en el mercado",
    resumen: "Vendió US$ 50 millones para contener la presión cambiaria.",
    fecha: "2024-06-05T10:30:00Z",
    categoria: "Política",
    fuente: "Ámbito",
    url: "https://www.ambito.com/economia/dolar/",
    impacto: "alto",
  },
  {
    id: 2,
    titulo: "Nuevas medidas para el dólar oficial",
    resumen: "Modificaciones en los requisitos de compra.",
    fecha: "2024-06-05T08:15:00Z",
    categoria: "Regulaciones",
    fuente: "La Nación",
    url: "https://www.lanacion.com.ar/economia/dolar/",
    impacto: "medio",
  },
  {
    id: 3,
    titulo: "Dólar blue estable esta semana",
    resumen: "Se mantiene en torno a los $1200.",
    fecha: "2024-06-04T16:45:00Z",
    categoria: "Mercados",
    fuente: "Cronista",
    url: "https://www.cronista.com/finanzas/divisas/",
    impacto: "bajo",
  },
]

export default function NoticiasEconomicas() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const analytics = useAnalyticsEventTracker()

  useEffect(() => {
    const cargarNoticias = async () => {
      setLoading(true)
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

  const handleNoticiaClick = (noticia) => {
    if (noticia.url && noticia.url !== "#") {
      // Rastrear clic en noticia
      analytics.trackNewsClick(noticia.titulo, noticia.fuente)
      window.open(noticia.url, "_blank", "noopener,noreferrer")
    }
  }

  if (loading) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl dark:bg-gray-900/70">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 sm:px-6 py-3 sm:py-4">
          <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
            <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            Noticias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
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
          Noticias
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-3">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
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
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => handleNoticiaClick(noticia)}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
