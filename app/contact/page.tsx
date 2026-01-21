import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact-content"
import { Suspense } from "react"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Branded Factory Sale for bulk orders, product inquiries, or partnership opportunities. Contact our sales team for the best wholesale prices.",
  openGraph: {
    title: "Contact Us - Branded Factory Sale",
    description: "Get in touch with our team for bulk orders and wholesale inquiries.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
        <ContactContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
