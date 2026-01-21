"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Shirt, Footprints, Briefcase, Watch, Sparkles, Smartphone } from "lucide-react"

const initialCategories = [
  { id: "garments", name: "Garments", icon: Shirt, products: 245, description: "Kids, Mens & Womens Clothing" },
  { id: "footwear", name: "Footwear", icon: Footprints, products: 189, description: "All Brand Shoes & Sandals" },
  { id: "luggage", name: "Luggage", icon: Briefcase, products: 67, description: "Trolly, Bagpack, Laptop Bags" },
  { id: "accessories", name: "Accessories", icon: Watch, products: 134, description: "Belts, Purses, Watches" },
  { id: "fmcg", name: "FMCG", icon: Sparkles, products: 89, description: "Cosmetic Products" },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    products: 523,
    description: "Phones, Earphones, Appliances",
  },
]

export function AdminCategories() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState(initialCategories)

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const onAddCategory = () => {
    const name = window.prompt("Category name?")
    if (!name) return
    setCategories((prev) => [
      { id: name.toLowerCase().replace(/\s+/g, "-"), name, icon: Sparkles, products: 0, description: "" },
      ...prev,
    ])
  }

  const onDelete = (id: string) => setCategories((prev) => prev.filter((c) => c.id !== id))

  const onEdit = (id: string) => {
    const c = categories.find((x) => x.id === id)
    if (!c) return
    const name = window.prompt("Edit category name", c.name) ?? c.name
    const description = window.prompt("Edit description", c.description) ?? c.description
    setCategories((prev) => prev.map((x) => (x.id === id ? { ...x, name, description } : x)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Categories Management</h2>
          <p className="text-muted-foreground">Organize your product categories</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={onAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50"
          />
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card
              key={category.id}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {category.products} products
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(category.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
