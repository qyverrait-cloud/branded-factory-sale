"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatedHeroElements } from "./animated-hero-elements"
import { ShoppingCart, TrendingUp, Award, Users, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [tagline, setTagline] = useState(
    "India's No.1 wholesaler — the largest supplier of liquidation stock — offering the lowest prices, best quality, and 100% original branded products. Unbeatable deals, unmatched variety!",
  )
  useEffect(() => {
    try {
      const t = localStorage.getItem("site.tagline")
      if (t) setTagline(t)
    } catch {}
  }, [])
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-white text-foreground min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh]">
      {/* Pure white background - minimal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50/30" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
                <Award className="h-4 w-4 text-foreground" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">India's #1 Wholesale Platform</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground">
                The complete platform for <span className="text-foreground">wholesale</span> shopping
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">{tagline}</p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground">Brands</p>
                </div>
              </div>
              <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">10K+</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
              </div>
              <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button asChild size="lg" className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto bg-foreground text-white hover:bg-foreground/90 shadow-lg min-h-[48px] touch-manipulation">
                <Link href="/catalogue" className="flex items-center justify-center">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border-gray-300 text-foreground hover:bg-gray-50 text-sm sm:text-base w-full sm:w-auto min-h-[48px] touch-manipulation">
                <Link href="/about">Learn About Wholesale</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Animated Visual Elements with Real Product Images */}
          <div className="hidden lg:block relative h-full min-h-[400px] animate-fade-in-right">
            <div className="relative w-full h-full">
              {/* Floating Product Cards with Real Images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  {/* Card 1 - Garments */}
                  <div className="absolute top-0 left-0 w-36 h-44 bg-card/90 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-primary/30 p-2 animate-float-card-1 overflow-hidden group hover:scale-110 transition-transform">
                    <img
                      src="/fashion-clothing-garments.jpg"
                      alt="Garments"
                      className="w-full h-32 object-cover rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="h-2 bg-muted rounded w-3/4 mb-1 animate-pulse" />
                    <div className="h-2 bg-muted rounded w-1/2" />
                  </div>
                  
                  {/* Card 2 - Footwear */}
                  <div className="absolute top-16 right-0 w-36 h-44 bg-card/90 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-secondary/30 p-2 animate-float-card-2 overflow-hidden group hover:scale-110 transition-transform">
                    <img
                      src="/shoes-footwear-sneakers.jpg"
                      alt="Footwear"
                      className="w-full h-32 object-cover rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="h-2 bg-muted rounded w-3/4 mb-1 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="h-2 bg-muted rounded w-1/2" />
                  </div>
                  
                  {/* Card 3 - Garments */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-44 bg-card/90 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-accent/30 p-2 animate-float-card-3 overflow-hidden group hover:scale-110 transition-transform">
                    <img
                      src="/fashion-clothing-garments.jpg"
                      alt="Garments"
                      className="w-full h-32 object-cover rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="h-2 bg-muted rounded w-3/4 mb-1 animate-pulse" style={{ animationDelay: "0.4s" }} />
                    <div className="h-2 bg-muted rounded w-1/2" />
                  </div>
                  
                  {/* Central Glow Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
                  
                  {/* Additional floating product images */}
                  <div className="absolute top-1/4 right-1/4 w-24 h-32 rounded-lg overflow-hidden shadow-xl border border-primary/20 animate-float-slow opacity-60" style={{ animationDelay: "1.5s" }}>
                    <img
                      src="/shoes-footwear-sneakers.jpg"
                      alt="Shoes"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-1/4 left-1/4 w-24 h-32 rounded-lg overflow-hidden shadow-xl border border-secondary/20 animate-float-slow opacity-60" style={{ animationDelay: "2.5s" }}>
                    <img
                      src="/fashion-clothing-garments.jpg"
                      alt="Clothing"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src="/images/reference-screenshot.png" alt="Design reference screenshot" className="sr-only" />
    </section>
  )
}
