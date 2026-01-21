"use client"

import { useEffect, useState } from "react"

const taglines = [
  "🎉 India's No.1 Wholesale Platform - Direct from Factory",
  "💰 Best Prices Guaranteed - Lowest in Market",
  "🚚 Fast Delivery - Bulk Orders Welcome",
  "✅ 100% Authentic Products - Quality Assured",
  "📦 Minimum Order Quantity - Maximum Savings",
  "🏭 Direct Factory Connection - No Middlemen",
  "⭐ Premium Brands - Wholesale Prices",
  "🛍️ Complete Shopping Center - All Categories",
]

export function ScrollingTagline() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 3500) // Change every 3.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white border-b border-gray-200 py-2.5 sm:py-3 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center">
          <div className="relative w-full h-7 sm:h-8 overflow-hidden">
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              {taglines.map((tagline, index) => (
                <div
                  key={index}
                  className="absolute w-full text-center flex items-center justify-center"
                  style={{ top: `${index * 100}%` }}
                >
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground whitespace-nowrap animate-fade-in">
                    {tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

