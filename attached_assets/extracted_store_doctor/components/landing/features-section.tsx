import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Zap, Layout, TrendingUp, Shield, Smartphone, BarChart2, Wand2 } from "lucide-react"

const features = [
  {
    title: "SEO Analysis",
    description: "Optimize meta tags, headings, alt text, and structured data for better search rankings.",
    icon: Search,
  },
  {
    title: "Speed Optimization",
    description: "Identify slow-loading elements, large images, and render-blocking resources.",
    icon: Zap,
  },
  {
    title: "UX Evaluation",
    description: "Assess navigation, accessibility, and overall user experience patterns.",
    icon: Layout,
  },
  {
    title: "Conversion Rate",
    description: "Find friction points in your checkout and boost your conversion rates.",
    icon: TrendingUp,
  },
  {
    title: "Security Check",
    description: "Ensure SSL, secure payments, and protection against common vulnerabilities.",
    icon: Shield,
  },
  {
    title: "Mobile Ready",
    description: "Test mobile responsiveness and touch-friendly interactions.",
    icon: Smartphone,
  },
  {
    title: "Competition Benchmark",
    description: "Compare your store against industry standards and top competitors.",
    icon: BarChart2,
  },
  {
    title: "Autofix Suggestions",
    description: "One-click fixes for common issues to save time and effort.",
    icon: Wand2,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Optimize Your Store
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis across all critical areas that impact your store&apos;s performance and sales.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
