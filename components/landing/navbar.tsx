"use client"

import Link from "next/link"
import { useWallet } from "@/context/wallet-context"
import { Button } from "@/components/ui/button"
import { Hexagon, Loader2 } from "lucide-react"

export function Navbar() {
  const { isConnected, isConnecting, address, connectWallet } = useWallet()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            VyavsAI
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-mono text-muted-foreground">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={connectWallet}
              disabled={isConnecting}
              className="border-border bg-transparent text-foreground hover:bg-secondary"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          )}
          <Link href="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
