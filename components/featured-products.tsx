"use client"

import { useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function FeaturedProducts() {
  const { data, isLoading } = useSWR("/api/products?sort=rating&limit=8", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // Cache for 1 minute
  })
  
  const products = useMemo(() => (data?.products || []).slice(0, 8), [data])

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Featured Products</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Discover our top-rated wholesale products
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-muted/30 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-center justify-between mb-8 sm:mb-12 animate-fade-in-up">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Featured Products
              <span className="ml-2 inline-block animate-bounce">✨</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Discover our top-rated wholesale products
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex bg-transparent group hover:scale-105 transition-transform">
            <Link href="/catalogue" className="flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product: any, index: number) => (
            <div 
              key={product.id} 
              className="animate-fade-in-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} viewMode="grid" />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="md:hidden bg-transparent">
            <Link href="/catalogue">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

