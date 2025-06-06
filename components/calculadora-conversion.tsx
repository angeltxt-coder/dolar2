"use client"

import { useState, useEffect } from "react"
import { Calculator, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function CalculadoraConversion({ cotizaciones }) {
  const [cantidad, setCantidad] = useState("")
  const [tipoOrigen, setTipoOrigen] = useState("pesos")
  const [tipoDestino, setTipoDestino] = useState("oficial")
  const [resultado, setResultado] = useState(0)

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
      // De pesos a dólares
      const tipoCambio = tiposDolar.find((t) => t.value === tipoDestino)?.precio || 1
      setResultado(cantidadNum / tipoCambio)
    } else {
      // De dólares a pesos
      const tipoCambio = tiposDolar.find((t) => t.value === tipoOrigen)?.precio || 1
      setResultado(cantidadNum * tipoCambio)
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
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
          Calculadora de Conversión
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Convierte entre pesos argentinos y diferentes tipos de dólar
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:gap-6">
          {/* Cantidad de origen */}
          <div className="space-y-2">
            <Label htmlFor="cantidad" className="text-sm font-medium">
              Cantidad
            </Label>
            <Input
              id="cantidad"
              type="number"
              placeholder="Ingresa la cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Selector de moneda origen */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Desde</Label>
            <Select value={tipoOrigen} onValueChange={setTipoOrigen}>
              <SelectTrigger className="bg-white/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pesos">💰 Pesos Argentinos (ARS)</SelectItem>
                {tiposDolar.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    💵 {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón intercambiar */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={intercambiarMonedas}
              className="gap-2 bg-white/70 hover:bg-white/90"
            >
              <ArrowUpDown className="h-4 w-4" />
              Intercambiar
            </Button>
          </div>

          {/* Selector de moneda destino */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Hacia</Label>
            <Select value={tipoDestino} onValueChange={setTipoDestino}>
              <SelectTrigger className="bg-white/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pesos">💰 Pesos Argentinos (ARS)</SelectItem>
                {tiposDolar.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    💵 {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resultado */}
          {cantidad && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Resultado</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                  {tipoDestino === "pesos" ? "$" : "US$"}{" "}
                  {resultado.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {tipoDestino === "pesos" ? "Pesos Argentinos" : "Dólares Estadounidenses"}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
