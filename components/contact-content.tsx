"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function ContactContent() {
  const searchParams = useSearchParams() || null
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Contact page content from localStorage
  const [contactInfo, setContactInfo] = useState([
    {
      icon: MapPin,
      title: "Our Address",
      details: "703, Chittorgarh Rd, opposite Zee School, Gathila Kheda, Bhilwara, Rajasthan 311802",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["Ashish Jain: +91 8003246909", "Rishi Gandhi: +91 9251554751", "Vaibhav Gandhi: +91 9660994037"],
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "info@brandedfactorysale.com",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM",
    },
  ])
  
  const [heroTitle, setHeroTitle] = useState("Contact Us")
  const [heroDescription, setHeroDescription] = useState(
    "Ready to start your wholesale journey? Get in touch with our team for bulk orders, product inquiries, or partnership opportunities."
  )
  const [mapTitle, setMapTitle] = useState("Find Us on Map")
  const [mapDescription, setMapDescription] = useState("Visit our office for direct consultations and to see our product samples")
  const [mapEmbedUrl, setMapEmbedUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.8234567890123!2d74.6234567890123!3d25.3456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c5b5b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s703%2C%20Chittorgarh%20Rd%2C%20opposite%20Zee%20School%2C%20Gathila%20Kheda%2C%20Bhilwara%2C%20Rajasthan%20311802!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin")
  const [quickContactTitle, setQuickContactTitle] = useState("Quick Contact Options")
  const [quickContactDescription, setQuickContactDescription] = useState("Choose the most convenient way to reach us for immediate assistance")

  // Load contact settings from localStorage
  useEffect(() => {
    try {
      const address = localStorage.getItem("contact.address") || "703, Chittorgarh Rd, opposite Zee School, Gathila Kheda, Bhilwara, Rajasthan 311802"
      const phone1 = localStorage.getItem("contact.phone1") || "Ashish Jain: +91 8003246909"
      const phone2 = localStorage.getItem("contact.phone2") || "Rishi Gandhi: +91 9251554751"
      const phone3 = localStorage.getItem("contact.phone3") || "Vaibhav Gandhi: +91 9660994037"
      const email = localStorage.getItem("contact.email") || "info@brandedfactorysale.com"
      const hours = localStorage.getItem("contact.businessHours") || "Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM"
      const heroT = localStorage.getItem("contact.heroTitle") || "Contact Us"
      const heroDesc = localStorage.getItem("contact.heroDescription") || "Ready to start your wholesale journey? Get in touch with our team for bulk orders, product inquiries, or partnership opportunities."
      const mapT = localStorage.getItem("contact.mapTitle") || "Find Us on Map"
      const mapDesc = localStorage.getItem("contact.mapDescription") || "Visit our office for direct consultations and to see our product samples"
      const mapUrl = localStorage.getItem("contact.mapEmbedUrl") || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.8234567890123!2d74.6234567890123!3d25.3456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c5b5b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s703%2C%20Chittorgarh%20Rd%2C%20opposite%20Zee%20School%2C%20Gathila%20Kheda%2C%20Bhilwara%2C%20Rajasthan%20311802!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
      const quickT = localStorage.getItem("contact.quickContactTitle") || "Quick Contact Options"
      const quickDesc = localStorage.getItem("contact.quickContactDescription") || "Choose the most convenient way to reach us for immediate assistance"
      
      setContactInfo([
        {
          icon: MapPin,
          title: "Our Address",
          details: address,
        },
        {
          icon: Phone,
          title: "Phone Numbers",
          details: [phone1, phone2, phone3].filter(Boolean),
        },
        {
          icon: Mail,
          title: "Email Address",
          details: email,
        },
        {
          icon: Clock,
          title: "Business Hours",
          details: hours,
        },
      ])
      
      setHeroTitle(heroT)
      setHeroDescription(heroDesc)
      setMapTitle(mapT)
      setMapDescription(mapDesc)
      setMapEmbedUrl(mapUrl)
      setQuickContactTitle(quickT)
      setQuickContactDescription(quickDesc)
    } catch (error) {
      console.error("Error loading contact settings:", error)
    }
  }, [])

  // Pre-fill message if product query param exists
  useEffect(() => {
    const product = searchParams?.get("product")
    if (product) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in getting a deal for: ${product}\n\nPlease provide more details about pricing, minimum order quantity, and availability.`,
      }))
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, "")
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid 10-digit Indian mobile number"
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        icon: <AlertCircle className="h-5 w-5" />,
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      // Reset form and errors
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
      setErrors({})

      toast.success("Message Sent Successfully!", {
        description: "We'll get back to you within 24 hours.",
        icon: <CheckCircle2 className="h-5 w-5" />,
        duration: 5000,
      })
    } catch (error) {
      toast.error("Failed to Send Message", {
        description: error instanceof Error ? error.message : "Please try again later.",
        icon: <AlertCircle className="h-5 w-5" />,
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-6 sm:py-8 md:py-12">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/20">
            Get In Touch
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text px-4">{heroTitle}</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`bg-background/50 ${errors.name ? "border-destructive" : ""}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`bg-background/50 ${errors.email ? "border-destructive" : ""}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`bg-background/50 ${errors.phone ? "border-destructive" : ""}`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-background/50"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`bg-background/50 ${errors.message ? "border-destructive" : ""}`}
                      placeholder="Tell us about your requirements, bulk order details, or any questions you have..."
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive mt-1">{errors.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold mb-2">{info.title}</h3>
                          {Array.isArray(info.details) ? (
                            <div className="space-y-1">
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-xs sm:text-sm text-muted-foreground break-words">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line break-words">{info.details}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{mapTitle}</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              {mapDescription}
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-0">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Branded Factory Sale Location - ${contactInfo[0]?.details || "Location"}`}
                  className="w-full h-full"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{quickContactTitle}</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              {quickContactDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Call Us Now</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  Speak directly with our sales team for immediate assistance
                </p>
                <Button 
                  variant="outline" 
                  className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    const phoneNumber = contactInfo[1]?.details?.[0]?.match(/\+?\d{10,}/)?.[0]?.replace(/\D/g, "") || "8003246909"
                    window.open(`tel:+91${phoneNumber}`, "_self")
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                <p className="text-muted-foreground mb-4">Send detailed inquiries and get comprehensive responses</p>
                <Button 
                  variant="outline" 
                  className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    const email = typeof contactInfo[2]?.details === "string" ? contactInfo[2].details : "info@brandedfactorysale.com"
                    window.open(`mailto:${email}?subject=Inquiry from Website`, "_self")
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visit Our Office</h3>
                <p className="text-muted-foreground mb-4">Schedule a meeting to discuss bulk orders and partnerships</p>
                <Button 
                  variant="outline" 
                  className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    const address = typeof contactInfo[0]?.details === "string" ? contactInfo[0].details : "703 Chittorgarh Rd opposite Zee School Gathila Kheda Bhilwara Rajasthan 311802"
                    const encodedAddress = encodeURIComponent(address)
                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
