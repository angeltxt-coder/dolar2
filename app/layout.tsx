import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAdSenseScript } from "@/components/google-adsense"
import { GoogleAnalyticsScript } from "@/components/google-analytics"
import {
  getTrendingKeywords,
  generateDynamicTitle,
  generateDynamicDescription,
  generateDynamicKeywords,
} from "@/lib/seo-trends"
import { getCotizaciones } from "@/lib/api"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  try {
    const [trends, cotizaciones] = await Promise.all([getTrendingKeywords(), getCotizaciones()])

    const dynamicTitle = generateDynamicTitle(trends)
    const dynamicDescription = generateDynamicDescription(trends, cotizaciones)
    const dynamicKeywords = generateDynamicKeywords(trends)

    return {
      title: dynamicTitle,
      description: dynamicDescription,
      keywords: dynamicKeywords,
      manifest: "/manifest.json",
      themeColor: "#10b981",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "DolarOficial",
      },
      openGraph: {
        title: dynamicTitle,
        description: dynamicDescription,
        url: "https://dolaroficial.com.ar",
        siteName: "DolarOficial",
        type: "website",
        locale: "es_AR",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: dynamicTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: dynamicTitle,
        description: dynamicDescription,
        images: ["/og-image.jpg"],
        creator: "@dolaroficial",
      },
      alternates: {
        canonical: "https://dolaroficial.com.ar",
      },
      other: {
        "google-site-verification": "tu-codigo-de-verificacion-aqui",
      },
    }
  } catch (error) {
    console.error("Error generando metadata dinámico:", error)

    // Fallback metadata optimizado para SEO
    return {
      title: "DolarOficial - Cotizaciones del Dólar en Argentina | Precio Hoy 2024",
      description:
        "🔥 Cotizaciones del dólar en Argentina EN VIVO ✓ Dólar oficial, blue, MEP, CCL, cripto ✓ Calculadora de conversión ✓ Gráficos históricos ✓ Noticias BCRA ✓ Mejor precio para comprar dólares hoy ✓ Tipo de cambio actualizado cada 5 minutos ✓ Argentina 2024",
      keywords:
        "dólar hoy, precio del dólar, dólar blue, dólar oficial, cotización dólar, dólar MEP, dólar CCL, dólar cripto, calculadora dólar, tipo de cambio, BCRA, argentina, peso argentino, mercado cambiario, brecha cambiaria, reservas, inflación, economía argentina",
      manifest: "/manifest.json",
      themeColor: "#10b981",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "DolarOficial",
      },
      openGraph: {
        title: "DolarOficial - Cotizaciones del Dólar en Argentina | Precio Hoy 2024",
        description:
          "🔥 Cotizaciones del dólar en Argentina EN VIVO ✓ Dólar oficial, blue, MEP, CCL, cripto ✓ Calculadora de conversión ✓ Gráficos históricos ✓ Noticias BCRA ✓ Mejor precio para comprar dólares hoy",
        url: "https://dolaroficial.com.ar",
        siteName: "DolarOficial",
        type: "website",
        locale: "es_AR",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Cotizaciones del Dólar en Argentina - DolarOficial",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "DolarOficial - Cotizaciones del Dólar en Argentina | Precio Hoy 2024",
        description:
          "🔥 Cotizaciones del dólar EN VIVO ✓ Oficial, blue, MEP, CCL ✓ Calculadora ✓ Gráficos ✓ Argentina 2024",
        images: ["/og-image.jpg"],
        creator: "@dolaroficial",
      },
      alternates: {
        canonical: "https://dolaroficial.com.ar",
      },
      other: {
        "google-site-verification": "tu-codigo-de-verificacion-aqui",
      },
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DolarOficial" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Meta tags adicionales para SEO */}
        <meta name="author" content="DolarOficial" />
        <meta name="publisher" content="DolarOficial" />
        <meta name="copyright" content="DolarOficial 2024" />
        <meta name="language" content="Spanish" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="AR" />
        <meta name="geo.country" content="Argentina" />
        <meta name="geo.placename" content="Argentina" />
        <meta name="ICBM" content="-34.6118, -58.3960" />

        {/* Schema.org structured data mejorado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DolarOficial",
              alternateName: "Cotizaciones del Dólar Argentina",
              url: "https://dolaroficial.com.ar",
              description:
                "Cotizaciones del dólar en Argentina en tiempo real. Dólar oficial, blue, MEP, CCL, cripto. Calculadora de conversión y gráficos históricos.",
              inLanguage: "es-AR",
              isAccessibleForFree: true,
              potentialAction: {
                "@type": "SearchAction",
                target: "https://dolaroficial.com.ar/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "FinancialService",
                name: "Cotizaciones del Dólar Argentina",
                description: "Servicio gratuito de cotizaciones del dólar en tiempo real",
                provider: {
                  "@type": "Organization",
                  name: "DolarOficial",
                  url: "https://dolaroficial.com.ar",
                },
                areaServed: {
                  "@type": "Country",
                  name: "Argentina",
                },
                serviceType: "Información Financiera",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "ARS",
                  description: "Acceso gratuito a cotizaciones del dólar",
                },
              },
              about: [
                {
                  "@type": "Thing",
                  name: "Dólar Estadounidense",
                  sameAs: "https://es.wikipedia.org/wiki/D%C3%B3lar_estadounidense",
                },
                {
                  "@type": "Thing",
                  name: "Peso Argentino",
                  sameAs: "https://es.wikipedia.org/wiki/Peso_argentino",
                },
                {
                  "@type": "Thing",
                  name: "Banco Central de la República Argentina",
                  sameAs: "https://www.bcra.gob.ar/",
                },
              ],
              keywords: "dólar, cotización, argentina, peso, cambio, BCRA, blue, oficial, MEP, CCL, cripto",
            }),
          }}
        />

        {/* Schema adicional para datos financieros */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dataset",
              name: "Cotizaciones del Dólar Argentina",
              description: "Dataset con cotizaciones históricas y en tiempo real del dólar en Argentina",
              url: "https://dolaroficial.com.ar",
              keywords: ["dólar", "cotización", "argentina", "finanzas", "economía"],
              creator: {
                "@type": "Organization",
                name: "DolarOficial",
              },
              distribution: {
                "@type": "DataDownload",
                encodingFormat: "application/json",
                contentUrl: "https://dolaroficial.com.ar/api/cotizaciones",
              },
              temporalCoverage: "2024/..",
              spatialCoverage: {
                "@type": "Place",
                name: "Argentina",
              },
            }),
          }}
        />

        {/* Script de Google AdSense */}
        <GoogleAdSenseScript />
        {/* Script de Google Analytics */}
        <GoogleAnalyticsScript />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
