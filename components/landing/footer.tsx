import Link from "next/link"
import { Hexagon } from "lucide-react"

const footerLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Simulation", href: "/dashboard/simulation" },
  { label: "AI Suggestions", href: "/dashboard/suggestions" },
  { label: "Autopilot", href: "/dashboard/autopilot" },
  { label: "Blockchain", href: "/dashboard/blockchain" },
  { label: "Credit Score", href: "/dashboard/credit-score" },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-foreground">VyavsAI</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Autonomous Retail Intelligence Infrastructure. Built on Polygon.
          </p>
        </div>
      </div>
    </footer>
  )
}
