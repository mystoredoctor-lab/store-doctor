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
                Store Doctor ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our website, mobile applications, and services (collectively, the "Services").
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Information You Provide</h3>
              <p className="mb-3">We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Create an account</li>
                <li>Subscribe to our services</li>
                <li>Submit forms or contact us</li>
                <li>Provide store information for analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">Information Collected Automatically</h3>
              <p className="mb-3">When you access our Services, we automatically collect certain information about your device and usage, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Log data and usage information</li>
                <li>Device information (IP address, browser type)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Analytics data about how you interact with our Services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect for various purposes, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing and improving our Services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending transactional and promotional communications</li>
                <li>Analyzing usage patterns and troubleshooting</li>
                <li>Detecting and preventing fraud or security issues</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Share Your Information</h2>
              <p className="mb-3">We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With service providers who assist us in operating our Services</li>
                <li>With your consent or at your direction</li>
                <li>To comply with legal obligations or enforce our agreements</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Privacy Rights</h2>
              <p className="mb-3">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate data</li>
                <li>The right to delete your personal information</li>
                <li>The right to opt-out of certain communications</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at the information provided below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking</h2>
              <p>
                We use cookies, web beacons, and similar technologies to enhance your experience, remember your preferences, and understand how you use our Services. You can control cookies through your browser settings, though disabling cookies may affect functionality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Third-Party Links</h2>
              <p>
                Our Services may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices. We encourage you to review their privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
              <p>
                Our Services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website and updating the "Last Updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us through the contact form on our website.
              </p>
            </div>

            <div className="pt-8 border-t">
              <p className="text-sm">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
