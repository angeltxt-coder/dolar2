"use client"

import type React from "react"
import { useEffect } from "react"

interface GoogleAdProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical"
  style?: React.CSSProperties
  className?: string
}

export default function GoogleAd({ adSlot, adFormat = "auto", style, className }: GoogleAdProps) {
  useEffect(() => {
    try {
      // Intentar actualizar los anuncios existentes cuando el componente se monta
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error("Error al cargar el anuncio:", error)
    }
  }, [])

  return (
    <div className={`google-ad ${className || ""}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Reemplazar con tu ID de cliente
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}

// Componente para cargar el script de AdSense en el layout
export function GoogleAdSenseScript() {
  return null // Deshabilitado temporalmente para evitar conflictos
}
