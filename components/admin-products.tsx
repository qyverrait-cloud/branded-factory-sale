"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

export function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load products from database API
  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/products")
      const data = await response.json()
      if (data.products && Array.isArray(data.products)) {
        // Convert database products to frontend format
        const formatted = data.products.map((p: any) => ({
          id: p.id.toString(),
          name: p.name,
          brand: p.brand,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice || p.price,
          discount: p.discount || 0,
          rating: p.rating || 0,
          reviews: p.reviews || 0,
          minOrder: p.minOrder || 1,
          image: p.image,
          description: p.description || "",
          specifications: p.specifications || {},
          inStock: p.inStock !== false,
          segment: p.segment,
          images: p.images || [],
          videos: p.videos || [],
        }))
        setProducts(formatted)
      }
    } catch (error) {
      console.error("Failed to load products:", error)
      toast.error("Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Add product via API
  const onAddProduct = async () => {
    const name = window.prompt("Product name?")
    if (!name) return
    const brand = window.prompt("Brand?") || "Brand"
    const priceStr = window.prompt("Price? (number)") || "0"
    const category = window.prompt("Category? (e.g., electronics, garments)") || "general"
    const imagesStr = window.prompt("Image URLs (comma separated, optional)") || ""
    const videoUrl = window.prompt("Video URL (optional)") || ""
    const price = Number(priceStr) || 0
    const images = imagesStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    const videos = videoUrl.trim() ? [videoUrl.trim()] : []

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          brand,
          category,
          price,
          originalPrice: price,
          image: images[0] || "/new-product-launch.png",
          description: "Newly added product.",
          images,
          videos,
          specifications: {},
        }),
      })

      if (response.ok) {
        toast.success("Product added successfully!")
        loadProducts() // Reload from database
        // Trigger refresh on frontend
        window.dispatchEvent(new Event("productUpdated"))
        // Also refresh SWR cache
        if (typeof window !== "undefined") {
          const { mutate } = await import("swr")
          mutate("/api/products")
          mutate((key) => typeof key === "string" && key.startsWith("/api/products"))
        }
      } else {
        // Get error message from response
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || `Failed to add product (Status: ${response.status})`
        console.error("Add product error:", errorMessage, errorData)
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error("Add product error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to add product"
      toast.error(errorMessage)
    }
  }

  const onEdit = async (id: string) => {
    const p = products.find((x) => x.id === id)
    if (!p) return
    const name = window.prompt("Edit name", p.name) ?? p.name
    const brand = window.prompt("Edit brand", p.brand) ?? p.brand
    const category = window.prompt("Edit category", p.category) ?? p.category
    const price = Number(window.prompt("Edit price", String(p.price)) ?? p.price) || p.price
    const imagesStr = window.prompt("Image URLs (comma separated)", (p.images || [p.image]).join(", ")) || ""
    const videoUrl = window.prompt("Video URL (single)", (p.videos && p.videos[0]) || "") || ""
    const images = imagesStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    const videos = videoUrl.trim() ? [videoUrl.trim()] : []

    try {
      const response = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          brand,
          category,
          price,
          originalPrice: Math.max(price, p.originalPrice || price),
          image: images[0] || p.image,
          images,
          videos,
        }),
      })

      if (response.ok) {
        toast.success("Product updated successfully!")
        loadProducts() // Reload from database
        // Trigger refresh on frontend
        window.dispatchEvent(new Event("productUpdated"))
        // Also refresh SWR cache
        if (typeof window !== "undefined") {
          const { mutate } = await import("swr")
          mutate("/api/products")
          mutate((key) => typeof key === "string" && key.startsWith("/api/products"))
        }
      } else {
        toast.error("Failed to update product")
      }
    } catch (error) {
      console.error("Update product error:", error)
      toast.error("Failed to update product")
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Product deleted successfully!")
        loadProducts() // Reload from database
        // Trigger refresh on frontend
        window.dispatchEvent(new Event("productUpdated"))
        // Also refresh SWR cache
        if (typeof window !== "undefined") {
          const { mutate } = await import("swr")
          mutate("/api/products")
          mutate((key) => typeof key === "string" && key.startsWith("/api/products"))
        }
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      console.error("Delete product error:", error)
      toast.error("Failed to delete product")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Products Management</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        {/* wire up Add Product */}
        <Button className="bg-primary hover:bg-primary/90" onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Brand</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Stock</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        No products found. Add your first product!
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border/20 hover:bg-muted/10">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-transparent">
                        {product.brand}
                      </Badge>
                    </td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">₹{product.price.toLocaleString()}</p>
                        {product.originalPrice > product.price && (
                          <p className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert("Preview opens on product cards in catalogue.")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEdit(product.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* enable delete */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
