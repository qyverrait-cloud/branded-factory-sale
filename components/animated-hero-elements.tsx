"use client"

import { useEffect, useMemo, useState } from "react"
import { ShoppingBag, TrendingUp, Star, Package, Truck, Shield, Zap } from "lucide-react"

const floatingIcons = [
  { icon: ShoppingBag, delay: 0, x: "10%", y: "20%", strength: 12 },
  { icon: TrendingUp, delay: 0.5, x: "80%", y: "30%", strength: 16 },
  { icon: Star, delay: 1, x: "15%", y: "60%", strength: 10 },
  { icon: Package, delay: 1.5, x: "75%", y: "50%", strength: 14 },
  { icon: Truck, delay: 2, x: "20%", y: "80%", strength: 18 },
  { icon: Shield, delay: 2.5, x: "85%", y: "70%", strength: 12 },
  { icon: Zap, delay: 3, x: "50%", y: "15%", strength: 20 },
]

// Product images for floating animation
const productImages = [
  { src: "/fashion-clothing-garments.jpg", type: "garments", delay: 0, strength: 10 },
  { src: "/shoes-footwear-sneakers.jpg", type: "footwear", delay: 0.6, strength: 14 },
  { src: "/fashion-clothing-garments.jpg", type: "garments", delay: 1.2, strength: 12 },
  { src: "/shoes-footwear-sneakers.jpg", type: "footwear", delay: 1.8, strength: 16 },
]

const iconAnimationClasses = ["animate-float-arc", "animate-drift-slow", "animate-sway-slow", "animate-rotate-float", "animate-bob-x"]
const imageAnimationClasses = ["animate-float-product-image", "animate-float-arc", "animate-drift-slow", "animate-sway-slow"]

export function AnimatedHeroElements() {
  const [mounted, setMounted] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) - 0.5
      const ny = (e.clientY / window.innerHeight) - 0.5
      setParallax({ x: nx, y: ny })
    }
    window.addEventListener("mousemove", handler, { passive: true })
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  const iconDecor = useMemo(() => {
    return floatingIcons.map((item, i) => ({
      ...item,
      cls: iconAnimationClasses[i % iconAnimationClasses.length],
      duration: `${7 + (i % 5)}s`,
    }))
  }, [])

  const imageDecor = useMemo(() => {
    return productImages.map((item, i) => ({
      ...item,
      cls: imageAnimationClasses[i % imageAnimationClasses.length],
      duration: `${8 + (i % 4)}s`,
    }))
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {iconDecor.map((item, index) => {
        const Icon = item.icon
        const tx = parallax.x * item.strength
        const ty = parallax.y * item.strength
        return (
          <div
            key={index}
            className={`absolute ${item.cls} opacity-20`}
            style={{
              left: item.x as string,
              top: item.y as string,
              animationDelay: `${item.delay}s`,
              animationDuration: item.duration,
              transform: `translate(${tx}px, ${ty}px)`,
            }}
          >
            <Icon className="h-8 w-8 sm:h-12 sm:w-12 text-primary/30" />
          </div>
        )
      })}
      
      {/* Floating product images - Garments & Footwear */}
      {imageDecor.map((product, index) => {
        const tx = parallax.x * product.strength
        const ty = parallax.y * product.strength
        return (
          <div
            key={index}
            className={`absolute rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm ${product.cls}`}
            style={{
              left: `${15 + index * 20}%`,
              top: `${25 + (index % 2) * 40}%`,
              animationDelay: `${product.delay}s`,
              animationDuration: product.duration,
              transform: `rotate(${(index % 2 === 0 ? 1 : -1) * 8}deg) translate(${tx}px, ${ty}px)`,
            }}
          >
            <img
              src={product.src}
              alt={product.type}
              className="w-24 h-32 sm:w-32 sm:h-40 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )
      })}
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow animate-blob" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animate-blob" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/5 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse-slow animate-blob" style={{ animationDelay: "2s" }} />
    </div>
  )
}

