"use client"

import { useState, useEffect } from "react"
import { Calculator, ArrowUpDown, Target, Zap, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAnalyticsEventTracker } from "@/components/google-analytics"

export default function CalculadoraAvanzada({ cotizaciones }) {
  const [cantidad, setCantidad] = useState("")
  const [tipoOrigen, setTipoOrigen] = useState("pesos")
  const [tipoDestino, setTipoDestino] = useState("blue")
  const [resultado, setResultado] = useState(0)
  const [ahorro, setAhorro] = useState(0)
  const [mejorOpcion, setMejorOpcion] = useState("")
  const analytics = useAnalyticsEventTracker()

  const tiposDolar = cotizaciones
    .filter((c) => c.venta !== "No Cotiza")
    .map((c) => ({
      value: c.casa,
      label: c.nombre,
      precio: Number.parseFloat(c.venta),
    }))

  const calcularConversion = () => {
    if (!cantidad || isNaN(Number(cantidad))) return

    const cantidadNum = Number(cantidad)

    if (tipoOrigen === "pesos") {
      const tipoCambio = tiposDolar.find((t) => t.value === tipoDestino)?.precio || 1
      const resultadoCalc = cantidadNum / tipoCambio
      setResultado(resultadoCalc)

      // Calcular ahorro vs opción más cara
      const dolarMasCaro = tiposDolar.reduce((prev, current) => (current.precio > prev.precio ? current : prev))
      const diferencia = cantidadNum / dolarMasCaro.precio
      setAhorro(resultadoCalc - diferencia)
      setMejorOpcion(dolarMasCaro.label)

      analytics.trackConversion(tipoOrigen, tipoDestino, cantidadNum)
    } else {
      const tipoCambio = tiposDolar.find((t) => t.value === tipoOrigen)?.precio || 1
      setResultado(cantidadNum * tipoCambio)
      setAhorro(0)
    }
  }

  const intercambiarMonedas = () => {
    if (tipoOrigen === "pesos") {
      setTipoOrigen(tipoDestino)
      setTipoDestino("pesos")
    } else {
      setTipoDestino(tipoOrigen)
      setTipoOrigen("pesos")
    }
  }

  useEffect(() => {
    if (cantidad) {
      calcularConversion()
    }
  }, [cantidad, tipoOrigen, tipoDestino])

  return (
    <Card className="border-0 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-red-900/20 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />🧮 CALCULADORA VIRAL PRO
          <Badge variant="destructive" className="animate-pulse">
            HOT
          </Badge>
        </CardTitle>
        <p className="text-xs text-purple-600/80">🔥 La calculadora más usada de Argentina</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="cantidad" className="text-sm font-medium flex items-center gap-2">
              💰 Cantidad a convertir
              <Badge variant="outline" className="text-xs">
                VIRAL
              </Badge>
            </Label>
            <Input
              id="cantidad"
              type="number"
              placeholder="Ej: 100000"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="text-lg font-semibold bg-white/70"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium">🏦 Desde</Label>
              <Select value={tipoOrigen} onValueChange={setTipoOrigen}>
                <SelectTrigger className="bg-white/70">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pesos">💰 Pesos Argentinos</SelectItem>
                  {tiposDolar.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      💵 {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={intercambiarMonedas}
                className="gap-2 bg-white/70 hover:bg-white/90 border-purple-200"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">Intercambiar</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">🎯 Hacia</Label>
              <Select value={tipoDestino} onValueChange={setTipoDestino}>
                <SelectTrigger className="bg-white/70">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pesos">💰 Pesos Argentinos</SelectItem>
                  {tiposDolar.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      💵 {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {cantidad && (
            <div className="space-y-4">
              {/* Resultado principal */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">🎯 RESULTADO VIRAL</p>
                  <p className="text-3xl sm:text-4xl font-bold text-purple-800 dark:text-purple-200">
                    {tipoDestino === "pesos" ? "$" : "US$"}{" "}
                    {resultado.toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              {/* Información de ahorro */}
              {ahorro > 0 && tipoOrigen === "pesos" && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">💰 ¡AHORRO DETECTADO!</p>
                    <Badge variant="default" className="bg-green-600">
                      SMART
                    </Badge>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Comprando aquí ahorras <span className="font-bold">US${ahorro.toFixed(2)}</span> vs {mejorOpcion}
                  </p>
                </div>
              )}

              {/* Botones de acción viral */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => {
                    navigator.share?.({
                      title: "Calculadora de Dólar",
                      text: `Convertí ${cantidad} ${tipoOrigen} = ${resultado.toFixed(2)} ${tipoDestino}`,
                      url: window.location.href,
                    })
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                  onClick={() => {
                    setCantidad("")
                    setResultado(0)
                    setAhorro(0)
                  }}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Nuevo Cálculo
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
