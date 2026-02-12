"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { aiInsights } from "@/lib/mock-data"
import {
  Brain,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Bot,
} from "lucide-react"

const categoryIcons: Record<string, React.ElementType> = {
  "Pricing Optimization": DollarSign,
  "Inventory Optimization": Package,
  "Marketing Allocation": TrendingUp,
  "Supplier Risk": AlertTriangle,
  "Trend Alert": Sparkles,
}

const categoryColors: Record<string, string> = {
  "Pricing Optimization": "text-primary bg-primary/10",
  "Inventory Optimization": "text-accent bg-accent/10",
  "Marketing Allocation": "text-chart-3 bg-chart-3/10",
  "Supplier Risk": "text-destructive bg-destructive/10",
  "Trend Alert": "text-chart-4 bg-chart-4/10",
}

const priorityStyles: Record<string, string> = {
  high: "border-destructive/30 bg-destructive/10 text-destructive",
  medium: "border-chart-3/30 bg-chart-3/10 text-chart-3",
  low: "border-primary/30 bg-primary/10 text-primary",
}

const categories = [
  "All",
  "Pricing Optimization",
  "Inventory Optimization",
  "Marketing Allocation",
  "Supplier Risk",
  "Trend Alert",
]

export default function SuggestionsPage() {
  const [filter, setFilter] = useState("All")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered =
    filter === "All"
      ? aiInsights
      : aiInsights.filter((i) => i.category === filter)

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Suggestions</h1>
          <p className="text-sm text-muted-foreground">
            Real-time insights from your Digital Twin across pricing, inventory, marketing, and supply chain.
          </p>
        </div>
        <Link href="/dashboard/autopilot">
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Bot className="mr-1.5 h-3.5 w-3.5" />
            Autopilot
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Active Insights", value: aiInsights.length, color: "text-foreground" },
          {
            label: "High Priority",
            value: aiInsights.filter((i) => i.priority === "high").length,
            color: "text-destructive",
          },
          {
            label: "Avg Confidence",
            value: `${Math.round(
              (aiInsights.reduce((sum, i) => sum + i.confidence, 0) / aiInsights.length) *
                100
            )}%`,
            color: "text-primary",
          },
          { label: "Categories", value: new Set(aiInsights.map((i) => i.category)).size, color: "text-accent" },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-secondary/50 text-muted-foreground border border-border hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insight cards */}
      <div className="space-y-3">
        {filtered.map((insight, index) => {
          const Icon = categoryIcons[insight.category] || Brain
          const iconColor = categoryColors[insight.category] || "text-primary bg-primary/10"
          const isExpanded = expandedId === insight.id

          return (
            <div
              key={insight.id}
              className="glass-card rounded-2xl animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <button
                onClick={() => toggleExpand(insight.id)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconColor}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-foreground">{insight.insight}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${priorityStyles[insight.priority]}`}
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="outline"
                        className="border-border text-muted-foreground text-xs"
                      >
                        {insight.category}
                      </Badge>
                      <span className="text-sm font-medium text-accent">
                        {insight.impact}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        Confidence:
                        <span className="font-mono font-medium text-foreground">
                          {(insight.confidence * 100).toFixed(0)}%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-border px-6 pb-6 pt-4 animate-fade-in-up">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {insight.detail}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${insight.confidence * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-foreground">
                      {(insight.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA to Autopilot */}
      <Link
        href="/dashboard/autopilot"
        className="glass-card flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
            <Bot className="h-4 w-4 text-accent" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Enable Autopilot to execute suggestions automatically
            </p>
            <p className="text-xs text-muted-foreground">
              High-confidence suggestions above 90% will be auto-executed
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </div>
  )
}
