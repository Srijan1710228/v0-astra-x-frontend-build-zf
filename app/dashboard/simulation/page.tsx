"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FlaskConical, Loader2, Bot, Brain, ArrowRight } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface SimulationResult {
  revenue: number
  profit: number
  riskVariance: number
  confidence: number
}

export default function SimulationPage() {
  const [priceChange, setPriceChange] = useState([0])
  const [marketingBudget, setMarketingBudget] = useState([0])
  const [inventoryShift, setInventoryShift] = useState("")
  const [region, setRegion] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)

  const runSimulation = useCallback(async () => {
    setIsRunning(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setResult({
      revenue: 73500 + priceChange[0] * 200 + marketingBudget[0] * 150,
      profit: 24100 + priceChange[0] * 80 + marketingBudget[0] * 50,
      riskVariance: Math.max(2.1, 8.5 - Math.abs(priceChange[0]) * 0.1),
      confidence: Math.min(0.97, 0.82 + marketingBudget[0] * 0.002),
    })
    setIsRunning(false)
  }, [priceChange, marketingBudget])

  const barData = result
    ? [
        { name: "Revenue", current: 65000, projected: result.revenue },
        { name: "Profit", current: 21000, projected: result.profit },
      ]
    : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Digital Twin Simulation</h1>
        <p className="text-sm text-muted-foreground">
          Test pricing, marketing, and inventory scenarios before committing.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Controls */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="mb-6 font-semibold text-foreground">Simulation Parameters</h3>

          <div className="space-y-6">
            {/* Price Change */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Price Change</label>
                <span className="font-mono text-sm font-medium text-foreground">
                  {priceChange[0] > 0 ? "+" : ""}
                  {priceChange[0]}%
                </span>
              </div>
              <Slider
                value={priceChange}
                onValueChange={setPriceChange}
                min={-30}
                max={30}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Marketing Budget */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Marketing Budget Change</label>
                <span className="font-mono text-sm font-medium text-foreground">
                  {marketingBudget[0] > 0 ? "+" : ""}
                  {marketingBudget[0]}%
                </span>
              </div>
              <Slider
                value={marketingBudget}
                onValueChange={setMarketingBudget}
                min={-50}
                max={50}
                step={1}
                className="cursor-pointer"
              />
            </div>

            {/* Inventory Shift */}
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">Inventory Shift</label>
              <Select value={inventoryShift} onValueChange={setInventoryShift}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="Select inventory shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decrease-20">Decrease 20%</SelectItem>
                  <SelectItem value="decrease-10">Decrease 10%</SelectItem>
                  <SelectItem value="no-change">No Change</SelectItem>
                  <SelectItem value="increase-10">Increase 10%</SelectItem>
                  <SelectItem value="increase-20">Increase 20%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region Selector */}
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <FlaskConical className="mr-2 h-4 w-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Result metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-5 animate-fade-in-up">
                  <span className="text-sm text-muted-foreground">Projected Revenue</span>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    ${result.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="glass-card rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <span className="text-sm text-muted-foreground">Projected Profit</span>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    ${result.profit.toLocaleString()}
                  </p>
                </div>
                <div className="glass-card rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <span className="text-sm text-muted-foreground">Risk Variance</span>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {result.riskVariance.toFixed(1)}%
                  </p>
                </div>
                <div className="glass-card rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Confidence Gauge */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                  Simulation Confidence Gauge
                </h4>
                <div className="relative h-3 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* CTA links */}
              <div className="grid gap-3 sm:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
                <Link
                  href="/dashboard/suggestions"
                  className="glass-card flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Brain className="h-4 w-4 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">View AI Suggestions</p>
                      <p className="text-xs text-muted-foreground">Insights from this simulation</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/dashboard/autopilot"
                  className="glass-card flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                      <Bot className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Apply with Autopilot</p>
                      <p className="text-xs text-muted-foreground">Let AI execute the optimal scenario</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>

              {/* Bar Chart Comparison */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground">
                  Current vs. Projected
                </h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 16%)" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(215 14% 35%)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(215 14% 35%)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
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
                      <Bar dataKey="current" fill="hsl(220, 13%, 20%)" radius={[6, 6, 0, 0]} name="Current" />
                      <Bar dataKey="projected" fill="hsl(199, 89%, 48%)" radius={[6, 6, 0, 0]} name="Projected" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border p-12">
              <div className="text-center">
                <FlaskConical className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">
                  Adjust parameters and run a simulation to see projected outcomes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
