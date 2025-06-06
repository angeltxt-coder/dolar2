"use client"

import { useState } from "react"
import { Share2, Copy, Facebook, Twitter, MessageCircle, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAnalyticsEventTracker } from "@/components/google-analytics"

export default function WidgetCompartir({ cotizaciones }) {
  const [copiado, setCopiado] = useState(false)
  const analytics = useAnalyticsEventTracker()

  const cotizacionesValidas = cotizaciones.filter(
    (c) => c.venta !== "No Cotiza" && c.casa !== "bitcoin" && c.casa !== "contadoliqui",
  )
  const dolarMasBarato = cotizacionesValidas.reduce((prev, current) =>
    Number.parseFloat(current.venta) < Number.parseFloat(prev.venta) ? current : prev,
  )

  const textoCompartir = `💵 ${dolarMasBarato.nombre}: $${Number.parseFloat(dolarMasBarato.venta).toFixed(2)} | dolaroficial.com.ar`

  const urlSitio = "https://dolaroficial.com.ar"

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(`${textoCompartir} ${urlSitio}`)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
      // Rastrear evento de copia
      analytics.trackShare("clipboard")
    } catch (err) {
      console.error("Error al copiar:", err)
    }
  }

  const compartirEnRed = (red: string) => {
    const textoEncoded = encodeURIComponent(textoCompartir)
    const urlEncoded = encodeURIComponent(urlSitio)

    let url = ""

    switch (red) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${textoEncoded}&url=${urlEncoded}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}&quote=${textoEncoded}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${textoEncoded} ${urlEncoded}`
        break
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")
      // Rastrear evento de compartir
      analytics.trackShare(red)
    }
  }

  return (
    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl dark:bg-gray-900/70">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          Compartir
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-3">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">{textoCompartir}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => compartirEnRed("whatsapp")}
            className="gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:border-green-800 dark:text-green-300"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => compartirEnRed("twitter")}
            className="gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => compartirEnRed("facebook")}
            className="gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={copiarTexto}
            className="gap-2 bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-900/20 dark:hover:bg-gray-900/30 dark:border-gray-800 dark:text-gray-300"
          >
            {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copiado ? "¡Copiado!" : "Copiar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
