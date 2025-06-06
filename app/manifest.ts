import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DolarOficial - Cotizaciones del Dólar",
    short_name: "DolarOficial",
    description: "Todas las cotizaciones del dólar en Argentina actualizadas en tiempo real",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["finance", "business", "news"],
    lang: "es-AR",
    orientation: "portrait-primary",
  }
}
