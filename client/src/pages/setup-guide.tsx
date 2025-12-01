import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const setupSteps = [
  {
    number: 1,
    title: "Create Your Store Doctor Account",
    description: "Sign up and create your account",
    details: [
      "Go to Store Doctor website",
      "Click 'Sign Up' button",
      "Enter your email and create a password",
      "Click 'Create Account'",
      "Done! ✓"
    ],
    time: "2 minutes"
  },
  {
    number: 2,
    title: "Install Store Doctor on Shopify",
    description: "Connect your Shopify store to Store Doctor",
    details: [
      "Log in to your Shopify Partner account",
      "Go to 'Apps & integrations'",
      "Search for 'Store Doctor' app",
      "Click 'Add app' and install it",
      "Click 'Authorize' when asked for permission",
      "You'll see a success message ✓"
    ],
    time: "3 minutes"
  },
  {
    number: 3,
    title: "Choose Your Plan",
    description: "Pick the right plan for your store",
    details: [
      "Free Plan: Best for trying it out (1 scan per month)",
      "Pro Plan: Great for growing stores (5 scans per month, $12/month)",
      "Advanced Plan: For serious merchants (15 scans per month, $25/month)",
      "Click the plan you want",
      "Add your payment method if choosing Pro or Advanced"
    ],
    time: "2 minutes"
  },
  {
    number: 4,
    title: "Run Your First Scan",
    description: "Let Store Doctor analyze your store",
    details: [
      "Go to the 'Stores' section",
      "Click 'Connect Store' and select your store",
      "Click 'Run Scan' button",
      "Wait while Store Doctor checks your store (2-3 minutes)",
      "You'll see a health score and list of issues ✓"
    ],
    time: "3 minutes"
  },
  {
    number: 5,
    title: "Fix Issues & Grow Your Store",
    description: "Follow the recommendations",
    details: [
      "Look at the 'Issues Found' section",
      "Start with the red (most important) issues first",
      "Follow the 'How to Fix' instructions for each issue",
      "Make the changes to your store",
      "Run another scan to see your improvement!"
    ],
    time: "Ongoing"
  },
];

const faqItems = [
  {
    q: "What does Store Doctor do?",
    a: "Store Doctor is like a doctor for your Shopify store! It checks your store's health across 6 areas: SEO, Speed, User Experience, Conversion Rate, Security, and Mobile. It finds problems and tells you exactly how to fix them."
  },
  {
    q: "Is it safe to use?",
    a: "100% safe! Store Doctor only reads information about your store. It doesn't change anything without your permission. Your data is secure and encrypted."
  },
  {
    q: "How often should I scan my store?",
    a: "We recommend scanning once a week to catch new issues early. The more you scan, the faster you'll see improvements!"
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes! You can cancel your subscription anytime. Your data stays safe, and you can always come back later."
  },
  {
    q: "What if I have questions?",
    a: "Contact us anytime! We're here to help. Email: mystoredoctor@gmail.com or use the chat in your dashboard."
  },
];

export default function SetupGuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4">Getting Started Guide</Badge>
            <h1 className="text-4xl font-bold mb-4">Your Store Doctor Setup Journey</h1>
            <p className="text-lg text-muted-foreground">
              Follow these simple steps to get your store healthy. Takes about 10 minutes!
            </p>
          </div>

          {/* Setup Steps */}
          <div className="space-y-6 mb-20">
            {setupSteps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden" data-testid={`setup-step-${step.number}`}>
                <CardHeader className="bg-muted/50 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">{step.time}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3" data-testid={`step-${step.number}-detail-${idx}`}>
                        <Circle className="h-2 w-2 mt-2 text-primary shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
            <div className="grid gap-4" data-testid="faq-section">
              {faqItems.map((item, index) => (
                <Card key={index} data-testid={`faq-item-${index}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      {item.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {item.a}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your store is waiting! Follow the steps above and you'll have Store Doctor analyzing your Shopify store in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/dashboard" data-testid="button-start-setup">
                    Go to Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/" data-testid="button-back-home">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="mt-12 border-yellow-500/20 bg-yellow-500/5">
            <CardHeader>
              <CardTitle className="text-yellow-600">💡 Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>Start Small:</strong> Begin with the Red (high priority) issues first. Fixing these will make the biggest impact on your store.
              </p>
              <p>
                <strong>Take Notes:</strong> Write down the issues so you can track what you've fixed and what still needs work.
              </p>
              <p>
                <strong>Test Changes:</strong> After fixing an issue, run another scan to see your improvement!
              </p>
              <p>
                <strong>Ask for Help:</strong> If you don't understand an issue, click on it to see detailed explanations and examples.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
