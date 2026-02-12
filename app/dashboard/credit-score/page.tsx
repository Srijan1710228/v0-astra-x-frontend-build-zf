"use client"

import Link from "next/link"
import { creditScoreData } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  FlaskConical,
  Link2,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

export default function CreditScorePage() {
  const [copied, setCopied] = useState(false)
  const { score, maxScore, riskCategory, fulfillmentReliability, revenueGrowth, onChainHash } =
    creditScoreData

  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 90

  async function copyHash() {
    await navigator.clipboard.writeText(onChainHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Credit Score</h1>
        <p className="text-sm text-muted-foreground">
          On-chain verified creditworthiness based on fulfillment, growth, and AI predictions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Score Ring */}
        <div className="glass-card rounded-2xl p-8 animate-fade-in-up lg:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg width="200" height="200" className="-rotate-90">
                {/* Background ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(220 14% 12%)"
                  strokeWidth="10"
                />
                {/* Score ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(199 89% 48%)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (circumference * percentage) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{score}</span>
                <span className="text-sm text-muted-foreground">/ {maxScore}</span>
              </div>
            </div>

            <Badge className="mt-4 border-accent/30 bg-accent/10 text-accent">
              <ShieldCheck className="mr-1 h-3 w-3" />
              {riskCategory}
            </Badge>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Score verified on-chain via Polygon smart contract
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4 lg:col-span-2">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground">Fulfillment Reliability</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {fulfillmentReliability}%
              </p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-700"
                  style={{ width: `${fulfillmentReliability}%` }}
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground">Revenue Growth</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">
                +{revenueGrowth[revenueGrowth.length - 1].growth}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Latest month vs. previous period
              </p>
            </div>
          </div>

          {/* Revenue Growth Chart */}
          <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Revenue Growth Trend (6 Months)
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueGrowth}>
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
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220, 18%, 7%)",
                      border: "1px solid hsl(220, 13%, 16%)",
                      borderRadius: "0.75rem",
                      color: "hsl(210, 20%, 96%)",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Growth"]}
                  />
                  <Bar
                    dataKey="growth"
                    fill="hsl(199, 89%, 48%)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* On-chain Verification */}
      <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          On-Chain Verification
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Credit Score Hash</p>
              <p className="font-mono text-xs text-muted-foreground">
                {onChainHash.slice(0, 18)}...{onChainHash.slice(-12)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyHash}
              className="border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 h-3 w-3 text-accent" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-3 w-3" />
                  Copy Hash
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() =>
                window.open(
                  `https://polygonscan.com/tx/${onChainHash}`,
                  "_blank"
                )
              }
            >
              <ExternalLink className="mr-1.5 h-3 w-3" />
              PolygonScan
            </Button>
          </div>
        </div>
      </div>

      {/* Cross-links */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/dashboard/simulation"
          className="glass-card flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <FlaskConical className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Run Simulation</p>
              <p className="text-xs text-muted-foreground">Test impact on your score</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
        <Link
          href="/dashboard/blockchain"
          className="glass-card flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Link2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Blockchain Log</p>
              <p className="text-xs text-muted-foreground">View score verification history</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Score factors */}
      <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Score Factors
        </h3>
        <div className="space-y-4">
          {[
            { label: "Order Fulfillment Rate", value: 97.8, weight: 30, color: "bg-accent" },
            { label: "Revenue Consistency", value: 91.2, weight: 25, color: "bg-primary" },
            { label: "AI Forecast Alignment", value: 88.5, weight: 20, color: "bg-chart-3" },
            { label: "On-Time Delivery", value: 94.1, weight: 15, color: "bg-primary" },
            { label: "Dispute Resolution", value: 100, weight: 10, color: "bg-accent" },
          ].map((factor, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{factor.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    Weight: {factor.weight}%
                  </span>
                  <span className="font-mono text-sm font-medium text-foreground">
                    {factor.value}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${factor.color}`}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
