"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Package, Tags, Building2, FileText, Settings, LogOut, Phone, Menu, X, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AdminProducts } from "@/components/admin-products"
import { AdminCategories } from "@/components/admin-categories"
import { AdminBrands } from "@/components/admin-brands"

interface AdminDashboardProps {
  onLogout: () => void
}

const menuItems = [
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "brands", label: "Brands", icon: Building2 },
  { id: "content", label: "Content", icon: FileText },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "settings", label: "Settings", icon: Settings },
]

const stats = [
  { title: "Total Products", value: "1,247", change: "+12%", icon: Package, color: "text-blue-500" },
  { title: "Active Orders", value: "89", change: "+5%", icon: Package, color: "text-green-500" },
  { title: "Total Customers", value: "456", change: "+18%", icon: Package, color: "text-purple-500" },
  { title: "Revenue", value: "₹2.4L", change: "+23%", icon: Package, color: "text-primary" },
]

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("products")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [storeName, setStoreName] = useState("Branded Factory Sale")
  const [supportEmail, setSupportEmail] = useState("support@factorysale.com")
  const [announcement, setAnnouncement] = useState("Welcome to the admin panel.")
  const [directorName, setDirectorName] = useState("BASANT GANDHI")
  const [tagline, setTagline] = useState(
    "India's No.1 wholesaler — the largest supplier of liquidation stock — offering the lowest prices, best quality, and 100% original branded products. Unbeatable deals, unmatched variety!",
  )
  const [instagramUrl, setInstagramUrl] = useState("")
  const [facebookUrl, setFacebookUrl] = useState("")
  
  // Contact page settings
  const [contactAddress, setContactAddress] = useState("703, Chittorgarh Rd, opposite Zee School, Gathila Kheda, Bhilwara, Rajasthan 311802")
  const [contactPhone1, setContactPhone1] = useState("Ashish Jain: +91 8003246909")
  const [contactPhone2, setContactPhone2] = useState("Rishi Gandhi: +91 9251554751")
  const [contactPhone3, setContactPhone3] = useState("Vaibhav Gandhi: +91 9660994037")
  const [contactEmail, setContactEmail] = useState("info@brandedfactorysale.com")
  const [businessHours, setBusinessHours] = useState("Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM")
  const [contactHeroTitle, setContactHeroTitle] = useState("Contact Us")
  const [contactHeroDescription, setContactHeroDescription] = useState("Ready to start your wholesale journey? Get in touch with our team for bulk orders, product inquiries, or partnership opportunities.")
  const [mapEmbedUrl, setMapEmbedUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.8234567890123!2d74.6234567890123!3d25.3456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c5b5b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s703%2C%20Chittorgarh%20Rd%2C%20opposite%20Zee%20School%2C%20Gathila%20Kheda%2C%20Bhilwara%2C%20Rajasthan%20311802!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin")
  const [mapTitle, setMapTitle] = useState("Find Us on Map")
  const [mapDescription, setMapDescription] = useState("Visit our office for direct consultations and to see our product samples")
  const [quickContactTitle, setQuickContactTitle] = useState("Quick Contact Options")
  const [quickContactDescription, setQuickContactDescription] = useState("Choose the most convenient way to reach us for immediate assistance")

  useEffect(() => {
    try {
      const t = localStorage.getItem("site.tagline")
      const d = localStorage.getItem("site.directorName")
      const ig = localStorage.getItem("site.instagramUrl")
      const fb = localStorage.getItem("site.facebookUrl")
      if (t) setTagline(t)
      if (d) setDirectorName(d)
      if (ig) setInstagramUrl(ig)
      if (fb) setFacebookUrl(fb)
      
      // Load contact settings
      const addr = localStorage.getItem("contact.address")
      const ph1 = localStorage.getItem("contact.phone1")
      const ph2 = localStorage.getItem("contact.phone2")
      const ph3 = localStorage.getItem("contact.phone3")
      const email = localStorage.getItem("contact.email")
      const hours = localStorage.getItem("contact.businessHours")
      const heroTitle = localStorage.getItem("contact.heroTitle")
      const heroDesc = localStorage.getItem("contact.heroDescription")
      const mapUrl = localStorage.getItem("contact.mapEmbedUrl")
      const mapT = localStorage.getItem("contact.mapTitle")
      const mapDesc = localStorage.getItem("contact.mapDescription")
      const quickTitle = localStorage.getItem("contact.quickContactTitle")
      const quickDesc = localStorage.getItem("contact.quickContactDescription")
      
      if (addr) setContactAddress(addr)
      if (ph1) setContactPhone1(ph1)
      if (ph2) setContactPhone2(ph2)
      if (ph3) setContactPhone3(ph3)
      if (email) setContactEmail(email)
      if (hours) setBusinessHours(hours)
      if (heroTitle) setContactHeroTitle(heroTitle)
      if (heroDesc) setContactHeroDescription(heroDesc)
      if (mapUrl) setMapEmbedUrl(mapUrl)
      if (mapT) setMapTitle(mapT)
      if (mapDesc) setMapDescription(mapDesc)
      if (quickTitle) setQuickContactTitle(quickTitle)
      if (quickDesc) setQuickContactDescription(quickDesc)
    } catch {}
  }, [])

  const saveContent = () => {
    try {
      localStorage.setItem("site.tagline", tagline)
      localStorage.setItem("site.directorName", directorName)
      localStorage.setItem("site.instagramUrl", instagramUrl)
      localStorage.setItem("site.facebookUrl", facebookUrl)
      alert("Saved content locally.")
    } catch {
      alert("Unable to save content.")
    }
  }

  const saveContactSettings = () => {
    try {
      localStorage.setItem("contact.address", contactAddress)
      localStorage.setItem("contact.phone1", contactPhone1)
      localStorage.setItem("contact.phone2", contactPhone2)
      localStorage.setItem("contact.phone3", contactPhone3)
      localStorage.setItem("contact.email", contactEmail)
      localStorage.setItem("contact.businessHours", businessHours)
      localStorage.setItem("contact.heroTitle", contactHeroTitle)
      localStorage.setItem("contact.heroDescription", contactHeroDescription)
      localStorage.setItem("contact.mapEmbedUrl", mapEmbedUrl)
      localStorage.setItem("contact.mapTitle", mapTitle)
      localStorage.setItem("contact.mapDescription", mapDescription)
      localStorage.setItem("contact.quickContactTitle", quickContactTitle)
      localStorage.setItem("contact.quickContactDescription", quickContactDescription)
      alert("Contact settings saved successfully!")
    } catch {
      alert("Unable to save contact settings.")
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProducts />
      case "categories":
        return <AdminCategories />
      case "brands":
        return <AdminBrands />
      case "content":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Site Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Homepage Tagline</label>
                  <Textarea
                    className="mt-1 bg-background/50"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Director Name</label>
                  <Input
                    className="mt-1 bg-background/50"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Instagram URL</label>
                    <Input
                      placeholder="https://instagram.com/yourpage"
                      className="mt-1 bg-background/50"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Facebook URL</label>
                    <Input
                      placeholder="https://facebook.com/yourpage"
                      className="mt-1 bg-background/50"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <Button onClick={saveContent}>Save</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Saved to this browser only (MVP). Hero, About, and Footer use these values.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  className="bg-background/50"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                />
                <div className="text-xs text-muted-foreground">Saving is mocked in this MVP.</div>
              </CardContent>
            </Card>
          </div>
        )
      case "contact":
        return (
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Contact Page Settings</CardTitle>
                <p className="text-sm text-muted-foreground">Edit all contact page content from here</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero Section */}
                <div className="space-y-4 border-b border-border/50 pb-6">
                  <h3 className="text-lg font-semibold">Hero Section</h3>
                  <div>
                    <label className="text-sm text-muted-foreground">Hero Title</label>
                    <Input
                      className="mt-1 bg-background/50"
                      value={contactHeroTitle}
                      onChange={(e) => setContactHeroTitle(e.target.value)}
                      placeholder="Contact Us"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Hero Description</label>
                    <Textarea
                      className="mt-1 bg-background/50"
                      value={contactHeroDescription}
                      onChange={(e) => setContactHeroDescription(e.target.value)}
                      rows={3}
                      placeholder="Ready to start your wholesale journey? Get in touch with our team..."
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 border-b border-border/50 pb-6">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div>
                    <label className="text-sm text-muted-foreground">Address</label>
                    <Textarea
                      className="mt-1 bg-background/50"
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      rows={2}
                      placeholder="Full address"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Phone 1</label>
                      <Input
                        className="mt-1 bg-background/50 h-10 sm:h-11 text-sm sm:text-base"
                        value={contactPhone1}
                        onChange={(e) => setContactPhone1(e.target.value)}
                        placeholder="Name: +91 XXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Phone 2</label>
                      <Input
                        className="mt-1 bg-background/50 h-10 sm:h-11 text-sm sm:text-base"
                        value={contactPhone2}
                        onChange={(e) => setContactPhone2(e.target.value)}
                        placeholder="Name: +91 XXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Phone 3</label>
                      <Input
                        className="mt-1 bg-background/50 h-10 sm:h-11 text-sm sm:text-base"
                        value={contactPhone3}
                        onChange={(e) => setContactPhone3(e.target.value)}
                        placeholder="Name: +91 XXXXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email Address</label>
                    <Input
                      className="mt-1 bg-background/50"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="info@brandedfactorysale.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Business Hours</label>
                    <Textarea
                      className="mt-1 bg-background/50"
                      value={businessHours}
                      onChange={(e) => setBusinessHours(e.target.value)}
                      rows={2}
                      placeholder="Monday - Saturday: 9:00 AM - 7:00 PM&#10;Sunday: 10:00 AM - 5:00 PM"
                    />
                  </div>
                </div>

                {/* Map Section */}
                <div className="space-y-4 border-b border-border/50 pb-6">
                  <h3 className="text-lg font-semibold">Map Section</h3>
                  <div>
                    <label className="text-sm text-muted-foreground">Map Title</label>
                    <Input
                      className="mt-1 bg-background/50"
                      value={mapTitle}
                      onChange={(e) => setMapTitle(e.target.value)}
                      placeholder="Find Us on Map"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Map Description</label>
                    <Textarea
                      className="mt-1 bg-background/50"
                      value={mapDescription}
                      onChange={(e) => setMapDescription(e.target.value)}
                      rows={2}
                      placeholder="Visit our office for direct consultations..."
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Google Maps Embed URL</label>
                    <Textarea
                      className="mt-1 bg-background/50 font-mono text-xs"
                      value={mapEmbedUrl}
                      onChange={(e) => setMapEmbedUrl(e.target.value)}
                      rows={3}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get embed URL from Google Maps → Share → Embed a map
                    </p>
                  </div>
                </div>

                {/* Quick Contact Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quick Contact Section</h3>
                  <div>
                    <label className="text-sm text-muted-foreground">Section Title</label>
                    <Input
                      className="mt-1 bg-background/50"
                      value={quickContactTitle}
                      onChange={(e) => setQuickContactTitle(e.target.value)}
                      placeholder="Quick Contact Options"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Section Description</label>
                    <Textarea
                      className="mt-1 bg-background/50"
                      value={quickContactDescription}
                      onChange={(e) => setQuickContactDescription(e.target.value)}
                      rows={2}
                      placeholder="Choose the most convenient way to reach us..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button 
                    onClick={saveContactSettings} 
                    className="w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base font-semibold touch-manipulation"
                  >
                    Save Contact Settings
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 sm:mt-3">
                    All changes are saved to browser storage. Refresh the contact page to see updates.
                  </p>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-semibold text-foreground mb-1">Note for Production:</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      For contact form email submissions, set the <code className="text-xs bg-background px-1 py-0.5 rounded">CONTACT_EMAIL</code> environment variable in your hosting panel. The API route will use this email to receive form submissions.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Example: <code className="text-xs bg-background px-1 py-0.5 rounded">CONTACT_EMAIL=info@brandedfactorysale.com</code>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "settings":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Store Name</label>
                  <Input
                    className="mt-1 bg-background/50"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Support Email</label>
                  <Input
                    className="mt-1 bg-background/50"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
                <div className="text-xs text-muted-foreground">These settings are local-only in this MVP.</div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <AdminProducts />
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-card/50 backdrop-blur-sm border-r border-border/50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-screen
      `}>
        <div className="p-4 sm:p-6 border-b border-border/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8" />
              <div>
                <h2 className="font-bold gradient-text text-sm sm:text-base">Admin Panel</h2>
                <p className="text-xs text-muted-foreground hidden sm:block">Factory Sale</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-muted/20 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 sm:py-2 rounded-lg text-left transition-colors touch-manipulation ${
                    activeTab === item.id
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/20 active:bg-muted/30"
                  }`}
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        <div className="p-3 sm:p-4 border-t border-border/50 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onLogout} 
            className="w-full bg-transparent h-10 sm:h-11 text-sm sm:text-base"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="bg-card/30 backdrop-blur-sm border-b border-border/50 p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-muted/20 rounded-lg transition-colors touch-manipulation"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold capitalize truncate">{activeTab}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Manage your wholesale platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-transparent hidden sm:inline-flex"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Website
                </Link>
              </Button>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs sm:text-sm">
                Admin
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
