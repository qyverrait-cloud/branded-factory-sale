"use client"

import { useEffect, useState } from "react"

const brands = [
  "Samsung",
  "Apple",
  "Nike",
  "Adidas",
  "Sony",
  "LG",
  "Puma",
  "Reebok",
  "Canon",
  "HP",
  "Dell",
  "Lenovo",
  "Xiaomi",
  "OnePlus",
  "Vivo",
  "Oppo",
  "Boat",
  "JBL",
  "Philips",
  "Panasonic",
  "Havells",
  "Bajaj",
  "Prestige",
  "Milton",
]

export function BrandSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % brands.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-background border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Trusted Brand Partners</h2>
          <p className="text-muted-foreground">We work with 500+ premium brands worldwide</p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand}-${index}`} className="w-1/6 flex-shrink-0 px-4">
                <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-6 text-center hover:bg-card/50 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-lg">{brand.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
