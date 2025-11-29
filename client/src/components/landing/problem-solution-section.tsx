import { Card, CardContent } from "@/components/ui/card";
import { XCircle, CheckCircle, ArrowRight } from "lucide-react";

const problems = [
  "Struggling to find why your store isn't converting",
  "No idea if your SEO is properly configured",
  "Slow page loads driving customers away",
  "Poor mobile experience losing sales",
  "Security vulnerabilities you don't know about",
];

const solutions = [
  "Detailed conversion analysis with actionable fixes",
  "Complete SEO audit with step-by-step guidance",
  "Performance optimization recommendations",
  "Mobile-first UX improvements",
  "Security scan and vulnerability alerts",
];

export function ProblemSolutionSection() {
  return (
    <section className="py-20" data-testid="section-problem-solution">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Stop Guessing, Start Growing
          </h2>
          <p className="text-lg text-muted-foreground">
            Most Shopify merchants don't know what's holding their store back. Store Doctor reveals
            the hidden issues and gives you a clear path to success.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <Card className="border-red-500/20 bg-red-500/5" data-testid="card-problems">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-semibold">The Problem</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`problem-item-${index}`}>
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-green-500/5" data-testid="card-solutions">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold">The Solution</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`solution-item-${index}`}>
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{solution}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-primary font-medium">
            <span>From struggling to thriving</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
