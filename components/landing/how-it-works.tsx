"use client"

import { Upload, FlaskConical, Zap, FileCheck } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Data",
    description: "Connect your sales, inventory, and market data sources. All uploads are hashed and logged on-chain.",
  },
  {
    icon: FlaskConical,
    step: "02",
    title: "Run Simulation",
    description: "Digital twin creates parallel scenarios. Test pricing, inventory, and budget strategies risk-free.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Enable Autopilot",
    description: "AI engine autonomously optimizes decisions. Every action is transparent and auditable.",
  },
  {
    icon: FileCheck,
    step: "04",
    title: "Smart Contract Executes",
    description: "Verified decisions trigger on-chain smart contracts. Escrow, payments, and logs are automated.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-balance">
            From raw data to autonomous execution in four steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-full translate-x-1/2 bg-border lg:block" />
              )}
              <div className="glass-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
