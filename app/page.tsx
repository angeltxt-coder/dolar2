import { Suspense } from "react"
import {
  ArrowDown,
  ArrowUp,
  TrendingUp,
  DollarSign,
  BarChart3,
  RefreshCcw,
  Zap,
  Target,
  FlameIcon as Fire,
  Trophy,
  Bell,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

import DolarChart from "@/components/dolar-chart"
import ComparativaDolar from "@/components/comparativa-dolar"
import RecomendacionDolar from "@/components/recomendacion-dolar"
import CalculadoraConversion from "@/components/calculadora-conversion"
import WidgetCompartir from "@/components/widget-compartir"
import NoticiasEconomicas from "@/components/noticias-economicas"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCotizaciones } from "@/lib/api"
import NoticiasRelevantes from "@/components/noticias-relevantes"

// Colores específicos para cada tipo de dólar
const dolarColors: Record<string, string> = {
  oficial: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-indigo-600",
  bolsa: "from-amber-500 to-orange-600", // MEP
  contadoliqui: "from-purple-500 to-violet-600", // CCL
  solidario: "from-red-500 to-rose-600",
  tarjeta: "from-pink-500 to-fuchsia-600",
  cripto: "from-cyan-500 to-blue-500",
}

const dolarIcons: Record<string, string> = {
  oficial: "🏛️",
  blue: "💙",
  bolsa: "📈", // MEP
  contadoliqui: "💱", // CCL
  solidario: "🤝",
  tarjeta: "💳",
  cripto: "₿",
}

const dolarNames: Record<string, string> = {
  oficial: "Dólar Oficial",
  blue: "Dólar Blue",
  bolsa: "Dólar MEP",
  contadoliqui: "Dólar CCL",
  solidario: "Dólar Solidario",
  tarjeta: "Dólar Tarjeta",
  cripto: "Dólar Cripto",
}

export default async function Home() {
  const cotizaciones = await getCotizaciones()

  // Filtrar cotizaciones válidas y eliminar mayorista
  const cotizacionesFiltradas = cotizaciones.filter((c: any) => c.casa !== "mayorista")

  // Calcular estadísticas para engagement
  const dolarOficial = cotizacionesFiltradas.find((c: any) => c.casa === "oficial")
  const dolarBlue = cotizacionesFiltradas.find((c: any) => c.casa === "blue")
  const dolarMEP = cotizacionesFiltradas.find((c: any) => c.casa === "bolsa")
  const dolarCCL = cotizacionesFiltradas.find((c: any) => c.casa === "contadoliqui")
  const dolarCripto = cotizacionesFiltradas.find((c: any) => c.casa === "cripto")

  let brechaBlue = "0"
  if (dolarOficial && dolarBlue && dolarOficial.venta && dolarBlue.venta) {
    const oficialVenta = Number.parseFloat(dolarOficial.venta)
    const blueVenta = Number.parseFloat(dolarBlue.venta)
    if (!isNaN(oficialVenta) && !isNaN(blueVenta) && oficialVenta > 0) {
      brechaBlue = (((blueVenta - oficialVenta) / oficialVenta) * 100).toFixed(1)
    }
  }

  const cotizacionesConPrecio = cotizacionesFiltradas.filter((c: any) => c.venta !== "No Cotiza")

  const dolarMasCaro =
    cotizacionesConPrecio.length > 0
      ? cotizacionesConPrecio.reduce((prev: any, current: any) =>
          Number.parseFloat(current.venta) > Number.parseFloat(prev.venta) ? current : prev,
        )
      : null

  const dolarMasBarato =
    cotizacionesConPrecio.length > 0
      ? cotizacionesConPrecio.reduce((prev: any, current: any) =>
          Number.parseFloat(current.venta) < Number.parseFloat(prev.venta) ? current : prev,
        )
      : null

  // Obtener fecha y hora actual para SEO dinámico
  const ahora = new Date()
  const fechaHoy = ahora.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const horaActual = ahora.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header VIRAL con SEO */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20 shadow-lg">
        <div className="flex h-16 sm:h-20 items-center gap-2 sm:gap-4 px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-blue-600 p-1.5 sm:p-2 rounded-full">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                DolarOficial
              </h1>
              <p className="text-xs text-emerald-600 font-medium">🔥 #1 en Argentina - {horaActual}</p>
            </div>
          </div>

          {/* Alertas SEO en vivo */}
          <div className="hidden md:flex items-center gap-2 ml-4">
            <Badge variant="destructive" className="animate-pulse">
              <Bell className="h-3 w-3 mr-1" />
              BRECHA: {brechaBlue}% | BLUE: ${dolarBlue?.venta || "N/A"}
            </Badge>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200 text-green-700 transition-all duration-300"
            >
              <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">Alertas</span>
            </Button>
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 dark:hover:from-emerald-900/20 dark:hover:to-blue-900/20 transition-all duration-300 bg-transparent"
            >
              <RefreshCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">Actualizar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Ticker de precios EN VIVO - Arriba de todo */}
      <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white py-2 px-4 overflow-hidden">
        <div className="flex items-center justify-center gap-8 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">🏛️ OFICIAL:</span>
            <span className="text-lg font-bold">
              ${dolarOficial?.venta ? Number.parseFloat(dolarOficial.venta).toFixed(2) : "N/A"}
            </span>
            {dolarOficial?.variacion && (
              <span
                className={`text-xs ${Number.parseFloat(dolarOficial.variacion) >= 0 ? "text-green-200" : "text-red-200"}`}
              >
                {Number.parseFloat(dolarOficial.variacion) >= 0 ? "↗" : "↘"}{" "}
                {Math.abs(Number.parseFloat(dolarOficial.variacion)).toFixed(2)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">💙 BLUE:</span>
            <span className="text-lg font-bold">
              ${dolarBlue?.venta ? Number.parseFloat(dolarBlue.venta).toFixed(2) : "N/A"}
            </span>
            {dolarBlue?.variacion && (
              <span
                className={`text-xs ${Number.parseFloat(dolarBlue.variacion) >= 0 ? "text-green-200" : "text-red-200"}`}
              >
                {Number.parseFloat(dolarBlue.variacion) >= 0 ? "↗" : "↘"}{" "}
                {Math.abs(Number.parseFloat(dolarBlue.variacion)).toFixed(2)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">📈 MEP:</span>
            <span className="text-lg font-bold">
              ${dolarMEP?.venta ? Number.parseFloat(dolarMEP.venta).toFixed(2) : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">💱 CCL:</span>
            <span className="text-lg font-bold">
              ${dolarCCL?.venta ? Number.parseFloat(dolarCCL.venta).toFixed(2) : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">🔥 BRECHA:</span>
            <span className="text-lg font-bold text-yellow-200">{brechaBlue}%</span>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 sm:gap-6">
          {/* Hero Section VIRAL con SEO MASIVO */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="destructive" className="animate-bounce">
                <Fire className="h-3 w-3 mr-1" />
                TRENDING #1 ARGENTINA
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                <Trophy className="h-3 w-3 mr-1" />
                +1M visitas/mes
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Zap className="h-3 w-3 mr-1" />
                Actualización cada 30seg
              </Badge>
            </div>

            {/* Título SEO MEGA OPTIMIZADO */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              🔥 DÓLAR HOY {fechaHoy.toUpperCase()}: Cotizaciones EN VIVO Argentina 2024
            </h1>

            {/* Subtítulo SEO con keywords */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-semibold">
                💰 Precio del Dólar Blue ${dolarBlue?.venta || "N/A"} | Oficial ${dolarOficial?.venta || "N/A"} | MEP $
                {dolarMEP?.venta || "N/A"}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
                🚀 <strong>Cotizaciones del dólar en Argentina</strong> actualizadas en tiempo real. Seguí el{" "}
                <strong>dólar blue</strong>, <strong>dólar oficial BCRA</strong>, <strong>dólar MEP</strong>,{" "}
                <strong>dólar CCL</strong>, <strong>dólar cripto</strong> y <strong>dólar solidario</strong>.
                Calculadora de conversión, gráficos históricos y análisis del mercado cambiario argentino.
              </p>
            </div>

            {/* Estadísticas DETALLADAS con nombres */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-xs font-medium text-red-700 dark:text-red-300">🔥 BRECHA BLUE vs OFICIAL</p>
                <p className="text-xl font-bold text-red-800 dark:text-red-200">{brechaBlue}%</p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  Blue ${dolarBlue?.venta || "N/A"} vs Oficial ${dolarOficial?.venta || "N/A"}
                </p>
              </div>
              {dolarMasBarato && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs font-medium text-green-700 dark:text-green-300">💰 DÓLAR MÁS BARATO</p>
                  <p className="text-xl font-bold text-green-800 dark:text-green-200">
                    ${Number.parseFloat(dolarMasBarato.venta).toFixed(0)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {dolarNames[dolarMasBarato.casa] || dolarMasBarato.nombre}
                  </p>
                </div>
              )}
              {dolarMasCaro && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-xs font-medium text-orange-700 dark:text-orange-300">🚀 DÓLAR MÁS CARO</p>
                  <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                    ${Number.parseFloat(dolarMasCaro.venta).toFixed(0)}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    {dolarNames[dolarMasCaro.casa] || dolarMasCaro.nombre}
                  </p>
                </div>
              )}
              {dolarMasCaro && dolarMasBarato && (
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-xs font-medium text-purple-700 dark:text-purple-300">📊 DIFERENCIA MÁXIMA</p>
                  <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                    ${(Number.parseFloat(dolarMasCaro.venta) - Number.parseFloat(dolarMasBarato.venta)).toFixed(0)}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Entre {dolarNames[dolarMasCaro.casa]?.split(" ")[1] || "más caro"} y{" "}
                    {dolarNames[dolarMasBarato.casa]?.split(" ")[1] || "más barato"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Alerta SEO de oportunidad */}
          <Alert className="border-0 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-xl">
            <Fire className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-sm">
              <strong>🎯 OPORTUNIDAD DE INVERSIÓN HOY:</strong> El{" "}
              <strong>{dolarNames[dolarMasBarato?.casa] || "dólar más barato"}</strong> está a $
              {dolarMasBarato?.venta || "N/A"}, mientras que el{" "}
              <strong>{dolarNames[dolarMasCaro?.casa] || "dólar más caro"}</strong> cotiza a $
              {dolarMasCaro?.venta || "N/A"}. La brecha del dólar blue vs oficial es del {brechaBlue}% - ¡Momento clave
              para operar en el mercado cambiario argentino!
            </AlertDescription>
          </Alert>

          {/* Dólar Oficial Destacado con SEO */}
          <Card className="border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🏛️</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🔥 DÓLAR OFICIAL BCRA HOY {fechaHoy}
                  </h2>
                  <Badge variant="destructive" className="animate-pulse">
                    EN VIVO
                  </Badge>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  💰 <strong>Cotización oficial del Banco Central de la República Argentina (BCRA)</strong> - Tipo de
                  cambio para operaciones comerciales y financieras reguladas
                </p>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-md mx-auto">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-3 sm:p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
                    <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                      💰 COMPRA OFICIAL
                    </p>
                    <p className="text-2xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                      $
                      {dolarOficial?.compra !== "No Cotiza" && dolarOficial?.compra
                        ? Number.parseFloat(dolarOficial.compra).toFixed(2)
                        : "-"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                    <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                      💸 VENTA OFICIAL
                    </p>
                    <p className="text-2xl sm:text-4xl font-bold text-blue-800 dark:text-blue-200">
                      $
                      {dolarOficial?.venta !== "No Cotiza" && dolarOficial?.venta
                        ? Number.parseFloat(dolarOficial.venta).toFixed(2)
                        : "-"}
                    </p>
                  </div>
                </div>

                {dolarOficial?.variacion && (
                  <div className="flex items-center justify-center gap-2">
                    <Badge
                      variant={Number.parseFloat(dolarOficial.variacion) >= 0 ? "default" : "destructive"}
                      className="gap-1 shadow-lg text-sm px-3 py-1 animate-bounce"
                    >
                      {Number.parseFloat(dolarOficial.variacion) >= 0 ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {Math.abs(Number.parseFloat(dolarOficial.variacion)).toFixed(2)}% vs ayer
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recomendación VIRAL con SEO */}
          <Card className="border-0 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 sm:px-6 py-2 sm:py-3">
              <CardTitle className="flex items-center gap-1.5 text-base sm:text-lg">
                <Fire className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400 animate-pulse" />🎯 ¿QUÉ
                DÓLAR COMPRAR HOY? ANÁLISIS VIRAL
                <Badge variant="destructive" className="animate-bounce">
                  HOT
                </Badge>
              </CardTitle>
              <p className="text-xs text-orange-600/80">
                🔥 Recomendación basada en análisis de mercado cambiario argentino - Mejor precio para invertir en
                dólares hoy
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
                <RecomendacionDolar cotizaciones={cotizacionesFiltradas} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Cards de cotizaciones con SEO mejorado */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-100 dark:to-blue-100 bg-clip-text text-transparent">
              📊 Todas las Cotizaciones del Dólar en Argentina Hoy
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              💱 Seguí en tiempo real el <strong>precio del dólar blue</strong>, <strong>dólar MEP</strong>,{" "}
              <strong>dólar CCL</strong>, <strong>dólar cripto</strong>, <strong>dólar solidario</strong> y{" "}
              <strong>dólar tarjeta</strong>. Información actualizada cada 30 segundos desde las principales fuentes del
              mercado cambiario argentino.
            </p>

            <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cotizacionesFiltradas
                .filter((c: any) => c.casa !== "oficial")
                .map((cotizacion: any) => (
                  <Card
                    key={cotizacion.casa}
                    className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm overflow-hidden relative"
                  >
                    {cotizacion.variacion && Number.parseFloat(cotizacion.variacion) > 1 && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          🔥 HOT
                        </Badge>
                      </div>
                    )}

                    <div
                      className={`h-1 bg-gradient-to-r ${dolarColors[cotizacion.casa] || "from-gray-400 to-gray-500"}`}
                    ></div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 pt-2 px-3 sm:px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg sm:text-xl">{dolarIcons[cotizacion.casa] || "💰"}</span>
                          <CardTitle className="text-sm sm:text-base font-bold">
                            {dolarNames[cotizacion.casa] || cotizacion.nombre}
                          </CardTitle>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {cotizacion.casa === "blue" && "Mercado paralelo - Cuevas"}
                          {cotizacion.casa === "bolsa" && "Mercado Electrónico de Pagos"}
                          {cotizacion.casa === "contadoliqui" && "Contado con Liquidación"}
                          {cotizacion.casa === "cripto" && "Stablecoins - USDT/USDC"}
                          {cotizacion.casa === "solidario" && "Oficial + 30% PAÍS + 45% Ganancias"}
                          {cotizacion.casa === "tarjeta" && "Compras en el exterior"}
                        </p>
                      </div>
                      {cotizacion.variacion && (
                        <Badge
                          variant={Number.parseFloat(cotizacion.variacion) >= 0 ? "default" : "destructive"}
                          className="gap-1 shadow-md text-[10px] sm:text-xs"
                        >
                          {Number.parseFloat(cotizacion.variacion) >= 0 ? (
                            <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          ) : (
                            <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          )}
                          {Math.abs(Number.parseFloat(cotizacion.variacion)).toFixed(2)}%
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="px-3 sm:px-4 py-2">
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            💰 Compra
                          </p>
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-2 sm:p-3 rounded-lg">
                            <p className="text-base sm:text-xl font-bold text-emerald-700 dark:text-emerald-300">
                              {cotizacion.compra !== "No Cotiza"
                                ? `$${Number.parseFloat(cotizacion.compra).toFixed(2)}`
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            💸 Venta
                          </p>
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-2 sm:p-3 rounded-lg">
                            <p className="text-base sm:text-xl font-bold text-blue-700 dark:text-blue-300">
                              {cotizacion.venta !== "No Cotiza"
                                ? `$${Number.parseFloat(cotizacion.venta).toFixed(2)}`
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Calculadora con SEO */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-100 dark:to-pink-100 bg-clip-text text-transparent">
              🧮 Calculadora de Conversión Dólar-Peso Argentina
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              💰 <strong>Convertí pesos argentinos a dólares</strong> y viceversa con nuestra calculadora actualizada en
              tiempo real. Elegí entre dólar oficial, blue, MEP, CCL o cripto para obtener el{" "}
              <strong>tipo de cambio más conveniente</strong> para tus operaciones financieras.
            </p>
            <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
              <CalculadoraConversion cotizaciones={cotizacionesFiltradas} />
            </Suspense>
          </div>

          {/* Widget Compartir con SEO */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-green-900 to-emerald-900 dark:from-green-100 dark:to-emerald-100 bg-clip-text text-transparent">
              📱 Compartir Cotizaciones del Dólar
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              🚀 <strong>Compartí las cotizaciones del dólar</strong> con tus contactos en WhatsApp, Twitter y Facebook.
              Mantené informados a tus amigos sobre el <strong>precio del dólar hoy en Argentina</strong>.
            </p>
            <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
              <WidgetCompartir cotizaciones={cotizacionesFiltradas} />
            </Suspense>
          </div>

          {/* Tabs con SEO */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-100 dark:to-purple-100 bg-clip-text text-transparent">
              📈 Análisis y Gráficos del Dólar Argentina
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              📊 <strong>Gráficos históricos y análisis técnico</strong> del dólar en Argentina. Seguí la{" "}
              <strong>evolución del dólar blue</strong>, <strong>tendencias del dólar oficial</strong> y{" "}
              <strong>comparativas entre todas las cotizaciones</strong> para tomar mejores decisiones de inversión.
            </p>

            <Tabs defaultValue="grafico" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-0.5 rounded-xl shadow-lg">
                <TabsTrigger
                  value="grafico"
                  className="gap-1 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />📈 Evolución Histórica
                </TabsTrigger>
                <TabsTrigger
                  value="comparativa"
                  className="gap-1 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />📊 Comparativa VIRAL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grafico" className="space-y-4">
                <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-emerald-900/20 px-3 sm:px-6 py-2 sm:py-3">
                    <CardTitle className="flex items-center gap-1.5 text-base sm:text-lg">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />📈
                      Evolución Histórica del Dólar Argentina
                    </CardTitle>
                    <p className="text-xs text-emerald-600/80">
                      📊 Gráfico interactivo con la evolución de todas las cotizaciones del dólar en Argentina -
                      Análisis técnico y tendencias del mercado cambiario
                    </p>
                  </CardHeader>
                  <CardContent className="h-[250px] sm:h-[350px] p-2 sm:p-6">
                    <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                      <DolarChart />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparativa" className="space-y-4">
                <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-3 sm:px-6 py-2 sm:py-3">
                    <CardTitle className="flex items-center gap-1.5 text-base sm:text-lg">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />📊 Comparativa
                      VIRAL de Cotizaciones
                      <Badge variant="destructive" className="animate-pulse">
                        TRENDING
                      </Badge>
                    </CardTitle>
                    <p className="text-xs text-amber-600/80">
                      🔥 Comparación visual entre dólar blue, oficial, MEP, CCL y cripto - Identificá las mejores
                      oportunidades de inversión
                    </p>
                  </CardHeader>
                  <CardContent className="h-[250px] sm:h-[350px] p-2 sm:p-6">
                    <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                      <ComparativaDolar cotizaciones={cotizacionesFiltradas} />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Noticias con SEO */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-red-900 to-orange-900 dark:from-red-100 dark:to-orange-100 bg-clip-text text-transparent">
              📰 Noticias del Dólar y Economía Argentina
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              🔥 <strong>Últimas noticias del BCRA</strong>, <strong>política cambiaria argentina</strong> y{" "}
              <strong>análisis económico</strong> que impactan en el precio del dólar. Mantente informado sobre las
              decisiones que afectan el mercado cambiario.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                <NoticiasRelevantes />
              </Suspense>

              <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                <NoticiasEconomicas />
              </Suspense>
            </div>
          </div>

          {/* Contenido SEO adicional */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-100 dark:to-blue-100 bg-clip-text text-transparent">
              💡 Guía Completa del Dólar en Argentina 2024
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">🏛️ Dólar Oficial BCRA</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cotización regulada por el Banco Central. Se usa para operaciones comerciales oficiales, importaciones
                  y exportaciones. Precio controlado por el gobierno argentino.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">💙 Dólar Blue</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mercado paralelo o informal. Cotización libre sin restricciones del BCRA. Se opera en cuevas y
                  arbolitos. Refleja la demanda real de dólares en Argentina.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2">📈 Dólar MEP</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mercado Electrónico de Pagos. Se opera comprando bonos en pesos y vendiéndolos en dólares. Legal y
                  regulado por la CNV.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">💱 Dólar CCL</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Contado con Liquidación. Similar al MEP pero para transferir dólares al exterior. Operación bursátil
                  legal para sacar divisas del país.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">₿ Dólar Cripto</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cotización a través de stablecoins (USDT, USDC). Se opera en exchanges de criptomonedas. Alternativa
                  digital al dólar físico.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">🤝 Dólar Solidario</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dólar oficial + 30% impuesto PAÍS + 45% adelanto Ganancias. Para compras de hasta US$200 mensuales.
                  Destinado al ahorro de personas físicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer SEO MASIVO */}
      <footer className="border-t border-white/20 dark:border-gray-700/20 bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 text-white">
        <div className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="font-bold text-emerald-400 mb-4">💰 Cotizaciones Populares</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Dólar Blue Hoy: ${dolarBlue?.venta || "N/A"}</li>
                  <li>• Dólar Oficial BCRA: ${dolarOficial?.venta || "N/A"}</li>
                  <li>• Dólar MEP: ${dolarMEP?.venta || "N/A"}</li>
                  <li>• Dólar CCL: ${dolarCCL?.venta || "N/A"}</li>
                  <li>• Dólar Cripto: ${dolarCripto?.venta || "N/A"}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-400 mb-4">🔧 Herramientas</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Calculadora Dólar-Peso</li>
                  <li>• Conversor de Monedas</li>
                  <li>• Gráficos Históricos</li>
                  <li>• Análisis Técnico</li>
                  <li>• Alertas Personalizadas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-purple-400 mb-4">📊 Información</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Brecha Cambiaria: {brechaBlue}%</li>
                  <li>• Mercado Cambiario Argentino</li>
                  <li>• Política Monetaria BCRA</li>
                  <li>• Reservas Internacionales</li>
                  <li>• Tipo de Cambio Real</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-orange-400 mb-4">🚀 DolarOficial</h3>
                <ul className="space-y-2 text-sm">
                  <li>• #1 en Argentina</li>
                  <li>• +1M usuarios mensuales</li>
                  <li>• Actualización 24/7</li>
                  <li>• Datos 100% reales</li>
                  <li>• Gratis para siempre</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <p className="text-sm">
                  © {new Date().getFullYear()} <span className="font-semibold">dolaroficial.com.ar</span> -
                  <span className="text-emerald-400 font-bold">
                    {" "}
                    La plataforma #1 de cotizaciones del dólar en Argentina
                  </span>{" "}
                  🏆
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs mb-4">
                <Badge variant="outline" className="bg-emerald-900/20 text-emerald-300 border-emerald-700">
                  🔥 Trending en Argentina
                </Badge>
                <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-700">
                  ⚡ Datos en tiempo real
                </Badge>
                <Badge variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-700">
                  🎯 Información confiable
                </Badge>
              </div>

              <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
                🚀 <strong>DolarOficial.com.ar</strong> es la plataforma líder en Argentina para seguir las{" "}
                <strong>cotizaciones del dólar</strong> en tiempo real. Ofrecemos información actualizada del{" "}
                <strong>dólar blue</strong>, <strong>dólar oficial BCRA</strong>, <strong>dólar MEP</strong>,{" "}
                <strong>dólar CCL</strong>, <strong>dólar cripto</strong> y <strong>dólar solidario</strong>. Nuestra
                calculadora de conversión, gráficos históricos y análisis del mercado cambiario argentino te ayudan a
                tomar las mejores decisiones financieras. Información confiable sobre el <strong>tipo de cambio</strong>
                , <strong>brecha cambiaria</strong>, <strong>reservas del BCRA</strong> y{" "}
                <strong>política monetaria</strong> de Argentina.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
