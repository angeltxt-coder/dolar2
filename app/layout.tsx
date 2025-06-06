import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAdSenseScript } from "@/components/google-adsense"
import { GoogleAnalyticsScript } from "@/components/google-analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DolarOficial - Cotizaciones del Dólar en Argentina",
  description:
    "dolaroficial.com.ar - Todas las cotizaciones del dólar en Argentina actualizadas en tiempo real. Compará y encontrá el dólar más conveniente.",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DolarOficial",
  },
    generator: 'v0.dev'
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
