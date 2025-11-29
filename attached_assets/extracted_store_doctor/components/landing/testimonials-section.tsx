import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Owner, Luxe Boutique",
    avatar: "/professional-woman-headshot.png",
    content:
      "Store Doctor helped me identify critical SEO issues I didn't even know existed. My organic traffic increased by 40% after implementing their recommendations.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Founder, Tech Gadgets Pro",
    avatar: "/professional-man-headshot.png",
    content:
      "The speed optimization suggestions alone were worth it. My store loads 3 seconds faster now, and I've seen a noticeable drop in bounce rates.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "E-commerce Manager",
    avatar: "/business-woman-headshot.png",
    content:
      "Finally, a tool that gives actionable insights instead of vague suggestions. The conversion rate analysis helped us improve checkout by 25%.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Loved by Shopify Merchants</h2>
          <p className="text-lg text-muted-foreground">See what store owners are saying about Store Doctor.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
