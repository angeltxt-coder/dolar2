"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Custom tooltip component optimizado para móviles
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-xl border border-white/20 max-w-[180px]">
        <p className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">{label}</p>
        <div className="space-y-0.5">
          {payload.map((entry, index) => (
            <p key={index} className="text-[10px] sm:text-xs flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}:
              </span>
              <span className="font-semibold">${entry.value.toFixed(0)}</span>
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function ComparativaDolar({ cotizaciones }) {
  // Transformar los datos para el gráfico de barras
  const chartData = cotizaciones
    .filter((c) => c.venta !== "No Cotiza" && c.casa !== "bitcoin" && c.casa !== "contadoliqui")
    .map((c) => ({
      nombre: c.nombre.split(" ").slice(0, 2).join(" "), // Acortar nombres largos
      nombreCorto:
        c.casa === "oficial"
          ? "Oficial"
          : c.casa === "blue"
            ? "Blue"
            : c.casa === "bolsa"
              ? "MEP"
              : c.casa === "solidario"
                ? "Solidario"
                : c.casa === "tarjeta"
                  ? "Tarjeta"
                  : c.casa === "cripto"
                    ? "Cripto"
                    : c.nombre.split(" ")[0],
      venta: Number.parseFloat(c.venta),
      compra: c.compra !== "No Cotiza" ? Number.parseFloat(c.compra) : 0,
    }))
    .sort((a, b) => a.venta - b.venta) // Ordenar de menor a mayor precio de venta

  return (
    <div className="h-[250px] sm:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 5,
            left: 5,
            bottom: 20,
          }}
          layout="vertical"
        >
          <defs>
            <linearGradient id="compraGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="ventaGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
          <XAxis
            type="number"
            domain={["dataMin - 50", "dataMax + 50"]}
            stroke="#64748b"
            fontSize={9}
            tick={{ fontSize: 9 }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type="category"
            dataKey="nombreCorto"
            width={50}
            stroke="#64748b"
            fontSize={9}
            tick={{ fontSize: 9 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "9px", paddingTop: "8px" }}
            iconSize={6}
            formatter={(value) => <span style={{ fontSize: "9px" }}>{value}</span>}
          />
          <Bar dataKey="compra" name="Compra" fill="url(#compraGradient)" radius={[0, 2, 2, 0]} />
          <Bar dataKey="venta" name="Venta" fill="url(#ventaGradient)" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
