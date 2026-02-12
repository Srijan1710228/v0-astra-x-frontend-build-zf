import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesGrid } from "@/components/landing/features-grid"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <Footer />
    </main>
  )
}
