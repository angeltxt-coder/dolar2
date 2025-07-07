"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

// ID de medición de Google Analytics
const GA_MEASUREMENT_ID = "G-5GJC9KK5H0"

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, any> | string) => void
  }
}

// Función para enviar una vista de página a Google Analytics
export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Función para enviar un evento personalizado a Google Analytics
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Componente interno que usa los hooks de navegación
function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && typeof window.gtag !== "undefined") {
      // Construir la URL completa con parámetros de búsqueda
      const url = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname

      // Enviar vista de página a GA
      pageview(url)
    }
  }, [pathname, searchParams])

  return null
}

// Componente principal que carga el script de Google Analytics
export function GoogleAnalyticsScript() {
  return null // Deshabilitado temporalmente para evitar conflictos
}

// Componente para rastrear eventos de interacción con el usuario
export function useAnalyticsEventTracker() {
  return {
    // Rastrear clics en cotizaciones
    trackCotizacionClick: (tipoDolar: string) => {
      event({
        action: "click_cotizacion",
        category: "cotizaciones",
        label: tipoDolar,
      })
    },

    // Rastrear conversiones en la calculadora
    trackConversion: (origen: string, destino: string, monto: number) => {
      event({
        action: "conversion_calculadora",
        category: "calculadora",
        label: `${origen}_a_${destino}`,
        value: monto,
      })
    },

    // Rastrear cambios de tema
    trackThemeChange: (theme: string) => {
      event({
        action: "cambio_tema",
        category: "preferencias",
        label: theme,
      })
    },

    // Rastrear compartir
    trackShare: (plataforma: string) => {
      event({
        action: "compartir",
        category: "interaccion",
        label: plataforma,
      })
    },

    // Rastrear clics en noticias
    trackNewsClick: (titulo: string, fuente: string) => {
      event({
        action: "click_noticia",
        category: "noticias",
        label: `${titulo} (${fuente})`,
      })
    },
  }
}
