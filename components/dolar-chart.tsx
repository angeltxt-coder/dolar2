"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDatosHistoricos } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

const colorMap = {
  oficial: "#10b981", // emerald-500
  blue: "#3b82f6", // blue-500
  mep: "#f59e0b", // amber-500
  ccl: "#8b5cf6", // violet-500
  cripto: "#06b6d4", // cyan-500
}

// Custom tooltip component optimizado para móviles
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-xl border border-white/20 text-xs sm:text-sm max-w-[200px]">
        <p className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">{`${label}`}</p>
        <div className="space-y-0.5">
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-[10px] sm:text-xs flex items-center justify-between"
              style={{ color: entry.color }}
            >
              <span>{entry.name}:</span>
              <span className="font-semibold">${entry.value}</span>
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function DolarChart() {
  const [periodo, setPeriodo] = useState("30")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true)
      try {
        const datosHistoricos = await getDatosHistoricos(Number.parseInt(periodo))
        setData(datosHistoricos)
      } catch (error) {
        console.error("Error cargando datos históricos:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [periodo])

  if (loading) {
    return <Skeleton className="h-[250px] sm:h-[350px] w-full rounded-lg" />
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-end">
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[120px] sm:w-[160px] text-xs sm:text-sm h-8 sm:h-10 bg-white/70 backdrop-blur-sm border-white/20">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm text-xs sm:text-sm">
            <SelectItem value="7">7 días</SelectItem>
            <SelectItem value="15">15 días</SelectItem>
            <SelectItem value="30">30 días</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[250px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <defs>
              {Object.entries(colorMap).map(([key, color]) => (
                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
            <XAxis
              dataKey="fecha"
              stroke="#64748b"
              fontSize={9}
              tick={{ fontSize: 9 }}
              interval="preserveStartEnd"
              tickFormatter={(value, index) => {
                // En móviles, mostrar menos etiquetas
                if (window.innerWidth < 640 && data.length > 10) {
                  return index % Math.ceil(data.length / 4) === 0 ? value : ""
                }
                return value
              }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={9}
              width={35}
              tick={{ fontSize: 9 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "9px", paddingTop: "8px" }}
              iconSize={6}
              formatter={(value) => <span style={{ fontSize: "9px" }}>{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="oficial"
              stroke={colorMap.oficial}
              strokeWidth={2}
              name="Oficial"
              dot={false}
              activeDot={{ r: 3, stroke: colorMap.oficial, strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="blue"
              stroke={colorMap.blue}
              strokeWidth={2}
              name="Blue"
              dot={false}
              activeDot={{ r: 3, stroke: colorMap.blue, strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="mep"
              stroke={colorMap.mep}
              strokeWidth={2}
              name="MEP"
              dot={false}
              activeDot={{ r: 3, stroke: colorMap.mep, strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="ccl"
              stroke={colorMap.ccl}
              strokeWidth={2}
              name="CCL"
              dot={false}
              activeDot={{ r: 3, stroke: colorMap.ccl, strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="cripto"
              stroke={colorMap.cripto}
              strokeWidth={2}
              name="Cripto"
              dot={false}
              activeDot={{ r: 3, stroke: colorMap.cripto, strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
