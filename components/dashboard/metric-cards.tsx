"use client"

import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"

interface AnimatedNumberProps {
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
}

function AnimatedNumber({ target, prefix = "", suffix = "", decimals = 0 }: AnimatedNumberProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const duration = 1200
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])

  return (
    <span className="animate-count-up">
      {prefix}
      {value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  )
}

const metrics = [
  {
    label: "Projected Revenue",
    value: 78000,
    prefix: "$",
    suffix: "",
    change: "+12.8%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Profit Projection",
    value: 24700,
    prefix: "$",
    suffix: "",
    change: "+8.3%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    label: "Risk Score",
    value: 23,
    prefix: "",
    suffix: "/100",
    change: "-4.2",
    trend: "down" as const,
    icon: AlertTriangle,
  },
  {
    label: "Price Elasticity",
    value: 1.42,
    prefix: "",
    suffix: "",
    change: "+0.12",
    trend: "up" as const,
    icon: TrendingUp,
    decimals: 2,
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="glass-card rounded-2xl p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{metric.label}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <metric.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <div className="mb-1 text-2xl font-bold text-foreground">
            <AnimatedNumber
              target={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              decimals={metric.decimals || 0}
            />
          </div>
          <div className="flex items-center gap-1">
            {metric.trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-accent" />
            ) : (
              <TrendingDown className="h-3 w-3 text-accent" />
            )}
            <span className="text-xs text-accent">{metric.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
