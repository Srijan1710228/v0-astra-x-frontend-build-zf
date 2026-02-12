"use client"

import { regionData } from "@/lib/mock-data"
import { useState } from "react"

function getDemandColor(demand: number): string {
  if (demand >= 85) return "hsl(199, 89%, 48%)"
  if (demand >= 70) return "hsl(168, 84%, 44%)"
  if (demand >= 55) return "hsl(45, 93%, 58%)"
  return "hsl(0, 72%, 51%)"
}

function getDemandBg(demand: number): string {
  if (demand >= 85) return "bg-primary/20"
  if (demand >= 70) return "bg-accent/20"
  if (demand >= 55) return "bg-chart-3/20"
  return "bg-destructive/20"
}

export function IndiaHeatmap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const activeRegion = regionData.find((r) => r.id === hoveredRegion)

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Regional Demand DNA</h3>
        <p className="text-sm text-muted-foreground">Demand index by region across India</p>
      </div>

      <div className="flex gap-6">
        {/* Grid-based heatmap */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2">
            {regionData.map((region) => (
              <button
                key={region.id}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`relative rounded-xl p-3 text-left transition-all duration-200 ${getDemandBg(region.demand)} ${
                  hoveredRegion === region.id ? "ring-1 ring-primary/40 scale-[1.02]" : ""
                }`}
                style={{
                  borderLeft: `3px solid ${getDemandColor(region.demand)}`,
                }}
              >
                <span className="block text-xs font-medium text-foreground">{region.id}</span>
                <span className="block text-lg font-bold text-foreground">{region.demand}</span>
                <span className="block text-[10px] text-muted-foreground">{region.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tooltip panel */}
        <div className="w-48 shrink-0">
          {activeRegion ? (
            <div className="rounded-xl border border-border bg-secondary/50 p-4 animate-fade-in-up">
              <h4 className="mb-3 font-semibold text-foreground">{activeRegion.name}</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground">Demand Index</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${activeRegion.demand}%`,
                          backgroundColor: getDemandColor(activeRegion.demand),
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground">{activeRegion.demand}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Risk Score</span>
                  <p className="text-sm font-medium text-foreground">
                    {(activeRegion.risk * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Category Affinity</span>
                  <p className="text-sm font-medium text-primary">{activeRegion.affinity}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border p-4">
              <p className="text-center text-xs text-muted-foreground">
                Hover over a region to view demand details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">{"High (85+)"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">{"Medium (70-84)"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "hsl(45, 93%, 58%)" }} />
          <span className="text-xs text-muted-foreground">{"Low (55-69)"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">{"Critical (<55)"}</span>
        </div>
      </div>
    </div>
  )
}
