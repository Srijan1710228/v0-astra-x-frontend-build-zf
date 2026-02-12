import { Hexagon } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Hexagon className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <span className="text-sm font-semibold text-foreground">Astra-X</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Autonomous Retail Intelligence Infrastructure. Built on Polygon.
        </p>
      </div>
    </footer>
  )
}
