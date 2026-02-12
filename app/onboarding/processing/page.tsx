"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import { Hexagon } from "lucide-react"

const processingSteps = [
  {
    label: "Training forecasting model",
    description: "Building LSTM + XGBoost ensemble for revenue prediction",
    duration: 2200,
  },
  {
    label: "Running regional clustering",
    description: "K-means clustering on 15 Indian regions by demand affinity",
    duration: 1800,
  },
  {
    label: "Computing risk scores",
    description: "Analyzing return rates, COD failures, inventory stress",
    duration: 1600,
  },
  {
    label: "Calculating price elasticity",
    description: "Monte Carlo simulation across 10,000 pricing scenarios",
    duration: 2000,
  },
  {
    label: "Building digital twin",
    description: "Assembling supply chain virtual replica with all parameters",
    duration: 1400,
  },
]

export default function ProcessingPage() {
  const router = useRouter()
  const { setAnalysisComplete } = useWallet()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    let totalElapsed = 0
    const totalDuration = processingSteps.reduce((sum, s) => sum + s.duration, 0)
    let stepIdx = 0
    let stepElapsed = 0

    const interval = setInterval(() => {
      totalElapsed += 50
      stepElapsed += 50
      const pct = Math.min((totalElapsed / totalDuration) * 100, 100)
      setProgress(pct)

      if (stepIdx < processingSteps.length && stepElapsed >= processingSteps[stepIdx].duration) {
        stepIdx++
        stepElapsed = 0
        setCurrentStep(stepIdx)
      }

      if (totalElapsed >= totalDuration) {
        clearInterval(interval)
        setComplete(true)
        setAnalysisComplete(true)
        // Auto-redirect after brief pause
        setTimeout(() => {
          router.push("/dashboard")
        }, 1200)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [router, setAnalysisComplete])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(199 89% 48% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(199 89% 48% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md text-center">
        {/* Animated logo */}
        <div className="mb-8 flex justify-center">
          <div className={`${complete ? "" : "animate-pulse"}`}>
            <Hexagon
              className={`h-16 w-16 ${complete ? "text-accent" : "text-primary"} transition-colors duration-500`}
              strokeWidth={1}
            />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground text-balance">
          {complete
            ? "Your Digital Twin is Ready"
            : "Building Your Retail Digital Twin"}
        </h1>
        <p className="mb-10 text-sm text-muted-foreground text-balance">
          {complete
            ? "AI models trained. Redirecting to your dashboard..."
            : "AI is analyzing your data and training custom models for your business."}
        </p>

        {/* Overall progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Overall Progress</span>
            <span className="font-mono text-xs font-medium text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-200 ease-out ${
                complete ? "bg-accent" : "bg-primary"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step list */}
        <div className="space-y-3 text-left">
          {processingSteps.map((step, idx) => {
            const isDone = idx < currentStep
            const isActive = idx === currentStep && !complete

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isDone
                    ? "bg-accent/5 border border-accent/15"
                    : isActive
                      ? "bg-primary/5 border border-primary/15"
                      : "bg-secondary/20 border border-transparent"
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                      <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : isActive ? (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isDone
                        ? "text-accent"
                        : isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground/70">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
