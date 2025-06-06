import { Suspense } from "react"
import { ArrowDown, ArrowUp, TrendingUp, DollarSign, BarChart3, RefreshCcw, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Colores específicos para cada tipo de dólar
const dolarColors = {
  oficial: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-indigo-600",
  bolsa: "from-amber-500 to-orange-600",
  contadoliqui: "from-purple-500 to-violet-600",
  solidario: "from-red-500 to-rose-600",
  tarjeta: "from-pink-500 to-fuchsia-600",
  cripto: "from-cyan-500 to-blue-500",
}

const dolarIcons = {
  oficial: "🏛️",
  blue: "💙",
  bolsa: "📈",
  contadoliqui: "💱",
  solidario: "🤝",
  tarjeta: "💳",
  cripto: "₿",
}

export default async function Home() {
  const cotizaciones = await getCotizaciones()

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header mejorado con gradiente */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20 shadow-lg">
        <div className="flex h-16 sm:h-20 items-center gap-2 sm:gap-4 px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur opacity-75"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-blue-600 p-1.5 sm:p-2 rounded-full">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                DolarOficial
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">dolaroficial.com.ar</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 dark:hover:from-emerald-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
            >
              <RefreshCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">Actualizar</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-8">
          {/* Hero Section */}
          <div className="text-center space-y-2 sm:space-y-4">
            <div className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/20 dark:to-blue-900/20 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Actualizado en tiempo real
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent px-2">
              Cotizaciones del Dólar
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Todas las cotizaciones del dólar en Argentina con análisis inteligente
            </p>
          </div>

          {/* Dólar Oficial Destacado - NUEVO */}
          <div className="relative">
            {/* Animación RGB de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 via-purple-500 to-red-500 rounded-2xl blur-sm opacity-75 animate-pulse bg-[length:400%_400%] animate-[gradient_3s_ease_infinite]"></div>

            <Card className="relative border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-[shimmer_2s_ease-in-out_infinite]"></div>

              <CardContent className="relative p-4 sm:p-8">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-emerald-500 to-blue-600 p-2 sm:p-3 rounded-full">
                        <span className="text-2xl sm:text-3xl">🏛️</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Dólar Oficial
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">Cotización del Banco Nación</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-md mx-auto">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-xl blur"></div>
                      <div className="relative bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-3 sm:p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
                        <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                          COMPRA
                        </p>
                        <p className="text-2xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                          $
                          {cotizaciones.find((c) => c.casa === "oficial")?.compra !== "No Cotiza"
                            ? Number.parseFloat(cotizaciones.find((c) => c.casa === "oficial")?.compra || "0").toFixed(
                                2,
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-xl blur"></div>
                      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                        <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">VENTA</p>
                        <p className="text-2xl sm:text-4xl font-bold text-blue-800 dark:text-blue-200">
                          $
                          {cotizaciones.find((c) => c.casa === "oficial")?.venta !== "No Cotiza"
                            ? Number.parseFloat(cotizaciones.find((c) => c.casa === "oficial")?.venta || "0").toFixed(2)
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {cotizaciones.find((c) => c.casa === "oficial")?.variacion && (
                    <div className="flex items-center justify-center gap-2">
                      <Badge
                        variant={
                          Number.parseFloat(cotizaciones.find((c) => c.casa === "oficial")?.variacion || "0") >= 0
                            ? "default"
                            : "destructive"
                        }
                        className="gap-1 shadow-lg text-sm px-3 py-1 animate-bounce"
                      >
                        {Number.parseFloat(cotizaciones.find((c) => c.casa === "oficial")?.variacion || "0") >= 0 ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {Math.abs(
                          Number.parseFloat(cotizaciones.find((c) => c.casa === "oficial")?.variacion || "0"),
                        ).toFixed(2)}
                        %
                      </Badge>
                      <span className="text-xs sm:text-sm text-muted-foreground">variación diaria</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-muted-foreground">
                    🕒 Última actualización:{" "}
                    {new Date().toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendación mejorada - MOVIDA ARRIBA */}
          <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 sm:px-6 py-3 sm:py-4">
              <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
                ¿Qué dólar conviene comprar?
              </CardTitle>
              <CardDescription className="text-xs sm:text-base">
                Análisis inteligente y recomendación basada en las cotizaciones actuales
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
                <RecomendacionDolar cotizaciones={cotizaciones} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Cards de cotizaciones mejoradas */}
          <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cotizaciones.map((cotizacion) => (
              <Card
                key={cotizacion.casa}
                className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm overflow-hidden"
              >
                <div
                  className={`h-1 bg-gradient-to-r ${dolarColors[cotizacion.casa] || "from-gray-400 to-gray-500"}`}
                ></div>
                <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 pt-3 px-3 sm:px-4">
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xl sm:text-2xl">{dolarIcons[cotizacion.casa] || "💰"}</span>
                      <div>
                        <CardTitle className="text-sm sm:text-base font-bold">{cotizacion.nombre}</CardTitle>
                        <CardDescription className="text-[10px] sm:text-xs uppercase tracking-wide font-medium">
                          {cotizacion.casa}
                        </CardDescription>
                      </div>
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
                        Compra
                      </p>
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-2 sm:p-3 rounded-lg">
                        <p className="text-base sm:text-xl font-bold text-emerald-700 dark:text-emerald-300">
                          {cotizacion.compra !== "No Cotiza"
                            ? `$${Number.parseFloat(cotizacion.compra).toFixed(2)}`
                            : "-"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Venta
                      </p>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-2 sm:p-3 rounded-lg">
                        <p className="text-base sm:text-xl font-bold text-blue-700 dark:text-blue-300">
                          {cotizacion.venta !== "No Cotiza"
                            ? `$${Number.parseFloat(cotizacion.venta).toFixed(2)}`
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 px-3 sm:px-4 py-2">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    🕒 Actualizado:{" "}
                    {new Date().toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Calculadora de Conversión */}
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
            <CalculadoraConversion cotizaciones={cotizaciones} />
          </Suspense>

          {/* Widget para Compartir */}
          <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
            <WidgetCompartir cotizaciones={cotizaciones} />
          </Suspense>

          {/* Tabs mejoradas */}
          <Tabs defaultValue="grafico" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm p-0.5 sm:p-1 rounded-xl shadow-lg">
              <TabsTrigger
                value="grafico"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
              >
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                Evolución
              </TabsTrigger>
              <TabsTrigger
                value="comparativa"
                className="gap-1 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                Comparativa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grafico" className="space-y-4">
              <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 px-3 sm:px-6 py-3 sm:py-4">
                  <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                    Evolución del Dólar
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Evolución de las principales cotizaciones en los últimos 30 días
                  </CardDescription>
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
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-3 sm:px-6 py-3 sm:py-4">
                  <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
                    Comparativa de Cotizaciones
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Comparación entre los diferentes tipos de dólar
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] sm:h-[350px] p-2 sm:p-6">
                  <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                    <ComparativaDolar cotizaciones={cotizaciones} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Noticias Económicas */}
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
            <NoticiasEconomicas />
          </Suspense>
        </div>
      </main>

      {/* Footer mejorado */}
      <footer className="border-t border-white/20 dark:border-gray-700/20 bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 text-white">
        <div className="py-4 sm:py-8 px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
              <p className="text-xs sm:text-sm">
                © {new Date().getFullYear()} <span className="font-semibold">dolaroficial.com.ar</span>. Datos
                proporcionados por DolarApi.
              </p>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-300">
              Los datos son solo informativos y pueden no reflejar el valor real de mercado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
