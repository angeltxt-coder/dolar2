"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTrendingKeywords, type TrendData } from "@/lib/seo-trends"

export default function SEOFooterContent() {
  const [trends, setTrends] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const trendData = await getTrendingKeywords()
        setTrends(trendData)
      } catch (error) {
        console.error("Error cargando tendencias:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTrends()
  }, [])

  if (loading) return null

  const topTrends = trends.slice(0, 15)
  const categories = {
    cotizacion: topTrends.filter((t) => t.category === "cotizacion"),
    herramienta: topTrends.filter((t) => t.category === "herramienta"),
    analisis: topTrends.filter((t) => t.category === "analisis"),
    operacion: topTrends.filter((t) => t.category === "operacion"),
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Información Completa sobre el Dólar en Argentina
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Todo lo que necesitás saber sobre cotizaciones, tipos de cambio y mercado cambiario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Cotizaciones */}
          <Card className="bg-white/70 dark:bg-slate-800/70">
            <CardContent className="p-4">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3 text-sm">
                💰 Cotizaciones Populares
              </h3>
              <div className="space-y-2">
                {categories.cotizacion.slice(0, 5).map((trend) => (
                  <div key={trend.keyword} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{trend.keyword}</span>
                    <Badge variant="outline" className="text-xs">
                      {(trend.volume / 1000).toFixed(0)}k
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Herramientas */}
          <Card className="bg-white/70 dark:bg-slate-800/70">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 text-sm">🔧 Herramientas</h3>
              <div className="space-y-2">
                {categories.herramienta.slice(0, 3).map((trend) => (
                  <div key={trend.keyword} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{trend.keyword}</span>
                    <Badge variant="outline" className="text-xs">
                      {(trend.volume / 1000).toFixed(0)}k
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análisis */}
          <Card className="bg-white/70 dark:bg-slate-800/70">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 text-sm">📊 Análisis</h3>
              <div className="space-y-2">
                {categories.analisis.slice(0, 3).map((trend) => (
                  <div key={trend.keyword} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{trend.keyword}</span>
                    <Badge variant="outline" className="text-xs">
                      {(trend.volume / 1000).toFixed(0)}k
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Operaciones */}
          <Card className="bg-white/70 dark:bg-slate-800/70">
            <CardContent className="p-4">
              <h3 className="font-semibold text-orange-700 dark:text-orange-400 mb-3 text-sm">💱 Operaciones</h3>
              <div className="space-y-2">
                {categories.operacion.slice(0, 3).map((trend) => (
                  <div key={trend.keyword} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{trend.keyword}</span>
                    <Badge variant="outline" className="text-xs">
                      {(trend.volume / 1000).toFixed(0)}k
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Texto SEO adicional */}
        <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg">
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <p className="mb-2">
              <strong>DolarOficial.com.ar</strong> es tu fuente confiable para seguir las{" "}
              <strong>cotizaciones del dólar</strong> en Argentina. Monitoreamos en tiempo real el{" "}
              <strong>dólar oficial</strong>, <strong>dólar blue</strong>, <strong>dólar MEP</strong>,{" "}
              <strong>dólar CCL</strong>, <strong>dólar cripto</strong> y <strong>dólar solidario</strong>.
            </p>
            <p className="mb-2">
              Nuestra plataforma ofrece herramientas avanzadas como <strong>calculadora de conversión</strong>,{" "}
              <strong>gráficos históricos</strong>, <strong>análisis de tendencias</strong> y{" "}
              <strong>noticias del mercado cambiario</strong>. Ideal para inversores, empresarios y cualquier persona
              que necesite información actualizada sobre el <strong>tipo de cambio</strong> en Argentina.
            </p>
            <p>
              Seguí la <strong>evolución del dólar</strong>, analizá la <strong>brecha cambiaria</strong> y tomá
              decisiones informadas con nuestros datos actualizados las 24 horas. Información confiable sobre{" "}
              <strong>reservas del BCRA</strong>, <strong>política cambiaria</strong> y{" "}
              <strong>mercado financiero argentino</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
