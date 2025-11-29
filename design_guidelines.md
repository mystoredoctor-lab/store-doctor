# StoreDoctor Design Guidelines

## Design Approach
**System:** Material Design with Shopify Polaris influences for dashboard areas
**Reference:** Draw inspiration from Linear (clean data presentation), Stripe (trust and professionalism), and Shopify Admin (familiar patterns for Shopify merchants)

## Core Design Principles
1. **Professional Trust:** Clean, confident layouts that convey expertise and reliability
2. **Data Clarity:** Information-dense displays with clear visual hierarchy
3. **Action-Oriented:** Every scan result leads to clear, actionable next steps
4. **Merchant-Familiar:** Leverage Shopify-native patterns where appropriate

## Typography
**Fonts:** Inter (primary), JetBrains Mono (code/technical data)
- Headings: Inter Bold - 2xl to 5xl
- Body: Inter Regular - base to lg
- Technical/Metrics: JetBrains Mono - sm to base
- Small labels: Inter Medium - xs to sm

## Layout System
**Spacing Units:** Tailwind classes - 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-24
- Card gaps: gap-4 to gap-6
- Container: max-w-7xl with px-4 to px-8

## Page-Specific Layouts

### Landing Page
**Structure:** 7 sections
1. **Hero** (80vh): Large heading + subheading, dual CTAs ("Start Free Scan" primary, "View Demo" secondary), background with subtle gradient overlay, logo prominent in navigation
2. **Trust Bar:** Merchant logos or "Trusted by X stores" with metrics strip
3. **Problem/Solution** (2-column): Left - pain points list, Right - solution visualization with dashboard preview
4. **Scan Categories** (4-column grid): SEO, Performance, UX, Conversion - each card with icon, title, 2-3 bullet points
5. **Live Scan Demo:** Interactive preview showing scan progress and sample results
6. **Pricing Tiers** (3-column): Free, Pro, Enterprise with feature comparison
7. **Final CTA + Footer:** Newsletter signup, social links, quick nav, contact info

### Dashboard
**Layout:** Sidebar (240px) + Main content area
- **Sidebar:** Logo, navigation (Dashboard, Scans, Settings, Billing), store selector dropdown, user profile
- **Header:** Store health score (large metric), last scan timestamp, "Run New Scan" CTA
- **Content Grid:** 
  - Top: 4 metric cards (SEO Score, Performance, UX Rating, Conversion Rate)
  - Middle: Scan history table with sortable columns
  - Bottom: Recent issues list with severity indicators

### Scan Results Page
**Layout:** Full-width with sticky header
- **Header:** Overall score (circular progress), scan date, export/share buttons
- **Category Tabs:** Horizontal navigation (SEO, Performance, UX, Products, Conversion)
- **Results Grid:** Issues grouped by severity (Critical, Warning, Recommendation)
- **Issue Cards:** Icon, title, description, impact score, "Fix This" button, code snippets where relevant

### Settings Page
**Layout:** 2-column (sidebar nav + content)
- **Sidebar:** Settings categories (Store Connection, Scan Preferences, Notifications, Billing, Team)
- **Content:** Form layouts with clear labels, helper text, save buttons anchored bottom-right

## Component Library

### Navigation
- Horizontal nav for landing (centered logo, right-aligned CTAs)
- Vertical sidebar for dashboard (collapsible on mobile)
- Breadcrumbs for deep navigation

### Cards
- Elevated cards with shadow-sm, rounded-lg, p-6
- Metric cards: Large number + label + trend indicator
- Issue cards: Left border for severity color coding

### Buttons
- Primary: Solid with rounded-lg, px-6 py-3
- Secondary: Outlined with same dimensions
- Danger: For critical actions
- Icon buttons: Square, p-2, rounded-md

### Data Display
- Tables: Striped rows, hover states, sortable headers
- Progress bars: For scores and metrics
- Badges: For status (Passing, Warning, Critical)
- Charts: Line graphs for trends, bar charts for comparisons

### Forms
- Input fields: border, rounded-md, px-4 py-2.5
- Labels: font-medium, mb-2
- Helper text: text-sm, text-gray-600, mt-1
- Validation: Inline error messages with red accent

### Overlays
- Modals: Centered, max-w-2xl, backdrop blur
- Toasts: Top-right positioned, auto-dismiss
- Tooltips: On hover for additional context

## Images

### Landing Page
**Hero Background:** Abstract, technical visualization (network nodes, data flow, or dashboard mockup) with gradient overlay - full-width, 80vh
**Dashboard Preview:** Screenshot of actual StoreDoctor dashboard showing scan results - placed in Problem/Solution section, right column
**Logo:** Use provided grok_image (StoreDoctor logo) in navigation, footer, and as favicon

### Dashboard
**Empty States:** Illustration for "No scans yet" with friendly prompt
**Issue Icons:** Use Heroicons for consistency (ExclamationTriangle, CheckCircle, InformationCircle)

## Accessibility
- WCAG AA contrast ratios minimum
- Keyboard navigation for all interactive elements
- ARIA labels on icon-only buttons
- Focus indicators visible on all focusable elements
- Form inputs with associated labels (not just placeholders)

## Animations
**Minimal approach:**
- Scan progress: Animated progress bar only
- Score reveals: Count-up animation on initial load
- Page transitions: Subtle fade-in (200ms)
- No scroll-triggered animations
- Button hover: Scale 1.02 transform