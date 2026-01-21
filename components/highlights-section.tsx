import { Check, Factory, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    icon: Factory,
    title: "Direct from Factory",
    description: "Skip middlemen and get authentic products straight from manufacturing sources",
  },
  {
    icon: Users,
    title: "Bulk Only (Wholesale)",
    description: "Minimum order quantities ensure the best wholesale pricing for your business",
  },
  {
    icon: TrendingUp,
    title: "Best Prices in Market",
    description: "Competitive wholesale rates with guaranteed quality and authenticity",
  },
]

export function HighlightsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Why Choose Us
            <span className="ml-2 inline-block animate-bounce">⭐</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            We provide the best wholesale experience with direct factory connections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/60 hover:border-primary/30 animate-fade-in-up hover:scale-105"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="text-xl font-semibold">{highlight.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
