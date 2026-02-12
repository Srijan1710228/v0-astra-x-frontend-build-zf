"use client"

import { MetricCards } from "@/components/dashboard/metric-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { IndiaHeatmap } from "@/components/dashboard/india-heatmap"
import { RiskIndicator } from "@/components/dashboard/risk-indicator"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of AI forecasting, demand intelligence, and risk metrics.
        </p>
      </div>

      {/* Metric cards */}
      <MetricCards />

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <RiskIndicator />
      </div>

      {/* Heatmap */}
      <IndiaHeatmap />
    </div>
  )
}
