"use client"

import { Star, TrendingUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function RecomendacionDolar({ cotizaciones }) {
  // Filtrar cotizaciones válidas (que tengan precio de venta)
  const cotizacionesValidas = cotizaciones.filter(
    (c) => c.venta !== "No Cotiza" && c.casa !== "bitcoin" && c.casa !== "contadoliqui",
  )

  // Encontrar el dólar más barato para comprar
  const dolarMasBarato = cotizacionesValidas.reduce((prev, current) =>
    Number.parseFloat(current.venta) < Number.parseFloat(prev.venta) ? current : prev,
  )

  // Calcular la diferencia porcentual con el dólar oficial
  const dolarOficial = cotizaciones.find((c) => c.casa === "oficial")
  const diferenciaPorcentual =
    dolarOficial && dolarMasBarato
      ? (
          ((Number.parseFloat(dolarMasBarato.venta) - Number.parseFloat(dolarOficial.venta)) /
            Number.parseFloat(dolarOficial.venta)) *
          100
        ).toFixed(2)
      : 0

  return (
    <div className="space-y-4">
      {/* Alert principal mejorado */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-xl sm:rounded-2xl blur-xl"></div>
        <Alert className="relative border-0 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-xl rounded-xl sm:rounded-2xl p-3 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 sm:p-3 rounded-full">
              <Star className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1">
              <AlertTitle className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                🎯 Recomendación de compra
              </AlertTitle>
              <AlertDescription className="text-sm sm:text-base text-gray-700">
                Actualmente, el{" "}
                <span className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {dolarMasBarato.nombre}
                </span>{" "}
                es la opción más conveniente para comprar con un precio de{" "}
                <span className="font-bold text-lg sm:text-2xl text-emerald-600">
                  ${Number.parseFloat(dolarMasBarato.venta).toFixed(2)}
                </span>
                {dolarOficial && (
                  <span className="block mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                    Esto representa un{" "}
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-700 border-amber-300 text-[10px] sm:text-xs"
                    >
                      +{diferenciaPorcentual}%
                    </Badge>{" "}
                    por encima del dólar oficial.
                  </span>
                )}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  )
}
