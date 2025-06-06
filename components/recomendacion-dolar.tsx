"use client"

import { Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RecomendacionDolar({ cotizaciones }) {
  // Filtrar cotizaciones válidas (que tengan precio de venta)
  const cotizacionesValidas = cotizaciones.filter(
    (c) => c.venta !== "No Cotiza" && c.casa !== "bitcoin" && c.casa !== "contadoliqui",
  )

  // Encontrar el dólar más barato para comprar
  const dolarMasBarato = cotizacionesValidas.reduce((prev, current) =>
    Number.parseFloat(current.venta) < Number.parseFloat(prev.venta) ? current : prev,
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-xl sm:rounded-2xl blur-xl"></div>
        <Alert className="relative border-0 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-xl rounded-xl sm:rounded-2xl p-3 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 sm:p-3 rounded-full">
              <Star className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1">
              <AlertTitle className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                🎯 Mejor opción
              </AlertTitle>
              <AlertDescription className="text-sm sm:text-base text-gray-700">
                <span className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {dolarMasBarato.nombre}
                </span>{" "}
                a{" "}
                <span className="font-bold text-lg sm:text-2xl text-emerald-600">
                  ${Number.parseFloat(dolarMasBarato.venta).toFixed(2)}
                </span>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  )
}
