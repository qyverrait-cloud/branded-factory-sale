"use client"

import { useState, useMemo, useEffect } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Filter } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { useSearchParams } from "next/navigation"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const categories = [
  { id: "all", name: "All Categories" },
  { id: "garments", name: "Garments" },
  { id: "footwear", name: "Footwear" },
  { id: "luggage", name: "Luggage" },
  { id: "accessories", name: "Accessories" },
  { id: "kitchen", name: "Kitchen" },
  { id: "fmcg", name: "FMCG" },
  { id: "electronics", name: "Electronics" },
]

const defaultBrands = ["All Brands"]

export function CatalogueContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [segment, setSegment] = useState<"all" | "mens" | "womens" | "kids">("all")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get("category")
    const seg = searchParams.get("segment") as "mens" | "womens" | "kids" | null
    if (cat && categories.some((c) => c.id === cat)) {
      setSelectedCategory(cat)
    }
    if (seg && ["mens", "womens", "kids"].includes(seg)) {
      setSegment(seg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Build API URL with filters
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (segment !== "all" && selectedCategory === "garments") params.set("segment", segment)
    if (selectedBrand !== "All Brands") params.set("brand", selectedBrand)
    if (sortBy) params.set("sort", sortBy)
    return `/api/products?${params.toString()}`
  }, [searchQuery, selectedCategory, selectedBrand, sortBy, segment])

  // Fetch products from API using SWR
  const { data, isLoading, error } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 30000, // Cache for 30 seconds
  })

  const products: Product[] = (data?.products as Product[]) || []
  const facetBrands: string[] = data?.facets?.brands ? ["All Brands", ...data.facets.brands] : defaultBrands

  useEffect(() => {
    if (!facetBrands.includes(selectedBrand)) {
      setSelectedBrand("All Brands")
    }
  }, [facetBrands, selectedBrand])

  return (
    <div className="container mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Product Catalogue</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Browse our extensive collection of wholesale products from premium brands
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
        {/* Mobile: Amazon-like simple bar + Filters button */}
        <div className="md:hidden flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 h-10"
            />
          </div>
          <Button variant="outline" className="h-10 bg-transparent" onClick={() => setMobileFiltersOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Desktop: keep current full filter grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onValueChange={(v) => {
              setSelectedCategory(v)
              setSegment("all")
            }}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Filter */}
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              {facetBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audience toggle (Garments) */}
        {selectedCategory === "garments" && (
          <div className="mt-4">
            <label className="text-sm font-medium block mb-2">Audience</label>
            <ToggleGroup
              type="single"
              value={segment}
              onValueChange={(v) => v && setSegment(v as any)}
              className="gap-2"
            >
              <ToggleGroupItem value="all" className="px-3">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="mens" className="px-3">
                Mens
              </ToggleGroupItem>
              <ToggleGroupItem value="womens" className="px-3">
                Womens
              </ToggleGroupItem>
              <ToggleGroupItem value="kids" className="px-3">
                Kids
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="mt-2 text-xs text-muted-foreground">
              Brand list updates based on selected audience so you only see brands available for Mens, Womens, or Kids.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={(v) => {
                  setSelectedCategory(v)
                  setSegment("all")
                }}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Brand</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {facetBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory === "garments" && (
              <div>
                <label className="text-sm font-medium block mb-2">Audience</label>
                <ToggleGroup
                  type="single"
                  value={segment}
                  onValueChange={(v) => v && setSegment(v as any)}
                  className="gap-2"
                >
                  <ToggleGroupItem value="all" className="px-3">
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem value="mens" className="px-3">
                    Mens
                  </ToggleGroupItem>
                  <ToggleGroupItem value="womens" className="px-3">
                    Womens
                  </ToggleGroupItem>
                  <ToggleGroupItem value="kids" className="px-3">
                    Kids
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="mt-2 text-xs text-muted-foreground">
                  Brand list updates based on selected audience so you only see brands available for Mens, Womens, or
                  Kids.
                </p>
              </div>
            )}
          </div>
          <DrawerFooter>
            <div className="flex items-center gap-2">
              <Button onClick={() => setMobileFiltersOpen(false)} className="flex-1">
                Apply
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedBrand("All Brands")
                  setSegment("all")
                }}
              >
                Reset
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading products..." : `Showing ${products.length} products`}
          </p>
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </Badge>
          )}
          {selectedCategory === "garments" && segment !== "all" && (
            <Badge variant="secondary" className="bg-primary/10 text-primary capitalize">
              {segment}
            </Badge>
          )}
          {selectedBrand !== "All Brands" && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {selectedBrand}
            </Badge>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-muted/30 animate-pulse aspect-[3/4]" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6" : "space-y-4"
          }
        >
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
