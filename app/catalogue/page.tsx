import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CatalogueContent } from "@/components/catalogue-content"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Browse our complete catalogue of premium branded products. Garments, Footwear, Luggage, Accessories, Electronics, FMCG, and Kitchen items at wholesale prices.",
  openGraph: {
    title: "Product Catalogue - Branded Factory Sale",
    description: "Browse thousands of branded products at wholesale prices.",
  },
}

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <CatalogueContent />
      </main>
      <Footer />
    </div>
  )
}
