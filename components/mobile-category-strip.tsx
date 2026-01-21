"use client"

import Link from "next/link"
import { Shirt, Footprints, Briefcase, Watch, Sparkles, Smartphone, Utensils } from "lucide-react"

const categories = [
  { id: "garments", name: "Garments", icon: Shirt },
  { id: "footwear", name: "Footwear", icon: Footprints },
  { id: "luggage", name: "Luggage", icon: Briefcase },
  { id: "accessories", name: "Accessories", icon: Watch },
  { id: "kitchen", name: "Kitchen", icon: Utensils },
  { id: "fmcg", name: "FMCG", icon: Sparkles },
  { id: "electronics", name: "Electronics", icon: Smartphone },
]

export function MobileCategoryStrip() {
  return (
    <div className="md:hidden border-b border-border/40 bg-background/95 sticky top-[56px] sm:top-[64px] z-40">
      <div className="container mx-auto px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4">
          {categories.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.id}
                href={`/catalogue?category=${c.id}`}
                className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border border-border/60 bg-card/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm snap-start touch-manipulation active:scale-95 transition-transform min-h-[36px] sm:min-h-[40px]"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="whitespace-nowrap">{c.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
