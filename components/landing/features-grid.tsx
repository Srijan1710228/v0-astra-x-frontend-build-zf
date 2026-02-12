"use client"

import Link from "next/link"
import { Boxes, Brain, Cpu, Link2, Shield, Sparkles, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Boxes,
    title: "Digital Twin Simulation",
    description:
      "Create virtual replicas of your supply chain to test scenarios before committing real resources.",
    href: "/dashboard/simulation",
  },
  {
    icon: Brain,
    title: "Regional Demand DNA",
    description:
      "AI-driven demand profiling per region with category affinity mapping and risk scoring.",
    href: "/dashboard",
  },
  {
    icon: Cpu,
    title: "Autonomous Optimization",
    description:
      "Autopilot mode that continuously adjusts pricing, inventory, and budgets in real time.",
    href: "/dashboard/autopilot",
  },
  {
    icon: Link2,
    title: "Blockchain Trust Layer",
    description:
      "Every decision and data point is immutably logged on-chain for full transparency.",
    href: "/dashboard/blockchain",
  },
  {
    icon: Shield,
    title: "Smart Contract Escrow",
    description:
      "Automated payment escrow that releases funds only when fulfillment conditions are met.",
    href: "/dashboard/blockchain",
  },
  {
    icon: Sparkles,
    title: "AI Credit Score",
    description:
      "Commerce-specific credit scoring powered by AI, verifiable on-chain for decentralized trust.",
    href: "/dashboard/credit-score",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Intelligent Infrastructure
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-balance">
            Six integrated modules working together to create a fully autonomous,
            transparent commerce ecosystem.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:border-primary/20"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
