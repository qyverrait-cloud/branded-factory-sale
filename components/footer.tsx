"use client"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Instagram, Facebook } from "lucide-react"
import { useEffect, useState } from "react"

export function Footer() {
  const [instagramUrl, setInstagramUrl] = useState<string>("")
  const [facebookUrl, setFacebookUrl] = useState<string>("")
  useEffect(() => {
    try {
      const ig = localStorage.getItem("site.instagramUrl")
      const fb = localStorage.getItem("site.facebookUrl")
      if (ig) setInstagramUrl(ig)
      if (fb) setFacebookUrl(fb)
    } catch {}
  }, [])

  return (
    <footer className="bfs-footer border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="Branded Factory Sale Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold gradient-text">BRANDED FACTORY SALE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium branded products directly from factories at wholesale prices. Perfect for retailers, resellers,
              and bulk buyers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {instagramUrl ? (
                <Link
                  aria-label="Instagram"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border hover:bg-muted/20 transition"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Instagram className="h-3.5 w-3.5" /> Add via Admin → Content
                </span>
              )}
              {facebookUrl ? (
                <Link
                  aria-label="Facebook"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border hover:bg-muted/20 transition"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Facebook className="h-3.5 w-3.5" /> Add via Admin → Content
                </span>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/catalogue" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Catalogue
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Categories</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/catalogue?category=garments"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Garments
              </Link>
              <Link
                href="/catalogue?category=footwear"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Footwear
              </Link>
              <Link
                href="/catalogue?category=luggage"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Luggage
              </Link>
              <Link
                href="/catalogue?category=accessories"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessories
              </Link>
              <Link
                href="/catalogue?category=fmcg"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                FMCG
              </Link>
              <Link
                href="/catalogue?category=electronics"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Electronics
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  703, Chittorgarh Rd, opposite Zee School, Gathila Kheda, Bhilwara, Rajasthan 311802
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <p>Ashish Jain: 8003246909</p>
                  <p>Rishi Gandhi: 9251554751</p>
                  <p>Vaibhav Gandhi: 9660994037</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm">© 2025 Branded Factory Sale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
