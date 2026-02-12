"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blockchainEvents } from "@/lib/mock-data"
import {
  Link2,
  ExternalLink,
  Copy,
  Check,
  FileUp,
  FlaskConical,
  CreditCard,
  ShieldCheck,
  ShieldOff,
  ArrowRight,
} from "lucide-react"

const typeIcons: Record<string, React.ElementType> = {
  "Data Upload Logged": FileUp,
  "Simulation Hash Stored": FlaskConical,
  "Credit Score Updated": CreditCard,
  "Escrow Contract Created": ShieldCheck,
  "Escrow Released": ShieldOff,
}

export default function BlockchainPage() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  async function copyHash(hash: string) {
    await navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Blockchain Log</h1>
        <p className="text-sm text-muted-foreground">
          Immutable on-chain activity for data uploads, simulations, credit scores, and escrow contracts.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Transactions", value: "1,284", color: "text-foreground" },
          { label: "Data Uploads", value: "612", color: "text-primary" },
          { label: "Simulations Logged", value: "389", color: "text-accent" },
          { label: "Escrow Contracts", value: "283", color: "text-chart-3" },
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

      {/* Cross-link to credit score */}
      <Link
        href="/dashboard/credit-score"
        className="glass-card flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-primary/20"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
            <CreditCard className="h-4 w-4 text-accent" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">View Credit Score</p>
            <p className="text-xs text-muted-foreground">On-chain verified creditworthiness based on transaction history</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>

      {/* Transaction List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Recent On-Chain Events
        </h3>

        {blockchainEvents.map((event, index) => {
          const Icon = typeIcons[event.type] || Link2
          const isCopied = copiedHash === event.hash

          return (
            <div
              key={event.id}
              className="glass-card rounded-2xl p-5 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{event.type}</h4>
                      <Badge
                        className={
                          event.status === "Confirmed"
                            ? "border-accent/30 bg-accent/10 text-accent text-xs"
                            : "border-chart-3/30 bg-chart-3/10 text-chart-3 text-xs"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>

                    {/* Transaction Hash */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {event.hash.slice(0, 10)}...{event.hash.slice(-8)}
                      </span>
                      <button
                        onClick={() => copyHash(event.hash)}
                        className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Copy transaction hash"
                      >
                        {isCopied ? (
                          <Check className="h-3 w-3 text-accent" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <span key={key} className="text-xs text-muted-foreground">
                          <span className="text-muted-foreground/60">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>{" "}
                          <span className="text-foreground/80">{String(value)}</span>
                        </span>
                      ))}
                    </div>

                    <span className="text-xs text-muted-foreground/60">
                      {formatDate(event.timestamp)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() =>
                    window.open(
                      `https://polygonscan.com/tx/${event.hash}`,
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  View
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
