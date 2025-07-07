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

  // Filtrar cotizaciones válidas y eliminar mayorista si existe
  const cotizacionesFiltradas = cotizaciones.filter(
    (c: any, index: number, self: any[]) =>
      index === self.findIndex((t: any) => t.casa === c.casa) && c.casa !== "mayorista",
  )

  // Calcular estadísticas para engagement
  const dolarOficial = cotizacionesFiltradas.find((c: any) => c.casa === "oficial")
  const dolarBlue = cotizacionesFiltradas.find((c: any) => c.casa === "blue")

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

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
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
              <p className="text-xs text-emerald-600 font-medium">🔥 +50K usuarios diarios</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4">
            <Badge variant="destructive" className="animate-pulse">
              <Bell className="h-3 w-3 mr-1" />
              ALERTA: Brecha {brechaBlue}%
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

      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 sm:gap-6">
          {/* Hero Section */}
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

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              🔥 DÓLAR HOY: Cotizaciones EN VIVO
            </h1>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-xs font-medium text-red-700 dark:text-red-300">BRECHA BLUE</p>
                <p className="text-xl font-bold text-red-800 dark:text-red-200">{brechaBlue}%</p>
              </div>
              {dolarMasBarato && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs font-medium text-green-700 dark:text-green-300">MÁS BARATO</p>
                  <p className="text-xl font-bold text-green-800 dark:text-green-200">
                    ${Number.parseFloat(dolarMasBarato.venta).toFixed(0)}
                  </p>
                </div>
              )}
              {dolarMasCaro && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-xs font-medium text-orange-700 dark:text-orange-300">MÁS CARO</p>
                  <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                    ${Number.parseFloat(dolarMasCaro.venta).toFixed(0)}
                  </p>
                </div>
              )}
              {dolarMasCaro && dolarMasBarato && (
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-xs font-medium text-purple-700 dark:text-purple-300">DIFERENCIA</p>
                  <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                    ${(Number.parseFloat(dolarMasCaro.venta) - Number.parseFloat(dolarMasBarato.venta)).toFixed(0)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dólar Oficial Destacado */}
          <Card className="border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <div className="text-center space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🏛️</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🔥 DÓLAR OFICIAL BCRA
                  </h2>
                  <Badge variant="destructive" className="animate-pulse">
                    EN VIVO
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-md mx-auto">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-3 sm:p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
                    <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                      💰 COMPRA
                    </p>
                    <p className="text-2xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                      $
                      {dolarOficial?.compra !== "No Cotiza" && dolarOficial?.compra
                        ? Number.parseFloat(dolarOficial.compra).toFixed(2)
                        : "-"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                    <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">💸 VENTA</p>
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
                      {Math.abs(Number.parseFloat(dolarOficial.variacion)).toFixed(2)}%
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recomendación */}
          <Card className="border-0 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-3 sm:px-6 py-2 sm:py-3">
              <CardTitle className="flex items-center gap-1.5 text-base sm:text-lg">
                <Fire className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400 animate-pulse" />🎯 ¿QUÉ
                DÓLAR COMPRAR HOY?
                <Badge variant="destructive" className="animate-bounce">
                  HOT
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
                <RecomendacionDolar cotizaciones={cotizacionesFiltradas} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Cards de cotizaciones */}
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

          {/* Calculadora */}
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
            <CalculadoraConversion cotizaciones={cotizacionesFiltradas} />
          </Suspense>

          {/* Widget Compartir */}
          <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
            <WidgetCompartir cotizaciones={cotizacionesFiltradas} />
          </Suspense>

          {/* Tabs */}
          <Tabs defaultValue="grafico" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-0.5 rounded-xl shadow-lg">
              <TabsTrigger
                value="grafico"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
              >
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />📈 Evolución
              </TabsTrigger>
              <TabsTrigger
                value="comparativa"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />📊 Comparativa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grafico" className="space-y-4">
              <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-emerald-900/20 px-3 sm:px-6 py-2 sm:py-3">
                  <CardTitle className="flex items-center gap-1.5 text-base sm:text-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />📈 Evolución
                    del Dólar
                  </CardTitle>
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
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[350px] p-2 sm:p-6">
                  <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                    <ComparativaDolar cotizaciones={cotizacionesFiltradas} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Noticias */}
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
            <NoticiasRelevantes />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
            <NoticiasEconomicas />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 dark:border-gray-700/20 bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 text-white">
        <div className="py-4 sm:py-8 px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <p className="text-xs sm:text-sm">
                © {new Date().getFullYear()} <span className="font-semibold">dolaroficial.com.ar</span> -
                <span className="text-emerald-400 font-bold"> #1 en Argentina</span> 🏆
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Badge variant="outline" className="bg-emerald-900/20 text-emerald-300 border-emerald-700">
                🔥 +1M usuarios/mes
              </Badge>
              <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-700">
                ⚡ Actualización 24/7
              </Badge>
              <Badge variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-700">
                🎯 Datos 100% reales
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
