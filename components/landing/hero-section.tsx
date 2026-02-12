"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, Wallet } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const { isConnected, isConnecting, connectWallet, isOnboarded } = useWallet()

  function handleLaunch() {
    if (isOnboarded) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }

  async function handleConnect() {
    await connectWallet()
    router.push("/onboarding")
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(199 89% 48% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(199 89% 48% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-xs text-muted-foreground">
            AI + Blockchain Commerce Platform
          </span>
        </div>

        <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
          Predict. Simulate.{" "}
          <br className="hidden md:block" />
          <span className="text-primary">Optimize.</span> Execute.
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
          VyavsAI combines AI-powered demand forecasting with blockchain trust
          layers to create autonomous, transparent retail supply chains.
          Simulate outcomes, optimize decisions, and execute with smart contracts.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={handleLaunch}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Launch Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {!isConnected && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleConnect}
              disabled={isConnecting}
              className="border-border bg-transparent text-foreground hover:bg-secondary px-8"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          )}

          {isConnected && !isOnboarded && (
            <Link href="/onboarding">
              <Button
                variant="outline"
                size="lg"
                className="border-accent/30 bg-accent/5 text-accent hover:bg-accent/10 px-8"
              >
                Complete Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
