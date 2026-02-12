"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { revenueForecastData } from "@/lib/mock-data"

export function RevenueChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Revenue Forecast</h3>
          <p className="text-sm text-muted-foreground">Actual vs. projected revenue</p>
        </div>
        <div className="rounded-lg bg-primary/10 px-3 py-1">
          <span className="text-xs font-medium text-primary">+18.4% YoY</span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueForecastData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220 13% 16%)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="hsl(215 14% 35%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215 14% 35%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 7%)",
                border: "1px solid hsl(220, 13%, 16%)",
                borderRadius: "0.75rem",
                color: "hsl(210, 20%, 96%)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", color: "hsl(215, 14%, 55%)" }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              dot={{ fill: "hsl(199, 89%, 48%)", r: 3 }}
              name="Actual"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(168, 84%, 44%)"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={{ fill: "hsl(168, 84%, 44%)", r: 3 }}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
