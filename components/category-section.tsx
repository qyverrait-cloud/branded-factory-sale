"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Shirt,
  Footprints,
  Briefcase,
  Watch,
  Sparkles,
  Smartphone,
  Utensils,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "garments",
    name: "Garments",
    icon: Shirt,
    description: "Shirts, Jeans, T-Shirts, Sweaters, Hoodies",
    image: "/fashion-clothing-garments.jpg",
    keywords: ["shirt", "jeans", "t-shirt", "sweater", "hoodie", "kids garments"],
  },
  {
    id: "footwear",
    name: "Footwear",
    icon: Footprints,
    description: "Shoes, Sneakers, Sandals, Ladies Shoes",
    image: "/shoes-footwear-sneakers.jpg",
    keywords: ["shoes", "sneakers", "ladies shoes"],
  },
  {
    id: "luggage",
    name: "Luggage",
    icon: Briefcase,
    description: "Trolly, Bagpack, Laptop Bags",
    image: "/luggage-bags-backpack.jpg",
    keywords: ["luggage", "bags", "backpack"],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Watch,
    description: "Belts, Purses, Watches, Saree",
    image: "/accessories-watches-belts.jpg",
    keywords: ["accessories", "saree", "belts", "watches"],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: Utensils,
    description: "Cookware & Kitchen Essentials",
    image: "/placeholder.jpg",
    keywords: ["kitchen items", "cookware"],
  },
  {
    id: "fmcg",
    name: "FMCG",
    icon: Sparkles,
    description: "Cosmetic Products",
    image: "/assorted-cosmetics.png",
    keywords: ["cosmetics", "fmcg"],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    description: "Phones, Earphones, Electronic Devices",
    image: "/electronics-phones-gadgets.jpg",
    keywords: ["electronic device", "phones", "gadgets"],
  },
]

export function CategorySection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Shop by Category
            <span className="ml-2 inline-block animate-pulse">🛍️</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our wide range of wholesale categories with premium branded products
          </p>
        </div>

        {/* Amazon-style Grid - All Categories Visible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => {
                const IconComponent = category.icon
                return (
              <Link
                key={category.id}
                href={`/catalogue?category=${category.id}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/60 hover:border-primary/30 overflow-hidden cursor-pointer hover:scale-105">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Image with Icon Overlay */}
                    <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100 group">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Icon Badge */}
                      <div className="absolute top-2 right-2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md border border-gray-200">
                        <IconComponent className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                    {/* Category Info */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col gap-1.5">
                      <h3 className="font-semibold text-sm sm:text-base text-center group-hover:text-foreground transition-colors leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground text-center line-clamp-2 flex-1">
                        {category.description}
                      </p>
                        </div>
                      </CardContent>
                    </Card>
              </Link>
                )
              })}
          </div>
        </div>
      </section>
  )
}
