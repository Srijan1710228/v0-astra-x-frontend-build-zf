"use client"

import { ShieldAlert, ArrowDownRight } from "lucide-react"

export function RiskIndicator() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Return Risk</h3>
        <ShieldAlert className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">8.4%</span>
        <div className="flex items-center gap-0.5 text-accent">
          <ArrowDownRight className="h-3 w-3" />
          <span className="text-xs">-1.2%</span>
        </div>
      </div>

      {/* Mini bar breakdown */}
      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quality Issues</span>
            <span className="text-xs font-medium text-foreground">3.1%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-full w-[31%] rounded-full bg-primary" />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Delivery Delays</span>
            <span className="text-xs font-medium text-foreground">2.8%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-full w-[28%] rounded-full bg-accent" />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Size/Fit Mismatch</span>
            <span className="text-xs font-medium text-foreground">2.5%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className="h-full w-[25%] rounded-full" style={{ backgroundColor: "hsl(45, 93%, 58%)" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
