"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Package, Maximize2, ChevronLeft, ChevronRight, ShoppingBag, Phone } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [mediaIndex, setMediaIndex] = useState(0)

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const mrp = product.mrp ?? product.originalPrice
  const marketPrice = product.marketPrice ?? product.originalPrice
  const ourPriceAvg = product.ourPriceAvg ?? product.price

  const mediaItems = [
    ...(product.images?.map((src) => ({ type: "image" as const, src })) ?? []),
    ...(product.videos?.map((src) => ({ type: "video" as const, src })) ?? []),
  ]
  if (mediaItems.length === 0 && product.image) {
    mediaItems.push({ type: "image" as const, src: product.image })
  }

  const nextMedia = () => setMediaIndex((i) => (i + 1) % mediaItems.length)
  const prevMedia = () => setMediaIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length)

  if (viewMode === "list") {
    return (
      <Card
        className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 rounded-xl cursor-pointer"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true)
        }}
      >
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative w-24 h-24 md:w-36 md:h-24 flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg?height=240&width=240&query=product%20image"}
                alt={product.name}
                className="w-full h-full object-cover rounded-l-xl"
                loading="lazy"
                decoding="async"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[11px] px-2 py-0.5 rounded-md">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>
            <div className="flex-1 p-2 md:p-4">
              <div className="flex justify-between items-start mb-1.5 md:mb-2">
                <div>
                  <Badge variant="outline" className="text-[11px] mb-1.5 bg-transparent">
                    {product.brand}
                  </Badge>
                  <h3 className="font-semibold text-[13px] md:text-sm mb-1.5 md:mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] md:text-[11px] text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                    <span className="text-base md:text-lg font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs md:text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-[11px] md:text-xs text-muted-foreground mb-3">
                    <Package className="h-3.5 w-3.5 mr-1" />
                    Min Order: {product.minOrder}
                  </div>
                </div>
              </div>
              <p className="text-[13px] md:text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent h-8 rounded-lg text-sm flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 h-8 rounded-lg text-sm flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    const message = `Hello! I'm interested in getting a deal for:\n\n*${product.name}*\nBrand: ${product.brand}\nPrice: ₹${product.price.toLocaleString()}\n\nPlease provide more details about bulk pricing and minimum order quantity.`
                    window.open(`https://wa.me/918003246909?text=${encodeURIComponent(message)}`, '_blank')
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Get Deal
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-balance">{product.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Badge variant="outline">{product.brand}</Badge>
                <span className="text-xs text-muted-foreground">Min Order: {product.minOrder}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <img
                  src={
                    mediaItems[mediaIndex]?.type === "image"
                      ? mediaItems[mediaIndex].src
                      : product.image || "/placeholder.svg?height=480&width=480&query=product%20image%20large"
                  }
                  alt={product.name}
                  className="w-full h-52 md:h-60 object-cover rounded-md"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMediaOpen(true)
                  }}
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  View Fullscreen
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-md border p-2 md:p-3">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">MRP</span>
                    <span className="font-semibold">₹{mrp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm mt-1 md:mt-2">
                    <span className="text-muted-foreground">Market Price</span>
                    <span className="font-semibold">₹{marketPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm mt-1 md:mt-2">
                    <span className="text-muted-foreground">Our Price (Avg)</span>
                    <span className="font-semibold text-primary">₹{ourPriceAvg.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {mediaItems.length > 0 && (
          <Dialog open={mediaOpen} onOpenChange={setMediaOpen}>
            <DialogContent className="max-w-[95vw] md:max-w-5xl w-full p-0">
              <div className="bg-black relative w-full h-[70vh] md:h-[75vh] flex items-center justify-center">
                {mediaItems[mediaIndex].type === "image" ? (
                  <img
                    src={mediaItems[mediaIndex].src || "/placeholder.svg"}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <video
                    src={mediaItems[mediaIndex].src}
                    className="max-h-full max-w-full"
                    controls
                    playsInline
                    preload="metadata"
                  />
                )}
                {mediaItems.length > 1 && (
                  <>
                    <button
                      aria-label="Previous"
                      onClick={prevMedia}
                      className="absolute left-2 md:left-4 bg-background/80 hover:bg-background rounded-full p-2 backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Next"
                      onClick={nextMedia}
                      className="absolute right-2 md:right-4 bg-background/80 hover:bg-background rounded-full p-2 backdrop-blur-sm"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {mediaItems.length > 1 && (
                <div className="p-2 md:p-3 flex gap-2 overflow-x-auto">
                  {mediaItems.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => setMediaIndex(i)}
                      className={`h-14 w-14 rounded border ${i === mediaIndex ? "border-primary" : "border-border/60"}`}
                    >
                      {m.type === "image" ? (
                        <img
                          src={m.src || "/placeholder.svg"}
                          alt={`thumb-${i}`}
                          className="h-full w-full object-cover rounded"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted grid place-items-center rounded text-xs">Video</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </Card>
    )
  }

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/60 rounded-xl shadow-md hover:border-primary/30 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setOpen(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setOpen(true)
      }}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-square md:aspect-auto bg-muted/30 group/image">
          <img
            src={product.image || "/placeholder.svg?height=400&width=400&query=product%20image"}
            alt={product.name}
            className="w-full h-full object-cover md:h-32 group-hover:scale-125 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 ease-in-out" />
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[11px] px-2 py-0.5 rounded-md">
              -{discountPercentage}%
            </Badge>
          )}
          <Badge
            variant="outline"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-md"
          >
            {product.brand}
          </Badge>
          {isHovered && (
            <div className="hidden md:flex absolute inset-0 bg-black/40 items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="bg-background/90 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(true)
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          )}
        </div>
        <div className="p-2 md:p-2.5">
          <h3 className="font-semibold text-[12px] md:text-[13px] mb-1 md:mb-1.5 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-1 md:mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mb-1 md:mb-1.5">
            <span className="text-sm md:text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] md:text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center text-[10px] md:text-[11px] text-muted-foreground mb-2">
            <Package className="h-3.5 w-3.5 mr-1" />
            Min Order: {product.minOrder}
          </div>
          <div className="flex gap-2">
          <Button
              variant="outline"
            size="sm"
              className="flex-1 bg-transparent hover:bg-muted/50 h-8 md:h-8 text-[11px] md:text-[12px] rounded-lg border-border/60"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(true)
            }}
          >
              <Eye className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5" />
            Preview
          </Button>
            <Button
              size="sm"
              className="flex-1 bg-foreground hover:bg-foreground/90 text-white h-8 md:h-8 text-[11px] md:text-[12px] rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation()
                const message = `Hello! I'm interested in getting a deal for:\n\n*${product.name}*\nBrand: ${product.brand}\nPrice: ₹${product.price.toLocaleString()}\n\nPlease provide more details about bulk pricing and minimum order quantity.`
                window.open(`https://wa.me/918003246909?text=${encodeURIComponent(message)}`, '_blank')
              }}
            >
              <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5" />
              Get Deal
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-balance">{product.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="outline">{product.brand}</Badge>
              <span className="text-xs text-muted-foreground">Min Order: {product.minOrder}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              {mediaItems[mediaIndex]?.type === "image" ? (
                <img
                  src={mediaItems[mediaIndex].src || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-52 md:h-60 object-cover rounded-md"
                />
              ) : (
                <video
                  src={mediaItems[mediaIndex].src}
                  className="w-full h-52 md:h-60 object-cover rounded-md"
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  setMediaOpen(true)
                }}
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                View Fullscreen
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-md border p-2 md:p-3">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">MRP</span>
                  <span className="font-semibold">₹{mrp.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm mt-1 md:mt-2">
                  <span className="text-muted-foreground">Market Price</span>
                  <span className="font-semibold">₹{marketPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm mt-1 md:mt-2">
                  <span className="text-muted-foreground">Our Price (Avg)</span>
                  <span className="font-semibold text-primary">₹{ourPriceAvg.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-4">{product.description}</p>
              <div className="flex gap-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`https://wa.me/918003246909?text=${encodeURIComponent(`Hello, I'm interested in ${product.name} (${product.brand}). Please provide more details.`)}`, '_blank')
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    const message = `Hello! I'm interested in getting a deal for:\n\n*${product.name}*\nBrand: ${product.brand}\nPrice: ₹${product.price.toLocaleString()}\n\nPlease provide more details about bulk pricing and minimum order quantity.`
                    window.open(`https://wa.me/918003246909?text=${encodeURIComponent(message)}`, '_blank')
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Get Deal
                </Button>
              </div>
            </div>
          </div>
          {mediaItems.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {mediaItems.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setMediaIndex(i)}
                  className={`h-12 w-12 rounded border ${i === mediaIndex ? "border-primary" : "border-border/60"}`}
                >
                  {m.type === "image" ? (
                    <img
                      src={m.src || "/placeholder.svg"}
                      alt={`thumb-${i}`}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted grid place-items-center rounded text-[10px]">Video</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {mediaItems.length > 0 && (
        <Dialog open={mediaOpen} onOpenChange={setMediaOpen}>
          <DialogContent className="max-w-[95vw] md:max-w-5xl w-full p-0">
            <div className="bg-black relative w-full h-[70vh] md:h-[75vh] flex items-center justify-center">
              {mediaItems[mediaIndex].type === "image" ? (
                <img
                  src={mediaItems[mediaIndex].src || "/placeholder.svg"}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <video
                  src={mediaItems[mediaIndex].src}
                  className="max-h-full max-w-full"
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
              {mediaItems.length > 1 && (
                <>
                  <button
                    aria-label="Previous"
                    onClick={prevMedia}
                    className="absolute left-2 md:left-4 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    aria-label="Next"
                    onClick={nextMedia}
                    className="absolute right-2 md:right-4 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {mediaItems.length > 1 && (
              <div className="p-2 md:p-3 flex gap-2 overflow-x-auto">
                {mediaItems.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setMediaIndex(i)}
                    className={`h-14 w-14 rounded border ${i === mediaIndex ? "border-primary" : "border-border/60"}`}
                  >
                    {m.type === "image" ? (
                      <img
                        src={m.src || "/placeholder.svg"}
                        alt={`thumb-${i}`}
                        className="h-full w-full object-cover rounded"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted grid place-items-center rounded text-xs">Video</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
