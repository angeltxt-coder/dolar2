// Función para obtener las cotizaciones del dólar desde DolarApi
export async function getCotizaciones() {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares", {
      next: { revalidate: 300 }, // Revalidar cada 5 minutos
    })

    if (!response.ok) {
      throw new Error("Error al obtener cotizaciones")
    }

    const data = await response.json()

    // Agregar el dólar cripto (simulado, ya que no está en la API)
    const dolarCripto = {
      casa: "cripto",
      nombre: "Dólar Cripto",
      compra: "1140",
      venta: "1160",
      fechaActualizacion: new Date().toISOString(),
      variacion: "0.5",
    }

    return [...data, dolarCripto]
  } catch (error) {
    console.error("Error fetching data:", error)

    // Devolver datos de ejemplo en caso de error
    return [
      {
        casa: "oficial",
        nombre: "Dólar Oficial",
        compra: "980",
        venta: "1000",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.2",
      },
      {
        casa: "blue",
        nombre: "Dólar Blue",
        compra: "1180",
        venta: "1200",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.8",
      },
      {
        casa: "bolsa",
        nombre: "Dólar Bolsa",
        compra: "1160",
        venta: "1180",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.5",
      },
      {
        casa: "contadoliqui",
        nombre: "Dólar Contado con Liqui",
        compra: "1170",
        venta: "1190",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.6",
      },
      {
        casa: "solidario",
        nombre: "Dólar Solidario",
        compra: "No Cotiza",
        venta: "1750",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.2",
      },
      {
        casa: "tarjeta",
        nombre: "Dólar Tarjeta",
        compra: "No Cotiza",
        venta: "1750",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.2",
      },
      {
        casa: "cripto",
        nombre: "Dólar Cripto",
        compra: "1140",
        venta: "1160",
        fechaActualizacion: new Date().toISOString(),
        variacion: "0.5",
      },
    ]
  }
}

// Función para obtener datos históricos (simulados por ahora)
export async function getDatosHistoricos(periodo = 30) {
  try {
    // Intentar obtener datos históricos reales
    // Por ahora usaremos datos simulados basados en las cotizaciones actuales
    const cotizacionesActuales = await getCotizaciones()

    const oficial = Number.parseFloat(cotizacionesActuales.find((c) => c.casa === "oficial")?.venta || "1000")
    const blue = Number.parseFloat(cotizacionesActuales.find((c) => c.casa === "blue")?.venta || "1200")
    const mep = Number.parseFloat(cotizacionesActuales.find((c) => c.casa === "bolsa")?.venta || "1180")
    const ccl = Number.parseFloat(cotizacionesActuales.find((c) => c.casa === "contadoliqui")?.venta || "1190")
    const cripto = Number.parseFloat(cotizacionesActuales.find((c) => c.casa === "cripto")?.venta || "1160")

    // Generar datos históricos simulados con variaciones realistas
    const datos = []
    const fechaInicio = new Date()
    fechaInicio.setDate(fechaInicio.getDate() - periodo)

    for (let i = 0; i < periodo; i++) {
      const fecha = new Date(fechaInicio)
      fecha.setDate(fecha.getDate() + i)

      // Variaciones aleatorias pequeñas para simular movimientos reales
      const variacionOficial = (Math.random() - 0.5) * 10
      const variacionBlue = (Math.random() - 0.5) * 30
      const variacionMep = (Math.random() - 0.5) * 25
      const variacionCcl = (Math.random() - 0.5) * 25
      const variacionCripto = (Math.random() - 0.5) * 35

      datos.push({
        fecha: fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }),
        oficial: Math.round(oficial + variacionOficial - (periodo - i) * 0.5),
        blue: Math.round(blue + variacionBlue - (periodo - i) * 1),
        mep: Math.round(mep + variacionMep - (periodo - i) * 0.8),
        ccl: Math.round(ccl + variacionCcl - (periodo - i) * 0.8),
        cripto: Math.round(cripto + variacionCripto - (periodo - i) * 0.9),
      })
    }

    return datos
  } catch (error) {
    console.error("Error fetching historical data:", error)

    // Datos de fallback
    return [
      { fecha: "01/06", oficial: 980, blue: 1180, mep: 1160, ccl: 1170, cripto: 1140 },
      { fecha: "02/06", oficial: 982, blue: 1185, mep: 1165, ccl: 1175, cripto: 1145 },
      { fecha: "03/06", oficial: 985, blue: 1190, mep: 1170, ccl: 1180, cripto: 1150 },
      { fecha: "04/06", oficial: 987, blue: 1195, mep: 1175, ccl: 1185, cripto: 1155 },
      { fecha: "05/06", oficial: 990, blue: 1200, mep: 1180, ccl: 1190, cripto: 1160 },
    ]
  }
}
