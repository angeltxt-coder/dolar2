"use client"

import { useState, useEffect } from "react"
import { getTrendingKeywords, type TrendData, getContextualSEOPhrase } from "@/lib/seo-trends"

interface DynamicSEOContentProps {
  cotizaciones: any[]
}

export default function DynamicSEOContent({ cotizaciones }: DynamicSEOContentProps) {
  const [trends, setTrends] = useState<TrendData[]>([])
  const [currentTitle, setCurrentTitle] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const trendData = await getTrendingKeywords()
        setTrends(trendData)

        // Generar título dinámico más natural
        const topTrend = trendData[0]
        const hour = new Date().getHours()
        const timePrefix = hour >= 6 && hour < 12 ? "Hoy" : hour >= 12 && hour < 18 ? "Ahora" : "Última Hora"

        if (topTrend.keyword.includes("blue")) {
          setCurrentTitle(`${timePrefix}: Dólar Blue y Todas las Cotizaciones`)
        } else if (topTrend.keyword.includes("oficial")) {
          setCurrentTitle(`${timePrefix}: Dólar Oficial, Blue, MEP y CCL`)
        } else if (topTrend.keyword.includes("precio")) {
          setCurrentTitle(`${timePrefix}: Precio del Dólar en Argentina`)
        } else {
          setCurrentTitle(`${timePrefix}: Cotizaciones del Dólar en Tiempo Real`)
        }
      } catch (error) {
        console.error("Error cargando tendencias:", error)
        setCurrentTitle("Cotizaciones del Dólar en Argentina")
      } finally {
        setLoading(false)
      }
    }

    loadTrends()

    // Actualizar cada 30 minutos
    const interval = setInterval(loadTrends, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [cotizaciones])

  if (loading) {
    return (
      <div className="text-center space-y-2">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Título dinámico principal */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
        {currentTitle}
      </h1>

      {/* Subtítulo con información contextual */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
        {getContextualSEOPhrase("general")} - Información actualizada del mercado cambiario argentino con todas las
        cotizaciones oficiales y paralelas.
      </p>
    </div>
  )
}
