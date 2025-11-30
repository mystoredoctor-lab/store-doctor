import { Link } from "wouter";

const footerLinks = {
  Product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const handleLinkClick = (href: string) => {
  if (href.includes("#")) {
    // Smooth scroll to anchor
    setTimeout(() => {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  } else {
    // Scroll to top for regular links
    window.scrollTo(0, 0);
  }
};

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" onClick={() => handleLinkClick("/")} className="flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="Store Doctor Logo" 
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold">Store Doctor</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-powered health diagnostics for your Shopify store. Identify issues, get actionable recommendations, and
              grow your business.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Store Doctor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
