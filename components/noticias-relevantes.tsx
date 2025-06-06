"use client"

import { useState, useEffect } from "react"
import { Newspaper, ExternalLink, Clock, TrendingUp, Flame, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { obtenerNoticiasRelevantes, testearAPI, type NoticiaReal } from "@/lib/newsapi-client"
import { useAnalyticsEventTracker } from "@/components/google-analytics"

export default function NoticiasRelevantes() {
  const [noticias, setNoticias] = useState<NoticiaReal[]>([])
  const [loading, setLoading] = useState(true)
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>("")
  const analytics = useAnalyticsEventTracker()

  useEffect(() => {
    cargarNoticias()
  }, [])

  const cargarNoticias = async () => {
    setLoading(true)
    setError(null)
    setDebugInfo("Iniciando carga de noticias...")

    try {
      console.log("🚀 Iniciando carga de noticias...")

      // Primero testear la API
      const testResult = await testearAPI()
      console.log("🧪 Test de API:", testResult)

      if (!testResult.success) {
        setError(`Error de API: ${testResult.message}`)
        setDebugInfo(`API Test falló: ${testResult.message}`)
        return
      }

      setDebugInfo("API funcionando, obteniendo noticias...")

      // Obtener noticias
      const noticiasData = await obtenerNoticiasRelevantes()
      console.log("📊 Noticias obtenidas:", noticiasData.length)

      if (noticiasData.length === 0) {
        setError(
          "No se encontraron noticias en este momento. La API está funcionando pero no hay contenido disponible.",
        )
        setDebugInfo("API OK, pero 0 noticias encontradas")
      } else {
        setNoticias(noticiasData)
        setDebugInfo(`${noticiasData.length} noticias cargadas exitosamente`)
        console.log("✅ Noticias cargadas exitosamente:", noticiasData.length)
      }

      setUltimaActualizacion(new Date())
    } catch (err) {
      console.error("❌ Error cargando noticias:", err)
      setError(`Error al cargar noticias: ${err.message}`)
      setDebugInfo(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO)
    const ahora = new Date()
    const diferencia = ahora.getTime() - fecha.getTime()
    const horas = Math.floor(diferencia / (1000 * 60 * 60))
    const minutos = Math.floor(diferencia / (1000 * 60))

    if (minutos < 60) {
      return `hace ${minutos} min`
    } else if (horas < 24) {
      return `hace ${horas}h`
    } else {
      return fecha.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Economía":
        return "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
      case "Política":
        return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
      case "Mercados":
        return "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
      case "General":
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
      default:
        return "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
    }
  }

  const getRelevanciaIcon = (relevancia: number) => {
    if (relevancia >= 20) return <Flame className="h-3 w-3 text-red-500" />
    if (relevancia >= 10) return <TrendingUp className="h-3 w-3 text-orange-500" />
    return <TrendingUp className="h-3 w-3 text-blue-500" />
  }

  const handleNoticiaClick = (noticia: NoticiaReal) => {
    analytics.trackNewsClick(noticia.titulo, noticia.fuente)
    window.open(noticia.url, "_blank", "noopener,noreferrer")
  }

  if (loading) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl dark:bg-gray-900/70">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 px-3 sm:px-6 py-3 sm:py-4">
          <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
            <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
            Noticias Económicas en Vivo
            <div className="animate-spin">
              <RefreshCw className="h-4 w-4" />
            </div>
          </CardTitle>
          <p className="text-xs text-orange-600/80">{debugInfo}</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
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
      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
            <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
            Noticias Económicas en Vivo
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
              REAL
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {ultimaActualizacion && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {ultimaActualizacion.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={cargarNoticias} className="h-6 px-2 text-xs" disabled={loading}>
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
        <p className="text-xs text-orange-600/80">NewsAPI • {debugInfo}</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-3">
        {error && (
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-amber-700 dark:text-amber-400 text-sm">
              {error}
              <Button
                variant="link"
                size="sm"
                onClick={cargarNoticias}
                className="ml-2 h-auto p-0 text-amber-700 dark:text-amber-400"
              >
                Reintentar
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {noticias.length === 0 && !error ? (
          <div className="text-center py-8">
            <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No hay noticias disponibles</p>
            <Button variant="outline" size="sm" onClick={cargarNoticias} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Recargar
            </Button>
          </div>
        ) : (
          noticias.map((noticia, index) => (
            <div
              key={index}
              className="bg-white/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handleNoticiaClick(noticia)}
            >
              <div className="flex gap-3">
                {noticia.imagen && (
                  <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={noticia.imagen || "/placeholder.svg"}
                      alt={noticia.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {noticia.titulo}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      {getRelevanciaIcon(noticia.relevancia)}
                      <Badge variant="outline" className={`text-xs ${getCategoriaColor(noticia.categoria)}`}>
                        {noticia.categoria}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {noticia.descripcion}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatearFecha(noticia.fechaPublicacion)}
                      </span>
                      <span className="font-medium text-orange-600 dark:text-orange-400 truncate max-w-24">
                        {noticia.fuente}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs hover:bg-orange-50 dark:hover:bg-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNoticiaClick(noticia)
                      }}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>

                  {noticia.relevancia >= 20 && (
                    <div className="mt-2 flex items-center gap-1">
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        <Flame className="h-3 w-3 mr-1" />
                        Muy relevante
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="text-center pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            📰 Powered by NewsAPI • Noticias reales de Argentina
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
