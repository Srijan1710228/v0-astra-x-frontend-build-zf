"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useWallet } from "@/context/wallet-context"
import {
  LayoutDashboard,
  FlaskConical,
  Bot,
  Link2,
  CreditCard,
  Hexagon,
  LogOut,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/simulation", label: "Simulation", icon: FlaskConical },
  { href: "/dashboard/autopilot", label: "Autopilot", icon: Bot },
  { href: "/dashboard/blockchain", label: "Blockchain Log", icon: Link2 },
  { href: "/dashboard/credit-score", label: "Credit Score", icon: CreditCard },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { address, isConnected, network } = useWallet()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="h-6 w-6 text-primary" strokeWidth={1.5} />
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
            VyavsAI
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Wallet status */}
      <div className="border-t border-sidebar-border p-4">
        {isConnected ? (
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs text-sidebar-foreground">{network}</span>
            </div>
            <p className="font-mono text-xs text-sidebar-foreground/60">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              <span className="text-xs text-sidebar-foreground/60">Wallet not connected</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
