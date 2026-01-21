"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Building2 } from "lucide-react"

const initialBrands = [
  { id: "samsung", name: "Samsung", category: "Electronics", products: 45, status: "active" },
  { id: "apple", name: "Apple", category: "Electronics", products: 32, status: "active" },
  { id: "nike", name: "Nike", category: "Footwear", products: 67, status: "active" },
  { id: "adidas", name: "Adidas", category: "Footwear", products: 54, status: "active" },
  { id: "sony", name: "Sony", category: "Electronics", products: 28, status: "active" },
  { id: "puma", name: "Puma", category: "Footwear", products: 41, status: "active" },
  { id: "lg", name: "LG", category: "Electronics", products: 23, status: "inactive" },
  { id: "reebok", name: "Reebok", category: "Footwear", products: 19, status: "active" },
]

export function AdminBrands() {
  const [searchQuery, setSearchQuery] = useState("")
  const [brands, setBrands] = useState(initialBrands)

  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const onAddBrand = () => {
    const name = window.prompt("Brand name?")
    if (!name) return
    const category = window.prompt("Category?") || "General"
    setBrands((prev) => [
      { id: name.toLowerCase().replace(/\s+/g, "-"), name, category, products: 0, status: "active" },
      ...prev,
    ])
  }

  const onDelete = (id: string) => setBrands((prev) => prev.filter((b) => b.id !== id))

  const onEdit = (id: string) => {
    const b = brands.find((x) => x.id === id)
    if (!b) return
    const name = window.prompt("Edit brand name", b.name) ?? b.name
    const category = window.prompt("Edit category", b.category) ?? b.category
    const status = window.prompt('Status: "active" or "inactive"', b.status) ?? b.status
    setBrands((prev) => prev.map((x) => (x.id === id ? { ...x, name, category, status } : x)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Brands Management</h2>
          <p className="text-muted-foreground">Manage your brand partnerships</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={onAddBrand}>
          <Plus className="h-4 w-4 mr-2" />
          Add Brand
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <Input
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50"
          />
        </CardContent>
      </Card>

      {/* Brands Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>All Brands ({filteredBrands.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-3">Brand</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Products</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="border-b border-border/20 hover:bg-muted/10">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{brand.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {brand.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-transparent">
                        {brand.category}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">{brand.products}</span>
                    </td>
                    <td className="p-3">
                      <Badge variant={brand.status === "active" ? "default" : "secondary"}>{brand.status}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(brand.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onDelete(brand.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
