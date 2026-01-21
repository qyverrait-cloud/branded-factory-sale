import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Branded Factory Sale - India's leading wholesale platform. We connect retailers and resellers directly with factories for the best prices on branded products.",
  openGraph: {
    title: "About Us - Branded Factory Sale",
    description: "Learn about our mission to provide the best wholesale prices on branded products.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </div>
  )
}
