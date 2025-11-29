import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingSection } from "@/components/landing/pricing-section";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as your store grows. All plans include core features.
            </p>
          </div>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
