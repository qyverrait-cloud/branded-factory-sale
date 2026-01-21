import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { HighlightsSection } from "@/components/highlights-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ScrollingTagline } from "@/components/scrolling-tagline"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description:
    "India's No.1 Wholesale Platform - Premium branded products directly from factories at wholesale prices. Best prices guaranteed, fast delivery, 100% authentic products.",
  openGraph: {
    title: "Branded Factory Sale - India's No.1 Wholesale Platform",
    description: "Premium branded products directly from factories at wholesale prices.",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollingTagline />
      <Header />
      <main>
        <section className="bg-white text-foreground">
          <HeroSection />
        </section>
        <section className="bg-white text-foreground">
          <CategorySection />
        </section>
        <Suspense fallback={<div className="py-12 text-center">Loading products...</div>}>
          <FeaturedProducts />
        </Suspense>
        <section className="bg-white text-foreground">
          <HighlightsSection />
          <StatsSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}
