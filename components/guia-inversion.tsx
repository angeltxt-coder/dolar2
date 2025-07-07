"use client"

import { BookOpen, TrendingUp, Zap, Target, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function GuiaInversion() {
  const consejos = [
    {
      titulo: "🎯 Diversificá tu cartera",
      descripcion: "No pongas todos los huevos en la misma canasta. Combiná dólar oficial, MEP y blue según tu perfil.",
      nivel: "Principiante",
      color: "bg-green-50 text-green-700 border-green-300",
    },
    {
      titulo: "⏰ Timing es clave",
      descripcion: "Comprá cuando la brecha esté alta y vendé cuando se achique. Seguí las tendencias diarias.",
      nivel: "Intermedio",
      color: "bg-yellow-50 text-yellow-700 border-yellow-300",
    },
    {
      titulo: "📊 Analizá la volatilidad",
      descripcion: "El dólar cripto es más volátil pero puede dar mejores oportunidades para traders experimentados.",
      nivel: "Avanzado",
      color: "bg-red-50 text-red-700 border-red-300",
    },
    {
      titulo: "🛡️ Protegé tu capital",
      descripcion:
        "Nunca inviertas más del 20% de tus ahorros en una sola operación. La gestión de riesgo es fundamental.",
      nivel: "Esencial",
      color: "bg-blue-50 text-blue-700 border-blue-300",
    },
  ]

  const estrategias = [
    {
      nombre: "🚀 Estrategia Agresiva",
      descripcion: "Para inversores con alta tolerancia al riesgo",
      componentes: ["70% Dólar Blue", "20% Cripto", "10% MEP"],
      riesgo: "Alto",
      retorno: "Alto",
    },
    {
      nombre: "⚖️ Estrategia Balanceada",
      descripcion: "El equilibrio perfecto entre riesgo y retorno",
      componentes: ["40% Oficial", "30% Blue", "20% MEP", "10% CCL"],
      riesgo: "Medio",
      retorno: "Medio",
    },
    {
      nombre: "🛡️ Estrategia Conservadora",
      descripcion: "Para quienes priorizan la seguridad",
      componentes: ["60% Oficial", "25% MEP", "15% CCL"],
      riesgo: "Bajo",
      retorno: "Estable",
    },
  ]

  return (
    <Card className="border-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />📚 GUÍA VIRAL DE INVERSIÓN EN DÓLARES
          <Badge variant="destructive" className="animate-pulse">
            EXCLUSIVA
          </Badge>
        </CardTitle>
        <p className="text-xs text-indigo-600/80">🔥 Los secretos que usan los expertos</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-6">
        {/* Consejos principales */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />💡 Consejos de Oro
          </h3>
          <div className="grid gap-3">
            {consejos.map((consejo, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold text-sm">{consejo.titulo}</h4>
                  <Badge variant="outline" className={`text-xs ${consejo.color}`}>
                    {consejo.nivel}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{consejo.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estrategias de inversión */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />🎯 Estrategias VIRALES
          </h3>
          <div className="grid gap-4">
            {estrategias.map((estrategia, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-bold text-sm mb-1">{estrategia.nombre}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{estrategia.descripcion}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={`text-xs mb-1 ${
                        estrategia.riesgo === "Alto"
                          ? "bg-red-50 text-red-700 border-red-300"
                          : estrategia.riesgo === "Medio"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                            : "bg-green-50 text-green-700 border-green-300"
                      }`}
                    >
                      Riesgo: {estrategia.riesgo}
                    </Badge>
                    <br />
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                      Retorno: {estrategia.retorno}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Composición:</p>
                  <div className="flex flex-wrap gap-2">
                    {estrategia.componentes.map((componente, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {componente}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 text-center">
          <h4 className="font-bold text-sm mb-2">🚀 ¿Querés más consejos exclusivos?</h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            Únete a nuestra comunidad de +50K inversores y recibí alertas personalizadas
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Zap className="h-4 w-4 mr-2" />
              Suscribirme GRATIS
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Más Tips
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
