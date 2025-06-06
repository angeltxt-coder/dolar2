import Link from "next/link"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-16 h-16 mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur opacity-75"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-blue-600 p-4 rounded-full flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
          404 - Página no encontrada
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          La página que estás buscando no existe o ha sido movida.
        </p>

        <Button
          asChild
          className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
        >
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
