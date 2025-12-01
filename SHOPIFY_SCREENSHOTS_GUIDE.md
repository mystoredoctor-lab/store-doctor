# StoreDoctor Shopify App Store Screenshots Guide

## How to Capture Your Real App Screenshots

Your app is running at: **http://localhost:5000**

### Recommended Settings:
- **Browser Window Size:** 1600 x 900 pixels (or maximize for fullscreen)
- **Dark/Light Mode:** Both look good, choose your preference
- **Scroll Position:** Capture what's visible without scrolling (unless noted)

---

## 5 Screenshot Pages to Capture

### Screenshot 1: Dashboard Overview
**URL:** `http://localhost:5000/dashboard`
**What to show:** 
- Multiple connected stores
- Store health scores (65-88 range)
- Store names visible
- Overall dashboard metrics

**Instructions:**
1. Go to http://localhost:5000/dashboard
2. Make sure you're logged in (Free plan by default)
3. Take a full browser screenshot
4. Save as: `1_dashboard_overview.png`

---

### Screenshot 2: Health Score Results
**URL:** `http://localhost:5000/dashboard/scan?storeId=store_1`
**What to show:**
- Large circular health score gauge (82/100)
- 6 category scores below (SEO, Speed, UX, CRO, Security, Mobile)
- Clean diagnostic view

**Instructions:**
1. Go to http://localhost:5000/dashboard/scan?storeId=store_1
2. Scroll up to see the main health score gauge
3. Take screenshot focusing on the health score area
4. Save as: `2_health_score_results.png`

---

### Screenshot 3: Issues Analysis & Findings
**URL:** `http://localhost:5000/dashboard/scan?storeId=store_1`
**What to show:**
- List of critical issues
- Severity badges (High, Medium, Low)
- Issue details and impact
- "How to Fix" section visible

**Instructions:**
1. Same URL as Screenshot 2: `http://localhost:5000/dashboard/scan?storeId=store_1`
2. Scroll down to the "Detailed Analysis" section
3. Click "Critical Issues" tab if not already selected
4. Expand one or two issues to show details
5. Take screenshot of issues list
6. Save as: `3_issues_analysis.png`

---

### Screenshot 4: Pricing Plans
**URL:** `http://localhost:5000/pricing`
**What to show:**
- All 3 pricing tiers (Free, Pro, Advanced)
- Clear pricing: $0, $12, $25
- Feature lists for each plan
- Pro plan highlighted as "Most Popular"

**Instructions:**
1. Go to http://localhost:5000/pricing
2. Scroll to see all three pricing cards
3. Take fullpage screenshot showing all plans
4. Save as: `4_pricing_plans.png`

---

### Screenshot 5: Features & Benefits
**URL:** `http://localhost:5000/` (Landing page)
**What to show:**
- Key features section
- Benefits of using StoreDoctor
- Value proposition clearly visible

**Instructions:**
1. Go to http://localhost:5000/
2. Scroll down to the "Features" section
3. Take screenshot showing 4-6 feature cards
4. Save as: `5_features_overview.png`

---

## How to Take Screenshots

### Option 1: Mac
```bash
Cmd + Shift + 4, then select window or use Cmd + Shift + 3 for fullscreen
```

### Option 2: Windows
```
Windows + Shift + S to open Snip & Sketch
```

### Option 3: Linux
```bash
Print Screen key or use gnome-screenshot
```

### Option 4: Browser DevTools
1. Open Chrome/Edge DevTools (F12)
2. Click the device toolbar icon (top-left)
3. Set to 1600x900 resolution
4. Click ⋮ menu → Capture → Capture screenshot

---

## After Capturing Screenshots

1. Save all 5 images to: `attached_assets/generated_images/`
2. Name them: `1_dashboard_overview.png`, `2_health_score_results.png`, etc.
3. Upload to Shopify app store in order
4. Add captions for each:

   **Caption 1:** "Connect and manage all your Shopify stores in one dashboard"
   
   **Caption 2:** "Get a comprehensive health score across 6 critical areas"
   
   **Caption 3:** "Identify issues instantly with detailed findings and fixes"
   
   **Caption 4:** "Choose the perfect plan - Free to start, upgrade as you grow"
   
   **Caption 5:** "6 diagnostic categories to fully understand your store's performance"

---

## Tips for Best Results

✅ **DO:**
- Ensure text is clearly readable
- Show actual data/content
- Use consistent window size
- Capture useful UI elements
- Include all important buttons/features

❌ **DON'T:**
- Show sensitive data
- Include system notifications
- Have browser UI cluttering the view
- Use compressed/pixelated images
- Show error states or blank loading

---

## Next Steps

Once you have captured all 5 screenshots:
1. Save them in `attached_assets/generated_images/`
2. You can then proceed to publish on the Shopify App Store
3. Use this app URL for your store: **https://your-replit-app.replit.dev**

Good luck with your Shopify app store submission! 🚀
