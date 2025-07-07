"use client"

import { useState } from "react"
import { Bell, Mail, Zap, Gift, Star, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function WidgetSuscripcion() {
  const [email, setEmail] = useState("")
  const [suscrito, setSuscrito] = useState(false)

  const handleSuscripcion = (e) => {
    e.preventDefault()
    if (email) {
      setSuscrito(true)
      // Aquí iría la lógica real de suscripción
      setTimeout(() => setSuscrito(false), 5000)
    }
  }

  if (suscrito) {
    return (
      <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-xl">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg text-green-800 dark:text-green-200 mb-2">🎉 ¡Bienvenido a la comunidad!</h3>
          <p className="text-sm text-green-600 dark:text-green-400">
            Ya sos parte de los +50K usuarios que reciben alertas exclusivas del dólar
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-pink-900/20 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-3 sm:px-6 py-3 sm:py-4">
        <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 animate-pulse" />🔔 ALERTAS VIRALES DEL DÓLAR
          <Badge variant="destructive" className="animate-bounce">
            GRATIS
          </Badge>
        </CardTitle>
        <p className="text-xs text-orange-600/80">🚀 Únete a +50K usuarios que ya las reciben</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
            <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-xs font-medium">⚡ Alertas instantáneas</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
            <Star className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <p className="text-xs font-medium">⭐ Análisis exclusivos</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
            <Gift className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-xs font-medium">🎁 Tips de inversión</p>
          </div>
        </div>

        <form onSubmit={handleSuscripcion} className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/70"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6"
            >
              <Mail className="h-4 w-4 mr-2" />
              ¡Quiero!
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              🔒 100% seguro • Sin spam • Cancelá cuando quieras
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                ✅ +50K suscriptores
              </Badge>
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                ⭐ 4.9/5 rating
              </Badge>
            </div>
          </div>
        </form>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-center text-yellow-700 dark:text-yellow-300">
            🔥 <strong>OFERTA LIMITADA:</strong> Los primeros 1000 suscriptores reciben acceso VIP a nuestro grupo de
            Telegram exclusivo
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
