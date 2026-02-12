"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import { Button } from "@/components/ui/button"
import {
  Hexagon,
  Upload,
  FileSpreadsheet,
  DollarSign,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Shield,
} from "lucide-react"

const uploadSections = [
  {
    id: "sales",
    label: "Sales CSV",
    description: "Date, SKU, revenue per transaction",
    icon: FileSpreadsheet,
    accept: ".csv",
  },
  {
    id: "pricing",
    label: "Pricing History",
    description: "Historical pricing data by SKU",
    icon: DollarSign,
    accept: ".csv",
  },
  {
    id: "marketing",
    label: "Marketing Spend",
    description: "Channel-wise spend breakdown",
    icon: TrendingUp,
    accept: ".csv",
  },
  {
    id: "returns",
    label: "Returns Data",
    description: "Return rates and reasons by SKU",
    icon: RotateCcw,
    accept: ".csv",
  },
]

export default function DataUploadPage() {
  const router = useRouter()
  const { isOnboarded, setDataUploaded } = useWallet()
  const [uploads, setUploads] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isHashing, setIsHashing] = useState(false)
  const [hashComplete, setHashComplete] = useState(false)
  const [datasetHash, setDatasetHash] = useState("")

  const handleFileSelect = useCallback((id: string, file: File | null) => {
    if (file) {
      setUploads((prev) => ({ ...prev, [id]: file.name }))
    }
  }, [])

  const handleDemoMode = useCallback(() => {
    const demoFiles: Record<string, string> = {
      sales: "demo_sales_Q4_2025.csv",
      pricing: "demo_pricing_history.csv",
      marketing: "demo_marketing_spend.csv",
      returns: "demo_returns_data.csv",
    }
    setUploads(demoFiles)
  }, [])

  async function handleUpload() {
    setIsProcessing(true)
    // Simulate data cleaning and feature store building
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)

    // Simulate blockchain hashing
    setIsHashing(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))
    setDatasetHash("0x3a7f8c2e1d4b5690abcdef1234567890abcdef1234567890abcdef1234567890")
    setIsHashing(false)
    setHashComplete(true)
    setDataUploaded(true)
  }

  function handleContinue() {
    router.push("/onboarding/processing")
  }

  const uploadedCount = Object.keys(uploads).length
  const allUploaded = uploadedCount === uploadSections.length

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-16">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(199 89% 48% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(199 89% 48% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Hexagon className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <span className="text-xl font-semibold tracking-tight text-foreground">VyavsAI</span>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-3">
          {["Connect Wallet", "Business Identity", "Upload Data"].map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              {idx > 0 && <div className="h-px w-6 bg-border" />}
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  idx < 2
                    ? "bg-accent/20 text-accent"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {idx < 2 ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
              </div>
              <span
                className={`hidden text-sm sm:block ${
                  idx === 2 ? "text-foreground" : "text-accent"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-card animate-fade-in-up rounded-2xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Upload className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Upload Business Data</h2>
              <p className="text-xs text-muted-foreground">
                Your data will be hashed and secured on-chain
              </p>
            </div>
          </div>

          {/* Upload Cards */}
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {uploadSections.map((section) => {
              const isUploaded = !!uploads[section.id]
              return (
                <label
                  key={section.id}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    isUploaded
                      ? "border-accent/30 bg-accent/5"
                      : "border-border bg-secondary/30 hover:border-primary/20"
                  }`}
                >
                  <input
                    type="file"
                    accept={section.accept}
                    className="sr-only"
                    onChange={(e) =>
                      handleFileSelect(section.id, e.target.files?.[0] ?? null)
                    }
                  />
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isUploaded ? "bg-accent/10" : "bg-primary/10"
                    }`}
                  >
                    {isUploaded ? (
                      <CheckCircle2
                        className="h-4 w-4 text-accent"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <section.icon
                        className="h-4 w-4 text-primary"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {section.label}
                    </p>
                    {isUploaded ? (
                      <p className="truncate text-xs text-accent">
                        {uploads[section.id]}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    )}
                  </div>
                </label>
              )
            })}
          </div>

          {/* Demo mode */}
          {!allUploaded && (
            <div className="mb-6 rounded-lg border border-dashed border-border bg-secondary/20 p-4 text-center">
              <p className="mb-2 text-sm text-muted-foreground">
                No files ready? Try demo mode.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDemoMode}
                className="border-border bg-transparent text-foreground hover:bg-secondary"
              >
                Load Demo Data
              </Button>
            </div>
          )}

          {/* Progress / Hash status */}
          {allUploaded && !hashComplete && (
            <div className="mb-6">
              <Button
                onClick={handleUpload}
                disabled={isProcessing || isHashing}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cleaning data & building feature store...
                  </>
                ) : isHashing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating dataset hash on Polygon...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Process & Secure On-Chain
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Hash confirmed */}
          {hashComplete && (
            <div className="mb-6 space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <Shield className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Data Secured On-Chain
                  </p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {datasetHash}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-secondary/30 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">15,420</p>
                  <p className="text-xs text-muted-foreground">Records</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">Datasets</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-3 text-center">
                  <p className="text-lg font-bold text-primary">Polygon</p>
                  <p className="text-xs text-muted-foreground">Network</p>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue to AI Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
