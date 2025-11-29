import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Connect Your Store",
    description: "Install Store Doctor from the Shopify App Store with one click. No coding required.",
  },
  {
    step: "02",
    title: "Run Your First Scan",
    description: "Our AI analyzes your entire store across 6 critical categories in just minutes.",
  },
  {
    step: "03",
    title: "Get Recommendations",
    description: "Receive prioritized, actionable recommendations tailored to your store.",
  },
  {
    step: "04",
    title: "Implement & Track",
    description: "Apply fixes, track improvements, and watch your health score rise.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How Store Doctor Works</h2>
          <p className="text-lg text-muted-foreground">Get started in minutes and start improving your store today.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-border -translate-x-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* TODO: Connect to Shopify OAuth */}
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
