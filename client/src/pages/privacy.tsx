import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p>
                Store Doctor is an AI-powered store analysis service. This Privacy Policy explains what information we collect when you use our service to analyze your e-commerce store, and how we handle that information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Account Information</h3>
              <p className="mb-3">When you create an account with Store Doctor, we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Your email address</li>
                <li>Your store URL</li>
                <li>Basic account credentials</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">Store Data for Analysis</h3>
              <p className="mb-3">When you initiate a store analysis, we collect publicly accessible information from your store, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product information (descriptions, prices, images)</li>
                <li>Store structure and page content</li>
                <li>Publicly available meta information</li>
                <li>Store performance metrics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect solely for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analyzing your store and generating health reports</li>
                <li>Providing diagnostic recommendations</li>
                <li>Maintaining your account and service access</li>
                <li>Sending service-related updates and analysis results</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security and Storage</h2>
              <p>
                We store your account information and analysis results securely. We do not access sensitive customer data or payment information from your store. All data collected is used only for generating your analysis reports.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. What We Do Not Collect</h2>
              <p className="mb-3">Store Doctor does not collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Customer personal information or payment data</li>
                <li>Cookies or tracking technology</li>
                <li>Marketing or promotional data</li>
                <li>Information beyond what's necessary for store analysis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Retention</h2>
              <p>
                We retain your account information and analysis results for as long as your account is active. You may request deletion of your data at any time by contacting us through the contact form on our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated Privacy Policy on our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through the contact form on our website.
              </p>
            </div>

            <div className="pt-8 border-t">
              <p className="text-sm">
                Last updated: August 2024
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
