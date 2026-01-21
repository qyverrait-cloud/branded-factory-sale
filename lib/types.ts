export interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  minOrder: number
  image: string
  description: string
  specifications: Record<string, string>
  inStock: boolean
  segment?: "mens" | "womens" | "kids" // garments audience segmentation
  mrp?: number
  marketPrice?: number
  ourPriceAvg?: number
  images?: string[]
  videos?: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  category: string
  description: string
}
