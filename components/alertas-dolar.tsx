"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, TrendingUp, TrendingDown, Zap, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertasDolar({ cotizaciones }) {
  const [alertas, setAlertas] = useState([])

  useEffect(() => {
    const generarAlertas = () => {
      const nuevasAlertas = []

      // Alerta de brecha alta
      const oficial = cotizaciones.find((c) => c.casa === "oficial")
      const blue = cotizaciones.find((c) => c.casa === "blue")

      if (oficial && blue) {
        const brecha =
          ((Number.parseFloat(blue.venta) - Number.parseFloat(oficial.venta)) / Number.parseFloat(oficial.venta)) * 100
        if (brecha > 50) {
          nuevasAlertas.push({
            tipo: "critica",
            titulo: "🚨 BRECHA CRÍTICA DETECTADA",
            mensaje: `La brecha entre dólar oficial y blue alcanzó ${brecha.toFixed(1)}% - ¡Momento clave para inversores!`,
            icono: <AlertTriangle className="h-4 w-4" />,
            color: "destructive",
          })
        }
      }

      // Alertas de variaciones altas
      cotizaciones.forEach((cotizacion) => {
        if (cotizacion.variacion && Math.abs(Number.parseFloat(cotizacion.variacion)) > 2) {
          const esSubida = Number.parseFloat(cotizacion.variacion) > 0
          nuevasAlertas.push({
            tipo: esSubida ? "subida" : "bajada",
            titulo: `🔥 ${cotizacion.nombre.toUpperCase()} ${esSubida ? "DISPARADO" : "EN CAÍDA"}`,
            mensaje: `${esSubida ? "📈 Subió" : "📉 Bajó"} ${Math.abs(Number.parseFloat(cotizacion.variacion)).toFixed(2)}% en las últimas horas`,
            icono: esSubida ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />,
            color: esSubida ? "default" : "destructive",
          })
        }
      })

      // Alerta de oportunidad
      const dolarMasBarato = cotizaciones
        .filter((c) => c.venta !== "No Cotiza")
        .reduce((prev, current) => (Number.parseFloat(current.venta) < Number.parseFloat(prev.venta) ? current : prev))

      nuevasAlertas.push({
        tipo: "oportunidad",
        titulo: "💰 OPORTUNIDAD DE COMPRA",
        mensaje: `${dolarMasBarato.nombre} es el más barato a $${Number.parseFloat(dolarMasBarato.venta).toFixed(2)} - ¡Aprovechá ahora!`,
        icono: <Zap className="h-4 w-4" />,
        color: "default",
      })

      setAlertas(nuevasAlertas.slice(0, 3)) // Máximo 3 alertas
    }

    generarAlertas()
  }, [cotizaciones])

  if (alertas.length === 0) return null

  return (
    <div className="space-y-3">
      {alertas.map((alerta, index) => (
        <Alert
          key={index}
          className={`border-0 shadow-xl animate-pulse ${
            alerta.color === "destructive"
              ? "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"
              : "bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${
                alerta.color === "destructive"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              }`}
            >
              {alerta.icono}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-sm">{alerta.titulo}</h3>
                <Badge variant={alerta.color} className="text-xs animate-bounce">
                  <Bell className="h-3 w-3 mr-1" />
                  ALERTA
                </Badge>
              </div>
              <AlertDescription className="text-sm">{alerta.mensaje}</AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  )
}
