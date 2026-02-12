"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Hexagon,
  Loader2,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Building2,
  X,
} from "lucide-react"

const categories = [
  "Clothing & Fashion",
  "Grocery & FMCG",
  "Electronics",
  "Healthcare & Pharma",
  "Agriculture",
  "Manufacturing",
  "Textiles",
  "Automotive",
  "Handicrafts",
  "Other",
]

const regions = [
  "Maharashtra",
  "Delhi NCR",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Telangana",
  "West Bengal",
  "Rajasthan",
  "Uttar Pradesh",
  "Kerala",
  "Andhra Pradesh",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Bihar",
]

const revenueRanges = [
  "Under 10L/month",
  "10L - 50L/month",
  "50L - 2Cr/month",
  "2Cr - 10Cr/month",
  "Above 10Cr/month",
]

export default function OnboardingPage() {
  const router = useRouter()
  const { isConnected, isConnecting, address, network, connectWallet, setBusinessProfile } =
    useWallet()

  const [step, setStep] = useState<"wallet" | "identity">(
    "wallet"
  )
  const [businessName, setBusinessName] = useState("")
  const [category, setCategory] = useState("")
  const [revenueRange, setRevenueRange] = useState("")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-advance to identity step when wallet connects
  if (isConnected && step === "wallet") {
    setStep("identity")
  }

  function toggleRegion(region: string) {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    )
  }

  async function handleContinue() {
    if (!businessName || !category || !revenueRange || selectedRegions.length === 0) return
    setIsSubmitting(true)
    // Simulate DID creation delay
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setBusinessProfile({
      businessName,
      category,
      revenueRange,
      primaryRegions: selectedRegions,
    })
    setIsSubmitting(false)
    router.push("/onboarding/upload")
  }

  const isFormValid = businessName && category && revenueRange && selectedRegions.length > 0

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(199 89% 48% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(199 89% 48% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Hexagon className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <span className="text-xl font-semibold tracking-tight text-foreground">VyavsAI</span>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                isConnected
                  ? "bg-accent/20 text-accent"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {isConnected ? <CheckCircle2 className="h-4 w-4" /> : "1"}
            </div>
            <span
              className={`text-sm ${isConnected ? "text-accent" : "text-foreground"}`}
            >
              Connect Wallet
            </span>
          </div>
          <div className="h-px w-8 bg-border" />
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                step === "identity"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              2
            </div>
            <span
              className={`text-sm ${step === "identity" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Business Identity
            </span>
          </div>
        </div>

        {/* Step 1: Wallet Connection */}
        {step === "wallet" && !isConnected && (
          <div className="glass-card animate-fade-in-up rounded-2xl p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Wallet className="h-8 w-8 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">Connect Your Wallet</h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Connect your MetaMask wallet to get started. We will auto-switch to
              Polygon and create your Decentralized Business Identity (DID).
            </p>
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting to MetaMask...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect MetaMask
                </>
              )}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              No MetaMask? A demo wallet will be assigned automatically.
            </p>
          </div>
        )}

        {/* Step 2: Business Identity */}
        {step === "identity" && isConnected && (
          <div className="glass-card animate-fade-in-up rounded-2xl p-8">
            {/* Wallet connected confirmation */}
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Wallet Connected</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {address} | {network}
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Business Identity</h2>
                <p className="text-xs text-muted-foreground">
                  Create your on-chain business profile
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm text-muted-foreground">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="e.g. Sharma Electronics Pvt Ltd"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                    <SelectValue placeholder="Select business category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Revenue Range */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Monthly Revenue Bracket</Label>
                <Select value={revenueRange} onValueChange={setRevenueRange}>
                  <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Primary Regions */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Primary Operating Regions
                </Label>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => {
                    const isSelected = selectedRegions.includes(region)
                    return (
                      <button
                        key={region}
                        onClick={() => toggleRegion(region)}
                        className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "bg-secondary/50 text-muted-foreground border border-border hover:border-primary/20 hover:text-foreground"
                        }`}
                      >
                        {region}
                        {isSelected && <X className="h-3 w-3" />}
                      </button>
                    )
                  })}
                </div>
                {selectedRegions.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {selectedRegions.length} region{selectedRegions.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              {/* Continue */}
              <Button
                onClick={handleContinue}
                disabled={!isFormValid || isSubmitting}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating DID on Polygon...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
