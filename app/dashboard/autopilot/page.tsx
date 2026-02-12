"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { autopilotSuggestions } from "@/lib/mock-data"
import {
  Bot,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Package,
  Zap,
} from "lucide-react"

const categoryIcons: Record<string, React.ElementType> = {
  "Price Optimization": DollarSign,
  "Budget Reallocation": TrendingUp,
  "Supplier Order": Package,
}

interface SuggestionState {
  approved: boolean | null
}

export default function AutopilotPage() {
  const [autopilotEnabled, setAutopilotEnabled] = useState(false)
  const [decisions, setDecisions] = useState<Record<number, SuggestionState>>({})

  function handleApprove(id: number) {
    setDecisions((prev) => ({ ...prev, [id]: { approved: true } }))
  }

  function handleReject(id: number) {
    setDecisions((prev) => ({ ...prev, [id]: { approved: false } }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Autopilot</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated suggestions for pricing, budgets, and supply chain.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-4 py-2">
          <div className="flex items-center gap-2">
            <Zap
              className={`h-4 w-4 ${autopilotEnabled ? "text-accent" : "text-muted-foreground"}`}
              strokeWidth={1.5}
            />
            <span className="text-sm text-muted-foreground">Autopilot Mode</span>
          </div>
          <Switch
            checked={autopilotEnabled}
            onCheckedChange={setAutopilotEnabled}
          />
        </div>
      </div>

      {/* Autopilot status */}
      {autopilotEnabled && (
        <div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4 animate-fade-in-up">
          <Bot className="h-5 w-5 text-accent" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium text-foreground">
              Autopilot is active
            </p>
            <p className="text-xs text-muted-foreground">
              AI will automatically execute high-confidence suggestions above 90%.
            </p>
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Pending Suggestions
        </h3>

        {autopilotSuggestions.map((suggestion, index) => {
          const Icon = categoryIcons[suggestion.category] || Bot
          const decision = decisions[suggestion.id]
          const isDecided = decision?.approved !== undefined && decision?.approved !== null

          return (
            <div
              key={suggestion.id}
              className="glass-card rounded-2xl p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">
                        {suggestion.action}
                      </h4>
                      <Badge
                        variant="outline"
                        className="border-border text-muted-foreground text-xs"
                      >
                        {suggestion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-accent">{suggestion.impact}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                          Confidence:
                        </span>
                        <div className="h-1.5 w-20 rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-700"
                            style={{
                              width: `${suggestion.confidence * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-mono text-xs font-medium text-foreground">
                          {(suggestion.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {isDecided ? (
                    <Badge
                      className={
                        decision.approved
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-destructive/30 bg-destructive/10 text-destructive"
                      }
                    >
                      {decision.approved ? (
                        <>
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Approved
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 h-3 w-3" />
                          Rejected
                        </>
                      )}
                    </Badge>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(suggestion.id)}
                        className="border-border bg-transparent text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                      >
                        <XCircle className="mr-1 h-3.5 w-3.5" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(suggestion.id)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Execution Log */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Recent Execution Log
        </h3>
        <div className="space-y-3">
          {[
            {
              action: "Price reduced by 2.1% on SKU-4821",
              time: "2 hours ago",
              status: "executed",
            },
            {
              action: "Supplier reorder triggered for Region MH",
              time: "5 hours ago",
              status: "executed",
            },
            {
              action: "Marketing budget shifted to digital channels",
              time: "1 day ago",
              status: "executed",
            },
          ].map((log, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <span className="text-sm text-foreground">{log.action}</span>
              </div>
              <span className="text-xs text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
