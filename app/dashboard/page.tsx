"use client"

import Link from "next/link"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { IndiaHeatmap } from "@/components/dashboard/india-heatmap"
import { RiskIndicator } from "@/components/dashboard/risk-indicator"
import { FlaskConical, Bot, Link2, CreditCard, ArrowRight } from "lucide-react"

const quickLinks = [
  {
    href: "/dashboard/simulation",
    label: "Run Simulation",
    description: "Test pricing & inventory scenarios",
    icon: FlaskConical,
  },
  {
    href: "/dashboard/autopilot",
    label: "AI Autopilot",
    description: "Review AI suggestions",
    icon: Bot,
  },
  {
    href: "/dashboard/blockchain",
    label: "Blockchain Log",
    description: "View on-chain activity",
    icon: Link2,
  },
  {
    href: "/dashboard/credit-score",
    label: "Credit Score",
    description: "Check verified score",
    icon: CreditCard,
  },
]

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

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="glass-card group flex items-center gap-3 rounded-xl p-4 transition-all duration-200 hover:border-primary/20"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <link.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{link.label}</p>
              <p className="truncate text-xs text-muted-foreground">{link.description}</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
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
