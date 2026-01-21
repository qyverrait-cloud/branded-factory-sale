"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, Eye, Award, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

const achievements = [
  { number: "500+", label: "Brand Partners", description: "Premium brands worldwide" },
  { number: "10K+", label: "Orders Fulfilled", description: "Successful bulk deliveries" },
  { number: "150+", label: "Factory Partners", description: "Direct manufacturing sources" },
  { number: "98%", label: "Client Satisfaction", description: "Happy wholesale customers" },
]

const values = [
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Every product undergoes strict quality checks before reaching our customers",
  },
  {
    icon: TrendingUp,
    title: "Competitive Pricing",
    description: "Direct factory partnerships ensure the best wholesale prices in the market",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Dedicated support team to help you with all your wholesale requirements",
  },
  {
    icon: Award,
    title: "Trusted Partner",
    description: "Years of experience in wholesale business with proven track record",
  },
]

export function AboutContent() {
  const [directorName, setDirectorName] = useState("BASANT GANDHI")
  useEffect(() => {
    try {
      const d = localStorage.getItem("site.directorName")
      if (d) setDirectorName(d)
    } catch {}
  }, [])

  return (
    <div className="py-6 sm:py-8 md:py-12">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/20">
            About Our Company
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text px-4">Leading Wholesale Distribution Partner</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            With years of experience in wholesale distribution, we connect businesses with premium branded products
            directly from factories, ensuring quality, authenticity, and competitive pricing.
          </p>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-3 sm:mb-4 bg-transparent">
                Leadership
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Meet Our Director</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Under visionary leadership, Branded Factory Sale has grown from a small wholesale operation to one of
                the most trusted names in factory-direct distribution. Our director brings decades of experience in
                wholesale business and maintains strong relationships with manufacturers worldwide.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">20+ years in wholesale distribution</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">Direct partnerships with 150+ factories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">Committed to quality and customer satisfaction</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl transform rotate-3"></div>
                <Card className="relative bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="text-center">
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6">
                        <Image
                          src="/images/director-photo.webp"
                          alt="Director Photo"
                          fill
                          className="rounded-full object-cover border-4 border-primary/20"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{directorName}</h3>
                      <p className="text-sm sm:text-base text-primary font-medium mb-3 sm:mb-4">Founder & Managing Director</p>
                      <p className="text-xs sm:text-sm text-muted-foreground italic px-2">
                        "Our mission is to bridge the gap between manufacturers and retailers, providing authentic
                        products at unbeatable wholesale prices."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To provide businesses with direct access to premium branded products at wholesale prices, eliminating
                  middlemen and ensuring maximum value for our customers. We strive to build long-term partnerships
                  based on trust, quality, and competitive pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To become the leading wholesale distribution platform in India, connecting thousands of retailers with
                  authentic branded products. We envision a future where every business, regardless of size, has access
                  to premium products at factory-direct prices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Achievements</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Numbers that reflect our commitment to excellence and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">{achievement.number}</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold mb-1">{achievement.label}</div>
                <div className="text-xs sm:text-sm text-muted-foreground px-2">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Core Values</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              The principles that guide our business and define our commitment to customers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Choose Branded Factory Sale</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              We offer unique advantages that set us apart in the wholesale distribution industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Factory Connections</h3>
              <p className="text-muted-foreground">
                We work directly with manufacturers, eliminating middlemen and ensuring authentic products at the best
                prices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guarantee</h3>
              <p className="text-muted-foreground">
                Every product undergoes strict quality checks and comes with authenticity guarantee from our trusted
                partners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
              <p className="text-muted-foreground">
                Our experienced team provides personalized support to help you find the right products for your business
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
