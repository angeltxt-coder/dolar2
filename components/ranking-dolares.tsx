"use client"

import { Trophy, Medal, Award, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RankingDolares({ cotizaciones }) {
  // Filtrar y ordenar cotizaciones por precio
  const ranking = cotizaciones
    .filter((c) => c.venta !== "No Cotiza")
    .map((c) => ({
      ...c,
      precio: Number.parseFloat(c.venta),
      variacionNum: Number.parseFloat(c.variacion || "0"),
    }))
    .sort((a, b) => b.precio - a.precio)

  const getIconoPosicion = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
    }
  }

  const getColorPosicion = (index) => {
    switch (index) {
      case 0:
        return "from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-900/20 dark:to-amber-900/20 dark:border-yellow-800"
      case 1:
        return "from-gray-50 to-slate-50 border-gray-200 dark:from-gray-900/20 dark:to-slate-900/20 dark:border-gray-800"
      case 2:
        return "from-amber-50 to-orange-50 border-amber-200 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-800"
      default:
        return "from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800"
    }
  }

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl dark:bg-gray-900/70">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />🏆 RANKING VIRAL: Dólares Más Caros
          <Badge variant="destructive" className="animate-pulse">
            TRENDING
          </Badge>
        </CardTitle>
        <p className="text-xs text-yellow-600/80">¿Cuál está ganando la carrera? 🏁</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-3">
        {ranking.map((dolar, index) => (
          <div
            key={dolar.casa}
            className={`bg-gradient-to-r ${getColorPosicion(index)} p-4 rounded-lg border transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50">
                  {getIconoPosicion(index)}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">{dolar.nombre}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {index === 0 && "👑 El más caro"}
                    {index === ranking.length - 1 && "💰 El más barato"}
                    {index > 0 && index < ranking.length - 1 && `Posición #${index + 1}`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold">${dolar.precio.toFixed(2)}</p>
                {dolar.variacion && (
                  <div className="flex items-center gap-1 justify-end">
                    {dolar.variacionNum >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${dolar.variacionNum >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {Math.abs(dolar.variacionNum).toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            🔥 Ranking actualizado en tiempo real • Compartí en redes sociales
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
